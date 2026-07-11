import type { Metadata } from 'next'
import { NavBar } from '@/components/NavBar'
import { Footer } from '@/components/Footer'
import { GlassCard } from '@/components/GlassCard'
import { AnimateIn } from '@/components/AnimateIn'
import { AuditForm } from '@/components/AuditForm'
import { FAQ } from '@/components/FAQ'

export const metadata: Metadata = {
  title: 'Strategic AI Assessment',
  description:
    'The starting point for agentic AI implementation: a deep operational analysis that maps your workflows, ranks your opportunities, and hands you a roadmap with projected ROI.',
  alternates: {
    canonical: 'https://www.kaleoshq.com/audit',
  },
  openGraph: {
    title: 'Strategic AI Assessment | Kaleos HQ',
    description:
      'The starting point for agentic AI implementation: a deep operational analysis that maps your workflows, ranks your opportunities, and hands you a roadmap with projected ROI.',
    url: 'https://www.kaleoshq.com/audit',
  },
}

const deliverables = [
  'Operational workflow mapping',
  'AI readiness evaluation across every business function',
  'Prioritized opportunity matrix ranked by impact and complexity',
  'ROI projections with implementation roadmap',
  'Executive summary PDF and 45-minute strategy presentation',
]

const steps = [
  {
    step: '01',
    title: 'Fill out the form below',
    desc: 'Takes 2 minutes. Tell us what you do and where it hurts.',
  },
  {
    step: '02',
    title: 'Hop on a discovery call',
    desc: '30 minutes. We learn how your business actually operates.',
  },
  {
    step: '03',
    title: 'Get the full assessment',
    desc: 'Delivered within 2 weeks. No fluff, just numbers and a plan.',
  },
]

export default function AuditPage() {
  return (
    <main className="min-h-screen">
      <NavBar />

      {/* Hero */}
      <section className="relative bg-paper pt-36 pb-16">
        <div className="relative max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl font-medium tracking-tight mb-6 text-ink">
            Strategic AI assessment
          </h1>
          <p className="hero-rise hero-rise-1 text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            We map your business, identify your highest-leverage AI
            opportunities, and deliver a clear roadmap with projected ROI.
          </p>
        </div>
      </section>

      {/* Assessment Deliverables */}
      <section className="relative py-24 bg-paper">
        <div className="relative max-w-6xl mx-auto px-4">
          <AnimateIn>
            <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-center mb-10 text-ink">
              Assessment deliverables
            </h2>
          </AnimateIn>

          <AnimateIn delay={100}>
            <div className="max-w-2xl mx-auto">
              <div className="space-y-4">
                {deliverables.map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <svg
                      className="w-5 h-5 text-accent shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-slate-600">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative py-24 bg-ink">
        <div className="relative max-w-6xl mx-auto px-4">
          <AnimateIn>
            <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-center mb-10 text-white">
              How it works
            </h2>
          </AnimateIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {steps.map((item, i) => (
              <AnimateIn key={i} delay={i * 100} className="h-full">
                <GlassCard className="p-6 h-full">
                  <div className="text-white/60 text-xs uppercase tracking-widest mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>
                    {item.step}
                  </div>
                  <h3 className="text-lg font-semibold tracking-tight mb-2 text-white">
                    {item.title}
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </GlassCard>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* How Engagements Work */}
      <section className="relative py-24 bg-navy">
        <div className="relative max-w-6xl mx-auto px-4">
          <AnimateIn>
            <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-center mb-6 text-white">
              How engagements work
            </h2>
            <p className="text-mist text-center max-w-3xl mx-auto mb-14 leading-relaxed">
              Every engagement is scoped to your business. No packages off a
              shelf, no rate card. Three ways to work together, priced on a
              call once we understand what you actually need.
            </p>
          </AnimateIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {[
              {
                name: 'Assessment',
                desc: 'A deep operational analysis that tells you exactly where AI creates leverage in your business. Workflow mapping, a prioritized opportunity matrix, and a roadmap with projected ROI.',
              },
              {
                name: 'Implementation',
                desc: 'The assessment plus hands-on builds. Precision-scoped AI systems designed, built, tested, and deployed into your operations, each with human-in-the-loop controls.',
              },
              {
                name: 'Strategic Partner',
                desc: 'Ongoing full-stack implementation with strategic oversight. Continuous builds, priority response, and quarterly reviews tied to your business goals.',
              },
            ].map((tier, i) => (
              <AnimateIn key={tier.name} delay={i * 100} className="h-full">
                <GlassCard hover className="p-8 h-full">
                  <div className="flex flex-col h-full">
                    <h3 className="text-lg font-semibold tracking-tight text-white mb-4">
                      {tier.name}
                    </h3>
                    <p className="text-white/60 text-sm leading-relaxed mb-8 flex-1">
                      {tier.desc}
                    </p>
                    <a
                      href="https://calendly.com/logan-kaleoshq/30min"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-full px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-sm transition-all duration-300 border border-white/10 hover:border-white/20"
                    >
                      Book a Discovery Call
                    </a>
                  </div>
                </GlassCard>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative py-24 bg-ink">
        <div className="relative max-w-6xl mx-auto px-4">
          <AnimateIn>
            <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-center mb-12 text-white">
              Frequently asked questions
            </h2>
          </AnimateIn>

          <div className="max-w-2xl mx-auto">
            <FAQ />
          </div>
        </div>
      </section>

      {/* Intake Form */}
      <section className="relative py-24 bg-navy" id="form">
        <div className="relative max-w-6xl mx-auto px-4">
          <AnimateIn>
            <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-center mb-10 text-white">
              Start a conversation
            </h2>
          </AnimateIn>

          <AnimateIn delay={100}>
            <div className="max-w-lg mx-auto">
              <div className="rounded-xl bg-white/[0.045] border border-white/[0.1] p-8">
                <AuditForm />
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      <Footer />
    </main>
  )
}
