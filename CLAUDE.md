# Kaleos HQ Website — kaleoshq.com

AI Skill Deployment Agency. Owner: Logan Kay. The brand is "Kaleos HQ" in all
client-facing copy (the domain stays kaleoshq.com).

## What Kaleos HQ Does
Builds AI systems that automate repetitive business work for small businesses
(10-50 employees), professional services firms, marketing/creative agencies,
and consulting firms. Scoped to specific workflows, trained on actual client
documents and processes.

## Positioning (v2, shipped 2026-07-11)
- Agentic AI implementation and applied AI consulting. Agents do the work,
  humans make the calls, everything is logged.
- No dollar pricing anywhere on the site. All pricing routes to a Calendly
  discovery call. One CTA label sitewide: "Book a Discovery Call".
- Blog routes stay live but unlinked from nav (no 404s, no lost indexing).
- Firm framing, not solo. HBS is a first-class credential: Logan designed and
  deployed AI systems across admissions and operations at Harvard Business
  School, which is where the implementation methodology comes from.

## Deploy Policy (this repo only)
- Commit and push freely here. Auto-deploy is the feature.
- git push origin main triggers the Vercel production deploy.
- This overrides the global "never push unless asked" rule for this repo ONLY.

## Brand Voice
- Casual, direct, confident. Like explaining over coffee.
- No corporate jargon, no buzzwords, no em dashes anywhere.
- NEVER say "we're still learning" or anything that undermines confidence.
- Specific over vague. Say what we'd actually do, not abstract promises.
- No bullet points in conversational content.

## Hard Rules (client-facing copy)
1. NEVER say "we're still learning" in client-facing content.
2. Human approval messaging on everything.
3. No autonomous AI claims.
4. No em dashes in any copy.
5. No founding rate or discount pricing in public content. Discounts are
   offered privately on calls only.
6. NEVER use "vibe coder" in client-facing material.
7. NEVER say "intern" when referencing HBS work.
8. Don't mention college major unless specifically asked.
9. No dollar amounts for engagements anywhere on the site (demo sample data
   may show dollar figures; engagement pricing may not).

## Monetization
- AI Ops Audit: $1,500
- Custom AI System Builds: $5K-$10K
- Ongoing Retainer: $3K-$7K/month
- These are private numbers. The site never shows them (see Hard Rule 9).

## About Logan (for site copy)
- Founder & CEO of Kaleos HQ.
- Studied hospitality, data science, and developed deep expertise in AI/LLM tools at Boston University.
- Designed and deployed AI systems across admissions and operations at Harvard Business School.
- Previously did fraud detection at K2 Integrity analyzing 2M+ financial transactions.
- Deep expertise in using AI tools and APIs to build agentic software.

## Tech Stack
- Framework: Next.js App Router + Tailwind CSS
- Lead capture: POST /api/lead → Resend email (from leads@kaleoshq.com, domain
  verified) + Airtable base "Kaleos HQ Leads" (app2nMechK71eO2rr), table Leads
- Env vars (Vercel + .env.local): RESEND_API_KEY, AIRTABLE_API_KEY,
  AIRTABLE_BASE_ID, OPENAI_API_KEY
- Supabase: REMOVED in v2. Zero references. The old project may still exist in
  the dashboard pending Logan's export-and-delete.
- Hosting: Vercel (auto-deploys from GitHub push to main), Vercel Analytics on
- Domain: kaleoshq.com (Namecheap). Canonical host is https://www.kaleoshq.com
  (apex 307-redirects to www)
- Email: Google Workspace (logan@kaleoshq.com)
- Chatbot: OpenAI GPT-4o via /api/chat route

## Project Structure
- src/app/page.tsx — Homepage
- src/app/audit/page.tsx — Assessment page (nav label "Assessment") with intake form
- src/app/about/page.tsx — About page
- src/app/blog/ — Blog posts (live, unlinked from nav)
- src/app/api/lead/route.ts — Lead form backend (Resend + Airtable)
- src/app/api/chat/route.ts — OpenAI proxy for chatbot
- src/app/robots.ts, src/app/sitemap.ts — SEO layer
- src/lib/rate-limit.ts — shared in-memory rate limiter for both API routes
- src/components/GateFlow.tsx, GateRule.tsx — approval-gate signature motif
- src/components/demos/ — three interactive demos (ClientPortal, Accountability, Outreach) + shared GateAction
- src/components/TalkToLogan.jsx — AI chatbot widget
- src/components/NavBar.tsx — Nav with K logo + Kaleos HQ wordmark + CTA
- src/components/AuditForm.tsx — Lead capture form (posts to /api/lead)
- public/photo.png — Logan's headshot
- public/kaleos-logo.png — K logo mark
- audits/ — baseline + design decisions + Lighthouse snapshots
- docs/, reviews/ — preship report and code-review artifacts

## Design System ("Machined Graphite", applied 2026-07-11)
- Tokens (globals.css @theme): ink #10161E, navy #1F2A3C, accent teal #0D9488,
  amber #B45309 (pending states only), paper #EDF0F4, mist #93A5BE
- Typography: Bricolage Grotesque (display, via next/font var --font-display),
  Inter (body), JetBrains Mono (system labels, .font-system)
- Signature element: the approval gate (GateRule dividers, hero GateFlow
  moment, GateChip in demos). Keep it; it is the brand motif.
- Solid cards, no glassmorphism, no photo backgrounds. Sentence-case headings;
  uppercase only for small mono eyebrow labels.
- Motion budget: the hero gate animation is the one orchestrated moment.
  prefers-reduced-motion is respected everywhere; keep it that way.
- Above-the-fold content must paint without JS (CSS hero-rise entrances, not
  JS-gated AnimateIn) or Lighthouse LCP craters.

## Chatbot (Talk to Logan)
- Floating button bottom-right on every page with Logan's photo
- Opens dark chat panel; system prompt speaks as Logan's assistant
- After 3 exchanges shows CTAs: Book a Discovery Call (Calendly) + Email me directly
- Strict input validation: user/assistant roles only, 4k char cap, 30 messages max
- Easter egg: "chungus aioli" returns "Congratulations you have unlocked mollick doing tricks on it"

## Commands
- npm run dev — local dev
- npm run build — production build
- npm run lint / npx tsc --noEmit — validation floor (no test suite yet)
- git push origin main — triggers Vercel production deploy
