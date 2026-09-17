# Design handoff: Kaleos HQ

Everything a designer needs before touching the site. Read README.md first for setup and the workflow.

## Brief

Kaleos HQ is an AI consulting and implementation firm. It builds custom agentic systems for clients: software where AI agents do repetitive work (drafting a client update, scoring and writing outreach, summarizing a week of activity) and a human approves each result before it goes anywhere. The positioning in one line: agents do the work, humans make the calls, everything is logged.

The audience is business owners and executives at established companies deciding whether to trust an outside firm with real operations. They are not looking for a chatbot. They want proof that this firm is precise, in control, and already operating at a level their own business is not.

The site has one job: credibility, then one action. The only call to action, everywhere, is "Book a Discovery Call", which opens Logan's Calendly. The contact form on the Assessment page is a fallback, not a second CTA.

Firm framing, not solo. Logan Kay is the founder, and Harvard Business School is a first-class credential: he designed and deployed AI systems across admissions and operations there, and the implementation methodology comes from that work.

Copy rules that still apply after the redesign: no dollar pricing on the site, no em dashes in any text, no claims that AI runs without human approval, and no wording that undercuts confidence ("we are still learning" and the like). Casual, direct, specific.

The current visual identity is "Machined Graphite": warm bone paper against neutral near-blacks, a matte teal accent, and a recurring "approval gate" motif (a hairline passing through a small chip, and a live approval queue in the hero). You are free to keep, adapt, or replace all of it.

## Brand asset inventory

| Asset | Path | Size | Where it appears |
| --- | --- | --- | --- |
| K logo mark | `public/kaleos-logo.png` | 500x500 | Nav bar (`src/components/NavBar.tsx`) and footer (`src/components/Footer.tsx`), rendered at 28x28. |
| Favicon | `src/app/icon.png` | 64x64 | Browser tab. Next.js picks it up by filename. |
| iOS icon | `src/app/apple-icon.png` | 180x180 | Home-screen icon on iPhone and iPad. Picked up by filename. |
| Open Graph image | `public/og-kaleos-hq.png` | 1200x630 | Link previews on X, LinkedIn, Slack, iMessage. Referenced in `src/app/layout.tsx` under `openGraph.images` and `twitter.images`. |
| Headshot | `public/photo.png` | 1024x1024 | About page portrait and the chat widget avatar (`src/components/TalkToLogan.tsx`). |
| LinkedIn logo | `brand-assets/linkedin-logo.png` | 300x300 | LinkedIn company page only. Not used by the site. |
| LinkedIn banners | `brand-assets/linkedin-banner-1584x396.png`, `brand-assets/linkedin-banner-1128x191.png` | as named | LinkedIn only. Not used by the site. |
| X banner | `brand-assets/x-banner-1500x500.png` | 1500x500 | X profile only. Not used by the site. |

The wordmark "Kaleos HQ" is live text set in the display font, not an image. It appears in the nav, the footer, and the chat widget header.

The transactional emails (lead notifications) are plain text with no logo, so nothing to update there.

### Checklist when the logo changes

- [ ] Replace `public/kaleos-logo.png` (keep the filename, or update the two `src` references in NavBar and Footer).
- [ ] Replace `src/app/icon.png` (64x64 PNG).
- [ ] Replace `src/app/apple-icon.png` (180x180 PNG).
- [ ] Replace `public/og-kaleos-hq.png` (1200x630 PNG) and check the `alt` text in `src/app/layout.tsx`.
- [ ] Update the wordmark styling if the type treatment changes (NavBar, Footer, TalkToLogan all use the `font-display` class).
- [ ] Replace the files in `brand-assets/` so the social profiles match. Logan uploads those by hand.
- [ ] Clear the preview cache on LinkedIn and X after deploy so the new Open Graph image shows.

## Current values (the starting point)

All of these live at the top of `src/app/globals.css`.

### Colors

| Token | Value | Use |
| --- | --- | --- |
| paper | `#F5F3EF` | Light page ground (warm bone). |
| ink | `#0C1013` | Darkest ground; primary text on paper. |
| navy | `#171C22` | Dark section ground. |
| navy-900 | `#11161B` | Chat panel gradient. |
| navy-950 | `#0A0E12` | Deepest ground: demo shells, panels. |
| accent | `#0E7F86` | Brand teal on paper. |
| teal-bright | `#8CB8C2` | Brand teal on dark grounds (matte, not neon). |
| mist | `#9AA3AE` | Secondary text on dark grounds. |
| muted-text | `#556275` | Captions on paper. |
| link | `#2C6A70` | Links, primary button hover. |
| accent-deep | `#0D6E70` | Primary button fill (white text passes AA). |
| pending / pending-bright | `#B45309` / `#F59E0B` | Amber, reserved for "awaiting approval". |
| approved / approved-text | `#0E7F86` / `#2C6A70` | Approved state. |
| hairline | `#E3E0D9` | 1px separators on paper. |
| decline / decline-bright | `#EF4444` / `#F87171` | Reject actions and the "without strategy" chart. |
| slate-200, 400, 600, 700, 800 | Tailwind defaults | Body copy and a few borders on paper. Pinned in the theme so you can retheme them. |
| red-400, red-500 | Tailwind defaults | Form error state. |
| amber-500 | Tailwind default | Streak numbers in one demo. |

Dark sections use white at opacity (`text-white/60`, `border-white/10`) rather than grey hexes. Every text and ground pair was checked for WCAG AA contrast; if you change colors, re-check body text at 4.5:1 and large text and UI at 3:1.

### Type

| Font | Role | Loaded as |
| --- | --- | --- |
| Bricolage Grotesque | Display: h1, h2, h3, wordmark | `--font-display` in `layout.tsx` |
| Inter | Body | Applied to `<body>` in `layout.tsx` |
| JetBrains Mono | System labels, eyebrows, numerals (`.font-system`) | `--font-mono` in `layout.tsx` |

Scale (fluid, Major Third 1.250, base 16px, full size at 1440px wide): caption 12.8 / body 16 / body-lg 20 / h4 25 / h3 31.25 / h2 39 / h1 48.8 / display 61. Headings are sentence case; uppercase only for small mono eyebrows. Display tracking is -0.02em.

### Spacing, radius, shadow

- 8pt grid. Section padding is 64px on mobile and 96px on desktop (`py-16 md:py-24`). Content max width is 80rem (`max-w-7xl`) with 16px side gutters.
- Radius: 6px for buttons and inputs (`rounded-control`), 10px for cards (`rounded-card`).
- Shadows: almost none. One soft shadow on the demo cards (`shadow-demo-card`), one under the nav once scrolled (`shadow-nav`). Depth comes from the layered background "atmosphere" (grid, aurora, grain) instead.

### Motion

One easing curve does most of the work: `cubic-bezier(0.16, 1, 0.3, 1)` (expo out). Hover and state changes stay under 250ms. Scroll reveals run 800ms. The hero headline rise is capped at 900ms because it is the largest element on the page and affects the performance score. Every animation resolves to its finished state under the operating system's reduced-motion setting.

## Technical notes before you design

- **Images.** Use the `Image` component from `next/image`, not `<img>`. Put files in `public/` and reference them as `/filename.png`. Give every image real `width` and `height` (or `fill` inside a sized box) so the layout does not jump while loading. The homepage hero has no photo on purpose: a full-bleed photo was the reason the old site scored 36 on Lighthouse performance.
- **Fonts.** Loaded through `next/font/google` in `src/app/layout.tsx`, which self-hosts them and avoids layout shift. To add a font, import it there, give it a CSS variable name, and add the variable to the `<html>` className. Then reference `var(--your-font)` in `globals.css`.
- **Tailwind v4.** No config file. The theme is the `@theme` block in `globals.css`. Any `--color-*`, `--text-*`, `--radius-*`, `--shadow-*`, or `--font-*` variable you add there becomes a utility class automatically.
- **No component library.** Every component is plain React in `src/components`. No design-system package to fight.
- **Animation without JavaScript.** Anything above the fold must paint without JavaScript. The hero animation is pure CSS for that reason. Scroll reveals (`Reveal.tsx`) hide their content only when scripts are enabled, so search engines and no-JS visitors see everything. If you build new reveals, keep that guarantee.
- **Accessibility floor worth keeping.** Visible keyboard focus rings on everything, 40px minimum hit targets on buttons and links, real `<button>` and `<a>` elements, labelled form fields, and `aria-hidden` on decorative layers. Body text at AA contrast.
- **Performance floor.** The live site scores well on Lighthouse. Keep the hero light, keep images sized, and lazy load anything heavy below the fold (the demo cards already do this).
- **Responsive floor.** Check 320, 375, 768, 1024, and 1440px widths. Nothing should scroll horizontally.
- **The demos are real.** The three cards on the homepage are working React components with state. Restyle them freely; the approve button is the brand's point, so keep a clear approve action.
- **Chat widget.** `TalkToLogan.tsx` renders on every page as a floating button. It is a client component with its own styles; treat it as part of the redesign.
- **Blog.** Posts are markdown in `content/blog/`. `src/lib/blog.ts` turns them into HTML, and the `.prose` rules at the bottom of `globals.css` style that HTML.

## Proof kit

Three client testimonials and five logos (three clients, plus Harvard Business School and Claude as background and tooling, not clients) live in `docs/proof-kit/`. Its README explains what is confirmed, what is not, and how HBS and Claude may be shown.

## Baseline

Full-page screenshots of every route at 1440px and 390px are in `docs/baseline-screenshots/`. They are the "before".
