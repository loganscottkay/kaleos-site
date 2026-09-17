# Implementation Plan — v2/full-rebuild — 2026-07-11

## Summary
The synthesis found 1 critical and 11 warnings. The critical and the highest-value warnings were applied on-branch immediately after the review (commit "fix(v2): apply preship review fixes"). The rest are logged as backlog with reasoning. This file records what was done and what was deliberately deferred.

## Applied on-branch

### Fix 1: Resend silent-success (CRITICAL)
**File:** src/app/api/lead/route.ts
The Resend SDK resolves with `{ data, error }` instead of rejecting on API failure. The send is now wrapped in an async closure that throws when `result.error` is set, so a failed notification email is logged, counted as a failed destination, and can trigger the both-failed 502. Verified: valid submission returns ok with no error logged and the Airtable row lands.

### Fix 2: Airtable synchronous throw
**File:** src/app/api/lead/route.ts
`new Airtable(...).base(...)` is now inside an async closure, so missing env vars reject into `Promise.allSettled` instead of escaping as an unhandled synchronous throw.

### Fix 3: Shared, bounded rate limiter + trusted IP
**Files:** src/lib/rate-limit.ts (new), src/app/api/chat/route.ts, src/app/api/lead/route.ts
One `createRateLimiter` helper replaces the two copy-pasted limiters. The store prunes expired entries inline and hard-caps tracked keys (no unbounded growth, no setInterval on serverless). IP now prefers `x-real-ip` (set by Vercel from the socket, not client-forgeable there) over the spoofable left-most `x-forwarded-for`.

### Fix 4: Chat message validation
**File:** src/app/api/chat/route.ts
`sanitizeMessages` enforces: array of 1-30 items, role must be user or assistant (system rejected), content must be a non-empty string, content capped at 4,000 chars. Also removes the unguarded `content.trim()` crash path. Verified: system-role and empty payloads now return 400; the easter egg still works.

### Fix 5: Canonical host unification
**Files:** src/app/blog/page.tsx, src/app/blog/[slug]/page.tsx, src/components/Footer.tsx
All remaining bare kaleoshq.com URLs moved to www.kaleoshq.com, matching layout/robots/sitemap.

### Fix 6: OutreachDemo timer leak
**File:** src/components/demos/OutreachDemo.tsx
The 1,400ms advance timeout is now held in a ref and cleared on unmount.

## Deferred (backlog, with reasoning)
- **Distributed rate limiting (Upstash/Vercel KV or Vercel WAF rules).** The in-memory limiter is per-instance; a real fix needs shared state. Right-sized once the funnel has traffic. The WAF route needs no code.
- **Test suite.** No test infrastructure exists in this repo. A first route test for /api/lead is the highest-value starting point.
- **Gate chip single-source.** The signature chip exists in gate-rule CSS, GateFlow JSX, and GateChip. Consolidate when the design direction decision (Machined Graphite proposal) lands, since that pass touches all three anyway.
- **Blog restyle or retirement decision.** Routes stay live per the runbook standing decision; visual refresh is deliberately out of scope.
- **JSON-LD boilerplate dedupe, DemoShell dead `live` prop, env validation at boot.** Cosmetic; batch with the next code-touch.

## Order of operations
All applied fixes are independent; they were applied together and verified with build, lint, typecheck, and live route tests against the production build.

## Risk
The rate limiter behavior change (x-real-ip preference) is a no-op locally (header absent, falls back) and strictly better on Vercel. Chat validation is stricter than before; the only rejected payloads are ones the UI never sends.
