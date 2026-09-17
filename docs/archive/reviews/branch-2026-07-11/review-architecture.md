# Architecture & Codebase-Fit Review

Scope: architecture, design patterns, and codebase fit only. Correctness, security, and
visual/copy details are out of scope except where they stem from a structural decision.

This branch is a large redesign: it rips out Supabase (chat logging, newsletter, quiz
logging, lead insert), replaces lead capture with an Airtable + Resend API route, swaps the
Playfair/glassmorphism system for a Fraunces + mono "gate" system, deletes several decorative
components (DemoFrame, StickyCTA, ScrollProgress, AuthorityTimeline, NewsletterSignup), and
extracts the three homepage demos into their own files behind dynamic imports. Overall the
direction is a net simplification and most of it fits the codebase well. The findings below
are the places where the change introduces inconsistency, duplication, or coupling worth
fixing before it compounds.

---

## Canonical URLs split between www and non-www

**File:** src/app/blog/page.tsx:14, src/app/blog/[slug]/page.tsx:26,31, src/components/Footer.tsx:25
**Severity:** warning
**What is wrong:** The branch migrates the site's canonical host to `https://www.kaleoshq.com`
in layout.tsx (`metadataBase`), about/page.tsx, audit/page.tsx, and the new robots.ts sitemap.
But the blog pages still emit `https://kaleoshq.com/blog...` canonicals and OG URLs, and the
Footer still links `https://kaleoshq.com`. The codebase now declares two different canonical
hosts for the same site.
**Why it matters:** Mixed canonical signals are exactly the thing canonical tags exist to
prevent. Search engines will see the homepage/about/audit claiming `www` and the blog claiming
bare-domain, which splits ranking signals and looks like a half-finished migration. It is also
a landmine: the next person copies whichever page they happen to open and the inconsistency
spreads.
**What needs to change:** Pick one host (the `metadataBase` in layout.tsx already commits to
`www`) and make every canonical/url/sitemap/footer reference agree. Better: stop hard-coding
absolute URLs per page. Since `metadataBase` is set, canonicals can be relative paths
(`alternates: { canonical: '/blog' }`) and Next resolves them against the base, so the host
lives in exactly one place.

---

## In-memory rate limiter duplicated across two API routes

**File:** src/app/api/lead/route.ts:9-21, src/app/api/chat/route.ts (RATE_LIMIT_MAX / isRateLimited)
**Severity:** warning
**What is wrong:** The lead route copy-pastes the chat route's rate limiter almost verbatim
(`rateLimitStore` Map, `isRateLimited`, window/const pattern), changing only the numbers
(10/hr vs 20/hr). Two definitions of the same mechanism now drift independently.
**Why it matters:** Two copies means two places to fix when the approach changes, and they
already differ in ways that aren't obviously intentional. The shared shape also carries two
shared problems: (1) the Map never evicts stale IPs, so it grows unbounded on a long-lived
instance; (2) it is per-instance memory, so on Vercel's multi-instance serverless it does not
actually enforce a global limit. Duplicating it doubles the surface of both bugs.
**What needs to change:** Extract one helper, e.g. `src/lib/rateLimit.ts`, exporting a factory
`createRateLimiter({ max, windowMs })` that both routes call. Add stale-entry cleanup in the
same place. If real rate limiting matters, this is also the seam where you'd later swap the Map
for a shared store (Upstash/Vercel KV) once, not twice.

---

## The "gate" checkpoint chip is implemented three separate ways

**File:** src/app/globals.css:.gate-rule::after, src/components/GateFlow.tsx:16-27, src/components/demos/GateAction.tsx:GateChip
**Severity:** warning
**What is wrong:** The rounded checkpoint square with the teal border is the signature motif of
this redesign, and it exists as three independent implementations: a CSS pseudo-element
(`.gate-rule::after`), an inline JSX chip in GateFlow (`w-7 h-7 rounded-lg border-[1.5px]`
+ `gate-flow-*` keyframes), and `GateChip` in GateAction (`w-5 h-5 rounded-md border-[1.5px]`).
The code comments even call it out: GateAction says "same chip as the GateRule signature" and
GateFlow says "the same chip." They are the same idea with three different sizes, radii, and
color rules.
**Why it matters:** This is the brand element. When the border color, radius, or approved-state
styling changes, someone has to find and edit three unrelated files (one of them CSS,
two of them JSX with different Tailwind values) and keep them visually identical by hand. They
will drift. The whole point of a signature element is that it reads as one thing everywhere.
**What needs to change:** Make `GateChip` the single source of truth for the chip and have the
others compose it. GateFlow can render `<GateChip>` at its gate stop instead of hand-rolling the
square; GateRule can keep the CSS line but drop the pseudo-element chip in favor of an absolutely
positioned `<GateChip>` (or accept that the static divider is deliberately CSS-only and document
why). At minimum, pull the shared border/radius/color values into named constants so all three
reference them.

---

## Blog is now an orphaned subsystem

**File:** src/components/NavBar.tsx:6-10 (links), src/app/blog/*, src/lib/blog.ts
**Severity:** warning
**What is wrong:** `/blog` was removed from the NavBar `links` array, but the entire blog
subsystem stays fully wired: the routes, `lib/blog.ts`, gray-matter/remark deps, and the blog
pages still render. Blog is reachable by direct URL but linked from nowhere, and (per the finding
above) still carries the old non-www canonicals and was untouched by the dark-background/gate
redesign the rest of the site got.
**Why it matters:** "Live but unlinked" is an ambiguous state. A future reader can't tell whether
blog is deprecated (and safe to delete) or temporarily hidden (and must be maintained). Meanwhile
it still ships JS, still gets crawled, and now looks visually and structurally out of sync with
the redesign. Ambiguity like this is where dead code accumulates.
**What needs to change:** Make the intent explicit. Either keep blog as a first-class surface
(re-add the nav link, bring its canonicals and styling in line with the redesign) or retire it
(remove the routes, `lib/blog.ts`, and the `gray-matter`/`remark` deps). Don't leave it in
limbo.

---

## Lead API route is tightly coupled to the Airtable schema

**File:** src/app/api/lead/route.ts:101-116
**Severity:** suggestion
**What is wrong:** The route handler mixes three concerns in one function: HTTP/validation, the
Airtable persistence (hard-coded table name `'Leads'`, exact field labels like
`'Looking To Solve'` and `'Submitted At'`, and the date-only truncation workaround), and the
Resend email body. The storage schema leaks directly into the request handler.
**Why it matters:** Any change to the Airtable base (a renamed column, a new required field, a
different table) forces edits inside the POST handler, and the "Submitted At is date-only" quirk
is documented only as an inline comment next to the code that works around it. It also makes the
handler hard to unit-test without standing up Airtable. This is tolerable at current scale but is
the kind of coupling that quietly hardens.
**What needs to change:** Extract a `saveLead(lead): Promise<void>` (and optionally
`notifyLead(lead)`) into `src/lib/`, so the route does validate -> saveLead/notify -> respond and
the field-name/table/date coupling lives in one persistence module. The route keeps only HTTP
concerns.

---

## Missing env-var validation for the new integrations

**File:** src/app/api/lead/route.ts:101-118
**Severity:** suggestion
**What is wrong:** `AIRTABLE_BASE_ID!` uses a non-null assertion, and `AIRTABLE_API_KEY` /
`RESEND_API_KEY` are passed straight into the SDK constructors. If any are unset in an
environment, the failure surfaces only at runtime as a rejected promise inside `allSettled`,
logged generically and returned to the visitor as a 502.
**Why it matters:** The old Supabase code had the same `!`-assertion habit, so this isn't a
regression, but it's the moment to not carry the pattern into a second integration. A missing
key in preview/staging looks identical to a real Airtable outage, which makes misconfiguration
hard to diagnose. The `Promise.allSettled` partial-success design (good pattern, worth keeping)
actually masks it further.
**What needs to change:** Validate the three env vars once at module load (throw or log a
distinct startup error), or branch early with a clear message so a config problem is
distinguishable from a downstream outage. Low effort, saves a confusing debugging session later.

---

## DemoShell exposes a `live` prop no caller uses

**File:** src/components/demos/GateAction.tsx:DemoShell (live?: boolean)
**Severity:** suggestion
**What is wrong:** `DemoShell` takes `live?: boolean` and renders the "Live" indicator when
`live !== false`. None of the three demos (ClientPortal, Accountability, Outreach) pass it, so
the parameter is dead API surface that only ever takes its default.
**Why it matters:** Unused options are a small but real cost: they imply a configurability that
isn't exercised or tested, and the next person wonders what passing `live={false}` is supposed to
do and whether anything depends on it. Speculative flexibility that nothing consumes.
**What needs to change:** Drop the prop and always render the indicator, or actually use it from
a caller. If you're keeping it as an intentional extension point, a one-line comment saying so is
enough.

---

## Redundant below-the-fold gating in BuiltToDemo

**File:** src/components/BuiltToDemo.tsx (near IntersectionObserver + dynamic loading placeholder)
**Severity:** suggestion
**What is wrong:** Each demo is gated twice. `dynamic(..., { ssr: false, loading: DemoPlaceholder })`
already defers the chunk and shows a placeholder, and `next` won't request the chunk until the
component actually renders. On top of that, BuiltToDemo adds an IntersectionObserver (`near`,
`rootMargin: 400px`) and renders `{near ? <demo.Component /> : <DemoPlaceholder />}`. So there are
two gates and two `DemoPlaceholder` code paths reserving the same `DEMO_MIN_H` space.
**Why it matters:** It's not wrong, but the two mechanisms overlap and the `dynamic` `loading`
placeholder is nearly unreachable because the `near` gate is what controls first render. A reader
has to hold both mechanisms in their head to understand load timing, and the intent (why both?)
isn't obvious.
**What needs to change:** Keep one gate. The `near` + rootMargin observer is the more deliberate
control, so lean on it and the `dynamic` split for code-splitting; you can drop the `loading:`
placeholder (the `near` branch already renders `DemoPlaceholder`) or, conversely, drop the `near`
observer and rely on `dynamic`'s own lazy behavior. Either way, one placeholder path, documented.

---

## JSON-LD is repeated inline per page instead of a small shared component

**File:** src/app/page.tsx (jsonLd + dangerouslySetInnerHTML), src/app/about/page.tsx (same)
**Severity:** suggestion
**What is wrong:** The Organization JSON-LD was correctly removed from layout.tsx and replaced
with page-specific schema (ProfessionalService on home, Person on about). But each page now
repeats the same `<script type="application/ld+json" dangerouslySetInnerHTML={{ __html:
JSON.stringify(...) }} />` boilerplate by hand.
**Why it matters:** Minor, but `dangerouslySetInnerHTML` copy-pasted across pages is the kind of
thing that's easy to get subtly wrong (escaping, forgetting the type attribute) and there's no
single place that owns "how we emit structured data." As more pages add schema it multiplies.
**What needs to change:** A tiny `<JsonLd data={...} />` component in `src/components/` that owns
the script tag and serialization. Each page just passes its object. Removes the repeated
`dangerouslySetInnerHTML` and centralizes the one security-sensitive line.

---

## Things that are done well (no action needed)

- **AnimateIn reduced-motion handling** (AnimateIn.tsx): `useSyncExternalStore` over the
  `prefers-reduced-motion` media query is the idiomatic React 19 pattern, SSR-safe via the
  `() => false` server snapshot, and correctly pairs with the CSS reduced-motion block. Good.
- **Lead route partial-success design** (lead/route.ts): `Promise.allSettled` over Airtable +
  Resend, treating the lead as captured if either destination succeeds and only 502-ing when both
  fail, is a genuinely thoughtful resilience pattern. Keep it.
- **GlassCard simplification** (GlassCard.tsx): collapsing the glow/highlight/shimmer layers into
  a plain bordered card while keeping the component name to avoid churning ~dozens of call sites
  is the right call, and the inline comment explains the naming choice. No issue.
- **Demo extraction** (BuiltToDemo -> demos/*): pulling the three ~200-line inline demo machines
  out into their own files sharing a `GateAction` primitive set (DemoShell/DemoButton/GateStatus)
  is a real separation-of-concerns win over the previous 596-line monolith.
- **Supabase teardown** is clean: `lib/supabase.ts`, the newsletter route, and every
  `.from(...).insert(...)` call site were removed together, and `@supabase/supabase-js` is dropped
  from package.json. No dangling imports (verified: no remaining `supabase` references in src/).

---

## Summary

No critical structural defects. The redesign is a net simplification and the new API route is
reasonably well-built. The warnings worth addressing before merge are the four that will cause
real drift: the split www/non-www canonicals, the duplicated rate limiter, the three-way gate-chip
implementation, and the orphaned blog. The suggestions (schema coupling, env validation, dead
`live` prop, double gating, JSON-LD boilerplate) are cheap cleanups that keep the new patterns
from hardening into conventions.
