# Security & Performance Review — branch 2026-07-11

Scope: security vulnerabilities and performance problems only. Reviewed the full
diff (17,554 lines). Most of the diff is copy/design changes (CSS, page layout,
component styling) with no security or performance surface. The findings below
concentrate on the three API routes and shared client logic.

Overall the direction of this branch is a security improvement: the client-side
Supabase writes are gone (`AuditForm` used to `insert` straight into the `leads`
table from the browser with the public anon key), the newsletter route/component
that echoed the anon key path is deleted, and `chat_logs` writes were removed.
The remaining issues are concentrated in the rate limiting and input handling of
`/api/chat` and `/api/lead`.

---

## Rate limiter keyed on spoofable X-Forwarded-For
**File:** src/app/api/chat/route.ts:50 and src/app/api/lead/route.ts:268
**Severity:** warning
**Type:** security
**What is wrong:** Both routes derive the client IP from the request's own
`x-forwarded-for` header (`req.headers.get('x-forwarded-for')?.split(',')[0]`).
That header is fully attacker-controlled. Anything before Vercel's own injected
value can be forged, and by rotating a fake left-most value on every request an
attacker gets a fresh bucket each time.
**Attack vector / Impact:** An unauthenticated attacker sends
`X-Forwarded-For: <random>` per request and completely bypasses the 20/hr chat
limit and 10/hr lead limit. For chat this means unbounded calls to OpenAI
(your `OPENAI_API_KEY` foots the bill); for lead it means unbounded Airtable
writes and Resend emails to logan@kaleoshq.com.
**What needs to change:** On Vercel, trust the platform-provided client IP rather
than the raw header. Use `req.ip` (or the right-most / Vercel-set XFF entry, not
the left-most), or Vercel's `x-real-ip`. Better, move rate limiting to a shared
store keyed on that trusted value (see next finding).

## In-memory rate limiter is per-instance and ephemeral
**File:** src/app/api/chat/route.ts:7 and src/app/api/lead/route.ts:13
**Severity:** warning
**Type:** security
**What is wrong:** The rate-limit state is a module-level `Map` in the function's
memory. On Vercel serverless each concurrent invocation can run in a separate
instance, and instances are recycled/cold-started constantly, so the counter is
neither shared across instances nor durable.
**Attack vector / Impact:** The advertised limits (20 chat/hr, 10 lead/hr) are not
actually enforced under any real concurrency. Combined with the spoofable-IP
issue above, there is effectively no resource guard on the OpenAI, Airtable, and
Resend spend.
**What needs to change:** Back the limiter with a shared store (Vercel KV / Upstash
Redis, or the Vercel Firewall rate-limit rules). Even a modest per-IP Redis
counter would make the limit real.

## Unbounded Map growth in the lead route rate limiter
**File:** src/app/api/lead/route.ts:13
**Severity:** warning
**Type:** performance
**What is wrong:** The chat route added a `setInterval` sweep that deletes expired
entries (chat/route.ts:10-15), but the lead route's identical `rateLimitStore`
has no cleanup. Entries are only overwritten when the same IP returns after its
window; IPs that never come back stay in the Map forever.
**Attack vector / Impact:** Over the lifetime of a warm instance the Map grows with
every unique IP seen (and every spoofed XFF value, which is unbounded per the
first finding), a slow memory leak that degrades or eventually OOMs the instance.
An attacker rotating fake IPs accelerates it dramatically.
**What needs to change:** Add the same periodic cleanup the chat route has, cap the
Map size, or move to an external store with TTL (preferred, also fixes the two
findings above).

## Chat messages forwarded to OpenAI without validation or size caps
**File:** src/app/api/chat/route.ts:59-88
**Severity:** warning
**Type:** security
**What is wrong:** The request `messages` array is only checked for being an array
of length <= 30, then spread directly into the OpenAI call
(`messages: [{role: "system", ...}, ...messages]`). Individual entries are never
validated for `role` (must be user/assistant), and `content` has no length cap
and no type check.
**Attack vector / Impact:** Two problems. (1) Cost/abuse: a caller can send 30
messages each with megabytes of text, blowing up input tokens and your OpenAI
bill per request (the `max_tokens: 500` cap only limits the response, not the
prompt). (2) Injection: a caller can inject additional `{role: "system"}` entries
after your system prompt to override instructions / jailbreak the assistant into
saying whatever they want under the Kaleos brand.
**What needs to change:** Validate each message: `role` must be `user` or
`assistant` (drop or reject `system`), `content` must be a string, enforce a
per-message length cap (e.g. 4-8k chars) and a total-payload cap. Reject anything
that fails rather than forwarding it.

## content.trim() assumes a string that may not exist
**File:** src/app/api/chat/route.ts:69
**Severity:** suggestion
**Type:** security
**What is wrong:** `lastUserMsg.content.trim().toLowerCase()` runs before any check
that `content` is a string. A message like `{role:"user"}` or
`{role:"user", content: 123}` throws a `TypeError`.
**Attack vector / Impact:** It is caught by the outer try/catch so it only returns a
500 rather than crashing, but it is a trivially triggerable error path and a
symptom of the missing validation in the finding above.
**What needs to change:** Guard with `typeof lastUserMsg?.content === 'string'`
before calling string methods (folded into the message validation above).

## Lead notification email built from unsanitized name/company
**File:** src/app/api/lead/route.ts:314-329
**Severity:** suggestion
**Type:** security
**What is wrong:** The Resend `subject` (`New lead: ${lead.name} at ${lead.company}`)
and `replyTo: lead.email` are built from user-supplied fields. `email` is
regex-validated, but `name`/`company` are only trimmed and length-capped, not
stripped of newlines or control characters.
**Attack vector / Impact:** Low in practice because Resend sends via a JSON API
(not raw SMTP), so classic header injection is mitigated by the provider. The
residual risk is content spoofing in the notification you read (crafted names
that look like extra headers/fields). Not exploitable into third parties.
**What needs to change:** Strip CR/LF from `name` and `company` before
interpolating them into the subject. Optional given the API transport, but cheap.

## Static JSON-LD via dangerouslySetInnerHTML
**File:** src/app/page.tsx:14474 and src/app/about/page.tsx:12838
**Severity:** suggestion
**Type:** security
**What is wrong:** `dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}`
injects a JSON-LD `<script>`. `JSON.stringify` does not escape `<`, so a value
containing `</script>` would break out of the tag.
**Attack vector / Impact:** None today: `jsonLd` is a hardcoded object with no user
input and no `<` characters, so this is safe as written. Flagging only so it does
not become a hole if any of these values later become dynamic.
**What needs to change:** If any field ever becomes dynamic, escape `<` (e.g.
`.replace(/</g, '\\u003c')`) before injecting. No action needed while static.

---

## Sections reviewed with no issues found

- **src/app/api/lead/route.ts data flow (Airtable + Resend):** Input is validated
  and length-capped, honeypot handling is correct, and the two destinations run in
  parallel via `Promise.allSettled` (no N+1, no sequential blocking). API keys are
  read from env, not exposed. Aside from the rate-limit findings above, this route
  is sound.
- **src/components/AuditForm.tsx:** Now posts to `/api/lead` instead of writing to
  Supabase from the browser. This is a net security improvement (removes
  client-side DB writes with the public anon key). No issues.
- **src/lib/supabase.ts / newsletter route / NewsletterSignup.tsx:** Deleted. These
  removals reduce attack surface. No issues.
- **src/components/AnimateIn.tsx:** IntersectionObserver and matchMedia listeners
  are both cleaned up in their subscribe/effect teardown. No leak.
- **src/components/demos/OutreachDemo.tsx:** The score-animation timers are stored
  in a ref and cleared on unmount, and the decision `log` is bounded with
  `.slice(0, 3)`. Minor note: the `setTimeout` inside `advance` (route file
  line ~17433) is not tracked or cleared, so an unmount mid-transition can fire a
  state update on an unmounted component. Purely cosmetic in a demo with bounded
  state; not a real leak. No change required.
- **Design/CSS/copy changes (globals.css, layout.tsx, blog pages, page.tsx
  styling, other demo components):** No security or performance surface.

## Note outside this diff
`remark-html` (used by src/lib/blog.ts to render posts) does not sanitize raw HTML
by default. It is not a vulnerability here because blog content is authored by
Logan in local markdown files, not user input, and the rendering code is unchanged
in this branch. Worth keeping in mind only if blog content ever becomes
user-submitted.
