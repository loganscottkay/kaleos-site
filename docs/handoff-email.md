To: Ryanhazen80@gmail.com
Subject: Kaleos HQ site: repo access and how to get started

Hi Ryan,

The Kaleos HQ site is ready for you. Here is everything you need to get going.

The code lives on GitHub at https://github.com/loganscottkay/kaleos-site. You should have an invitation from GitHub in your inbox. Accept it and you will have write access to the repo. If it has not arrived, send me the email address or username on your GitHub account and I will resend it.

Work on the branch called design-overhaul. It already exists, so once you clone the repo you can check it out and start.

The README in the repo covers local setup step by step, from clone to seeing the site in your browser. It also spells out what is yours to change and what to send to me instead. The short version: everything the visitor sees is yours. Pages, layout, components, styles, fonts, images, logo, favicon, copy, animation, and the theme config. You have full creative license on the front end, including restructuring pages and adding new ones. The only things to leave alone are the API routes, the email and spreadsheet integrations behind the contact form, the environment variables, and the private client page under public/bohan. If you need any of those changed, just tell me what you need and I will handle it.

There is also a design handoff doc at docs/DESIGN-HANDOFF.md with a short brief on the company, the full list of brand assets and where each one is used, the current colors and fonts as a starting point, and a few technical notes worth reading before you start designing. Screenshots of every page as it looks today are in docs/baseline-screenshots.

Every push to your branch gets its own preview link from Vercel automatically, so you can see your work deployed without touching the live site. Push as often as you like. Nothing goes live until I merge.

When you are ready for me to review, open a pull request from design-overhaul into main. I will review, merge, and deploy.

Let me know if anything in the setup does not work on your machine and I will sort it out.

Thanks,
Logan
