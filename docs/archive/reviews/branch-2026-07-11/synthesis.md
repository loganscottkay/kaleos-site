# Code Review Synthesis — v2/full-rebuild — 2026-07-11

Synthesized from three independent reviews: correctness, security/performance, and architecture.

## Overall Assessment
This branch is a net improvement and is close to merge-ready. It removes client-side Supabase writes (a real security win), simplifies the design system, and the new lead route's partial-success design is genuinely well built. All three reviewers agree there are no critical structural defects. The one hard blocker is a single correctness bug: Resend send failures are silently reported as success, which means Logan can lose leads without knowing. Fix that one issue plus the shared rate-limiter weaknesses and this is safe to merge.

## Critical Issues (must fix before merge)

### 1. Resend send failures are silently treated as success
**File:** src/app/api/lead/route.ts (~1314-1348) · Flagged by: correctness
The route runs Airtable and email through `Promise.allSettled` and only checks `emailResult.status === 'rejected'`. The Resend SDK does not reject on API-level failures. It resolves with a `{ data, error }` object and only rejects on a thrown/network error. So a real failure (unverified sender domain, bad recipient, bad API key, rate limit) resolves as `fulfilled` with `value.error` populated, and this code never inspects `value.error`. Two consequences: (1) lead notifications to logan@kaleoshq.com fail silently, which is likely happening now since the sender is still `onboarding@resend.dev` (Resend only delivers that to the account owner's own address); (2) the "both destinations failed" 502 guard can never trigger on an email error, so a lost lead still returns `{ ok: true }` and the visitor is told it worked. This is the primary conversion path, so silent failure directly costs business.
**Fix:** Treat email as failed when `emailResult.status === 'rejected' || emailResult.value?.error`. Recompute `emailFailed`/`airtableFailed` from both the settle status and the resolved error field, and base the 502 branch on those.

## Warnings (should fix)

### Rate limiter is spoofable and per-instance (two related security holes)
**File:** src/app/api/chat/route.ts:50 and src/app/api/lead/route.ts:268 · Flagged by: security
Two compounding problems. (1) Both routes derive the client IP from the attacker-controlled `x-forwarded-for` header (left-most value), so rotating a fake value gives a fresh bucket every request. (2) The rate-limit state is a module-level `Map` in function memory, which on Vercel serverless is neither shared across instances nor durable. Together these mean the advertised limits (20 chat/hr, 10 lead/hr) are effectively unenforced, leaving no real guard on OpenAI spend (chat) or Airtable writes and Resend emails (lead).
**Fix:** Trust the platform-provided client IP (`req.ip` / Vercel's `x-real-ip`, or the right-most XFF entry) instead of the raw left-most header, and back the limiter with a shared store with TTL (Vercel KV / Upstash Redis, or Vercel Firewall rate rules).

### Unbounded Map growth in the lead route rate limiter
**File:** src/app/api/lead/route.ts:13 · Flagged by: correctness, security, architecture (all three)
The chat route has a `setInterval` sweep that evicts expired entries; the lead route copied the limiter but omitted the cleanup. Entries are only overwritten when the same IP returns after its window, so distinct IPs (including spoofed XFF values, which are unbounded) accumulate for the lifetime of the warm instance — a slow memory leak that an attacker rotating fake IPs accelerates.
**Fix:** Add the same periodic cleanup (or evict on write when `now > entry.resetAt`). Best solved together with the shared-store fix above.

### Chat messages forwarded to OpenAI without validation or size caps
**File:** src/app/api/chat/route.ts:59-88 · Flagged by: security (correctness raised the same input-shape gap, see below)
The `messages` array is only checked for being an array of length <= 30, then spread straight into the OpenAI call. Individual entries are never validated for `role` or `content`. Two risks: (1) cost/abuse — 30 messages of megabytes each blow up input tokens and the OpenAI bill (`max_tokens: 500` only caps the response); (2) injection — a caller can inject extra `{role: "system"}` entries to override the system prompt and jailbreak the assistant under the Kaleos brand.
**Fix:** Validate each message: `role` must be `user` or `assistant` (drop/reject `system`), `content` must be a string, enforce a per-message length cap (~4-8k chars) and a total-payload cap. Reject anything that fails.

### `lastUserMsg.content.trim()` assumes content is a non-null string
**File:** src/app/api/chat/route.ts:68-69 · Flagged by: correctness, security
The guard checks the message object exists but not that `content` is a string. A payload like `[{ "role": "user" }]` or `content: null` makes `.trim()` throw a TypeError, which the outer catch reports as a generic 500 — a recoverable client mistake surfaced as a server fault.
**Fix:** Guard with `typeof lastUserMsg?.content === 'string'` before calling string methods, and return a 400 for malformed input. Folds into the message-validation work above.

### Airtable client can throw synchronously outside any try/catch
**File:** src/app/api/lead/route.ts:1297-1312 · Flagged by: correctness (architecture raised the same env-var gap, see below)
The Airtable base is constructed inline. The `airtable@0.12` constructor throws synchronously when the API key is missing, and `.base()` throws on a missing/empty base id. This code is not inside a try/catch, so a missing/empty env var produces an unhandled throw. That bypasses the route's graceful-degradation design: Next returns a raw 500 with no JSON shape, the email promise is never created, and no lead is captured. Bites hardest in a misconfigured preview/staging environment.
**Fix:** Build the Airtable base inside a try/catch (or guard the env vars up front and short-circuit) so a construction error becomes a rejected settle result or an explicit 502.

### Canonical / OG URLs split between www and non-www
**File:** src/app/blog/page.tsx:14,17 · src/app/blog/[slug]/page.tsx:26,29,31 · src/components/Footer.tsx:25 · Flagged by: correctness, architecture
The branch migrates the site to `https://www.kaleoshq.com` (layout `metadataBase`, sitemap, robots, about, audit), but the blog pages still hardcode `https://kaleoshq.com/blog/...` for canonical and OG URLs, and the Footer still links the bare domain. The sitemap advertises www blog URLs while those pages self-canonicalize to non-www — conflicting signals that can split or confuse indexing and read as a half-finished migration.
**Fix:** Pick one host (layout already commits to www) and make every canonical/OG/sitemap/footer reference agree. Better, since `metadataBase` is set, use relative canonicals (`alternates: { canonical: '/blog' }`) so the host lives in exactly one place.

### In-memory rate limiter duplicated across two API routes
**File:** src/app/api/lead/route.ts:9-21 and src/app/api/chat/route.ts · Flagged by: architecture
The lead route copy-pastes the chat route's limiter almost verbatim, changing only the numbers. Two definitions of the same mechanism now drift independently and already differ (the missing cleanup above). Duplicating it doubles the surface of both the eviction and per-instance bugs.
**Fix:** Extract one helper (e.g. `src/lib/rateLimit.ts`) exporting `createRateLimiter({ max, windowMs })` that both routes call. This is also the single seam to later swap the Map for a shared store once, not twice.

### The "gate" checkpoint chip is implemented three separate ways
**File:** src/app/globals.css (`.gate-rule::after`) · src/components/GateFlow.tsx:16-27 · src/components/demos/GateAction.tsx (`GateChip`) · Flagged by: architecture
The signature checkpoint square exists as three independent implementations (a CSS pseudo-element, an inline JSX chip in GateFlow, and `GateChip` in GateAction) with different sizes, radii, and color rules. The comments even acknowledge they are "the same chip." When the brand element's styling changes, someone must edit three unrelated files and keep them identical by hand — they will drift.
**Fix:** Make `GateChip` the single source of truth and have the others compose it, or at minimum pull the shared border/radius/color values into named constants all three reference.

### Blog is now an orphaned subsystem
**File:** src/components/NavBar.tsx:6-10 · src/app/blog/* · src/lib/blog.ts · Flagged by: architecture
`/blog` was removed from the NavBar links, but the whole blog subsystem stays wired: routes, `lib/blog.ts`, gray-matter/remark deps. It is reachable by direct URL but linked nowhere, still carries the old non-www canonicals, and was untouched by the redesign. "Live but unlinked" is ambiguous — a future reader can't tell if it is deprecated or temporarily hidden.
**Fix:** Make the intent explicit. Either keep blog first-class (re-add the nav link, bring canonicals and styling in line) or retire it (remove the routes, `lib/blog.ts`, and the gray-matter/remark deps).

### No tests exist for the new API routes or interactive logic
**File:** src/app/api/lead/route.ts · src/app/api/chat/route.ts · demos/* · Flagged by: correctness
The branch adds lead capture with input validation, a honeypot path, dual-destination writes, and rate limiting, plus a chat refactor, with no tests and no test runner in package.json (only `lint`). The validation edge cases are exactly the logic most likely to regress, and the critical Resend bug above is the kind a single route test would have caught.
**Fix:** Add a few unit tests for `validate()` in the lead route (honeypot, missing fields, bad email, oversized trimming) and a route test asserting a Resend `{ error }` result does not report success. Wire up a `test` script.

## Suggestions (nice to have)

### Input handling / API robustness
- **Empty `messages` array passes validation** (src/app/api/chat/route.ts:59-65, correctness): `messages: []` passes the array and length checks, so OpenAI is called with only the system prompt — wasted spend and odd UX. Reject when `messages.length === 0` or the last message isn't a user turn.
- **Lead notification email built from unsanitized name/company** (src/app/api/lead/route.ts:314-329, security): the Resend `subject` interpolates trimmed-but-not-sanitized `name`/`company`. Low risk since Resend uses a JSON API (not raw SMTP), so classic header injection is mitigated; residual risk is content spoofing in the notification Logan reads. Strip CR/LF before interpolating — cheap.
- **Missing env-var validation for the new integrations** (src/app/api/lead/route.ts:101-118, architecture): `AIRTABLE_BASE_ID!` non-null assertion plus keys passed straight to SDK constructors mean a missing key looks identical to a real outage (a 502). Validate the three env vars once at module load, or branch early with a distinct message. Closely related to the Airtable-throw warning above.

### Structure / maintainability
- **Lead API route tightly coupled to the Airtable schema** (src/app/api/lead/route.ts:101-116, architecture): the handler mixes HTTP/validation, Airtable persistence (hard-coded table `'Leads'`, exact field labels, the date-only truncation quirk), and the email body. Extract `saveLead(lead)` / `notifyLead(lead)` into `src/lib/` so the route keeps only HTTP concerns and becomes testable without standing up Airtable.
- **JSON-LD repeated inline per page** (src/app/page.tsx, src/app/about/page.tsx, architecture): each page hand-rolls the same `<script type="application/ld+json" dangerouslySetInnerHTML=... />`. Introduce a tiny `<JsonLd data={...} />` component to own the script tag and serialization in one place.
- **Static JSON-LD via `dangerouslySetInnerHTML`** (src/app/page.tsx, src/app/about/page.tsx, security): `JSON.stringify` does not escape `<`, so a value containing `</script>` would break out. Safe today (hardcoded, no `<`); only needs `.replace(/</g, '\\u003c')` if any field ever becomes dynamic. Naturally handled by the shared `<JsonLd>` component above.
- **`DemoShell` exposes a `live` prop no caller uses** (src/components/demos/GateAction.tsx, architecture): dead API surface that only ever takes its default. Drop it (always render the indicator) or use it from a caller.

### Cleanup
- **Redundant below-the-fold gating in BuiltToDemo** (src/components/BuiltToDemo.tsx, architecture): each demo is gated twice — `dynamic(..., { ssr:false, loading })` plus an IntersectionObserver `near` gate — with two `DemoPlaceholder` paths. Keep one gate (the `near` observer is the more deliberate control; drop the `dynamic` `loading:` placeholder).
- **OutreachDemo advance timer not cancelled on unmount** (src/components/demos/OutreachDemo.tsx:1433-1439, flagged by correctness and security): the `setTimeout(..., 1400)` in `advance()` isn't stored in a ref or cleaned up. Harmless no-op in React 19 and exposure is low (demos mount only when scrolled near), but sloppy. Store the id in a ref and clear it in cleanup.

## Points of Agreement
Issues independently flagged by more than one reviewer — highest confidence:

1. **Unbounded Map growth in the lead route rate limiter** — all three reviewers (correctness, security, architecture). Strongest signal in the review.
2. **Rate limiter design as a whole** — security flagged spoofable IP + per-instance ephemerality; architecture flagged the duplication. Same code, converging conclusions: this limiter needs a shared-store rewrite, done once.
3. **Split www / non-www canonicals** — correctness and architecture.
4. **`content.trim()` type guard / chat message validation** — correctness (missing type guard) and security (missing validation and size caps). Same input-handling gap.
5. **Env-var / Airtable construction failure** — correctness (synchronous throw outside try/catch) and architecture (missing env-var validation). Same root: unguarded env vars turning misconfiguration into a raw 500.
6. **OutreachDemo advance timer not cleaned up** — correctness and security (security rated it cosmetic; no change strictly required).

## What Looks Good
Areas all reviewers either praised or found clean — solid, no action needed:

- **Removal of client-side Supabase writes.** AuditForm now posts to `/api/lead` instead of inserting into the `leads` table from the browser with the public anon key. The newsletter route/component and `chat_logs` writes are gone too. Security and architecture both call this a real net improvement and a clean teardown (no dangling `supabase` references, dep dropped from package.json).
- **Lead route partial-success design.** `Promise.allSettled` over Airtable + Resend, treating the lead as captured if either succeeds and only 502-ing when both fail, is called a genuinely thoughtful resilience pattern by both correctness and architecture. Keep it. (The Resend-error critical bug is a flaw in the *check*, not the pattern.)
- **AnimateIn reduced-motion handling.** `useSyncExternalStore` over `prefers-reduced-motion` is the idiomatic React 19 pattern, SSR-safe via the `() => false` server snapshot, with clean observer teardown. Praised by all three.
- **GlassCard simplification.** Collapsing glow/highlight/shimmer layers into a plain bordered card while keeping the component name to avoid churning call sites is the right call.
- **Demo extraction.** Pulling the three demo machines out of the 596-line monolith into their own files sharing a `GateAction` primitive set is a real separation-of-concerns win.
- **Presentational and copy-only changes** (GateAction/GateFlow/GateRule/InProduction, blog.ts, TalkToLogan.jsx, WorkflowDiagram, Footer, FAQ, globals.css, layout/robots/sitemap wiring) — reviewed with no correctness, security, or performance issues.
