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

## 02-component-craft

Components touched: GlassCard, NavBar, Footer, GateRule, GateFlow,
GateAction (GateChip, GateStatus, DemoButton, DemoShell), AuditForm,
FAQ, QuickAssessment, BuiltToDemo, InProduction, StrategyGraph,
WorkflowDiagram, TalkToLogan, demos (ClientPortal, Accountability,
Outreach), plus the call sites in page.tsx, audit, about, and blog
pages so every button, card, and input instance sitewide runs through
the same three systems.

Signature decision: the amber-to-teal state change now runs through the
entire gate grammar with one voice; the hero pulse itself travels amber
(pending) to the gate, waits for approval, and leaves teal (approved),
while every GateChip and GateStatus in the demos speaks the same
pending-bright amber to teal-bright grammar on dark grounds, so the
one identity moment reads identically from the hero to the operator
demos.

Detail: exactly one button system (.btn with primary and ghost-dark
variants, 40px hit floor, 6px radius, mono microcopy on operator
buttons), one card system (.card / .card-dark, 10px radius, slate
hairline, near-shadowless on paper, white-at-opacity on navy, no
glassmorphism or glow shadows anywhere), one input system (.input-dark,
6px radius, no focus-ring suppression). The demo cards alone carry
--shadow-demo-card. Grid asymmetry: home, InProduction, BuiltToDemo,
and QuickAssessment headers moved from centered stacks to
lead-and-support twelve-column splits with the gate rule left-aligned
under the lead. JetBrains Mono routed onto existing metadata, system
labels, timestamps, form labels, step markers, footer metadata, and
demo button microcopy; no new copy added. The chatbot launcher became a
real keyboard-focusable button on brand navys with the live dot in
teal-bright. Two recorded exceptions: the demo reject affordance and
the StrategyGraph decline series keep red (no brand token exists for
danger or decline; both are pre-existing meanings, unchanged).

New dark-ground token pairs verified (WCAG math by script):
| token on ground | ratio | bar | verdict |
| --- | --- | --- | --- |
| pending-bright #F59E0B on navy-950 | 8.45:1 | 4.5 | PASS |
| pending-bright #F59E0B on navy-800 | 6.72:1 | 4.5 | PASS |
| pending-bright #F59E0B on ink | 8.46:1 | 4.5 | PASS |

npm run build passes; npm run lint 0 errors (3 pre-existing
no-img-element warnings); npx tsc --noEmit clean. Smoke test on the
built server: all four routes 200 and the system classes render in the
served HTML. Content-frozen check: the diff moves copy only for
re-indentation, zero wording or asset changes; em dashes scrubbed from
legacy comments.

design-excellence applied: 02-component-craft, sources read: taste.md plus 4 inspiration note(s)

## 03-spacing-type-sweep

Routes swept: home, about, audit, blog index, blog post template, layout/NavBar/Footer,
plus every remaining component (demos, WorkflowDiagram, StrategyGraph, QuickAssessment,
GateFlow, GateAction, TalkToLogan, AuditForm, GlassCard, FAQ, InProduction, BuiltToDemo).

Four passes, each grep-verified before moving on:

1. Off-grid margin/padding/gap Tailwind utilities (values not on the 4/8/12/16/24/32/48/64/96/128
   primitive scale, e.g. p-5, mb-14, gap-2.5) snapped to the nearest token: 85 replacements
   across 17 files. Before: 85 off-grid instances. After: 0.
2. Arbitrary Tailwind bracket px/rem/em values (text-[10px], w-[170px], border-[1.5px], etc.)
   eliminated: converted to text-caption for compressed system labels, a shared
   .gate-chip-ring class for the repeated gate-chip border weight, Tailwind's native dynamic
   spacing scale (e.g. w-70 = 280px) for one-off widths/heights, var(--space-*) for
   entrance-transform distances, and new globals.css helpers (.ltl-panel, .system-glow-border,
   .core-pulse-glow) for values that must originate in the token file. Added a documented
   decline/danger token pair (component layer, explicitly non-brand) so StrategyGraph's
   decline chart and the demo reject affordance no longer carry raw #ef4444/#f87171 hex.
   Before: 60 bracket instances + 6 raw hex outside globals.css. After: 0 and 0.
3. TalkToLogan.jsx (the chat widget) rewritten off ~60 inline-style px/hex/rgba literals onto
   Tailwind utilities plus the .btn/.input-dark system classes; WorkflowDiagram's
   component-local <style> keyframe block moved into globals.css so its glow colors resolve
   through color-mix(var(--teal)) instead of raw rgba.
4. Default Tailwind type-scale classes (text-xs/sm/base/lg/xl/2xl/3xl/4xl/5xl/6xl) replaced
   sitewide with the fluid modular-scale tokens (text-caption/body/body-lg/h4/h3/h2/h1/display),
   matched to each element's visual role (eyebrow/label -> caption, paragraph copy -> body,
   lead paragraph -> body-lg, repeated card sub-header -> h4, section header -> h2, page-hero
   h1 -> h1, the one homepage hero -> display). Multi-breakpoint chains (text-3xl sm:text-4xl
   md:text-5xl) collapsed to one token class since the clamp()-based scale already resizes
   fluidly. tracking-tight/tracking-normal removed from h1/h2/h3 elements so globals.css's
   -0.02em display tracking rule applies cleanly instead of being overridden by Tailwind's
   -0.025em. Manual leading-* utilities removed from any element once its token class already
   bundles the correct line-height. Before: 133 non-token size classes across ~15 files. After: 0.

Combined raw-value grep (`#[0-9A-Fa-f]{3,8}` and `\[[0-9.]+(px|rem|em)\]` across src/)
returns zero hits outside src/app/globals.css, the token definition file. Zero copy or image
changes (verified by diffing every changed line for content beyond className/style attributes).
Remaining literal px outside globals.css is scoped out deliberately: Next Image `sizes` hints
and IntersectionObserver `rootMargin` options are browser-API configuration, not CSS/design
values.

npm run build, npm run lint (0 errors, the same 3 pre-existing no-img-element warnings), and
npx tsc --noEmit all green.

design-excellence applied: 03-spacing-type-sweep, sources read: taste.md plus 4 inspiration note(s)
