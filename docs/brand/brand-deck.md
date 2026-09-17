# KALEOS brand deck

The source of truth for how KALEOS looks, sounds, and positions itself. Update this file as the brand grows; the site, the LinkedIn kit, and the slide deck are derived from it. Version 1.0, September 17, 2026, prepared by Ryan Hazen for Logan Kay.

Every value below is the one the site actually uses. Tokens live in `src/app/globals.css`; if a value changes there, change it here in the same commit.

## 1. Positioning

**One line.** Custom AI solutions for the modern business.

**What KALEOS is.** A premium AI implementation practice. We design and ship custom AI systems for businesses that run on real operations.

**Who it is for.** Founders and executives running companies up to $100M+ in ARR, with workflows that eat senior time and nobody in house to build. Most clients are professional services firms, agencies, and coaching businesses, where the client relationship depends on what goes out the door.

**What makes it different.** A person at the gate. Agents draft, score, and prepare; nothing reaches a client, an inbox, or a ledger without sign-off. Every system is scoped to one number the business can measure, ships inside the tools the team already uses, and is in production within thirty days.

**Proof we lead with.** Founder Logan Kay, who designed and deployed AI systems across admissions and operations at Harvard Business School and is a Claude Corps Fellow at Anthropic. Client quotes appear only once confirmed. Statistics are sourced and linked.

**What we refuse.** A chatbot on a website. An AI that acts with nobody checking. Invented metrics.

**Motto.** AI that answers to you. (Footer, metadata, structured data. Not on social banners.)

## 2. Name

- Written **KALEOS**, all capitals, in running text and in the wordmark. Never "Kaleos HQ" in new material. The legal or former name "Kaleos HQ" may appear in structured data as an alternate name and in existing handles (joinkaleoshq, KaleosHQ).
- Domain: kaleoshq.com. Email: logan@kaleoshq.com.
- Spoken and in the chat: "KALEOS" or "we". Never "tell Logan"; always "tell us".

## 3. The mark

- The K with the pinch: two strokes meet at a point of light, the star. Supplied by Logan as `brand-assets/kaleos-k-source.png`. Site copy at `public/kaleos-k.png` (938 by 1020, white on transparent).
- Always white on black. Black on white is allowed only for print (`brand-assets/kaleos-k-black.png`).
- The star sits at 30.4% from the left and 47.3% from the top of the mark's box. On the site it is lit and pulses; in static material it may be a single small point of light.
- Clear space: half the mark's height on every side. Minimum size: 24 px tall on screen.
- Do not trace, redraw, outline, skew, add a gradient fill, or place the mark on a photo.
- Favicon: black square, white K at 74% of the square. Social logo: same, at 400 and 1024 px.

## 4. Color

| Token | Hex | Use |
| --- | --- | --- |
| void | #050507 | The ground. Every background. |
| void-2 | #0d0d11 | Cards, inputs, the chat panel. |
| star | #f7f7f4 | Primary type, the mark, primary buttons. |
| mist | #9a9aa3 | Secondary type. 6.5:1 on void. |
| ash | #82828b | Labels and captions. 4.9:1 on void. |
| comet | #63d9e6 | Emphasis edge on white letters, source links, the lit station, focus rings. |
| nebula | #8b7cf8 | Second cosmic tint: warp tails, the K halo, one credential phrase. |
| royal | #2b4cff | Selection color and the final call button only. |
| royal-bright | #6d86ff | Hover on royal. |
| amber | #d99a2b | Pending state only. Never decorative. |
| line | white at 12% | Hairlines. |
| line-strong | white at 28% | Input borders, ghost buttons. |

Rules. Black ground everywhere, white type everywhere. Color is an accent on words, edges, and points of light, never a fill behind text. One glint phrase per section. No gradients as backgrounds, except the soft horizon line between sections. Amber means "not yet confirmed" and nothing else.

## 5. Type

| Role | Face | Weight | Notes |
| --- | --- | --- | --- |
| Display and headings | Manrope | 600 to 800 | Tight tracking (-0.02em to -0.03em). Sentence case. No punctuation-split headings. |
| Body | Instrument Sans | 400, 500 | 17 px body, 20 px lead. |
| Labels, sources, captions | Geist Mono | 400 | Uppercase, 0.16 to 0.2em tracking, 11 to 12 px. |
| Wordmark | Manrope | 700 | "KALEOS" uppercase, 0.18 to 0.3em tracking. |

Scale: display clamp(2.75rem, 7.2vw, 7rem); h1 clamp(2.5rem, 6vw, 5.5rem); h2 clamp(2rem, 4.2vw, 3.75rem); h3 clamp(1.375rem, 2vw, 1.875rem); body-lg 1.25rem; body 1.0625rem; caption 0.8125rem.

## 6. Voice

- Plain, direct, warm. Short sentences. Ordinary words.
- Claims are true and checkable. No invented facts, metrics, or client names. Statistics link to a primary source and carry a checked date.
- Never: em dashes, "we're still learning", "intern", "vibe coder", dollar amounts for pricing, autonomous-AI claims, the founder's college major, "revolutionary", "cutting-edge", "seamless", "unlock".
- Always: "premium service", "a person at the gate", "Talk with us" as the call to action, "tell us".
- Headings are sentences, not labels. No eyebrow-then-heading modules; sections flow.

## 7. Motion and the cosmic motif

- One second of warp on every full load of the home page, then the mark settles with its star lit. Every other page opens still.
- Stars are sparse points that drift; one shooting star every 7 to 16 seconds. Never a dense field.
- Scroll motion: headings rise word by word, hairlines draw themselves, stats count up, quotes enter from alternating sides, the hero pulls back into the field.
- Reduced motion turns all of it off and shows the end state. Nothing depends on motion to be understood.
- Emphasis on a phrase is a 0.5 px cyan edge and a faint halo on white letters. Never a hollow outline.

## 8. Layout

- Max content width 88rem. Side padding 1.25rem on phones, 2rem on desktop.
- Sections separate with a soft horizon line, not a hard rule. Alternate left and right. Let stats and quotes break the grid.
- Controls: pill buttons (star on void as primary, ghost as secondary, royal for the final call), 10 px radius inputs, 14 px radius cards.
- Minimum touch target 44 px. Focus ring is comet, 2 px, offset 3 px.

## 9. Assets

| Asset | Path |
| --- | --- |
| Mark, white on transparent | `public/kaleos-k.png` |
| Mark, black | `brand-assets/kaleos-k-black.png` |
| Social logo 400 and 1024 | `docs/linkedin/kaleos-logo-400.png`, `docs/linkedin/kaleos-logo-1024.png` |
| LinkedIn personal banner 1584x396 | `docs/linkedin/linkedin-banner-1584x396.png` |
| LinkedIn company banner 1128x191 | `docs/linkedin/linkedin-banner-1128x191.png` |
| X header 1500x500 | `docs/linkedin/x-banner-1500x500.png` |
| Open Graph image 1200x630 | `public/opengraph-image.png` |
| Favicon and Apple icon | `src/app/icon.png`, `src/app/apple-icon.png` |
| Banner generator | scratch script `brand2.mjs` (Playwright); rerun to regenerate from the tokens above |

## 10. Where the method comes from and what we build with

Shown on the home page as one flowing line: Anthropic, Harvard Business School, OpenAI, Vercel, Next.js, Supabase, Cloudflare, Airtable, Resend. The caption is "Where we learned and what we build with." It is never presented as a client list. Add a name only when it is true of the work.

## Changelog

- 1.0 (September 17, 2026): first version, matching the redesign at tag cp8.
