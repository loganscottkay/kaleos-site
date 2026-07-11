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
    'Before we build anything, we need to understand everything. Deep operational analysis, prioritized opportunities, and a clear implementation roadmap.',
  alternates: {
    canonical: 'https://kaleoshq.com/audit',
  },
  openGraph: {
    title: 'Strategic AI Assessment | Kaleos',
    description:
      'Before we build anything, we need to understand everything. Deep operational analysis, prioritized opportunities, and a clear implementation roadmap.',
    url: 'https://kaleoshq.com/audit',
  },
}

const HERO_BG =
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=2070&q=80'

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
      <section className="relative pt-32 pb-16 overflow-hidden hero-vignette">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${HERO_BG}')` }}
        />
        <div className="absolute inset-0 bg-white/30" />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(255,255,255,0.15) 0%, transparent 70%)',
          }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
          <AnimateIn distance={20}>
            <h1
              className="text-4xl sm:text-5xl font-semibold tracking-tight mb-6 text-white drop-shadow-lg"
              style={{ textShadow: '0 2px 40px rgba(0,0,0,0.15)' }}
            >
              Strategic AI Assessment
            </h1>
          </AnimateIn>
          <AnimateIn delay={200} distance={15}>
            <p className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed drop-shadow-sm">
              We map your business, identify your highest-leverage AI
              opportunities, and deliver a clear roadmap with projected ROI.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* Assessment Deliverables */}
      <section className="relative py-24 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${HERO_BG}')` }}
        />
        <div className="absolute inset-0 bg-white/70 backdrop-blur-sm" />

        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <AnimateIn>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-center mb-10 text-navy">
              Assessment Deliverables
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
      <section className="relative py-24 bg-navy dot-grid-dark">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.06]" style={{ backgroundImage: `url('${HERO_BG}')` }} />
        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <AnimateIn>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-center mb-10 text-white">
              How It Works
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
      <section className="relative py-24 bg-navy dot-grid-dark">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.06]" style={{ backgroundImage: `url('${HERO_BG}')` }} />
        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <AnimateIn>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-center mb-6 text-white">
              How Engagements Work
            </h2>
            <p className="text-white/70 text-center max-w-3xl mx-auto mb-14 leading-relaxed">
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
      <section className="relative py-24 bg-navy overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.06]" style={{ backgroundImage: `url('${HERO_BG}')` }} />

        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <AnimateIn>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-center mb-12 text-white">
              Frequently Asked Questions
            </h2>
          </AnimateIn>

          <div className="max-w-2xl mx-auto">
            <FAQ />
          </div>
        </div>
      </section>

      {/* Intake Form */}
      <section className="relative py-24 bg-navy overflow-hidden" id="form">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.06]" style={{ backgroundImage: `url('${HERO_BG}')` }} />

        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <AnimateIn>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-center mb-10 text-white">
              Start a Conversation
            </h2>
          </AnimateIn>

          <AnimateIn delay={100}>
            <div className="max-w-lg mx-auto">
              <div className="relative overflow-hidden rounded-2xl bg-white/[0.06] backdrop-blur-2xl border border-white/[0.12] shadow-2xl shadow-black/20 p-8">
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.04] via-transparent to-transparent pointer-events-none" />
                <div className="relative">
                  <AuditForm />
                </div>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      <Footer />
    </main>
  )
}
