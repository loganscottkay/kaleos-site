import type { Metadata } from 'next'
import { NavBar } from '@/components/NavBar'
import { Footer } from '@/components/Footer'
import { GlassCard } from '@/components/GlassCard'
import { AnimateIn } from '@/components/AnimateIn'
import { AuditForm } from '@/components/AuditForm'
import { FAQ } from '@/components/FAQ'

export const metadata: Metadata = {
  title: 'AI Ops Audit',
  description:
    'Get a full breakdown of how AI can save your business time and money. Starting at $1,500.',
  alternates: {
    canonical: 'https://kaleoshq.com/audit',
  },
  openGraph: {
    title: 'AI Ops Audit | Kaleos',
    description:
      'Get a full breakdown of how AI can save your business time and money. Starting at $1,500.',
    url: 'https://kaleoshq.com/audit',
  },
}

const HERO_BG =
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=2070&q=80'

const deliverables = [
  'A full breakdown of how your business runs day-to-day',
  'A list of every task that can be automated with AI',
  `ROI numbers: how much time and money you'll save`,
  'A recommended plan for what to build first',
  'A clear scope and timeline for implementation',
  'Everything delivered as a clean PDF plus a 45-minute walkthrough call',
]

const steps = [
  {
    step: '01',
    title: 'Fill out the form below',
    desc: 'Takes 2 minutes. Tell us what you do and where it hurts.',
  },
  {
    step: '02',
    title: 'We hop on a discovery call',
    desc: '30 minutes. We learn how your business actually operates.',
  },
  {
    step: '03',
    title: 'You get the full audit',
    desc: 'Delivered within 2 weeks. No fluff, just numbers and a plan.',
  },
]

export default function AuditPage() {
  return (
    <main className="min-h-screen">
      <NavBar />

      {/* Hero (nature bg) */}
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
              Let&apos;s Find Where AI Saves
              <br className="hidden sm:inline" /> You Time and Money
            </h1>
          </AnimateIn>
          <AnimateIn delay={200} distance={15}>
            <p className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed drop-shadow-sm">
              We&apos;ll map out your workflows, find the bottlenecks, and show
              you exactly what can be automated and what the ROI looks like. No
              commitment.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* What You Get (light — nature bg shows through) */}
      <section className="relative py-24 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${HERO_BG}')` }}
        />
        <div className="absolute inset-0 bg-white/70 backdrop-blur-sm" />

        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <AnimateIn>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-center mb-10 text-navy">
              What You Get
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

      {/* How It Works (dark) */}
      <section className="relative py-24 bg-navy dot-grid-dark">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.06]" style={{ backgroundImage: `url('${HERO_BG}')` }} />
        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <AnimateIn>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-center mb-10 text-white">
              How It Works
            </h2>
          </AnimateIn>

          <div className="flex flex-col md:flex-row items-stretch gap-4 md:gap-0 max-w-4xl mx-auto">
            {steps.map((item, i) => (
              <div key={i} className="flex-1 flex items-stretch">
                {i > 0 && (
                  <div className="hidden md:flex items-center px-1">
                    <div className="w-10 border-t border-dashed border-white/20" />
                  </div>
                )}
                <AnimateIn delay={i * 100} className="flex-1">
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Price + ROI (dark, continued) */}
      <section className="relative py-24 bg-navy dot-grid-dark">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.06]" style={{ backgroundImage: `url('${HERO_BG}')` }} />
        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <AnimateIn>
              <GlassCard className="p-8 h-full">
                <p className="text-white/50 text-sm mb-2 tracking-wide">
                  Audit Investment
                </p>
                <p className="text-4xl font-bold tracking-tight mb-3 text-white">
                  Starting at $1,500
                </p>
                <p className="text-white/50 text-sm leading-relaxed">
                  Full workflow audit with ROI projections and implementation
                  roadmap.
                </p>
              </GlassCard>
            </AnimateIn>

            <AnimateIn delay={150}>
              <GlassCard className="p-8 h-full">
                <p className="text-white/50 text-sm mb-2 tracking-wide">
                  ROI Preview
                </p>
                <p className="text-white/80 leading-relaxed">
                  If we save you 10 hours a week at $150/hour, that&apos;s{' '}
                  <span className="text-accent font-semibold">
                    $6,000/month
                  </span>{' '}
                  back in your pocket.
                </p>
              </GlassCard>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* FAQ (light — nature bg) */}
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

      {/* Intake Form (light — nature bg, continued) */}
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
