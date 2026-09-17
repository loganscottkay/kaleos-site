# Critique: kaleoshq.com (baseline before redesign)

Phase E1, 2026-09-16. Ryan Hazen. Working notes, not client-facing.

**Access:** Full codebase on branch `design-overhaul` at 14c2292. Local build at localhost:3000 with placeholder env. Live site at www.kaleoshq.com, same commit. Exercised in the in-app browser at desktop and 375px, plus headless Chrome for anything the pane could not settle. Lighthouse not run: the PageSpeed API quota was exhausted and dev-mode Lighthouse numbers are meaningless. Performance is unverified in this pass.

**Verdict:** Ship-safe as it stands. Nothing is broken. The problem is credibility, not correctness: the site asserts a number it cannot back ("companies typically find 2-3 opportunities"), draws two charts with no data behind them, and puts a fake "Systems operational" status light in the footer. Fix the trust items first, then the form accessibility. Everything else is design-pass territory.

## Critical

None. Core flows work: quiz completes and routes to Calendly with a UTM per result, contact form posts to `/api/lead` and renders the server's error message, chat posts to `/api/chat` and renders its error, Enter sends a chat message, Escape closes the panel, mobile menu toggles with `aria-expanded`, no horizontal overflow on any route at 375px, no console errors, 404 returns a real 404, apex 307s to www, sitemap lists all ten routes.

## Major

- **Fabricated statistic in the quiz result.** `QuickAssessment.tsx:59` renders "Companies in your position typically find 2-3 high-leverage automation opportunities in the first conversation." No source exists for this in the repo, the handoff doc, or the CLAUDE.md. It is the only number-shaped claim on the site and it is invented. Verified by completing the quiz (Reporting, Haven't started, More capacity). *Fix:* delete the sentence or replace with something Logan can stand behind.
- **Charts with no data, labeled as ROI.** `StrategyGraph.tsx` draws "AI without strategy" (declining red curve) and "AI with Kaleos HQ" (compounding teal curve) with a Y axis labeled "ROI" on the About page. The points are hardcoded illustrations. To a founder they read as results. *Fix:* cut them, or redraw as an explicitly conceptual diagram with no axis labels.
- **Contact form inputs have no accessible labels.** `AuditForm.tsx`: 5 inputs, 0 with an `id`; 6 labels, 0 with `for`. Screen readers announce "edit text" with no name. The 9 chip buttons (company size, what to solve) have no `aria-pressed`, so a selected chip is indistinguishable from an unselected one by keyboard. Measured in the DOM at /audit. *Fix:* `id` and `htmlFor` on every pair, `aria-pressed` on the chips, a `fieldset` and `legend` around each chip group.
- **Fake status indicator in the footer.** `Footer.tsx:129` renders a green dot and "Systems operational" on every page. Nothing monitors anything. On a site whose pitch is "everything is logged," a decorative uptime light is the wrong kind of detail to fake. *Fix:* remove.
- **Bare Next.js 404.** No `src/app/not-found.tsx`. A wrong URL on the live site returns the default black page with "404 This page could not be found." No nav, no logo, no way back, chat widget floating over it. Verified live at /nonexistent-xyz. *Fix:* a branded not-found page with the nav and one CTA.

## Minor

- **Measured contrast fails.** "What you get" mono eyebrows in the methodology section (white at 35% on ink) measure 3.18:1 at 12.6px. Demo card captions ("Modeled on portal work...") measure 4.33:1 at 15.8px. Both under 4.5:1. Measured on the rendered page with a canvas-based sampler. Text inside the gradient panels (hero queue, demo shells) could not be sampled by that method; token math says those pairs pass. The handoff doc's "all 40 pairs verified" claim did not catch these two.
- **Demo math does not add up.** Accountability demo: rows show 5/5, 4/5, 3/4 goals (12 of 14, 85.7%) while the header and the agent-drafted summary both say "87%". Sample data, but a CFO will do the arithmetic.
- **Banned vocabulary in live copy.** "leverage" appears in the audit page hero (`audit/page.tsx:65`), the audit tier card (`:167`), the quiz heading (`QuickAssessment.tsx:175`), the quiz result body, and the chat greeting (`TalkToLogan.tsx:17`). "unlock" in the quiz result. Zero em dashes anywhere in `src` or `content` (checked).
- **"Projected ROI" promised as a deliverable** on the Assessment page (`audit/page.tsx:12, 28, 66, 167`). Not in the CLAUDE.md positioning. Either it is a real deliverable and stays, or it is aspirational and goes. Flag for Logan.
- **Two sections say the same thing on /audit.** "How it works" (form, call, assessment) and "How engagements work" (assessment, implementation, partner) are adjacent three-card rows with overlapping content.
- **Reveal system hides below-fold content until hydration.** `.reveal` starts at opacity 0 behind `@media (scripting: enabled)`. Correct for no-JS, but on a slow phone every section below the hero is blank until the bundle runs. The blog post page has its title inside a reveal, so the h1 is invisible until then. Confirmed working once hydrated (headless Chrome, live and local).
- **No security headers on the live response.** No CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, or Permissions-Policy (checked with curl on www.kaleoshq.com). Lives in `next.config.ts`, which is off-limits. Send to Logan.
- **Footer link too small to tap.** "kaleoshq.com" in the footer measures 89x16px at 375px. Everything else clears 40px.

## Nits

- Logo image and chat headshot render with empty `alt` (3 images). Acceptable next to the wordmark text, but the chat avatar should say "Logan Kay".
- Footer X link (`x.com/KaleosHQ`) was not verified to exist. Could not fetch x.com.
- Chat error message and lead error message leak env var names ("RESEND_API_KEY and AIRTABLE_* are unset"). Only reachable with placeholder keys, so local only.
- Blog index title is "Thinking" while the nav never links to it. Fine for SEO, odd if a visitor lands there.
- Quiz subhead "3 questions. 60 seconds." is a claim about the reader's speed. Harmless, but not a fact.
- Skip-to-content link absent. There is a `main` landmark, which covers most of it.

## What works

- Every integration degrades honestly with placeholder keys and posts to the right route with the right field names.
- Focus rings are real (2px teal outline), heading order is sane (h1, h2, h3), the mobile menu is a proper toggle with state, inputs are 16px so iOS does not zoom.
- Reduced motion is handled three times over: a blanket CSS rule, per-component end states, and a live `matchMedia` check in `Reveal.tsx` and `TalkToLogan.tsx`.
- The hero queue settles with exactly one row pending, as designed. The three demos are real state machines, and approving in one updates its numbers.
- No em dashes, no "still learning", no pricing, no autonomous-AI claims. The copy rules held.
- Apex redirects, sitemap, robots, OG image, and per-page titles and descriptions are all present and correct on the live site.

## Carry into the design pass

Trust fixes (quiz stat, charts, status light) and the form labels are cheap and should land in the first checkpoint regardless of direction. The 404 page, the "leverage" sweep, and the contrast tokens get folded into the design pass since they touch surfaces that are being rebuilt anyway.
