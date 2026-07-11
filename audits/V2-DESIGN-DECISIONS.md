# V2 Design Decisions
Date: 2026-07-11 · Session 3 · Direction chosen solo per runbook guardrails (Logan reviews on deploy preview)

## Critique of the current identity
The current site is a premium-consulting template wearing a Kaleos badge. A stock Unsplash mountain sits behind every section of every page, glassmorphic cards float over it, Playfair Display does the headings, and a teal glow answers every hover. Each piece is fine; together they read as "AI agency built from the same three Dribbble references as everyone else," and nothing on the page is ownable. The photo also costs real money: it is the reason production LCP is 12.8 seconds and Lighthouse performance is 36. The jet-flyover nav gimmick and the quiz sparkle particles pull in the opposite direction from "established." Before-screenshots: audits/screenshots/before-*.jpeg (the full-page capture also shows the demo dashboards painting $0.0M zero states, which Session 4 eliminates).

## Direction: "The Approval Gate"
Human-in-the-loop is the entire brand, so the interface itself behaves like the product: calm, structured, and everything important passes through a gate. Drop the photo entirely. Solid, disciplined surfaces in the brand's own navy and warm paper, editorial serif headlines for authority, monospaced system labels for the operator feel, and one recurring signature motif.

Why not the other candidates: a light editorial direction lands in the cream-serif-terracotta cliché the runbook bans, and a full dark operator console lands in near-black-plus-acid-accent. This direction keeps Kaleos's existing navy/teal equity (the K logomark stays correct) and elevates it instead of replacing it.

## Token system

| Token | Hex | Role |
|---|---|---|
| ink | #0E1B2E | Darkest surface, hero of dark sections, footer |
| navy | #1B2A4A | Brand surface, cards on ink, nav logo |
| teal | #0D9488 | The one accent: actions, focus, approved states |
| amber | #B45309 | Pending-approval states only, small doses |
| paper | #F7F5F1 | Warm light surface (kept off cream territory by pairing with ink text and teal, never terracotta) |
| mist | #93A5BE | Muted text on dark surfaces |

Type: Fraunces (display, headings) + Inter (body) + JetBrains Mono (system labels, statuses, the operator voice in demos). Fraunces gives the editorial authority Playfair was reaching for without the stock-template association, and its sharper contrast holds up at hero sizes. Inter stays because the demos are working software UIs and Inter is the right tool there.

Spacing: 4px base scale, section rhythm py-24 (96px) with max-w-6xl containers, cards on an 8px inner grid. One card system (solid surfaces, 1px borders, small shadows), no backdrop blur anywhere.

## Signature element: the Gate Rule
A thin horizontal track with a centered checkpoint chip (rounded square, check mark). It appears in exactly three places:
1. Under section headings as a divider (static): content sits "behind the gate" until a human passes it.
2. The hero's single orchestrated motion moment: a pulse travels the track as input, pauses at the gate chip, the chip flips to a check, and the pulse continues as shipped output. Labels: Input, Agent, Approval Gate, Shipped. Runs once on load, skipped entirely under prefers-reduced-motion.
3. Session 4 demos: the approve button IS the gate chip, so the marketing motif and the product interaction are the same object.

## Motion budget
The hero gate animation is the one orchestrated moment. AnimateIn keeps its subtle fade-up (and now respects prefers-reduced-motion by rendering visible immediately). Removed: jet flyover and skywriting nav, nav rumble, quiz sparkle canvas, card glow-drift and shimmer sweeps, scroll progress bar, hero vignette. Hover states are flat: border and background shifts, no glows.

## Accessibility
Global :focus-visible outline in teal on every interactive element. prefers-reduced-motion disables the hero moment, AnimateIn transforms, and all decorative keyframes. Color pairs checked for contrast: ink on paper, white/mist on ink and navy, white on teal buttons.

## What this buys performance
The 2070px Unsplash background (previous LCP, 12.8s) is gone from every page. Hero LCP is now text. Backdrop-filter blur, fixed grain overlay, and the always-running canvas particles are removed, which cuts paint cost on mid phones.
