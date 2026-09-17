import Image from 'next/image'
import Link from 'next/link'
import { Reveal } from '@/components/Reveal'

/* One line about the person at the gate. The name goes to the About page. */
export function Founder() {
  return (
    <section className="horizon" aria-label="Founder">
      <div className="mx-auto max-w-[88rem] px-5 py-16 md:px-8 md:py-24">
        <Reveal>
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-10">
            <Link href="/about" className="shrink-0" aria-label="About Logan Kay">
              <Image src="/photo.png" alt="" width={96} height={96} className="h-20 w-20 rounded-full object-cover grayscale md:h-24 md:w-24" />
            </Link>
            <p className="max-w-3xl font-display text-[1.35rem] font-semibold leading-snug text-star md:text-[1.75rem]">
              <Link href="/about" className="underline decoration-comet/60 decoration-2 underline-offset-[0.2em] hover:decoration-comet">Logan Kay</Link>
              {' '}founded KALEOS after designing and deploying AI systems across admissions and operations at Harvard Business School. He is a <span className="glint-ember">Claude Corps Fellow at Anthropic</span>.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
