# V2 Baseline Audit
Date: 2026-07-11 · Branch: v2/full-rebuild · Next.js 16.1.6 (Turbopack)

## Build
`npm run build` passes clean. One Node deprecation warning (module.register, not ours). 17 static pages generated.

## Lighthouse (production, before)
Saved to audits/lighthouse-before.json.

| Category | Score |
|---|---|
| Performance | 36 |
| Accessibility | 96 |
| Best Practices | 100 |
| SEO | 100 |

Key metrics: LCP 12.8s, CLS 0, TBT 2,260ms. The performance problem is the full-res Unsplash hero (2070px) loaded as a CSS background on every page, plus heavy client JS. Session 3 must fix this.

## Route tree
- `/` src/app/page.tsx (home)
- `/audit` src/app/audit/page.tsx (assessment + form + pricing grid + FAQ)
- `/about` src/app/about/page.tsx
- `/blog`, `/blog/[slug]` (6 posts via src/lib/blog.ts + gray-matter/remark)
- `/api/chat` (OpenAI proxy, logs to Supabase, system prompt contains dollar pricing)
- `/api/newsletter` (Supabase upsert)
- `sitemap.ts` exists (www URLs). robots.txt exists. Both live in production (apex 307-redirects to www).

## Supabase references (all must go, Session 1)
- src/lib/supabase.ts (client)
- src/components/AuditForm.tsx (leads insert)
- src/components/QuickAssessment.tsx (quiz_responses insert)
- src/app/api/newsletter/route.ts (entire route)
- src/app/api/chat/route.ts (chat session logging)
- package.json @supabase/supabase-js

## Pricing renders (all must go, Session 1)
- src/app/audit/page.tsx Engagement Tiers grid: $5,000+, $6,500/mo, $15,000/mo
- src/app/api/chat/route.ts system prompt: same three dollar figures
- FAQ has one tier-adjacent answer ("which tier is right") to soften in Session 2

## Newsletter/blog surface (cut from nav, Session 1)
- src/components/NewsletterSignup.tsx rendered on home, /audit, /about (also opens Beehiiv)
- Blog link in src/components/NavBar.tsx
- /blog routes stay deployed, unlinked

## Component inventory (Sessions 2-4 touch points)
- Hero byline with HBS credential: src/app/page.tsx line ~126
- AuthorityTimeline.tsx: HBS-to-Kaleos timeline (HBS as lead credential, rebalance in S2)
- BuiltToDemo.tsx: three fake-live demos, intro says "These aren't mockups" (S2 copy fix, S4 full rebuild). PerformanceMonitor counts up from $0.0M (zero-state violation per S4 rules)
- DemoFrame.tsx: "Kaleos Operator" lead-scoring loop (evolves into AI Outreach Engine, S4)
- QuickAssessment.tsx: 3-question quiz, ends at Calendly (keep, S5 wires prefill)
- StickyCTA.tsx ("Book a Call"), TalkToLogan.jsx floating chat, bottom CTAs with three different labels: funnel consolidation in S5
- Design tokens live in globals.css (386 lines) + inline Tailwind: navy #1B2A4A, teal #0d9488, Playfair/Inter, glassmorphism, mountain hero. Reads as template-adjacent (S3)

## Watch-outs
- Em dash found in DemoFrame copy ("Revenue Operations — High-value fit"): fix in S2/S4
- /audit metadata already says "Strategic AI Assessment"; nav still says "Audit" (S2 rename)
- layout.tsx has Organization JSON-LD; S5 upgrades to ProfessionalService + Person
- Chat header says "AI & Ops @ HBS" (S2 rebalance)
