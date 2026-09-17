# Full rework plan: Kaleos HQ

2026-09-16. Ryan Hazen. Supersedes the "elevate existing" framing in 00-intake-brief.md. This is a rebuild of everything the visitor sees, on branch design-overhaul, built privately and pushed only when Ryan says.

## Direction lock

**Theme: cosmology.** Motion under law. Orbits, gravity, one point of decision. The K is the mark. Black and white carry the brand. One accent, royal blue, used at most three times per page. Other cosmos tones (a faint nebula tint, star-white, one amber for the pending state) appear only where a function needs them.

**Light and dark.** Home is the night sky: black ground, white type, the product lit inside it. Inner pages (About, Assessment, Blog) are paper: white ground, black type. The K crosses both. This is the working assumption. Ryan can flip it after the mockups.

**Type.** Wordmark and display in a thin modern grotesk. Three candidates to test on the wordmark in the mockups, all free and self-hostable: Geist Light, Satoshi Light, General Sans Light. Body in the same family at regular weight. Mono for labels and the log: Geist Mono or Martian Mono. Inter, Roboto, and JetBrains Mono are out.

**Motion stack.** Lenis for smooth scroll. GSAP with ScrollTrigger for scroll choreography. SVG plus GSAP for the K assembly and the orbit line. Three.js only if the hero starfield needs a shader, lazy-loaded, with a static fallback. Every effect resolves to its end state under reduced motion. Nothing above the fold waits on JavaScript.

**Interactivity.** Less. The scroll is the product. The three working demos collapse into one visual proof object. The quiz goes unless a reason to keep it appears. The chat widget stays (it is a lead channel and posts to an API route we do not touch) but gets quiet.

**Reference sites checked today** (by fetching their code, not by eye): tenex.co runs Rive animations. anduril.com runs Lenis smooth scroll plus WebGL on black with Helvetica Now. harvey.ai and sierra.ai run Rive on restrained palettes. mercury.com runs GSAP. The two closest to "motion plus professional" for this brand are anduril.com and harvey.ai. Ryan should look at both and say which is closer.

## Credibility, what is allowed

- Harvard Business School: documented in the repo. Logan designed and deployed AI systems across admissions and operations there. Text only, no shield in a client row.
- Built with Claude: allowed as a tooling statement with the official mark. Never "partner."
- "Incoming at Anthropic": not in any document in the repo. Needs Logan's exact wording and permission before it goes on the site. Until then the site says nothing about Anthropic beyond "built with Claude."
- Client testimonials: three drafts in docs/proof-kit, all needs_confirmation. Section gets designed with them as placeholder text and ships only with confirmed entries. Logos only with confirmation.
- No dollar amounts, no autonomous-AI claims, no "still learning," no invented numbers.

## Site map

| Route | Purpose | Sections, in order |
| --- | --- | --- |
| / | Land, believe, book | K and statement (one CTA). Testimonials, three, with client marks when confirmed. Systems shipped, three full-frame cases. How the work goes, one orbit diagram. Credentials line (HBS, built with Claude, Anthropic pending). Who this is for, with the honest decline. Final call. |
| /about | Logan and the firm | Portrait set editorially. Background as a plain list. Method in prose. |
| /audit | Assessment and the form | Deliverables as a numbered spec. Engagement tiers as one table. FAQ. Form, restyled, same field names, same POST. Route stays /audit for SEO, nav label Assessment. |
| /blog, /blog/[slug] | Live, unlinked | Restyle to the paper system, nothing more. |
| 404 | Recovery | Branded, nav present, one CTA. |

Killed from the current site: the implementation-gap cards, the three-card "systems" grid, the workflow diagram, the three interactive demos as separate cards, the quiz, the two About charts, the "How it works" row on /audit, the "Systems operational" footer light, the aurora and grid backgrounds.

## Ideas from 02-elevate.md carried in

Default set, cosmology-fit: 1 (the headline is the building), 2 (one orbit through the page), 5 (proof at planetary scale), 6 (the K arrives in two pieces), 9 (the constellation is the K). Held back: 3, 7, 8, 10. Ryan can swap any.

## Phases and checkpoints

Everything local. Each checkpoint is a commit plus a tag. No push until Ryan says "push."

0. **Inputs from Ryan.** K mark as SVG (or the largest PNG). Wordmark text: "Kaleos" or "Kaleos HQ." Anthropic line: confirmed wording from Logan, or dropped. Which reference site is closer, anduril or harvey. Confirm or flip dark-home, light-inner.
1. **Mockups.** Two standalone HTML pages of the homepage hero plus one proof section, outside the Next.js build, in docs/redesign/mockups/. Concept A: night sky. Concept B: paper and ink. Each shows the three wordmark fonts side by side. Ryan reviews in his browser and on his phone. Gate: pick one or mix.
2. **Foundation.** Design tokens in globals.css (color, type scale, spacing, radius, motion durations and easing). Fonts self-hosted through next/font. Lenis and GSAP wired with the reduced-motion guard. Nav, footer, 404, page shell. Favicon and apple icon from the K. Tag `cp1-foundation`.
3. **Home.** Built section by section against the chosen mockup. Tag after each: `cp2-hero`, `cp3-proof`, `cp4-cases`, `cp5-method`, `cp6-close`.
4. **Inner pages.** About, Assessment, Blog on the paper system. Tag `cp7-inner`.
5. **Critique fixes folded in.** Form labels and pressed states, contrast tokens, 404, the "leverage" sweep, demo math. Most vanish with the sections they lived in.
6. **Copy pass.** Full rewrite within known facts. Every rendered string through the humanizer. Tag `cp8-copy`.
7. **Full mobile pass.** Every route at 320, 375, 390, 768 in the browser pane, then on Ryan's phone. Overflow, tap targets, type scale, motion cost. Tag `cp9-mobile`.
8. **Share-readiness.** Title and description per page, OG image generated from the K on black, favicon, semantic structure. Verified against rendered tags.
9. **Verification.** Lint, tsc, production build. Lighthouse against `next start` locally. Contrast measured on rendered pages. Keyboard and screen-reader pass on the orbit, the K assembly, and the proof frames as named items. The AI-slop audit and the 20-principle table as hard gates.
10. **Reveal.** Ryan says push. Vercel preview appears. Ryan reviews on his phone. Iterate. Ryan shows Logan. PR from design-overhaul into main when Ryan says so.

## Revert path

`baseline-pre-redesign` on 9d545b2 restores the untouched site. Every checkpoint tag restores that checkpoint. Local commits can be reset to any of them. Nothing reaches Logan until phase 10.

## Rough effort

Mockups: one session. Foundation and home: two to three sessions. Inner pages: one to two. Copy, mobile, share-readiness, verification: two. Ten sessions is the honest range if every gate clears first time.
