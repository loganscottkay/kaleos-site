# LinkedIn and X kit

Generated September 17, 2026 from the supplied K artwork. Black ground, small mark, wordmark, the positioning line, and the domain. The motto is not on the banners on purpose; it stays on the site.

## Safe zones (why the layout is off-center)

LinkedIn puts the profile image over the bottom-left of every banner and crops the sides on phones, so the banners keep the left ~420 px and the bottom ~80 px empty and hold everything inside the region that stays visible:

- Personal profile, 1584 x 396: safe rectangle roughly x 162 to 1544, y 80 to 316; the photo covers about 300 x 300 px at the bottom-left on desktop and more on mobile. Sources: [HyperClapper](https://www.hyperclapper.com/blog-posts/linkedin-cover-photo-size-guide), [usevisuals](https://usevisuals.com/blog/linkedin-banner-size-safe-zones-guide).
- Company page, 1128 x 191: the page logo overlaps the bottom-left; content starts at x 330 and stays above y 160.
- X header, 1500 x 500: the avatar overlaps the bottom-left, so content sits upper-center.

Check on a phone within a few minutes of uploading. If LinkedIn's reposition tool shifts the image, drag it back to the default.

## Files

- `kaleos-logo-400.png` and `kaleos-logo-1024.png`: the page logo. Black square, white K. Use the 400 for LinkedIn and X profile images.
- `linkedin-banner-1584x396.png`: personal profile banner (Logan's own profile).
- `linkedin-banner-1128x191.png`: company page cover, the size LinkedIn asks for on Pages.
- `x-banner-1500x500.png`: X header.

Copies of the banners and the 400 logo also replace the old files in `brand-assets/` so the repo's asset inventory stays true.

## Proposed page copy

**Tagline (under the name):** AI that answers to you.

**About:**

KALEOS is a premium AI implementation practice. We design and ship custom AI systems for businesses that run on real operations: professional services firms, agencies, coaching businesses, and operators up to $100M+ in ARR.

The method comes from founder Logan Kay's work designing and deploying AI systems across admissions and operations at Harvard Business School. Every engagement starts by mapping how your business actually runs. We then scope one system to one number you can measure, ship it inside the tools your team already uses, and put a person at the gate: agents draft, score, and prepare, and nothing reaches a client, an inbox, or a ledger without your sign-off. Every action is logged.

Engagements cover workflow automation, internal AI tools, data pipelines, and training for the people who will run the systems. The first system is in production within thirty days.

Learn more at kaleoshq.com or write to logan@kaleoshq.com.

**Why this reads differently from the current copy.** The old text led with category words ("AI consulting firm", "agentic workflows", "autonomous business systems") and a list of services. The new text leads with who it is for, then the one thing that makes the firm different (a person at the gate, everything logged), then what an engagement contains. "Autonomous" is gone on purpose: the site's whole position is that nothing acts without approval, and the LinkedIn page should say the same thing the website does. Buyers now check a vendor across ChatGPT, Claude, and LinkedIn before they visit the site, and consistency is what they are checking for.

**Specialties field:** AI implementation, workflow automation, internal AI tools, data pipelines, AI training, human-in-the-loop systems.
