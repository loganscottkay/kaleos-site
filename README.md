# Kaleos HQ website

This is the source for [kaleoshq.com](https://www.kaleoshq.com), the marketing site for Kaleos HQ. Kaleos HQ is an AI consulting and implementation firm run by Logan Kay. The site has one job: convince a business owner or executive that Kaleos HQ can be trusted with real work, and get them to book a discovery call through Calendly.

This README is written for a designer who is about to redesign the whole front end. It assumes you know HTML, CSS, and the basics of React. Anything more specific is explained where it comes up.

## Running it locally

You need Node.js 20 or newer and npm. Check with `node -v`.

1. Clone the repo and move into it.
   ```bash
   git clone https://github.com/loganscottkay/kaleos-site.git
   cd kaleos-site
   ```
2. Install dependencies.
   ```bash
   npm install
   ```
3. Copy the example environment file. The placeholders are enough to run the site. You do not need real keys.
   ```bash
   cp .env.example .env.local
   ```
4. Start the dev server.
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000). Edits to any file reload the page automatically.

With placeholder keys, the contact form, the chat widget, and the roadmap question box show a "not configured" message instead of sending anything. That is expected. Logan holds the real keys and they only exist on Vercel.

Before you push, run the three checks that must pass for a pull request to be merged:

```bash
npm run lint
npx tsc --noEmit
npm run build
```

## What the site is built with

- **Next.js** (App Router). A React framework. Each folder under `src/app` becomes a URL.
- **React 19** with TypeScript. Components are `.tsx` files.
- **Tailwind CSS v4**. Utility classes like `text-ink` or `rounded-card`. There is no `tailwind.config.js`; the theme is declared at the top of `src/app/globals.css`.
- **next/font** loads three Google fonts (Bricolage Grotesque, Inter, JetBrains Mono) in `src/app/layout.tsx`.
- **next/image** for images. Use it instead of a plain `<img>` tag so images get resized and lazy loaded.
- No component library. Every component is hand-written in `src/components`.

## Map of the codebase

```
src/app/                 Pages. Each folder is a URL.
  layout.tsx             Wraps every page: fonts, <head> metadata, chat widget, analytics.
  globals.css            THE DESIGN TOKENS (top of file) plus all hand-written CSS.
  page.tsx               Homepage (/).
  about/page.tsx         About page (/about).
  audit/page.tsx         Assessment page with the intake form (/audit).
  blog/page.tsx          Blog index (/blog). Not linked from the nav, kept live for search engines.
  blog/[slug]/page.tsx   One blog post. Content comes from content/blog/*.md.
  icon.png               Favicon (64x64). apple-icon.png is the iOS home-screen icon (180x180).
  robots.ts, sitemap.ts  Search-engine files. Generated, not hand-edited.
  api/                   Backend routes. See "What to send to Logan" below.

src/components/          Reusable pieces of UI.
  NavBar.tsx             Top navigation: logo, wordmark, links, CTA button, mobile menu.
  Footer.tsx             Footer and the social icon links.
  ApprovalQueue.tsx      The hero panel on the homepage (the animated approval queue).
  GateRule.tsx           The small divider line with a chip, used under section headings.
  Card.tsx               The one card component (white on paper, translucent on dark).
  Reveal.tsx             Scroll-in animation wrapper, plus the pointer spotlight for card grids.
  InProduction.tsx       "Systems we have built and shipped" section.
  BuiltToDemo.tsx        The three interactive demo cards section.
  demos/                 The three demos (ClientPortal, Accountability, Outreach) and their shared bits.
  WorkflowDiagram.tsx    The "Your business -> Kaleos system -> Output" diagram.
  QuickAssessment.tsx    The three-question quiz on the homepage.
  StrategyGraph.tsx      The two small charts on the About page.
  FAQ.tsx                The accordion on the Assessment page.
  AuditForm.tsx          The contact form. Posts to /api/lead.
  TalkToLogan.tsx        The floating chat widget. Posts to /api/chat.

src/lib/                 Small helpers.
  blog.ts                Reads the markdown posts.
  rate-limit.ts          Slows down abusive form submissions. Backend only.

content/blog/            The blog posts as markdown files with a metadata header.
public/                  Files served as-is at the site root.
  kaleos-logo.png        The K logo used in the nav and footer.
  photo.png              Logan's headshot (About page and chat widget).
  opengraph-image.png    The preview image shown when the site is shared on social media.
  bohan/roadmap.html     A private client page. Do not change.
brand-assets/            Social banners and the LinkedIn logo. Not used by the site.
docs/                    Documentation and the baseline screenshots.
docs/archive/            Old planning docs and audit logs. History only, safe to ignore.
```

## What you can change freely

Everything the visitor sees is yours. That includes:

- Every page in `src/app` and every component in `src/components`. Restructure pages, merge sections, add new pages, delete sections you do not want.
- All styling: `src/app/globals.css`, the Tailwind theme at the top of it, and every class name in the components.
- Fonts (`src/app/layout.tsx` and `globals.css`), colors, spacing, animation, and motion.
- Copy, headings, and labels inside the pages and components.
- Images, the logo, the favicon files, the Open Graph image, and anything under `public/` except `public/bohan/`.
- Page metadata (titles and descriptions) in each page's `metadata` export and in `layout.tsx`.
- The blog layout and the markdown posts in `content/blog/`.

You have full creative license. If a component gets in the way, replace it.

A few things worth keeping because they cost real effort to get right:

- The contact form must still POST to `/api/lead` with the same field names (see `AuditForm.tsx`). Restyle it however you like.
- The chat widget must still POST to `/api/chat`. Same idea.
- Keep the one call-to-action label sitewide: "Book a Discovery Call", pointing at the Calendly link already in the code.
- No dollar amounts for pricing anywhere on the site. Pricing happens on a call.
- The copy has a voice rule: no em dashes. Use commas, periods, or colons.

## What to send to Logan instead of changing yourself

These are the parts wired to outside services. Changing them can break lead capture or leak keys, so describe what you need and Logan will make the change.

- `src/app/api/lead/route.ts`: receives the contact form and sends the lead to Logan's inbox (Resend) and to a spreadsheet (Airtable).
- `src/app/api/chat/route.ts`: relays chat messages to OpenAI and returns the reply.
- `src/app/api/bohan/roadmap-question/route.ts`: emails questions submitted from a private client page.
- `src/lib/rate-limit.ts`: stops one visitor from spamming the form or chat.
- Environment variables (`.env.example`, `.env.local`, and Vercel settings): the secret keys for the services above.
- `public/bohan/`: a private client page that has nothing to do with the marketing site.
- `next.config.ts`: routing and headers for the client page above.

## Where the design system lives

Open `src/app/globals.css`. The first 140 lines are the tokens:

- The `@theme` block is what Tailwind turns into class names. `--color-ink` becomes `bg-ink`, `text-ink`, `border-ink`. `--text-h2` becomes `text-h2`. `--radius-card` becomes `rounded-card`. `--shadow-nav` becomes `shadow-nav`. Change a value there and every class that uses it changes with it.
- The `:root` block holds the same colors as plain CSS variables for the hand-written CSS lower in the file (animations, the atmosphere backgrounds, the approval queue). Keep the two in step when you change a color.
- Fonts are loaded in `src/app/layout.tsx`. To swap a font, change the import there and the fallback stacks in `globals.css`.

The rest of `globals.css` is the hand-written CSS for the button, card, and input systems, the background "atmosphere" layers, the scroll reveal system, and the hero animation. All of it is yours to rewrite.

`docs/DESIGN-HANDOFF.md` has the brand brief, the full asset inventory, and the current values as a starting point.

## Workflow

1. Work on the branch `design-overhaul`. It already exists on GitHub.
   ```bash
   git checkout design-overhaul
   ```
2. Commit often with short messages that say what changed.
3. Push whenever you want to see it deployed. Every push to any branch gets its own Vercel preview link, so you can see the real thing without touching the live site. The link is posted on the commit in GitHub, and Logan can send it to you too.
4. When the overhaul is ready, open a pull request from `design-overhaul` into `main`. Logan reviews, merges, and deploys. Only a merge to `main` changes what is live at kaleoshq.com.

## Every page and route

| Route | What it is |
| --- | --- |
| `/` | Homepage: hero with the approval queue, implementation gap, systems in production, methodology, demos, who it is for, quiz, trust strip, CTA. |
| `/about` | About Logan and the firm, with two small strategy charts and background cards. |
| `/audit` | The Assessment page: deliverables, how it works, engagement tiers, FAQ, and the contact form. Nav label is "Assessment". |
| `/blog` | Blog index. Live but not linked from the nav. |
| `/blog/why-ai-projects-fail` | Post: Why AI Projects Fail. |
| `/blog/what-human-in-the-loop-actually-means` | Post: What Human-in-the-Loop Actually Means. |
| `/blog/ai-automation-for-small-business` | Post: AI Automation for Small Business: Where to Start. |
| `/blog/automate-client-follow-ups` | Post: How to Automate Client Follow-Ups Without Losing the Personal Touch. |
| `/blog/bleeding-money-on-manual-tasks` | Post: Why Most Businesses Are Bleeding Money on Tasks a Machine Could Handle. |
| `/blog/what-is-an-ai-ops-audit` | Post: What Is an AI Ops Audit and Why Your Business Needs One. |
| `/bohan/roadmap` | Private client page, password gated, hidden from search engines. Not part of the redesign. |
| `/api/lead` | Backend. Receives the contact form. |
| `/api/chat` | Backend. Powers the chat widget. |
| `/api/bohan/roadmap-question` | Backend. Emails questions from the client page. |
| `/sitemap.xml`, `/robots.txt` | Generated search-engine files. |

Baseline screenshots of every page at desktop (1440px) and mobile (390px) widths are in `docs/baseline-screenshots/`.
