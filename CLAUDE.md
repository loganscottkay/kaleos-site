# Kaleos — AI Skill Deployment Agency

## Project
- Premium 3-page website (Home, Audit, About)
- Stack: Next.js App Router, Tailwind CSS, Supabase, Vercel
- Domain: kaleoshq.com
- Brand colors: Navy #1B2A4A, Teal accent #0d9488, white/glass cards

## Architecture
- src/app/page.tsx — Home
- src/app/audit/page.tsx — Audit page with intake form
- src/app/about/page.tsx — About page
- src/lib/supabase.ts — Supabase client
- src/components/ — Reusable components (NavBar, Footer, GlassCard, DemoFrame)

## Supabase
- Project: kaleos (fxykyvdnastatdddzoxg)
- Table: leads (name, email, company, pain_type, desired_outcome, created_at)
- RLS enabled with public insert policy

## Design Rules
- Glassmorphic frosted cards on dark section backgrounds
- Serif headings (Playfair Display), sans-serif body
- Subtle staggered animations, no flashy motion
- Alternating light/dark sections for rhythm
- No em dashes in copy
- No AI jargon — write like explaining to a friend

## Voice
- Casual, direct, confident
- No corporate speak
- No "structured skill deployment" or "operator" in client copy
- Plain language about saving time and money

## Monetization
- Audit: $1,500 (founding rate $750)
- Setup: $5K-$10K
- Retainer: $3K-$7K/month

## Commands
- npm run dev — local development
- npm run build — production build
- git push — triggers Vercel deploy

## Hard Rules
- Never say "we're still learning" in any client-facing content
- Human approval messaging on everything
- No autonomous AI claims
- Keep it real and specific
