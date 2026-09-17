# For Logan: what needs your input before this goes live

Prepared by Ryan, September 17, 2026. Everything on the redesigned site either comes from your repo, your proof kit, or public research with a source link. The items below are the ones only you can settle. None of them block a preview; all of them block the merge to main.

## Confirm or correct

1. **Your Anthropic credential.** The site says "Claude Corps Fellow at Anthropic" (home founder line, About background list). Confirm the exact title and whether "at" or "with" is right.
2. **Testimonials.** All three render as paraphrases of the drafts in `docs/proof-kit/testimonials.json`, marked "Pending confirmation" in amber. When a client confirms, flip `quote_status` to `confirmed` in the JSON and the site shows their approved words. Before merge, set `SHOW_DRAFTS` to `false` in `src/components/home/Testimonials.tsx` so nothing unconfirmed ships. Bohan still has no named person. Cogniify has no usable logo (not shown).
3. **Audience line.** Now reads "companies up to $100M+ in ARR." Confirm that is how you want to size it.
4. **Assessment deliverable.** The old "ROI projections" item now reads "a roadmap for the first system, with the number it is expected to move." Confirm, or send the wording you want.
5. **Privacy page (`/privacy`).** Written from what the site actually does: form to Resend and Airtable, chat to OpenAI, Vercel analytics, Calendly. Please confirm: the legal entity name to show (it says KALEOS), a mailing address if you want one listed, how long you actually keep submissions and chat logs, whether your OpenAI account retains chat data, and whether you want a governing-law line. I kept it plain and true; add specifics if your counsel wants them.
6. **Motto.** "AI that answers to you." is in the footer, the metadata, and the LinkedIn banner. Say the word if you want a different one and I will swap all four places.
7. **Statistics.** Three primary-source figures on the home page (S&P Global, Gartner, KPMG/University of Melbourne) plus one McKinsey line, each linked. I left out the "80% fail" RAND number and the MIT "95%" headline on purpose. One figure Ryan's research memo suggested (larger firms scaling 2x more than smaller ones) came from a secondary source and is not on the site; use it only if you verify it in McKinsey's full report.

## Do on your side

8. **Security headers.** The live site sends no CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, or Permissions-Policy. These live in `next.config.ts`, which I did not touch. A `headers()` block with those five is a ten-minute change.
9. **LinkedIn and X assets.** New banner, logo, and page copy are in `docs/linkedin/`. Upload the logo and banner, paste the copy, then clear the LinkedIn and X link-preview caches so the new Open Graph image shows.
10. **Environment.** Nothing changed. The form still posts to `/api/lead`, the chat to `/api/chat`, the same field names.

## Decisions the research memo raised that I did not build

- **Visible starting prices.** Your hard rule says no dollar amounts on the site. The memo argues buyers prefer self-serve pricing. Your call; the tiers table has a pricing row ready for a "starting at" figure if you change the rule.
- **Interactive product tours.** Needs a tool subscription (Storylane or Navattic) and screens from real client systems. Not built.
- **Case studies with one number each.** Needs the number from each client. Not built; the "Systems shipped" section was cut at Ryan's direction until real numbers exist.
- **Trust page.** Needs a real audit log export and your data-handling specifics. Not built; the privacy page covers what the website itself does.
- **Original research from assessment data.** Needs consent language on the form and a quarter of submissions. Not built.
- **Quiz scorecard.** The quiz was cut. Rebuild only if you want a lead magnet.
- **Core Web Vitals on every preview.** Vercel Speed Insights can do this; it is a dashboard toggle on your side.
