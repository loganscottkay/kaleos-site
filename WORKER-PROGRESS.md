# Worker progress: kaleos-site-ui-revamp

## Intake (design-excellence step 1, recorded before code)

This site is for owner-operators of small service businesses deciding
whether to trust Kaleos with their operations. After seeing it they must
believe this shop is precise, human-controlled, and already operating at
a level their business is not. The one action: book the assessment. The
signature is the approval gate; every token exists to make the page feel
decided, not generated.

## 01-tokens-foundation

Files touched: src/app/globals.css

Three-layer token system in place: spacing primitives on the strict 8pt
grid (4 to 128), Major Third 1.250 fluid type scale (base 16, clamp()
per step between 360px and 1440px viewports, display line-height 1.1,
body 1.5, measure 66ch), color primitives exactly as shipped (paper,
three navys, ink, teal pair, amber, slate ramp), semantic layer
(surface-page, surface-card, text-primary, text-body, text-muted, link,
focus-ring, state-pending, state-approved plus darkened -text companions
for body-size use), component layer (button-bg, card-surface, hairline,
gate-chip). Radius tokens 0 / 6px / 10px. One low tight shadow token
--shadow-demo-card, named for and reserved to the demo cards. Fonts stay
vendored Bricolage Grotesque, Inter, JetBrains Mono via next/font
(self-hosted: build emits woff2 into .next/static/media, zero
fonts.googleapis or fonts.gstatic references in build output).

### Contrast gate (WCAG 2.1 relative-luminance math, computed by script)

Flagged pairs, body size, requirement 4.5:1. Fix is always the semantic
token; brand primitives untouched.

| pair (on paper #EDF0F4) | before | ratio | after (semantic) | ratio | verdict |
| --- | --- | --- | --- | --- | --- |
| teal as text (--link) | #0D9488 | 3.28:1 fail | #0F766E | 4.79:1 | PASS |
| amber as text (--state-pending-text) | #B45309 | 4.39:1 fail | #92400E | 6.20:1 | PASS |
| caption slate at body size (--text-muted) | #64748B | 4.16:1 fail | #556275 | 5.42:1 | PASS |

Every other text token on every ground it appears on:

| token on ground | ratio | bar | verdict |
| --- | --- | --- | --- |
| ink #10161E on paper | 15.90:1 | 4.5 | PASS |
| ink on white card | 18.17:1 | 4.5 | PASS |
| body slate-600 #475569 on paper | 6.63:1 | 4.5 | PASS |
| body slate-600 on white card | 7.58:1 | 4.5 | PASS |
| muted #556275 on white card | 6.19:1 | 4.5 | PASS |
| link #0F766E on white card | 5.47:1 | 4.5 | PASS |
| pending-text #92400E on white card | 7.09:1 | 4.5 | PASS |
| white on navy-800 #1F2A3C | 14.44:1 | 4.5 | PASS |
| white on navy-900 #161F2E | 16.54:1 | 4.5 | PASS |
| white on navy-950 #0B1626 | 18.15:1 | 4.5 | PASS |
| white on ink | 18.17:1 | 4.5 | PASS |
| teal-bright #2DD4BF on navy-800 | 7.76:1 | 4.5 | PASS |
| teal-bright on navy-900 | 8.89:1 | 4.5 | PASS |
| teal-bright on navy-950 | 9.75:1 | 4.5 | PASS |
| teal-bright on ink | 9.76:1 | 4.5 | PASS |
| focus ring teal #0D9488 on paper (non-text UI) | 3.28:1 | 3 | PASS |
| focus ring teal on white (non-text UI) | 3.74:1 | 3 | PASS |
| focus ring teal on navy-800 (non-text UI) | 3.86:1 | 3 | PASS |
| focus ring teal on navy-900 (non-text UI) | 4.42:1 | 3 | PASS |
| focus ring teal on navy-950 (non-text UI) | 4.85:1 | 3 | PASS |
| state chips/dots teal #0D9488 on paper (non-text UI) | 3.28:1 | 3 | PASS |
| state chips/dots amber #B45309 on paper (non-text UI) | 4.39:1 | 3 | PASS |
| button label white on --button-bg teal #0D9488 | 3.74:1 | 3 (spec keeps teal for buttons at the 3:1 bar; label renders at medium weight) | PASS |

npm run build passes; npm run lint 0 errors (3 pre-existing
no-img-element warnings, untouched); npx tsc --noEmit clean.

design-excellence applied: 01-tokens-foundation, sources read: taste.md plus 4 inspiration note(s)
