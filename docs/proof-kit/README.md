# Proof kit

Real testimonials and logos to design a proof or credibility section with. Nothing here is wired into the site; that is yours to design.

## What is in it

- `testimonials.json`: three client testimonials as data, one object each with the client, title, company, project, project URL, quote, quote status, headshot (none yet), logo path, and a published flag. The logo paths point at `public/logos/` in the site, so the site can import them as `/logos/name.ext`.
- `testimonials.md`: the same three testimonials laid out for reading, each with a short plain-language paragraph on the project.
- `logos/`: the source logo files, with a `512/` folder holding a 512px-wide PNG of each usable logo, and a `reference-only/` folder for low-resolution copies that must not ship.
- `SOURCES.md`: where every logo came from, its format and size, and the usage guideline links.
- `quote-requests.md`: the messages Logan is sending clients to confirm their quotes. Not for you, but it explains why the quotes are not final.

## How to read the testimonials

Advisor Solutions OS, Bohan Contracting, and Cogniify are Kaleos clients. Their three testimonials are client quotes for a proof section.

**Not one of them is confirmed yet.** Every quote is currently a draft written for the client to approve, edit, or replace, marked `"quote_status": "needs_confirmation"` in the JSON. Treat the text as realistic length and tone for layout, and treat the words as placeholder. Any testimonial whose `quote_status` is not `"confirmed"` is not ready to publish. Logan will update the file when a client confirms, and the confirmation also covers permission to show their name, title, and logo. The Bohan entry is also missing the name and title of the person giving it.

## How to treat the other two logos

Harvard Business School and Claude are not clients and do not endorse Kaleos.

- **Harvard Business School** is where Logan designed and deployed AI systems before founding Kaleos. It is a background credential. HBS policy largely prohibits its logo on an outside company's website or next to that company's logo, so if the shield appears at all it must sit in a clear "background" or "about Logan" context, in black or crimson only, unaltered, and never in a client wall. Plain text ("Harvard Business School") is the safe default. Guidelines: https://www.hbs.edu/marketing/logos.html and https://www.hbs.edu/about/campus-and-culture/policies/use-of-harvard-name-and-logo.
- **Claude** (by Anthropic) is the model Kaleos builds with. Present it as a tool in the stack, not as a partner or a client. Use the official press kit files unaltered: https://www.anthropic.com/press-kit.

Both need a label or context that makes the relationship clear, for example "Built with" for Claude and "Background" or "Previously at" for HBS, and neither should share a row with the client logos.

## What is missing

- Cogniify: no clean logo exists online. The two low-resolution copies in `logos/reference-only/` are for reference only. A vector has been requested from the client.
- Headshots: none collected yet. `headshot` is `null` in the JSON for all three.
