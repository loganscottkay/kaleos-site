import type { Metadata } from 'next'
import { NavBar, CALENDLY, CTA } from '@/components/NavBar'
import { Footer } from '@/components/Footer'
import { Reveal } from '@/components/Reveal'
import { FAQ } from '@/components/FAQ'
import { AuditForm } from '@/components/AuditForm'

export const metadata: Metadata = {
  title: 'Assessment',
  description:
    'A two-week operational assessment: every workflow mapped, the opportunities ranked, and a roadmap for the first system. Then a 30-minute call to decide together.',
  alternates: { canonical: 'https://www.kaleoshq.com/audit' },
  openGraph: {
    title: 'Assessment | KALEOS',
    description: 'A two-week operational assessment: every workflow mapped, the opportunities ranked, and a roadmap for the first system.',
    url: 'https://www.kaleoshq.com/audit',
  },
}

const deliverables = [
  { t: 'Operational workflow map', d: 'Every workflow that eats senior time, drawn start to finish, with the judgment calls marked.' },
  { t: 'Readiness read across every function', d: 'Where the data, the process, and the people are ready for a system, and where they are not yet.' },
  { t: 'Ranked opportunity matrix', d: 'Each candidate workflow scored on impact and complexity, so the first build is the obvious one.' },
  { t: 'Roadmap for the first system', d: 'What gets built first, what number it is expected to move, and what comes after it proves out.' },
  { t: 'Executive summary and a 45-minute walkthrough', d: 'A short PDF and a live session to go through it and decide.' },
]

const tiers = [
  { name: 'Assessment', what: 'The starting point. A deep read of your operation and a plan.', includes: 'Workflow map, readiness read, ranked matrix, roadmap, executive summary.', timeline: 'Delivered within two weeks.' },
  { name: 'Implementation', what: 'The assessment plus the build. One system, scoped, shipped, in production.', includes: 'Everything in Assessment, plus design, build, testing, and deployment of the first system with human approval built in.', timeline: 'First system live by day 30.' },
  { name: 'Strategic partner', what: 'Ongoing implementation with senior attention.', includes: 'Continuous builds, priority response, and quarterly reviews tied to your business goals.', timeline: 'Ongoing.' },
]

const rowLabel = 'py-5 pr-6 align-top font-mono text-[0.72rem] font-normal uppercase tracking-[0.18em] text-ash'

export default function AuditPage() {
  return (
    <main className="min-h-screen bg-void text-star">
      <NavBar />

      <section className="mx-auto max-w-[88rem] px-5 pb-20 pt-36 md:px-8 md:pb-28 md:pt-48">
        <div className="grid gap-12 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <p className="eyebrow text-ash">Assessment</p>
            <h1 className="mt-6 max-w-[12ch] text-h1">
              Two weeks. Every workflow mapped. <span className="cosmic-outline">One clear first move.</span>
            </h1>
          </div>
          <div className="md:col-span-4">
            <p className="measure text-body-lg text-mist">
              We map how your business actually runs, rank where a system would matter most, and hand you a roadmap for the first one. Then we decide together on a call.
            </p>
            <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="btn btn-star btn-lg mt-8">{CTA}</a>
          </div>
        </div>
      </section>

      <section className="border-t border-line" aria-labelledby="deliverables-heading">
        <div className="mx-auto grid max-w-[88rem] gap-12 px-5 py-20 md:grid-cols-12 md:px-8 md:py-28">
          <div className="md:col-span-4">
            <Reveal>
              <p className="eyebrow text-ash">What you get</p>
              <h2 id="deliverables-heading" className="mt-5 max-w-[12ch] text-h2">Five things, in writing.</h2>
            </Reveal>
          </div>
          <ol className="md:col-span-7 md:col-start-6">
            {deliverables.map((d, i) => (
              <li key={d.t} className="last:border-b last:border-line">
                <Reveal delay={i * 70} className="rule grid gap-3 py-6 md:grid-cols-12">
                  <span className="font-display text-[1.5rem] font-bold cosmic-outline-nebula md:col-span-2">0{i + 1}</span>
                  <div className="md:col-span-10">
                    <h3 className="text-h3">{d.t}</h3>
                    <p className="mt-2 max-w-xl text-body text-mist">{d.d}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-line" aria-labelledby="tiers-heading">
        <div className="mx-auto max-w-[88rem] px-5 py-20 md:px-8 md:py-28">
          <Reveal>
            <p className="eyebrow text-ash">How engagements work</p>
            <h2 id="tiers-heading" className="mt-5 max-w-[18ch] text-h2">Three ways to work together. No packages off a shelf.</h2>
          </Reveal>
          <Reveal delay={100}>
            <div className="mt-14 overflow-x-auto">
              <table className="w-full min-w-[40rem] border-collapse text-left">
                <thead>
                  <tr className="border-b border-line">
                    <th scope="col" className="w-1/4 py-4 pr-6"> </th>
                    {tiers.map((t) => (
                      <th key={t.name} scope="col" className="py-4 pr-6 align-bottom font-display text-h3 font-semibold text-star">{t.name}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {(['what', 'includes', 'timeline'] as const).map((row) => (
                    <tr key={row}>
                      <th scope="row" className={rowLabel}>{row === 'what' ? 'What it is' : row === 'includes' ? 'Includes' : 'Timeline'}</th>
                      {tiers.map((t) => (
                        <td key={t.name} className="py-5 pr-6 align-top text-body text-star">{t[row]}</td>
                      ))}
                    </tr>
                  ))}
                  <tr>
                    <th scope="row" className={rowLabel}>Pricing</th>
                    <td colSpan={3} className="py-5 text-body text-mist">
                      Scoped to your business and quoted on a call once we understand the work. A real number, not a rate card.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-line" aria-labelledby="faq-heading">
        <div className="mx-auto grid max-w-[88rem] gap-12 px-5 py-20 md:grid-cols-12 md:px-8 md:py-28">
          <div className="md:col-span-4">
            <Reveal>
              <p className="eyebrow text-ash">Questions</p>
              <h2 id="faq-heading" className="mt-5 max-w-[12ch] text-h2">Asked before every engagement.</h2>
            </Reveal>
          </div>
          <div className="md:col-span-7 md:col-start-6">
            <Reveal delay={80}><FAQ /></Reveal>
          </div>
        </div>
      </section>

      <section id="contact" className="border-t border-line" aria-labelledby="form-heading">
        <div className="mx-auto grid max-w-[88rem] gap-12 px-5 py-20 md:grid-cols-12 md:px-8 md:py-28">
          <div className="md:col-span-4">
            <Reveal>
              <p className="eyebrow text-ash">Or write first</p>
              <h2 id="form-heading" className="mt-5 max-w-[12ch] text-h2">
                Tell us what is <span className="cosmic-outline">eating your week.</span>
              </h2>
              <p className="mt-6 max-w-sm text-body text-mist">
                The call is the fastest route. If you would rather start in writing, this lands in our inbox and you hear back within a day.
              </p>
            </Reveal>
          </div>
          <div className="md:col-span-7 md:col-start-6">
            <Reveal delay={80}><AuditForm /></Reveal>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
