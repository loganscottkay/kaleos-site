import type { Metadata } from 'next'
import Image from 'next/image'
import { NavBar, CALENDLY, CTA, LINKEDIN } from '@/components/NavBar'
import { Footer } from '@/components/Footer'
import { Reveal } from '@/components/Reveal'
import { Words } from '@/components/Words'
import { Rim } from '@/components/home/Rim'
import { Starfield } from '@/components/home/Starfield'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Kaleos HQ was founded by Logan Kay, who previously designed and deployed AI systems at Harvard Business School. One rule runs the firm: a person signs before anything ships.',
  alternates: { canonical: 'https://www.kaleoshq.com/about' },
  openGraph: {
    title: 'About | Kaleos HQ',
    description: 'Kaleos HQ was founded by Logan Kay, who previously designed and deployed AI systems at Harvard Business School.',
    url: 'https://www.kaleoshq.com/about',
    images: ['/og-kaleos-hq.png'],
  },
}

const background = [
  { k: 'Now', v: 'Founder and CEO, Kaleos HQ' },
  { k: 'Anthropic', v: 'Claude Corps Fellow, Cohort 1' },
  { k: 'Previously', v: 'Designed and deployed AI systems across admissions and operations at Harvard Business School. The implementation method Kaleos HQ runs today comes from that work.' },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-void text-star">
      <NavBar />

      <section className="relative isolate overflow-hidden">
        <Starfield density={0.00008} shooting={false} />
        <div className="relative mx-auto max-w-[88rem] px-5 pb-20 pt-36 md:px-8 md:pb-28 md:pt-48">
          <h1 className="mt-6 max-w-[12ch] text-h1">
            A firm built on <span className="glint">one rule</span>
          </h1>
          <p className="mt-8 max-w-[34rem] text-body-lg text-mist">
            A person signs before anything ships, and everything else at Kaleos HQ follows from that.
          </p>
        </div>
      </section>

      <section className="horizon">
        <div className="mx-auto grid max-w-[88rem] gap-12 px-5 py-20 md:grid-cols-12 md:px-8 md:py-28">
          <div className="md:col-span-4">
            <Reveal>
              <div className="surface-nova aspect-square w-full max-w-sm rounded-[14px]">
                <Image
                  src="/photo.png"
                  alt="Logan Kay, founder of Kaleos HQ"
                  width={640}
                  height={640}
                  className="aspect-square w-full rounded-[14px] object-cover grayscale"
                  priority
                />
              </div>
              <p className="mt-5 font-display text-body font-semibold text-star">Logan Kay</p>
              <p className="text-caption text-mist">Founder and CEO</p>
              <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block py-1 text-caption text-mist underline decoration-line underline-offset-4 hover:text-star">LinkedIn</a>
            </Reveal>
          </div>
          <div className="md:col-span-7 md:col-start-6">
            <Reveal>
              <div className="space-y-6 text-body-lg leading-[1.55] text-star">
                <p>
                  Kaleos HQ exists because wanting AI and running AI are different problems. Most companies that start with AI never get past the demo. The technology rarely fails. What fails is the connection between the tool and how the business actually operates.
                </p>
                <p>
                  We close that gap the slow way. We map the workflows first, design one system tied to one number, ship it with a person at the gate, and prove it moved the number before we build anything else.
                </p>
                <p>
                  The method comes from Logan&apos;s work at Harvard Business School, where he designed and deployed AI systems across admissions and operations. The systems Kaleos HQ ships for clients run on the same architecture Kaleos HQ uses to run itself.
                </p>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <dl className="mt-16 divide-y divide-line border-y border-line">
                {background.map((b) => (
                  <div key={b.k} className="grid gap-2 py-5 md:grid-cols-4">
                    <dt className="eyebrow text-ash">{b.k}</dt>
                    <dd className="text-body text-star md:col-span-3">{b.v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </section>

      {/* What we hold to. Prose, not a grid. */}
      <section className="horizon relative overflow-hidden" aria-labelledby="hold-heading">
        <div aria-hidden="true" data-fx="comet" className="comet left-[8%] top-[12%] -rotate-[7deg]" />
        <div className="relative mx-auto max-w-[88rem] px-5 py-20 md:px-8 md:py-28">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-5">
              <Reveal>
                <Words as="h2" id="hold-heading" className="mt-5 block max-w-[10ch] text-h2">
                  The method is the product
                </Words>
              </Reveal>
            </div>
            <div className="md:col-span-6 md:col-start-7">
              <Reveal delay={100}>
                <div className="space-y-7 text-body-lg leading-[1.55] text-mist">
                  <p>
                    Tools change every quarter. What does not change is the decision, made before anything is built, about which workflow deserves a system and what number it has to move. That decision is most of the work, and it is the part almost everyone skips.
                  </p>
                  <p>
                    So we take <span className="text-star">one outcome at a time.</span> We build one system, tie it to one number, and read the result. Then we choose the next workflow based on what the first one proved rather than on what sounded exciting in the kickoff.
                  </p>
                  <p>
                    And on every one of them, <span className="text-star">a person signs.</span> Nothing executes without human approval. The system extends your judgment rather than replacing it, and we will not build one that tries.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden">
        <Rim />
        <div className="relative mx-auto flex max-w-[88rem] flex-col items-start gap-8 px-5 py-24 md:flex-row md:items-center md:justify-between md:px-8 md:py-32">
          <h2 className="max-w-[16ch] text-h2">Curious whether this fits your business</h2>
          <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="btn btn-star btn-lg">{CTA}</a>
        </div>
      </section>

      <Footer />
    </main>
  )
}
