# Preship Report - kaleos-site (v2/full-rebuild) - 2026-07-11

## VERDICT: FIX FIRST (criticals since fixed on-branch; see addendum)
At gate time the review found one critical: the lead form's Resend email failures resolved as success, so a lead could be lost while the visitor was told it worked. Per the mechanical rule that is a FIX FIRST. The critical and the five highest-value warnings were fixed on-branch immediately after the gate and re-verified end to end (build, lint, typecheck, live route tests, Airtable row confirmed). With those commits in place, the remaining findings are Medium/Low follow-ups.

## What was checked
- **Validation:** `npm run lint` PASS (0 errors, 3 pre-existing img warnings), `npx tsc --noEmit` PASS, `npm run build` PASS. No test script exists in this repo (finding below).
- **Review:** local-ultrareview, full diff vs main (17,554 lines): three parallel Opus reviewers (correctness, security/performance, architecture) plus synthesis. Artifacts in reviews/branch-2026-07-11/. The skill's offer to auto-apply fixes was declined inside the gate; fixes were applied afterward as a separate decision and commit.
- **Security:** read-only audit pass: secrets recon, client-bundle scan, env handling, plus the agent/injection lens (prompt injection paths, credential exposure, unvalidated inputs, privilege escalation).

## Findings

### Critical (fixed on-branch after the gate)
1. **Resend failures reported as success** (src/app/api/lead/route.ts). The SDK returns `{ error }` in a resolved promise; the code only checked for rejections. Leads could silently fail to reach the inbox and the both-destinations-failed 502 could never fire on an email error. Why it matters: this is the primary lead-capture path for the business. FIXED: errors now throw inside the send wrapper, are logged, and count as a failed destination. Verified live.

### High (fixed on-branch after the gate)
2. **Chat route accepted unvalidated messages** (src/app/api/chat/route.ts). No role check (system-role injection into the OpenAI call), no content type/length caps (cost blowup, crash on non-string content). FIXED: strict message sanitizer; system role and oversized payloads rejected with 400. Verified live.
3. **Rate limiting spoofable and unbounded** (both API routes). Keyed off client-controllable left-most x-forwarded-for; two copy-pasted in-memory Maps, the lead route's never pruned. FIXED: shared bounded limiter in src/lib/rate-limit.ts keyed on Vercel's x-real-ip. Residual limitation (Medium, below).

### Medium (recommended follow-ups)
4. **Per-instance rate limiting.** The in-memory limiter does not coordinate across serverless instances. Real enforcement needs a shared store (Upstash/Vercel KV) or Vercel WAF rate rules. Why it matters: a determined abuser can still drive OpenAI/Resend/Airtable usage; a casual one cannot.
5. **No test suite.** No test script exists; a single route test on /api/lead would have caught the critical. Why it matters: the lead path is business-critical and currently only covered by manual verification.
6. **No custom security headers** (CSP, X-Frame-Options, etc.). Static marketing site with no auth, so impact is low, but a baseline CSP is cheap insurance. next.config.ts headers() is the spot.
7. **Sender still onboarding@resend.dev** (src/app/api/lead/route.ts:6). Deliverability depends on Resend's shared sender until the kaleoshq.com domain is verified (SPF/DKIM at the DNS host). Manual step for Logan; then flip FROM_ADDRESS.

### Low
8. Gate chip motif implemented three ways (gate-rule CSS, GateFlow JSX, GateChip component); consolidate during the pending design-direction pass.
9. Blog subsystem live but unlinked and unrestyled (per runbook standing decision; noting the ambiguity for the record).
10. Email subject interpolates unsanitized name/company (Resend JSON API makes header injection a non-issue today).
11. JSON-LD via dangerouslySetInnerHTML is static and safe; escape values if any ever become dynamic.

### Fixed with the High batch
Canonical host split (blog/Footer on bare kaleoshq.com vs www everywhere else) and an OutreachDemo unmount timer leak.

## What passed
- No .env files tracked by git; no NEXT_PUBLIC_ misuse; no secret-shaped strings in client chunks; env reads confined to the two server routes.
- No privilege-escalation surface: no auth, no admin routes, no service-role clients.
- Prompt injection blast radius is contained: chat output renders as escaped React text, is never executed or used for privileged decisions; lead data goes to plain-text email and typed Airtable fields.
- Supabase teardown is total (zero references, dependency removed); reviewers independently praised the allSettled partial-success design, the reduced-motion handling, and the demo extraction.
- Honeypot, field length caps, and email format validation on the lead route; easter egg intact.

Artifacts: reviews/branch-2026-07-11/ (three reviews, synthesis.md, implementation-plan.md), audits/ (baseline, design decisions, Lighthouse before/after).
