# Build log: full rebuild on design-overhaul

2026-09-16 (late). Ryan Hazen. Local only. Nothing pushed.

## Checkpoints (local tags)

| Tag | Commit | What |
| --- | --- | --- |
| baseline-pre-redesign | 9d545b2 | Untouched site (also on origin) |
| cp1-rebuild | a5a241d | Foundation, home, about, assessment, blog, 404 on the cosmology system |
| cp2-verified | 3c77fcd | Orbit tightened, icons and OG from the K, 320px overflow and focus fixes |
| cp3-timing | (this commit) | Hero entrance timings trimmed for mobile LCP, build log |

Revert: `git checkout <tag>` or `git reset --hard <tag>` on design-overhaul.

## What was built

- Tokens in `src/app/globals.css`: void and paper grounds, star and ink text, mist and slate secondary, royal blue accent (one on dark, one on light, both AA), amber for the pending state only. Fluid type scale. One easing.
- Type: Geist (display and body) and Geist Mono, self-hosted through next/font. Inter, Bricolage, and JetBrains Mono removed.
- Motion: Lenis smooth scroll driven by the GSAP ticker; ScrollTrigger for the orbit draw, the constellation, and the case parallax; CSS for the K assembly, the hero rise, and the reveals. Every effect resolves to its end state under reduced motion (verified with Playwright, reducedMotion: reduce).
- The K: traced as SVG in `brand-assets/k-mark.svg` and `public/k-mark.svg`, rendered by `KMark.tsx`. Favicon, iOS icon, and the Open Graph image are generated from it. Swap the SVG paths when the real vector arrives.
- Home: hero (K assembles, one statement, one button), testimonials from `docs/proof-kit/testimonials.json`, three case frames, orbit method, credentials band, who this is for, constellation close. Dark.
- About, Assessment, Blog, 404: paper. Assessment tiers as one table, deliverables as a numbered spec, FAQ as native details, form with real labels and pressed states and the same POST payload.
- Removed: ApprovalQueue, BuiltToDemo, Card, GateRule, InProduction, QuickAssessment, StrategyGraph, WorkflowDiagram, the three demos, the aurora and grid, the fake status light.

## Verified (with evidence in the session)

- lint, tsc, next build: clean.
- Overflow: none at 320, 390, 768, 1440 on every route (Playwright, scrollWidth == viewport after a full scroll).
- Reveals: every reveal element reaches is-in after scrolling on every route.
- Contrast: 0 failures across 314 measured text and ground pairs on /, /about, /audit, a blog post, and the 404 (canvas sampler, AA thresholds).
- Keyboard: 20 tabbable stops on home in reading order, all with a visible outline; chat opens with focus inside the dialog and Escape returns focus to the launcher; FAQ opens on Enter; form inputs get a royal ring.
- Reduced motion: h1 and K at opacity 1, starfield hidden, orbit fully drawn, all 15 constellation lines visible, Lenis off.
- Lighthouse on `next start`: home desktop 100 / 100 / 96 / 100; home mobile 90 / 100 / 96 / 100 (LCP 3.4s, CLS 0); assessment mobile 96 / 100 / 96 / 100. The only best-practices hit is a console 404 for the Vercel analytics script, which does not exist off Vercel.
- Copy: zero em dashes in src; no banned vocabulary in rendered strings; the only dollar figures are the $2M to $100M audience range that was already on the site.

## Open before the PR

1. Testimonials render drafts with an amber "Pending confirmation" mark. Set `SHOW_DRAFTS` to false in `Testimonials.tsx` before merge, or ship only after Logan flips entries to confirmed.
2. "Incoming, Anthropic" appears in the hero, the credentials band, and About. Ryan confirmed it is true. Logan should approve the wording.
3. The Assessment deliverable formerly called "ROI projections" now reads "roadmap for the first system, with the number it is expected to move." Logan should confirm.
4. The K paths are a trace. Replace with the real vector if one exists, then regenerate icon.png, apple-icon.png, and opengraph-image.png (script in the session scratchpad, `pw/icons.mjs`).
5. Cogniify has no usable logo; the card shows the name only.
6. Security headers still absent (next.config.ts is off limits). Send to Logan.

## cp8, September 17, 2026

- Warp rebuilt as a depth field: stars projected from z toward the camera, speed ramps in over 350 ms, holds, then drops out with a short bloom while the overlay fades and the stars settle. Moved out of the hero's stacking context so it covers the header; the header fades in after the drop.
- Logo band under the hero: one flowing line (simple-icons marks, CC0), pauses on hover, wraps under reduced motion. Caption "Where we learned and what we build with".
- Contact form on the Assessment page in one card: three fields on a row, sentence-case labels, smaller chips, "Team size", shorter intro.
- Terms page at `/terms`, linked in the footer. Stats section carries a checked date. `scroll-padding-top` for focus not obscured. Chat mailto subject now KALEOS.
- LinkedIn and X banners regenerated inside each platform's safe zone, no motto, small mark instead of the large K.
- Brand deck at `docs/brand/brand-deck.md` (source of truth) and a slide version published privately.
- Root overflow clipped horizontally (the hidden reveal-right state was widening the page by 8 px on phones).

## cp9, September 17, 2026: mobile Safari pass

- Ran every route through Playwright's WebKit engine as iPhone 14 and iPhone SE over the LAN address. Two real defects found and fixed:
  - The hero K did not paint in mobile WebKit under the animated double drop-shadow filter. The halo is now a gradient layer behind the mark (`.k-glow::before`), and the orbit core's halo is an SVG radial gradient. No image carries a filter any more.
  - The dev server does not hydrate when opened from a LAN address (Next 16 blocks cross-origin dev assets unless `allowedDevOrigins` is set, and `next.config.ts` is off-limits). Phone previews now run on the production build (`next start -H 0.0.0.0`).
- Fail-safe: the warp overlay clears itself by CSS after 2.5 s even if the script never finishes.
- Touch targets: chips grow to 44 px on coarse pointers, footer and source links get vertical padding.
- Verified on both phones: menu opens, every reveal fires on scroll, chat opens, form validates and submits, no horizontal overflow, no page errors. The only console 404 is Vercel's analytics script, which does not exist off Vercel.

## cp10, September 17, 2026: supernova, solid K, award

- Supernova light added as two tokens (nova rose, ember gold) used only as light: the K halo, warp tails, a few tinted stars and the shooting star, the horizon line between sections, and a bloom behind the close. Kept out of type, buttons, forms, header, footer, legal pages, About, and the testimonials.
- Hero mark is now a solid: eight layers of the full-resolution artwork (unoptimized) a pixel apart, swaying in 3D between -34 and 34 degrees so the mark never reads mirrored or edge-on. The small star at the pinch is gone.
- Warp hands off early (at 86%) and the overlay fades over 1.1 s while the stars ease off; no flash.
- Logo band caption removed. Testimonials carry no pending marker; Advisor Solutions carries a "KALEOS Award 2026" ribbon, wording pending Logan (FOR-LOGAN 2a).

## cp11, September 17, 2026: type, cursor, nebula

- Monospace dropped site-wide; labels use Instrument Sans small and tracked. Award is a quiet pill in the body face.
- Hero headline: "Custom" cycles through the supernova gradient, "modern business" is chrome with a sheen that glints every seven seconds. Both static under reduced motion.
- Cursor on fine pointers: a 6 px dot on the true pointer and a 34 px ring a beat behind, growing and turning cyan over anything pressable, stepping aside over text fields. Off on touch and reduced motion.
- Nebula haze drifting behind the hero field; the orbit ring carries a supernova gradient stroke.
- The close uses a Hubble photograph of the Crab Nebula (NASA and ESA), graded into the palette with PIL, 166 KB webp, credited on the section and in the terms. The translucent K and the drawn bloom are gone.
- About: "Data Science and Hospitality at Boston University" per Ryan; conflicts with Logan's no-major rule, flagged as FOR-LOGAN 16.

## cp12, September 17, 2026: back to white, etched AI, nebula K

- Hero words back to plain white. "AI" carries a laser-etched ember edge that cuts in over 2.6 s after the warp, then cools to a faint line.
- Crab Nebula photo removed, credit lines removed. Behind the close, the mark itself is filled with a slow, saturated nebula gradient (CSS mask of the K artwork). On phones it sits below the buttons.
- Hero haze removed: the only colored light on the home page is the halo behind the K.
- About: "Studied: Boston University", no major.
- Rule audit against Logan's constraints (see the report in the chat and FOR-LOGAN): protected paths untouched, endpoints and field names unchanged, no em dashes, no banned words, no dollar pricing. Open judgment calls: "$100M+ in ARR" (audience sizing, Ryan's wording), the Anthropic credential, the award, "Every action is logged".

## cp13, September 17, 2026: edges, chrome, arc, scroll pieces, critic

- Etch burns only the outer edge of "AI": the fill is white from the first frame, the stroke starts wide and hot and cools.
- "modern business" turns to chrome under the pointer: a horizon-style metal (sky light, hard glint line, dark ground) painted under the letters at all times, revealed by fading the white fill, with a specular band that follows the pointer. Fades back when the pointer leaves.
- The band of names is now an orbit: each mark crosses a wide arc like a satellite over a horizon (CSS motion path), two lanes on phones. The 3D ring tried first broke in mobile WebKit and rendered artifacts in Chrome, so it was dropped.
- Scroll pieces: horizons draw themselves as sections arrive (scroll-driven animation where supported), a lit planetary rim above the testimonials whose light travels with the scroll, a comet crossing "Who we work with", parallax on the stat numerals and the nebula K. All scrubbed to the scroll, off under reduced motion.
- Award tag is magenta.
- Warp made unbreakable: any exception inside the frame loop ends the intro cleanly, and a hard timer guarantees the page is released. Found by the critic pass: an intermittent non-finite canvas gradient in Chrome killed the loop and left the hero hidden.

## cp14, September 17, 2026: real sky, real chrome, brand across pages

- Hero field: a NASA photograph of the night sky (Kennedy Space Center shoreline, public domain), cooled and darkened, under the mark. The real-catalog map (3,000 Yale Bright Star Catalog stars, stereographic, drifting) is the alternative behind the SKY constant in Hero.tsx; both tested.
- Chrome: studio environment texture mapped onto "modern business" plus an SVG specular bevel whose light follows the pointer. Reads as liquid metal, fades in and out with the pointer.
- The three KALEOS lines in the stats carry a magenta halo and the mark. The Anthropic credential glows ember.
- Etch spans "AI solutions". "YOUR BUSINESS" removed from the orbit. Close: Talk with us plus Send us a note (to the form); Email us removed.
- Assessment and About pages: sparse starfield behind the hero, a glint phrase in the h1, a comet across one section, the rim above the closing section, the light-edged card on the form and the portrait.
