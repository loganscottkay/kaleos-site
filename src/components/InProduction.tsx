import { GlassCard } from '@/components/GlassCard'
import { Reveal, SpotlightGroup } from '@/components/Reveal'
import { GateRule } from '@/components/GateRule'

const systems = [
  {
    label: 'Coaching Platform',
    desc: 'A multi-tenant coaching and accountability platform for a professional services firm, live in production with full data isolation and human-approval workflows.',
  },
  {
    label: 'Client Portal',
    desc: 'A client-facing project portal for a project-based services business. Clients see live project status, milestones, and documents without a single status-update phone call.',
  },
  {
    label: 'Outreach Engine',
    desc: 'An AI outreach and lead-qualification engine with approval gates on every send. It drafts, a human approves, and every action lands in the audit log.',
  },
]

export function InProduction() {
  return (
    <section className="atmos py-16 md:py-24 bg-paper">
      <div className="atmos-layer atmos-grid-paper parallax-slow" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4">
        <Reveal>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-x-12 gap-y-6 items-end mb-16">
            <div className="md:col-span-6">
              <p className="font-system text-approved-text text-caption tracking-widest mb-3 uppercase inline-flex items-center gap-2">
                <span
                  className="status-dot inline-block w-1.5 h-1.5 rounded-full bg-accent"
                  aria-hidden="true"
                />
                In production
              </p>
              <h2 className="text-h2 font-medium text-ink">
                Systems we have built and shipped.
              </h2>
              <div className="mt-6">
                <GateRule align="start" />
              </div>
            </div>
            <p className="md:col-span-5 md:col-start-8 text-slate-600 text-body">
              Not pilots. Not proofs of concept. Working software that real
              businesses run on every day, each one with human approval built
              into the loop.
            </p>
          </div>
        </Reveal>

        <SpotlightGroup className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {systems.map((item, i) => (
            <Reveal key={item.label} delay={i * 90} className="h-full">
              <GlassCard
                light
                hover
                className="spotlight spotlight-paper lift lift-paper p-8 h-full"
              >
                <div className="flex items-baseline justify-between gap-4 mb-3">
                  <p className="font-system text-approved-text text-caption tracking-widest uppercase">
                    {item.label}
                  </p>
                  <span
                    className="font-system numeral text-caption text-muted-text/60"
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <p className="text-slate-600 text-body">{item.desc}</p>
              </GlassCard>
            </Reveal>
          ))}
        </SpotlightGroup>

        <Reveal delay={240}>
          <p className="text-muted-text text-center text-caption mt-12 max-w-2xl mx-auto">
            The same discipline behind AI initiatives at Harvard Business
            School, applied to businesses like yours.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
