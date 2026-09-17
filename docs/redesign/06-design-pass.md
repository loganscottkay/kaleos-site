# Design pass and verification: KALEOS v2 (v3 changes noted at the end)

2026-09-17. Ryan Hazen. Local only. Tags cp4-v2 and cp5-elevated on design-overhaul. Nothing pushed.

## Brand as built

Black ground (#050507) and white type (#f7f7f4) everywhere. Secondary text mist (#9a9aa3, 6.5:1). Labels ash (#82828b, 4.9:1). One action color, royal blue, used for the gate ring and the final button only. Cosmic cyan (#63d9e6) as a 1px stroke on one phrase per section; violet (#8b7cf8) as the stroke on numerals. Amber for "pending" only. Syne 700 for headings and the wordmark, Instrument Sans for body, Geist Mono for labels. Pill buttons, 10px inputs, 14px cards. No shadows except the chat launcher. The supplied K artwork, never redrawn.

## What changed in this pass

- Wordmark KALEOS in Syne, wide-tracked on the hero, tightening on scroll.
- Hero: the supplied K with a lit star at the pinch, the four words "Your judgment, at scale." with "at scale." outlined, one button "Talk with us".
- Testimonials paraphrased to their strongest sentence, set in Syne at quote scale, one per row, pending marks kept.
- Systems shipped section cut. Orbit simplified: draws once on enter, marks travel on their own clock, gate halo pulses. Steps as four columns with drawn hairlines and violet-outlined numerals.
- Credentials band, who this is for (premium framing), close with the K low and faint and one blue button.
- About: "What we hold to" as prose with two phrases lifted to white, no numbered grid.
- Assessment, blog, 404 on black. "Tell us", "Send it", "Email us". No "Logan" in any call to action.
- Starfield with a shooting star every 7 to 16 seconds, on the hero, the close, About, and the 404.
- From the elevate list: outlined words fill to white once their section is in view; hairlines draw left to right; the two hero buttons lean toward the pointer.

## Gates

1. **Grayscale.** Hero, orbit, and form captured with `filter: grayscale(1)`. Hierarchy holds: the K, the display line, and the button carry the hero; the ring and gate carry the orbit; labels, inputs, and the one filled button carry the form.
2. **WCAG AA.** Canvas sampler on rendered text, five routes, 272 pairs. One failure found (ash labels at 3.86:1), token lifted to 4.9:1, re-run clean.
3. **Tokens.** Type from the fluid scale, spacing on the Tailwind 4pt scale, radii from three values, one easing, labels consolidated onto `.eyebrow`. Five remaining arbitrary sizes are all for the mono label family at 0.7rem or below.
4. **Consistency.** One `.btn` with three fills, one `.input`, one `.chip`, one `.surface`. Icons: the X mark, the send arrow, the close cross, the FAQ plus. Four glyphs, one stroke weight.
5. **AI-slop audit.**
   - Default fonts: Syne and Instrument Sans, self-hosted, verified loaded in the browser (the first build silently fell back to system fonts because the theme variables referenced themselves; fixed with distinct variable names and `@theme static`).
   - Indigo gradients: none. The one gradient text was replaced with the outline.
   - Icon-card template: no icon cards anywhere. Four numbered columns with drawn rules is the closest thing and carries no icons.
   - Aspirational copy: the hero is four words about the reader's judgment. No "future", "all-in-one", "limitless".
   - Uniform radius: pill for actions, 10px for inputs, 14px for surfaces.
   - Timid shadows and canned motion: one shadow on the launcher; motion is the K settle, the star, the field, the orbit, the signing outlines, the drawn rules.
   - Blobs and orbs: the starfield is the brand's sky, not filler; no gradient blobs.
   - Symmetric grid: 12-column with offset starts on every inner section; the hero is centered on purpose.
   - Stock imagery: Logan's real photo, the supplied K, official Claude mark.
6. **Build, typecheck, lint.** Clean.
7. **Routes and bundle.** All six routes 200, 404 is 404, OG image 200 image/png. Root and main JS chunks 446 KB raw before compression.
8. **Widths.** 320, 390, 768, 1440: no horizontal overflow on any route. Touch targets 40px or more. Mobile menu toggles with aria-expanded.
9. **Reduced motion.** h1 and K at opacity 1, star lit, field hidden, orbit fully drawn, rules drawn, no magnet, Lenis off.
10. **Keyboard.** 20 stops on home and 40 on Assessment, all with a visible focus ring; chat traps and returns focus; FAQ opens on Enter.
11. **Lighthouse on `next start`.** Home desktop 100 / 100 / 96 / 100. Home mobile 94 / 100 / 96 / 100 (LCP 3.1s, CLS 0). Assessment mobile 95 / 100 / 96 / 100. The best-practices hit is the Vercel analytics script 404 off Vercel.

## 20-principle table

| # | Principle | Status | Note |
|---|-----------|--------|------|
| 1 | Oversized hero typography | applied | Four words at 9.5vw under the K |
| 2 | Two-family pairing, strict roles | applied | Syne display, Instrument Sans body, Geist Mono labels |
| 3 | Restrained palette, one accent | applied | Royal blue on two elements per page; cyan and violet are strokes, not fills |
| 4 | Figure-ground contrast | applied | Grayscale captures hold |
| 5 | Consistent spacing scale | applied | Tailwind 4pt scale, section rhythm 24/36 |
| 6 | Asymmetric whitespace | applied | Offset 12-column starts on every inner section |
| 7 | Scale jumps | applied | display, h1, h2, h3, body, caption; no drift sizes |
| 8 | Grid with breaks | applied | Centered hero, K bleeding off the close |
| 9 | Soft gradients for depth | partially applied | Only the hero fade to black and the shooting-star trail; the brand is flat by intent |
| 10 | Layered depth, restrained shadows | applied | One shadow, on the launcher |
| 11 | Tactical glassmorphism | applied | Nav bar blur once scrolled, nowhere else |
| 12 | Purposeful micro-interactions | applied | Signing outlines, drawn rules, gate halo, magnet |
| 13 | Real product thinking | applied | Real clients, real founder, drafts marked as drafts |
| 14 | Single-shot storytelling | applied | One message per section |
| 15 | Premium framing | applied | OG image from the K with the same fonts |
| 16 | Component consistency | applied | One button, input, chip, surface |
| 17 | Cohesive iconography | applied | Four glyphs, one weight |
| 18 | Accessible contrast and sizing | applied | 0 AA failures, 16px inputs, 13px minimum text |
| 19 | Optical alignment | partially applied | Star placed by eye on the pinch; recheck when the real vector lands |
| 20 | Pixel finishing | partially applied | Ryan's phone pass still to come |

## Open before the PR

Same list as 04-build-log.md, plus: the K star position depends on the supplied PNG's exact trim; if the artwork changes, adjust the two percentages in `Hero.tsx`.

## v3 changes (2026-09-17, tag cp6-v3)

Ryan's direction after v2: warp-speed star entry for one second before the hero; hero line "AI systems for the modern company"; headings in Manrope instead of Syne; no outlined words anywhere (cyan now only on numerals, the gate, and the progress line; violet only in the K glow); KALEOS larger in the header; the K glows in a cosmic hue and breathes; headings rise word by word on entry; a reading-progress hairline at the top; testimonials alternate in from left and right; the hero scrubs back into the field on scroll; no headings split by punctuation. Copy re-audited, see 07-copy-audit.md.
