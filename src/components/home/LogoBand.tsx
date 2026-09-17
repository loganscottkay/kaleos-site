import Image from 'next/image'
import { marks } from '@/components/home/marks'

/* Where the method comes from and what the systems are built on. One line
   that drifts left, pauses under the pointer, and lays out as a wrapped row
   under reduced motion. Each name is spelled out next to its mark so nothing
   depends on recognizing an icon. */

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

function Mark({ item }: { item: Item }) {
  return (
    <span className="band-item font-display text-[1.05rem] font-semibold tracking-[-0.01em]">
      {item.mark && (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d={item.mark} /></svg>
      )}
      {item.img && (
        <Image src={item.img} alt="" width={20} height={24} className="brightness-0 invert" aria-hidden="true" />
      )}
      {item.name}
    </span>
  )
}

export function LogoBand() {
  return (
    <section aria-label="Where the method comes from and what we build with" className="relative py-10 md:py-14">
      <div className="band">
        <div className="band-track">
          {items.map((item) => <Mark key={item.name} item={item} />)}
        </div>
        <div className="band-track" aria-hidden="true">
          {items.map((item) => <Mark key={item.name} item={item} />)}
        </div>
      </div>
    </section>
  )
}
