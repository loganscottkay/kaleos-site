# Redesign intake brief (Phase E0)

Written 2026-09-16 by Ryan Hazen. Working notes for the design-overhaul branch. Not client-facing.

## What the site is for

One job: convince a business owner or executive at a $2M to $100M company that Kaleos HQ can be trusted with real operations, then get them to book a discovery call. Firm framing, not solo. Harvard Business School is the lead credential. The contact form on the Assessment page is a fallback, not a second CTA.

Positioning line today: "Agents do the work, humans make the calls, everything is logged." Logan has flagged this as pending change. Treat it as placeholder, not scripture.

Logan's taste, in his words via Ryan: bold, clean, professional. Visually stunning UI, but informative and clean. Inspired by Awwwards, wants the efficiency of a BCG-style site. Product and brand first, with the service as one element of the brand.

## Access and safety (confirmed)

- Repo cloned to `~/Code/kaleos-site`. Branch `design-overhaul` checked out, tracking origin. Now at 14c2292, Logan's own merge of his proof-kit commit (docs and logo files only, no site changes). Nothing on the site has been changed yet.
- Revert path: tag `baseline-pre-redesign` on 9d545b2, pushed to origin. `git checkout baseline-pre-redesign` restores the untouched site at any point. 14c2292 differs from it only by docs and `public/logos/`.
- GitHub auth: `gh` logged in as rh80-tpo with repo scope. Push works (the tag push proved it).
- Git identity set repo-local only: Ryan Hazen, ryanhazen80@gmail.com.
- Lint, `tsc --noEmit`, and `next build` all pass clean on the baseline.
- Dev server runs. Home, /about, /audit all return 200 with placeholder env.
- Deploy: every push to any branch gets a Vercel preview. Only Logan merges to main. We never push to main. The repo's own CLAUDE.md says pushing main is fine; that rule is Logan's for himself, not ours.
- Do not touch: `src/app/api/**`, `src/lib/rate-limit.ts`, `.env*`, `next.config.ts`, `public/bohan/`.
- Do not put on the site: dollar pricing of any kind, "we're still learning", autonomous-AI claims, "intern", "vibe coder", college major, em dashes.

## Additions from Ryan, 2026-09-16 evening

- **Client testimonials on the landing page.** Logan's proof kit (`docs/proof-kit/`) has three client quotes and logos. All three quotes are `needs_confirmation`. Design the section with them as placeholder length and tone; nothing ships with a quote or logo until its JSON entry says `confirmed`. Bohan is missing the person's name. Cogniify has no usable logo yet. HBS shield stays out of any client row and defaults to plain text. Claude logo is "built with", never partner.
- **Less interactive, more visual.** Fewer clickable demo pieces. The scroll itself is the product: bold type, big composed sections, the K mark and a cosmology motif carrying the brand. The three demos can survive as one visual proof object, not three working toys.
- **Cosmology and the K.** New logo and title are coming from Ryan. The brand system (mark, wordmark, motif, palette direction) waits for those. No build starts before they arrive.
- **Full mobile pass at the end.** Added as a named phase after the design pass: every route at 320, 375, 390, 768, walked by hand in a real browser, before the PR.

## Read of the current site (from baseline screenshots, 1440 and 390)

What already works:
- Warm paper against near-black is a real choice, not a default. Keep the warm/cool logic even if the values move.
- The approval gate is a genuine, ownable motif. The hero queue that settles with one row pending is the best idea on the site.
- The three demos are real React with state. That is rare for a consulting site and is the strongest proof asset.
- Copy is mostly direct and specific. "We design one system, not ten" is good.
- Performance and accessibility floor is already in place. Nothing above the fold depends on JS.

What reads as template:
- Three identical cards, repeated. Implementation gap, systems shipped, demos, background, how we're different, engagement tiers, how it works. Seven three-card rows across three pages. This is the single biggest tell.
- One rhythm stamped on every page: paper header band, dark card band, dark card band, dark CTA band, footer. Home, About, and Assessment are the same page with different words.
- Roughly 70 percent of scroll height is dark graphite with a teal aurora and a grid overlay. That combination is the 2025 AI-tool landing page look. It is exactly what Logan means by "generic".
- Inter for body and JetBrains Mono for labels. Both are the reflex pairing. Bricolage Grotesque for display has character but is becoming a common AI-generated choice too.
- Hero is the text-left, product-panel-right SaaS default.
- The hero panel, the demos, and the workflow diagram all look like the same dark dashboard chrome. The product never gets shown at a size where it feels real.
- No imagery of any kind except Logan's headshot. Everything is a chip, a card, or a rule.
- Assessment page has an empty deliverables section (checklist floating on paper) and a "How it works" and "How engagements work" pair that say the same thing twice.

## Elevation brief

**What this site is secretly about: control.** A buyer handing over operations wants to feel, in the first five seconds, that the room is under control. Not "AI is exciting". Calm, precise, logged. The gate is the feeling, not just a motif.

Proposed direction name: **Control room, editorial.** Predominantly light paper, typographic authority like a BCG report, with the product shown large and real as the one dark object on the page. Dark becomes the exception that carries weight, not the wallpaper.

AI-default versus proposed, surface by surface:

| Surface | AI default (reject) | Proposed |
| --- | --- | --- |
| Hero | Headline left, dashboard mock right, two buttons | Full-width typographic statement on paper. Below it, the approval queue at real size as the first "product" object, running its one-time sequence. One CTA. |
| Proof | Three logo-less cards labeled Coaching / Portal / Outreach | One case at a time, editorial layout: big number or outcome, one real screen, three lines of what happened. Scroll through three cases like a report, not a grid. |
| Method | Numbered four-step list with a vertical rail | A single continuous diagram of the gate. Input, agent, gate, log, output. Steps annotate the diagram instead of living in cards. |
| Demos | Three cards of equal size | Keep them real. Show one at full width, tabbed or scroll-pinned, so the approve action is big enough to feel consequential. |
| Who it is for | Paper band with one paragraph | A short, specific qualifier block with a decline path ("if you want a chatbot, we are the wrong firm"). Honest and fast. |
| Quiz | Dark card with pill buttons | Keep the mechanic, restyle as a typographic form on paper. Fewer borders. |
| About | Headshot centered, two chart cards, three-card background, three-card differentiators | One column of prose with the portrait set editorially. Credentials as a plain list. The two charts become one honest diagram or go. |
| Assessment | Deliverables list, three cards, three tiers, FAQ, form | Deliverables as a numbered spec. Tiers as one comparison table. FAQ stays. Form restyled on paper. |
| Nav and footer | Logo, four links, teal button | Quiet wordmark, three links, one CTA. Footer carries the positioning line and nothing decorative. |
| Motion | Aurora, grid, spotlight cards, scroll reveals everywhere | Keep reveals and the hero sequence. Cut the aurora and grid. Motion only where it explains the gate. Live reduced-motion check stays. |

Ryan's design-signature defaults, proposed for this build:

1. Light theme by default: **apply.** The site is 70 percent dark now. Flipping the ratio is the fastest way to stop reading as an AI-tool landing page and to hit the BCG efficiency Logan asked for.
2. Real imagery over code illustration: **partial.** This is not an image-forward site. The product screens are the imagery. No stock, no generated office photos. Logan's real headshot stays.
3. Distinctive display face: **apply, with a decision.** Keep Bricolage or replace. Candidates to test on the hero: keep Bricolage Grotesque, or move to something with more editorial weight. Body leaves Inter. Mono leaves JetBrains Mono for a mono with character, used only for the log and gate labels.
4. Understated wordmark: **apply.** Small, quiet, in the nav. The hero is the statement, not the logo.
5. Structure-focused imagery: **apply.** Every screen shown is the gate itself, the pending row, the log line. Not whole dashboards.
6. Honest content: **hard rule.** Nothing on the site that is not already in the site, README, handoff doc, or Logan's own words. Case studies keep their current specificity level. No invented numbers.

## Open questions for the gate

1. Display face: keep Bricolage Grotesque, or test a replacement? I lean toward testing two alternatives against it on the hero before deciding.
2. Dark ratio: is "one dark object per page" the right read of "product first", or does Logan want the product dark and everything else dark too?
3. The positioning line is pending. Do we design around a placeholder and swap later, or ask Logan for the new line before the copy pass?
4. Blog: stays live and unlinked per the README. Restyle it in the same pass, or leave it at baseline and note it for later?

## Next phases

- E1: web-critic against the local build and the live site. Severity-ranked. Ryan triages.
- E2: web-elevate, ten ideas. Ryan picks.
- Gate: Ryan sends the new logo and title. Brand system gets locked (mark, wordmark, motif, palette). Nothing below starts before this.
- E3: design pass. Tokens first, then components, then surfaces. Checkpoint tag and push at each surface so Vercel previews exist. Humanizer on every rendered string. Share-readiness (title, description, real OG image) before the PR.
- E3.5: full mobile pass. Every route at 320, 375, 390, 768 in a real browser. Overflow, tap targets, type scale, motion. Fix, tag, push.
- Iteration loop on localhost and Vercel previews until Ryan is happy.
- PR from design-overhaul into main only when Ryan says so.
