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
    'A deep operational analysis that maps your business, identifies your highest-leverage AI opportunities, and gives you a clear implementation roadmap with projected ROI.',
  alternates: {
    canonical: 'https://kaleoshq.com/audit',
  },
  openGraph: {
    title: 'Strategic AI Assessment | Kaleos',
    description:
      'A deep operational analysis that maps your business, identifies your highest-leverage AI opportunities, and gives you a clear implementation roadmap with projected ROI.',
    url: 'https://kaleoshq.com/audit',
  },
}

const HERO_BG =
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=2070&q=80'

const deliverables = [
  'Complete operational workflow mapping',
  'AI readiness evaluation across every major business function',
  'Prioritized opportunity matrix ranked by revenue impact and complexity',
  'Conservative and aggressive ROI projections',
  'Phased implementation roadmap with milestones and KPIs',
  'Risk assessment and change management strategy',
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
              A deep operational analysis that maps your business, identifies
              your highest-leverage AI opportunities, and delivers a clear
              implementation roadmap with projected ROI.
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
                  <div className="text-accent text-sm font-mono mb-2">
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

      {/* Engagement Tiers */}
      <section className="relative py-24 bg-navy dot-grid-dark">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.06]" style={{ backgroundImage: `url('${HERO_BG}')` }} />
        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <AnimateIn>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-center mb-3 text-white">
              Engagement Tiers
            </h2>
            <p className="text-white/60 text-center mb-14">
              Choose the level of partnership that fits your needs.
            </p>
          </AnimateIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {/* Tier 1: Assessment */}
            <AnimateIn className="h-full">
              <GlassCard hover className="p-8 h-full">
                <div className="flex flex-col h-full">
                  <h3 className="text-lg font-semibold tracking-tight text-white mb-4">
                    Assessment
                  </h3>
                  <p className="text-4xl font-bold tracking-tight text-white mb-1">
                    $5,000
                  </p>
                  <p className="text-white/40 text-sm mb-4">one-time</p>
                  <p className="text-white/60 text-sm leading-relaxed mb-6">
                    A deep operational analysis that tells you exactly where AI
                    creates leverage in your business.
                  </p>
                  <div className="space-y-2.5 mb-8 flex-1">
                    {[
                      'Operational workflow mapping',
                      'AI readiness evaluation',
                      'Prioritized opportunity matrix',
                      'ROI projections (conservative + aggressive)',
                      'Implementation roadmap',
                      'Executive summary PDF',
                      '45-minute strategy presentation',
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <svg className="w-4 h-4 text-accent shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-white/60 text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                  <a
                    href="#form"
                    className="inline-flex items-center justify-center w-full px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-sm transition-all duration-300 border border-white/10 hover:border-white/20"
                  >
                    Start Here
                  </a>
                </div>
              </GlassCard>
            </AnimateIn>

            {/* Tier 2: Implementation (Featured) */}
            <AnimateIn delay={100} className="h-full md:scale-[1.03] relative z-10">
              <div className="hidden md:block absolute -inset-[3px] rounded-2xl bg-accent/20 blur-md pointer-events-none" />
              <GlassCard hover className="p-8 h-full">
                <div className="flex flex-col h-full">
                  <div className="inline-block self-start px-3 py-1 rounded-full bg-accent/20 text-accent text-xs font-medium tracking-wide mb-4">
                    Recommended
                  </div>
                  <h3 className="text-lg font-semibold tracking-tight text-white mb-4">
                    Implementation
                  </h3>
                  <p className="text-4xl font-bold tracking-tight text-white mb-1">
                    $8,500
                  </p>
                  <p className="text-white/40 text-sm mb-4">
                    /month &middot; 3-month minimum
                  </p>
                  <p className="text-white/60 text-sm leading-relaxed mb-6">
                    Assessment plus hands-on system builds deployed into your
                    operations every month.
                  </p>
                  <div className="space-y-2.5 mb-8 flex-1">
                    {[
                      'Everything in Assessment',
                      '1 precision-scoped AI system per month',
                      'Architecture, build, testing, deployment',
                      'Human-in-the-loop controls',
                      'Weekly check-ins',
                      'Full documentation',
                      '30-day post-deployment optimization',
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <svg className="w-4 h-4 text-accent shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-white/60 text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                  <a
                    href="https://calendly.com/logan-kaleoshq/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-full px-6 py-3 rounded-xl bg-accent hover:bg-accent/90 text-white font-medium text-sm transition-all duration-300 shadow-lg shadow-accent/20"
                  >
                    Book a Call
                  </a>
                </div>
              </GlassCard>
            </AnimateIn>

            {/* Tier 3: Strategic Partner */}
            <AnimateIn delay={200} className="h-full">
              <GlassCard hover className="p-8 h-full">
                <div className="flex flex-col h-full">
                  <h3 className="text-lg font-semibold tracking-tight text-white mb-4">
                    Strategic Partner
                  </h3>
                  <p className="text-4xl font-bold tracking-tight text-white mb-1">
                    $15,000
                  </p>
                  <p className="text-white/40 text-sm mb-4">
                    /month &middot; 6-month minimum
                  </p>
                  <p className="text-white/60 text-sm leading-relaxed mb-6">
                    Full-stack AI implementation with unlimited builds and
                    strategic oversight.
                  </p>
                  <div className="space-y-2.5 mb-8 flex-1">
                    {[
                      'Everything in Implementation',
                      'Unlimited system builds',
                      'Priority response',
                      'Quarterly business reviews',
                      'Expansion roadmapping',
                      'Performance-linked component',
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <svg className="w-4 h-4 text-accent shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-white/60 text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                  <a
                    href="#form"
                    className="inline-flex items-center justify-center w-full px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-sm transition-all duration-300 border border-white/10 hover:border-white/20"
                  >
                    Apply
                  </a>
                </div>
              </GlassCard>
            </AnimateIn>
          </div>

          <AnimateIn delay={300}>
            <p className="text-white/50 text-center mt-12 max-w-2xl mx-auto">
              Every engagement starts with a conversation. No pressure, no
              pitch. Just an honest assessment of whether we&apos;re the right
              fit.
            </p>
          </AnimateIn>

          <AnimateIn delay={400}>
            <p className="text-white/60 text-center mt-6">
              Our clients typically recover{' '}
              <span className="text-accent font-semibold">
                $8,000-$25,000
              </span>
              /month in operational capacity within 90 days.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative py-24 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${HERO_BG}')` }}
        />
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm" />

        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <AnimateIn>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-center mb-10 text-navy">
              Frequently Asked Questions
            </h2>
          </AnimateIn>

          <AnimateIn delay={100}>
            <div className="max-w-2xl mx-auto">
              <FAQ />
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* Intake Form */}
      <section className="relative py-24 overflow-hidden" id="form">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${HERO_BG}')` }}
        />
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm" />

        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <AnimateIn>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-center mb-10 text-navy">
              Let&apos;s Talk
            </h2>
          </AnimateIn>

          <AnimateIn delay={100}>
            <div className="max-w-lg mx-auto">
              <div className="relative overflow-hidden rounded-2xl bg-white/[0.65] backdrop-blur-xl border border-white/[0.2] shadow-lg p-8">
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
