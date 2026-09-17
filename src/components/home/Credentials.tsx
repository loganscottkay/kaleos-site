import Image from 'next/image'
import { Reveal } from '@/components/Reveal'

/* Harvard Business School as text only, per its logo policy. Claude as the
   tool the systems are built with, official mark, never a partner. */
export function Credentials() {
  const items = [
    { k: 'Founder', v: 'Logan Kay' },
    { k: 'Previously', v: 'AI at Harvard Business School' },
    { k: 'Next', v: 'Incoming, Anthropic' },
  ]
  return (
    <section id="credentials" className="border-t border-line" aria-label="Credentials">
      <div className="mx-auto grid max-w-[88rem] gap-px bg-line md:grid-cols-4">
        {items.map((it, i) => (
          <Reveal key={it.k} delay={i * 80} className="bg-void">
            <div className="px-5 py-8 md:px-8 md:py-10">
              <p className="eyebrow text-ash">{it.k}</p>
              <p className="mt-3 font-display text-[1.2rem] font-semibold text-star">{it.v}</p>
            </div>
          </Reveal>
        ))}
        <Reveal delay={240} className="bg-void">
          <div className="px-5 py-8 md:px-8 md:py-10">
            <p className="eyebrow text-ash">Built with</p>
            <Image src="/logos/claude-ivory.svg" alt="Claude" width={88} height={20} className="mt-4 h-5 w-auto opacity-90" />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
