import { GlassCard } from '@/components/GlassCard'
import { AnimateIn } from '@/components/AnimateIn'
import { GateRule } from '@/components/GateRule'

const systems = [
  {
    label: 'Coaching Platform',
    desc: 'A multi-tenant coaching and accountability platform for a professional services firm, live in production with full data isolation and human-approval workflows.',
  },
  {
    label: 'Client Portal',
    desc: 'A client-facing project portal for a contracting business. Clients see live project status, milestones, and documents without a single status-update phone call.',
  },
  {
    label: 'Outreach Engine',
    desc: 'An AI outreach and lead-qualification engine with approval gates on every send. It drafts, a human approves, and every action lands in the audit log.',
  },
]

export function InProduction() {
  return (
    <section className="relative py-24 bg-paper">
      <div className="relative max-w-6xl mx-auto px-4">
        <AnimateIn>
          <p className="font-system text-accent text-xs tracking-widest text-center mb-3 uppercase">
            In production
          </p>
          <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-center mb-5 text-ink">
            Systems we have built and shipped.
          </h2>
          <div className="mb-6">
            <GateRule />
          </div>
        </AnimateIn>
        <AnimateIn delay={100}>
          <p className="text-slate-600 text-center max-w-3xl mx-auto mb-14 leading-relaxed">
            Not pilots. Not proofs of concept. Working software that real
            businesses run on every day, each one with human approval built
            into the loop.
          </p>
        </AnimateIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {systems.map((item, i) => (
            <AnimateIn key={item.label} delay={i * 100} className="h-full">
              <GlassCard light hover className="p-8 h-full">
                <p className="font-system text-accent text-xs tracking-widest uppercase mb-3">
                  {item.label}
                </p>
                <p className="text-slate-600 leading-relaxed text-sm">
                  {item.desc}
                </p>
              </GlassCard>
            </AnimateIn>
          ))}
        </div>

        <AnimateIn delay={300}>
          <p className="text-slate-500 text-center text-sm mt-10 max-w-2xl mx-auto">
            The same discipline behind AI initiatives at Harvard Business
            School, applied to businesses like yours.
          </p>
        </AnimateIn>
      </div>
    </section>
  )
}
