import { NavBar } from '@/components/NavBar'
import { Footer } from '@/components/Footer'
import { AnimateIn } from '@/components/AnimateIn'
import { GateRule } from '@/components/GateRule'

const problems = [
  {
    label: 'PROBLEM 01',
    title: 'The owner is the database',
    problem:
      'Every price, every customer detail, every next step lives in your head or a spreadsheet only you understand. The business cannot move without you, and neither can a day off.',
    build:
      'One operating system that holds it for you. Client records, project status, and history in one place, kept current by agents instead of by your evenings.',
  },
  {
    label: 'PROBLEM 02',
    title: 'Follow-ups fall through',
    problem:
      'Leads go quiet, quotes sit unanswered, invoices age out of mind. Nobody dropped the ball on purpose. There were just too many balls.',
    build:
      'Agents that watch the pipeline and draft every follow-up at the right moment. You approve, it sends, it is logged.',
  },
  {
    label: 'PROBLEM 03',
    title: 'Repetitive admin eats the week',
    problem:
      'Status updates, reports, data entry, copying the same numbers between tools. Hours of it, every week, done by the most expensive person in the company.',
    build:
      'Agents do the repetitive part. Humans make the calls. Everything is logged, and your week comes back.',
  },
  {
    label: 'PROBLEM 04',
    title: 'Nobody knows where things stand',
    problem:
      'Project status lives in asking somebody, and the somebody is usually you. Clients call because the answer is faster than the portal they do not have.',
    build:
      'Live dashboards and client portals that answer the question before it is asked, fed by the same system that runs the work.',
  },
  {
    label: 'PROBLEM 05',
    title: 'Reporting is manual and always stale',
    problem:
      'The numbers exist, scattered across five tools, and assembling them is a Sunday job. By the time the report is done it describes last month.',
    build:
      'Reports that assemble themselves from live data, on a schedule, with an agent-drafted summary waiting for your review.',
  },
]

export default function WhatWeFixPage() {
  return (
    <main className="min-h-screen">
      <NavBar />

      {/* Hero */}
      <section className="relative bg-paper pt-36 pb-16">
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl font-medium tracking-tight mb-6 text-ink">
            What we fix
          </h1>
          <p className="hero-rise hero-rise-1 text-lg text-slate-600 leading-relaxed">
            Most businesses run on the same three tools: spreadsheets, email,
            and somebody&apos;s memory. It works until it doesn&apos;t. These
            are the problems we get asked about most, and they barely change
            from one industry to the next.
          </p>
        </div>
      </section>

      {/* Five problem blocks, gate rule between each */}
      <section className="relative py-24 bg-paper">
        <div className="relative max-w-3xl mx-auto px-4">
          {problems.map((item, i) => (
            <div key={item.label}>
              <AnimateIn delay={i === 0 ? 0 : 100}>
                <div className="py-10 first:pt-0 last:pb-0">
                  <p className="font-system text-accent text-xs tracking-widest uppercase mb-3">
                    {item.label}
                  </p>
                  <h2 className="text-2xl sm:text-3xl font-medium tracking-tight mb-4 text-ink">
                    {item.title}
                  </h2>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    {item.problem}
                  </p>
                  <p className="text-navy leading-relaxed">{item.build}</p>
                </div>
              </AnimateIn>
              {i < problems.length - 1 && <GateRule />}
            </div>
          ))}

          <GateRule />

          <AnimateIn>
            <p className="text-slate-500 text-center leading-relaxed mt-10 max-w-2xl mx-auto">
              We have built these systems for services firms, trades
              businesses, and agencies. The problems barely change; the fix
              is always shaped to how you already work.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 bg-navy">
        <div className="relative max-w-6xl mx-auto px-4 text-center">
          <AnimateIn>
            <p className="font-system text-mist text-xs tracking-widest uppercase mb-6">
              Nothing ships without your approval. Every action is logged.
            </p>
            <h2 className="text-3xl sm:text-4xl font-medium tracking-tight mb-8 text-white">
              Which of these is costing you the most?
            </h2>
          </AnimateIn>
          <AnimateIn delay={150}>
            <a
              href="https://calendly.com/logan-kaleoshq/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-3.5 rounded-lg bg-accent text-white font-medium transition-colors duration-300 hover:bg-teal-700"
            >
              Book a Discovery Call
            </a>
          </AnimateIn>
        </div>
      </section>

      <Footer />
    </main>
  )
}
