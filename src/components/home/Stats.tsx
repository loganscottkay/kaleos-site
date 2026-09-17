import { Reveal } from '@/components/Reveal'
import { CountUp } from '@/components/CountUp'
import { Words } from '@/components/Words'

/* The implementation gap, in numbers a buyer can check. Each figure links to
   its original source. Each one sits next to the part of the method that
   answers it. Labels differ on purpose: projects, initiatives, and people
   are not the same measure. */

const stats = [
  {
    value: 42,
    suffix: '%',
    claim: 'of companies abandoned most of their AI initiatives before they reached production.',
    detail: 'Up from 17% a year earlier. The average organization scrapped 46% of its proofs of concept.',
    source: 'S&P Global, 2025',
    href: 'https://www.spglobal.com/market-intelligence/en/news-insights/research/2025/10/generative-ai-shows-rapid-growth-but-yields-mixed-results',
    answer: 'Our first system is live by day 30, with you at the gate.',
  },
  {
    value: 40,
    prefix: 'over ',
    suffix: '%',
    claim: 'of agentic AI projects will be canceled by the end of 2027.',
    detail: 'Gartner names the causes as escalating costs, unclear business value, and inadequate risk controls.',
    source: 'Gartner, June 2025',
    href: 'https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027',
    answer: 'We scope every system to one number, put a person at the gate, and log every action.',
  },
  {
    value: 66,
    suffix: '%',
    claim: 'of people rely on AI output without checking whether it is accurate.',
    detail: '56% say they have made mistakes in their work because of it. Only 46% are willing to trust AI systems at all.',
    source: 'KPMG and the University of Melbourne, 2025',
    href: 'https://kpmg.com/xx/en/media/press-releases/2025/04/trust-of-ai-remains-a-critical-challenge.html',
    answer: 'Nothing our systems produce goes out without a person signing off.',
  },
]

export function Stats() {
  return (
    <section id="gap" className="horizon" aria-labelledby="gap-heading">
      <div className="mx-auto max-w-[88rem] px-5 py-24 md:px-8 md:py-36">
        <div className="grid gap-10 md:grid-cols-12 md:items-end">
          <Reveal className="md:col-span-7">
            <Words as="h2" id="gap-heading" className="block max-w-[16ch] text-h2">
              Most AI never leaves the slide deck
            </Words>
          </Reveal>
          <Reveal delay={100} className="md:col-span-4 md:col-start-9">
            <p className="text-body-lg text-mist">
              The technology rarely fails. What fails is the connection between the tool and how the business actually runs. The numbers below come from the research firms buyers already trust, and each links to its source.
            </p>
          </Reveal>
        </div>

        <ol className="mt-20 space-y-16 md:mt-28 md:space-y-24">
          {stats.map((s, i) => (
            <li key={s.source}>
              <Reveal variant={i % 2 === 0 ? 'left' : 'right'}>
                <div className={`grid gap-8 md:grid-cols-12 md:items-start ${i % 2 === 1 ? 'md:[&>*:first-child]:col-start-6' : ''}`}>
                  <div className="md:col-span-5">
                    <div className="font-display text-[clamp(4rem,10vw,9rem)] font-extrabold leading-none tracking-[-0.04em] text-star">
                      {s.prefix && <span className="mr-3 align-baseline text-[0.28em] font-semibold tracking-normal text-mist">{s.prefix.trim()}</span>}
                      <CountUp value={s.value} suffix={s.suffix} />
                    </div>
                    <p className="mt-4 max-w-[26ch] text-h3 font-semibold text-star">{s.claim}</p>
                    <p className="mt-4 max-w-md text-body text-mist">{s.detail}</p>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block font-mono text-[0.72rem] uppercase tracking-[0.16em] text-comet underline decoration-comet/40 underline-offset-4 hover:decoration-comet">
                      Source: {s.source}
                    </a>
                  </div>
                  <div className={`md:col-span-5 ${i % 2 === 1 ? 'md:col-start-1 md:row-start-1' : 'md:col-start-8'} md:pt-6`}>
                    <p className="max-w-[24ch] font-display text-h3 font-semibold leading-snug text-star">
                      <span className="glint">{s.answer}</span>
                    </p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal>
          <p className="mt-20 max-w-2xl text-body text-mist md:mt-28">
            In McKinsey&apos;s 2025 survey, 64% of organizations said AI enables innovation, while 39% reported an effect on enterprise earnings. The ones that did were nearly three times as likely to have redesigned individual workflows first, which is where every KALEOS engagement begins.{' '}
            <a href="https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai" target="_blank" rel="noopener noreferrer" className="text-comet underline decoration-comet/40 underline-offset-4 hover:decoration-comet">
              Source: McKinsey, 2025
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  )
}
