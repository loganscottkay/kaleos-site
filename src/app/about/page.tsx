import type { Metadata } from 'next'
import Image from 'next/image'
import { NavBar, CALENDLY } from '@/components/NavBar'
import { Footer } from '@/components/Footer'
import { Reveal } from '@/components/Reveal'
import { KMark } from '@/components/KMark'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Kaleos HQ was founded by Logan Kay, who previously designed and deployed AI systems at Harvard Business School. One rule runs the firm: a person signs before anything ships.',
  alternates: { canonical: 'https://www.kaleoshq.com/about' },
  openGraph: {
    title: 'About | Kaleos HQ',
    description:
      'Kaleos HQ was founded by Logan Kay, who previously designed and deployed AI systems at Harvard Business School.',
    url: 'https://www.kaleoshq.com/about',
  },
}

const background = [
  { k: 'Now', v: 'Founder and CEO, Kaleos HQ' },
  { k: 'Next', v: 'Incoming, Anthropic' },
  { k: 'Previously', v: 'Designed and deployed AI systems across admissions and operations at Harvard Business School. The implementation method Kaleos runs today comes from that work.' },
  { k: 'Before that', v: 'Fraud detection at K2 Integrity, analyzing more than two million financial transactions.' },
  { k: 'Studied', v: 'Boston University' },
]

const principles = [
  {
    title: 'Method over tools.',
    body: 'Strategy decides what gets built. The tools change every quarter. The method is the product.',
  },
  {
    title: 'One outcome at a time.',
    body: 'One system, one number, clear results. Then the next workflow, based on what the first one proved.',
  },
  {
    title: 'A person signs.',
    body: 'Nothing executes without human approval. The system amplifies your judgment. It never replaces it.',
  },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-paper text-ink">
      <NavBar theme="light" />

      <section className="mx-auto max-w-[88rem] px-5 pb-20 pt-36 md:px-8 md:pb-28 md:pt-48">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-8">
            <p className="eyebrow text-slate">About</p>
            <h1 className="mt-6 max-w-[14ch] text-h1 font-light tracking-tightest">
              A firm built on one rule: a person signs before anything ships.
            </h1>
          </div>
        </div>
      </section>

      <section className="border-t border-line-light">
        <div className="mx-auto grid max-w-[88rem] gap-12 px-5 py-20 md:grid-cols-12 md:px-8 md:py-28">
          <div className="md:col-span-4">
            <Reveal>
              <Image
                src="/photo.png"
                alt="Logan Kay, founder of Kaleos HQ"
                width={640}
                height={640}
                className="aspect-square w-full max-w-sm rounded-[14px] object-cover grayscale"
                priority
              />
              <p className="mt-5 text-body text-ink">Logan Kay</p>
              <p className="text-caption text-slate">Founder and CEO</p>
            </Reveal>
          </div>
          <div className="md:col-span-7 md:col-start-6">
            <Reveal>
              <div className="space-y-6 text-body-lg font-light leading-[1.55] text-ink">
                <p>
                  Kaleos HQ exists because wanting AI and running AI are different problems. Most companies that start with AI never get past the demo. Not because the technology fails, but because nobody connected it to how the business actually operates.
                </p>
                <p>
                  We close that gap the slow way: map the workflows first, design one system tied to one number, ship it with a person at the gate, and prove it moved the number before building anything else.
                </p>
                <p>
                  The method comes from Logan&apos;s work at Harvard Business School, where he designed and deployed AI systems across admissions and operations. The systems Kaleos ships for clients run on the same architecture Kaleos uses to run itself.
                </p>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <dl className="mt-16 divide-y divide-line-light border-y border-line-light">
                {background.map((b) => (
                  <div key={b.k} className="grid gap-2 py-5 md:grid-cols-4">
                    <dt className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-slate">{b.k}</dt>
                    <dd className="text-body text-ink md:col-span-3">{b.v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-t border-line-light" aria-labelledby="principles-heading">
        <div className="mx-auto max-w-[88rem] px-5 py-20 md:px-8 md:py-28">
          <Reveal>
            <p className="eyebrow text-slate">How we are different</p>
            <h2 id="principles-heading" className="mt-5 max-w-[16ch] text-h2 font-light">
              Three commitments, kept on every engagement.
            </h2>
          </Reveal>
          <ol className="mt-14 grid gap-px bg-line-light md:grid-cols-3">
            {principles.map((p, i) => (
              <li key={p.title} className="bg-paper">
                <Reveal delay={i * 90} className="h-full p-6 md:p-8">
                  <span className="font-mono text-[0.72rem] tracking-[0.18em] text-slate">0{i + 1}</span>
                  <h3 className="mt-5 text-h3 font-light">{p.title}</h3>
                  <p className="mt-4 text-body text-slate">{p.body}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-line-light">
        <div className="mx-auto flex max-w-[88rem] flex-col items-start gap-8 px-5 py-20 md:flex-row md:items-center md:justify-between md:px-8 md:py-28">
          <div className="flex items-center gap-6">
            <KMark className="h-12 w-auto text-ink" />
            <h2 className="text-h2 font-light">Want to see if it fits your business?</h2>
          </div>
          <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="btn btn-ink btn-lg">
            Book a Discovery Call
          </a>
        </div>
      </section>

      <Footer theme="light" />
    </main>
  )
}
