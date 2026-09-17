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
