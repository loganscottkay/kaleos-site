import Image from 'next/image'
import type { CSSProperties } from 'react'
import { marks } from '@/components/home/marks'

/* Where the method comes from and what the systems are built on, each
   crossing the band on a wide arc like a satellite over a horizon. Names
   are spelled out next to their marks. Under reduced motion it lays flat
   as a wrapped row. */

type Item = { name: string; mark?: string; img?: string }

const items: Item[] = [
  { name: 'Anthropic', mark: marks['Anthropic'] },
  { name: 'Harvard Business School', img: '/logos/harvard-business-school.svg' },
  { name: 'OpenAI' },
  { name: 'Vercel', mark: marks['Vercel'] },
  { name: 'Next.js', mark: marks['Next.js'] },
  { name: 'Supabase', mark: marks['Supabase'] },
  { name: 'Cloudflare', mark: marks['Cloudflare'] },
  { name: 'Airtable', mark: marks['Airtable'] },
  { name: 'Resend', mark: marks['Resend'] },
]

export function LogoBand() {
  const period = 42
  return (
    <section aria-label="Where the method comes from and what we build with" className="relative py-10 md:py-14">
      <ul className="sr-only">
        {items.map((i) => <li key={i.name}>{i.name}</li>)}
      </ul>
      <div className="arc-band mx-auto max-w-[90rem]" aria-hidden="true">
        {items.map((item, i) => (
            <span
              key={item.name}
              className="arc-item font-display text-[1.05rem] font-semibold tracking-[-0.01em]"
              style={{ '--d': `${-(i * period) / items.length}s` } as CSSProperties}
            >
              {item.mark && <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d={item.mark} /></svg>}
              {item.img && <Image src={item.img} alt="" width={20} height={24} />}
              {item.name}
            </span>
        ))}
      </div>
    </section>
  )
}
