# KALEOS-SITE-V2-RUNBOOK.md
**Version 1.0 · July 2026 · kaleoshq.com redesign**

Run each session in Claude Code from the repo root. One session, one branch, one deploy preview, then merge. Do not start a session until the previous one is merged and verified on production.

---

## Standing decisions (do not relitigate mid-build)

- **Positioning:** Agentic AI implementation and applied AI consulting. Companies want AI, it stays an idea, Kaleos is the implementation partner. Human-in-the-loop is the trust mechanism, not a buzzword.
- **Pricing:** No dollar amounts anywhere on the site. All pricing routes to "book a call."
- **Blog/newsletter:** Cut from nav and footer. Post URLs stay live but unlinked (no 404s, no lost indexing).
- **Form backend:** Supabase is out. Vercel API route → Resend email notification + Airtable "Leads" row.
- **Demos:** Three interactive demos modeled on real shipped work, rendered as fully generic industries. No client names, no identifiable verticals.
- **Primary CTA:** One action sitewide: book a discovery call (Calendly). The inquiry form is the fallback, not a peer.
- **Ads:** Not yet. Revisit after this runbook ships and the funnel has 2 to 4 weeks of clean analytics.

## Voice rules (apply to every line of copy)

- Direct, confident, plain verbs. No corporate jargon.
- **No em dashes. Ever.** Commas, periods, colons.
- No AI-tell phrases: no "unlock," "seamless," "supercharge," "in today's fast-paced world," no rhetorical triads for their own sake.
- Specific beats clever. "Nothing sends without your approval" beats "empowering human oversight."
- Keep the existing hook: "AI doesn't fail because of the technology. It fails because of the implementation." It stays the hero.

---

## Session 0 · Setup and baseline audit

```bash
cd ~/Developer   # or wherever the repo lives
git checkout main && git pull
git checkout -b v2/session-0-audit
npm install
npx vercel link
npx vercel env pull .env.local
npm run dev
```

Baseline audit tasks for Claude Code:
1. `npm run build` and log every warning/error.
2. Map the route tree: every page, every component, where pricing renders, where Supabase is imported (`grep -ri supabase app/ components/ lib/`), where the newsletter form lives.
3. Run Lighthouse against production, save scores as the "before" snapshot: `npx lighthouse https://kaleoshq.com --output=json --output-path=./audits/lighthouse-before.json`
4. Check `curl -s https://kaleoshq.com/sitemap.xml` and `/robots.txt`. Note what's missing.
5. Write findings to `audits/V2-BASELINE.md` and commit.

**Done when:** baseline doc exists, you know every file that Sessions 1 to 5 will touch.

---

## Session 1 · Plumbing: kill Supabase, strip pricing, cut blog

Branch: `v2/session-1-plumbing`

### 1A. New form backend
- Create `app/api/lead/route.ts` (POST): validates payload, sends notification email via Resend to logan@kaleoshq.com, creates a record in Airtable base `Kaleos Leads`, table `Leads` (fields: Name, Email, Company, Company Size, Looking To Solve, Desired Outcome, Source Page, Submitted At).
- `npm install resend airtable`
- Env vars (add in Vercel + `.env.local`): `RESEND_API_KEY`, `AIRTABLE_API_KEY`, `AIRTABLE_BASE_ID`.
- Manual pre-step for Logan, outside Claude Code:
  1. resend.com → create API key → Domains → add kaleoshq.com → add the SPF/DKIM DNS records where your DNS lives (Vercel or registrar). Until verified, send from `onboarding@resend.dev` so nothing blocks the build.
  2. Airtable → create `Kaleos Leads` base with the fields above → create a personal access token scoped to that base.
- Point the /audit inquiry form at the new route. Add success and error states that follow the voice rules (errors say what happened and what to do, no apologies).
- Remove every Supabase import, client, and env var from the codebase. Delete the dependency.

### 1B. Strip pricing
- Remove the entire Engagement Tiers pricing grid from /audit. Replace with a short section: engagements are scoped per business, three tiers exist (Assessment, Implementation, Strategic Partner) described by what they deliver, no numbers, each pointing to the Calendly CTA.
- `grep -rn "5,000\|6,500\|15,000\|\\$" app/ components/` and confirm zero pricing remains. (The demo dashboards may legitimately show dollar figures as sample data. That's fine. Engagement pricing is not.)

### 1C. Cut blog and newsletter
- Remove Blog from the nav. Remove every newsletter subscribe block (homepage footer, /audit footer, anywhere else).
- Leave `/blog` and `/blog/*` routes deployed but unlinked. Add them to a `noindex` list OR leave indexed; either is fine, just don't 404 them.
- Remove any newsletter-related backend code.

**Done when:** form submission lands in your inbox and Airtable within seconds, Supabase has zero references, no dollar amounts on engagement pages, blog is invisible from nav, `npm run build` clean. Then in Supabase dashboard: delete the frozen project (nothing depends on it anymore).

---

## Session 2 · Positioning and copy rewrite

Branch: `v2/session-2-copy`

Rewrite copy across Home, /audit, /about with the standing decisions and voice rules. Specific moves:

1. **Hero:** keep the headline. Change the byline. Drop "AI & Operations @ Harvard Business School" from the hero. New byline direction: "Logan Kay · Founder, Kaleos · Agentic AI systems, built and deployed" (Claude Code proposes 3 options, Logan picks).
2. **Vocabulary shift:** work "agentic AI implementation" and "applied AI consulting" into the H2s and meta descriptions naturally. Frame it as: agents do the work, humans make the calls, everything is logged. The existing Approval Gate / Audit Log architecture diagram already tells this story, so the copy should name it.
3. **The core narrative,** stated plainly somewhere above the fold: everyone wants AI, it stays a slide deck, it never gets implemented right, that's the gap Kaleos fills.
4. **HBS rebalance:** HBS moves from lead credential to supporting proof. New lead credential: shipped production systems. Add a "What we've built" or "In production" section: 3 short anonymized entries written as capability proof, e.g. "A multi-tenant coaching and accountability platform for a professional services firm, live in production with full data isolation and human-approval workflows." "A client-facing project portal for a contracting business." "An AI outreach and lead-qualification engine with approval gates on every send." No names, no logos, no industries narrower than "professional services" / "contracting" / generic.
5. **/about:** shift from "I helped spearhead AI at HBS" as the opener to founder-operator framing: builds and personally delivers every system, runs his own business on the same architecture. HBS becomes one line in Background.
6. **/audit page:** rename nav label from "Audit" to "Assessment" (matches the page's own language and reads less like a website audit tool). Keep the 3-step How It Works. FAQ: update the pricing-adjacent answers so nothing implies published rates.
7. **Fix the credibility crack:** the "Built to Demonstrate" intro currently says "These aren't mockups." Session 4 rebuilds the demos; this session rewrites that section intro to set up the new ones: these are working systems modeled on what Kaleos ships for clients.

**Done when:** Logan has read every page out loud and it sounds like him. Zero em dashes (`grep -rn "—" app/ components/` returns only code, not copy).

---

## Session 3 · Design elevation

Branch: `v2/session-3-design`

Goal: "incredible and very established," not a template. Process, in order:

1. Screenshot the current production pages (Claude in Chrome or manual). Write a one-paragraph critique of the current visual identity: what reads as established, what reads as template.
2. Propose a compact token system before touching code: 4 to 6 named hex values, a display face + body face pairing chosen for this brand (not defaults), spacing scale, and **one signature element** the site will be remembered by. Candidate signature: the approval-gate motif, since human-in-the-loop is the entire brand; e.g. a recurring visual language where content "passes through" a gate/checkpoint treatment. Claude Code proposes 2 to 3 directions with quick mocks, Logan picks one.
3. Guardrails: avoid the current AI-design clichés (cream background + serif + terracotta accent, near-black + single acid accent, fake-broadsheet hairlines). If the current site already lives near one of these, that's the strongest argument for the refresh.
4. Execute the chosen direction across all pages. Restraint everywhere except the signature. Responsive to mobile, visible keyboard focus, `prefers-reduced-motion` respected.
5. Motion budget: one orchestrated moment (likely the hero or the architecture diagram animating the flow from input → agent → approval gate → output). No scattered scroll effects.

**Done when:** side-by-side before/after screenshots, Logan signs off, Lighthouse performance did not regress.

---

## Session 4 · Rebuild the three live demos

Branch: `v2/session-4-demos`

Replace Document Processor / Decision Engine / Performance Monitor with three demos modeled on real delivered work, fully generic:

1. **Client Operations Portal** (modeled on portal work). A services company's client logs in, sees project status, milestones, documents, and messages. Demo shows the operator side: a status update drafted by the agent, sitting at an approval gate, one click to publish to the client view.
2. **Performance & Accountability Platform** (modeled on the coaching platform). Multi-user view: activity streaks, goal tracking, a weekly summary the agent generated, awaiting review before it goes to the team.
3. **AI Outreach Engine** (modeled on the outreach system). Lead comes in, gets scored and qualified, a personalized draft appears, and the approve/edit/reject gate is the hero interaction. Evolve the existing "Kaleos Operator" widget into this.

Hard requirements:
- **No zeroed metrics, ever.** Every number is seeded with plausible sample data on first paint, then animates. If an animation counts up, it starts from a real-looking value, not $0.0M.
- Each demo is interactive: the visitor can click approve/edit and watch the system respond. The approval gate is the shared motif across all three (ties into the Session 3 signature).
- Label honestly: "Working demo, modeled on systems Kaleos has deployed. Sample data."
- Performance: lazy-load below the fold, no layout shift, works on mobile.

**Done when:** all three run smoothly on a mid phone, nothing ever displays a zero-state, each demo maps to a line in the "In production" section from Session 2.

---

## Session 5 · SEO, funnel, and launch QA

Branch: `v2/session-5-seo-launch`

### SEO layer
- `app/sitemap.ts` and `app/robots.ts` (Next.js native). Submit sitemap in Google Search Console.
- JSON-LD: `ProfessionalService` schema on the homepage (name, founder, areaServed, sameAs → X profile), `Person` schema on /about.
- Refresh all metadata for the new positioning: titles and descriptions should carry "agentic AI implementation" and "applied AI consulting" naturally. Unique title/description per page.
- OG image: regenerate to match the new design system.
- Verify every page is fully server-rendered: `curl -s https://kaleoshq.com | grep "implementation"` returns content.

### Funnel consolidation
- One primary CTA everywhere: "Book a Discovery Call" → Calendly. Same label, same style, on every page.
- The floating "Talk to Logan" widget either becomes that same CTA or gets removed. Two competing chat-ish elements is one too many.
- The 3-question interactive quiz on the homepage ends at the Calendly CTA, prefilled context if Calendly supports it.
- Add lightweight analytics if not present (Vercel Analytics is zero-config) so the ads decision later is data-backed.

### Launch QA
- Run the kaleos-toolkit `preship` skill.
- Full click-through of every page and every demo on desktop + phone.
- Submit the form for real, confirm inbox + Airtable.
- Lighthouse after-snapshot vs. Session 0 baseline: performance ≥ before, SEO score ≥ 95.
- Merge, deploy, spot-check production, then check Search Console over the following week for indexing of the new metadata.

---

## Parked for later (do not build now)

- Meta/Google Ads. Requires: this runbook shipped, analytics collecting, and probably a dedicated landing page per campaign.
- Blog revival. If it comes back, it comes back with a realistic cadence and no "weekly" promises.
- Case studies with client permission. When Dan/Steve/Alex engagements mature, named case studies beat generic demos. Revisit in the fall.
