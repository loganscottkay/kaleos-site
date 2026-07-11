# Correctness Review — branch 2026-07-11

Scope: correctness, bugs, and edge cases only. Reviewed every changed code file in
`reviews/branch-2026-07-11/diff.txt` (API routes, components, demos, lib, layout, pages).
Docs, screenshots, lockfiles, and SVG assets were skipped as non-code.

---

## Resend send failures are silently treated as success
**File:** src/app/api/lead/route.ts:1314-1348
**Severity:** critical
**What is wrong:** The route runs Airtable and email through `Promise.allSettled` and then
only inspects `emailResult.status === 'rejected'`. The Resend SDK (`resend.emails.send`, v6)
does not reject on API-level failures. It resolves with a `{ data, error }` object and only
rejects on a thrown/network error. So a real failure (unverified sender domain, invalid
recipient, bad API key, rate limit) resolves as `status: 'fulfilled'` with `value.error`
populated, and this code never looks at `value.error`.
**Why it matters:** Two concrete failures:
1. Email notifications to logan@kaleoshq.com fail silently and Logan never learns a lead came
   in. This is very likely right now: the comment on line 1202 says the sender is still
   `onboarding@resend.dev`, which in Resend can only deliver to the account owner's own
   address, so sends to logan@kaleoshq.com will error unless that is the account email.
2. Worse, the "both destinations failed" guard on line 1341 can never trigger on an email
   error, because the email promise is always `fulfilled`. If Airtable is `rejected` and the
   email actually errored, the route still returns `{ ok: true }` (200). The lead is lost and
   the visitor is told it succeeded.
**What needs to change:** After `allSettled`, treat the email as failed when
`emailResult.status === 'rejected' || emailResult.value?.error`. Recompute an
`emailFailed`/`airtableFailed` boolean from both the settle status and the resolved `error`
field, and base the 502 branch on those.

---

## Airtable client can throw synchronously outside any try/catch
**File:** src/app/api/lead/route.ts:1297-1312
**Severity:** warning
**What is wrong:** `new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID!)('Leads')`
is constructed inline. The airtable@0.12 constructor throws synchronously
("An API key is required to connect to Airtable") when the key is missing, and `.base()`
throws when the base id is missing/empty. This code is not inside a try/catch (the only
try/catch wraps `req.json()`), so a missing/empty env var produces an unhandled throw.
**Why it matters:** The graceful degradation this route is designed around (log the error,
still 502 with a friendly message) is bypassed. Instead Next returns a raw framework 500 with
no JSON error shape, so the AuditForm falls through to its generic catch. It also means the
email promise is never even created, so no lead is captured and no notification is sent. This
bites hardest in a misconfigured preview/staging environment.
**What needs to change:** Build the Airtable base inside a try/catch (or guard the env vars up
front and short-circuit), so a construction error is turned into a rejected settle result or
an explicit 502, consistent with the intended fallback.

---

## `lastUserMsg.content.trim()` assumes content is always a non-null string
**File:** src/app/api/chat/route.ts:68-69
**Severity:** warning
**What is wrong:** After `const lastUserMsg = messages[messages.length - 1]`, the guard is
`if (lastUserMsg && lastUserMsg.content.trim()...)`. It checks that the message object exists
but not that `content` is a string. A payload like `[{ "role": "user" }]` (missing content)
or `content: null`/`content: [...]` makes `.trim()` throw a TypeError.
**Why it matters:** The throw is swallowed by the outer catch and returned as a generic 500
"Internal server error", so a malformed-but-recoverable client request is reported as a server
fault, and the failure mode is opaque. `messages` items are also spread straight into the
OpenAI call with no shape validation, so the same class of bad input reaches the model.
**What needs to change:** Guard on type, e.g. `typeof lastUserMsg?.content === 'string'` before
calling `.trim()`, and return a 400 for malformed messages rather than letting it fall into the
500 path. Optionally validate each message has a string `content` and an allowed `role`.

---

## Empty `messages` array passes validation and calls the model with no user turn
**File:** src/app/api/chat/route.ts:59-65
**Severity:** suggestion
**What is wrong:** `messages: []` passes `Array.isArray(messages)` and the length<=30 check.
`lastUserMsg` becomes `undefined`, the easter-egg guard skips, and the code calls OpenAI with
only the system prompt.
**Why it matters:** Wasted OpenAI call and token spend on an empty conversation, and an odd UX
response. Low impact but easily avoided.
**What needs to change:** Reject when `messages.length === 0` (or when the last message is not a
user turn) with a 400.

---

## Lead route rate-limit store is never purged
**File:** src/app/api/lead/route.ts:1209-1220
**Severity:** suggestion
**What is wrong:** The chat route has a `setInterval` that evicts expired rate-limit entries
(route.ts:10-15). The new lead route copies the limiter but omits the cleanup. Entries are only
overwritten when the same IP returns after its window resets, so distinct IPs accumulate for the
lifetime of the serverless instance.
**Why it matters:** Slow unbounded memory growth per warm instance. Minor because instances
recycle, but it is an inconsistency with the sibling route and a latent leak.
**What needs to change:** Add the same periodic cleanup, or evict on write when
`now > entry.resetAt` for scanned keys.

---

## Blog canonical/OG URLs still point at the non-www host
**File:** src/app/blog/[slug]/page.tsx:26,29 and src/app/blog/page.tsx:14,17
**Severity:** suggestion
**What is wrong:** This branch migrates the whole site to `https://www.kaleoshq.com`
(layout `metadataBase`, sitemap, robots, audit page all use www), but the blog pages still
hardcode `https://kaleoshq.com/blog/...` for `alternates.canonical` and `openGraph.url`.
**Why it matters:** The sitemap advertises `www` blog URLs while those pages self-canonicalize to
the `non-www` host. Conflicting canonical signals can split or confuse indexing. Not a runtime
bug, but a correctness inconsistency introduced by this change.
**What needs to change:** Change the blog canonical and OG URLs to `https://www.kaleoshq.com`,
matching the rest of the site.

---

## OutreachDemo advance timer is not cancelled on unmount
**File:** src/components/demos/OutreachDemo.tsx:1433-1439
**Severity:** suggestion
**What is wrong:** `advance()` schedules a bare `setTimeout(..., 1400)` that calls
`setIndex/setDraft/setEditing/setDecided`. It is not stored in a ref and has no cleanup. The
score-animation timer is cleaned up correctly, but this one is not.
**Why it matters:** If the component unmounts during the 1400ms window (route change), the
timer fires state setters on an unmounted component. Harmless no-op in React 19 but sloppy, and
if it were ever moved above the fold or reused it could produce a stale update. The demos are
loaded with `ssr:false` and mount only when scrolled near, so exposure is low.
**What needs to change:** Store the timeout id in a ref (or the existing `timerRef` is already in
use, so use a second ref) and clear it in an effect cleanup / before scheduling a new one.

---

## No tests exist for the new API routes or interactive logic
**File:** (repo-wide) src/app/api/lead/route.ts, src/app/api/chat/route.ts, demos/*
**Severity:** warning
**What is wrong:** The branch adds a new lead-capture API with input validation, a honeypot
path, dual-destination writes, and rate limiting, plus refactors the chat route, with no tests.
There is no test runner configured in package.json (only `lint`). The validation edge cases
(honeypot returns success-with-no-write, email regex, array filtering/slicing, the both-failed
502 branch, and the Resend-error path above) are exactly the logic most likely to regress.
**Why it matters:** The Resend silent-success bug (finding 1) is the kind of defect a single
route test would have caught. Lead capture is the site's primary conversion path, so silent
regressions here directly cost business.
**What needs to change:** Add at least a few unit tests for `validate()` in the lead route
(honeypot, missing required fields, bad email, oversized/looking-to-solve trimming) and a route
test that asserts a Resend `{ error }` result does not report success. Wire up a `test` script.

---

## Sections reviewed with no correctness issues found
- **AnimateIn.tsx** — `useSyncExternalStore` reduced-motion hook is correct; server snapshot
  returns `false` so hydration matches, and the observer cleanup is intact.
- **BuiltToDemo.tsx** — the lazy `dynamic(..., { ssr:false })` + IntersectionObserver
  (`rootMargin:400px`, disconnect-once) is sound; placeholder reserves height to avoid shift.
- **NavBar.tsx** — scroll listener adds/removes cleanly; removal of the jet/skywriting animation
  eliminated the previous rAF/clip logic without leaving dangling refs.
- **QuickAssessment.tsx** — removed Supabase logging and SparkleCanvas cleanly; remaining
  `useRef/useEffect/useCallback` are still used (sectionRef, observer, advanceStep).
- **AccountabilityDemo.tsx / ClientPortalDemo.tsx** — pure state, no timers;
  `toLocaleTimeString` runs client-only (ssr:false) so no hydration mismatch.
- **GateAction.tsx / GateFlow.tsx / GateRule.tsx / InProduction.tsx** — presentational; the CSS
  classes they rely on (`gate-rule`, `on-dark`, `gate-flow-*`, `animate-pulse-slow`,
  `font-system`) and theme tokens (`paper/ink/mist/navy/accent`) are all defined in globals.css.
- **AuditForm.tsx** — honeypot field present and wired; client validation mirrors server;
  non-ok responses handled with `res.json().catch(() => null)` fallback.
- **layout.tsx / page.tsx / robots.ts / sitemap.ts** — old `public/robots.txt` was deleted so
  there is no static-vs-generated robots conflict; `sitemap.ts` exists and is referenced
  correctly; jsonLd moved to the homepage renders fine.
- **blog.ts, TalkToLogan.jsx, WorkflowDiagram.tsx, GlassCard.tsx, Footer.tsx, FAQ.tsx** — copy,
  styling, and font-token swaps only; no logic changes.
