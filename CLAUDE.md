# Kaleos — AI Skill Deployment Agency
# Owner: Logan Kay
## Communication Style
I am a non-technical builder. When making changes or doing anything technical, explain what you're doing in plain language so I understand. Give me tips and shortcuts whenever possible. No jargon unless you explain it.
## About Logan
- Studied hospitality, data science, and developed deep expertise in AI/LLM tools at Boston University
- Worked in AI & Operations at Harvard Business School, spearheading AI implementation initiatives across multiple teams
- Previously did fraud detection at K2 Integrity analyzing 2M+ financial transactions
- Deep expertise in using AI tools and APIs to build agentic software
- Founder of Kaleos
## What Kaleos Does
Builds AI systems that automate repetitive business work for small businesses (10-50 employees), professional services firms, marketing/creative agencies, and consulting firms. Scoped to specific workflows, trained on actual client documents and processes.
## Brand Voice
- Casual, direct, confident. Like explaining over coffee
- No corporate jargon, no buzzwords, no em dashes anywhere
- Never say "we're still learning" or anything that undermines confidence
- Specific over vague. Say what we'd actually do, not abstract promises
- No bullet points in conversational content
## Monetization
- AI Ops Audit: $1,500
- Custom AI System Builds: $5K-$10K
- Ongoing Retainer: $3K-$7K/month
- No founding rate or discount pricing in any public content. Discounts offered privately on calls only
## Tech Stack
- Framework: Next.js App Router + Tailwind CSS
- Database: Supabase (project ref: fxykyvdnastatdddzoxg)
- Hosting: Vercel (auto-deploys from GitHub push to main)
- Domain: kaleoshq.com (Namecheap)
- Email: Google Workspace (logan@kaleoshq.com)
- Lead notifications: Supabase Edge Function + Resend API
- Chatbot: OpenAI GPT-4o via /api/chat route (OPENAI_API_KEY in Vercel env vars)
## Project Structure
- src/app/page.tsx — Homepage
- src/app/audit/page.tsx — Audit page with intake form
- src/app/about/page.tsx — About page
- src/app/blog/ — Blog posts
- src/app/api/chat/route.ts — OpenAI proxy for chatbot
- src/components/TalkToLogan.jsx — AI chatbot widget
- src/components/NavBar.tsx — Nav with K logo + Kaleos text
- src/components/AuditForm.tsx — Lead capture form
- public/photo.png — Logan's headshot
- public/kaleos-logo.png — K logo mark
## Design System
- Colors: Navy #1B2A4A, Teal #0d9488, warm whites, glass transparency
- Typography: Playfair Display (headings), Inter (body)
- Glassmorphic frosted cards, mountain landscape hero, alternating light/dark sections
- Subtle staggered animations, no flashy motion
## Chatbot (Talk to Logan)
- Floating button bottom-right on every page with Logan's photo
- Opens dark glassmorphic chat panel
- System prompt speaks as Logan in first person
- After 3 exchanges shows CTAs: Book a free call (Calendly) + Email me a breakdown
- Easter egg: "chungus aioli" returns "Congratulations you have unlocked mollick doing tricks on it"
## Commands
- npm run dev — local dev
- npm run build — production build
- git push origin main — triggers Vercel deploy
## Hard Rules
1. Never say "we're still learning" in client-facing content
2. Human approval messaging on everything
3. No autonomous AI claims
4. No em dashes in any copy
5. No founding rate or discount pricing in public content
6. Never use "vibe coder" in client-facing material
7. Never say "intern" when referencing HBS work
8. Don't mention college major unless specifically asked
## Known Projects
- Kaleos website: ~/kaleos-site (cd there when making site changes, read the CLAUDE.md, make changes, commit and push)
## Slash Commands
- /linkedin — Create a LinkedIn post (interview me, research AI news, draft post, casual/direct tone, soft CTA)
- /tweet — Create X/Twitter content (interview me, research AI news, write thread or standalone tweet, sharp/opinionated tone)
