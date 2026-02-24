import { Fragment } from 'react'
import Link from 'next/link'
import { NavBar } from '@/components/NavBar'
import { Footer } from '@/components/Footer'
import { GlassCard } from '@/components/GlassCard'
import { DemoFrame } from '@/components/DemoFrame'
import { AnimateIn } from '@/components/AnimateIn'

const HERO_BG =
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=2070&q=80'

const howItWorks = [
  {
    step: '01',
    title: 'Discovery',
    desc: 'We dig into how your business actually runs. Every workflow, every bottleneck, every hour wasted.',
  },
  {
    step: '02',
    title: 'Build',
    desc: 'We set up AI systems trained on your documents, your voice, and your way of doing things.',
  },
  {
    step: '03',
    title: 'Improve',
    desc: 'We refine what works, expand what saves you time, and keep everything running smoothly.',
  },
]

const whatWeBuild = [
  {
    title: 'Revenue Recovery',
    desc: "Find money you're already owed. We automate invoice audits, flag commission errors, and draft dispute emails so nothing slips through.",
  },
  {
    title: 'Client Communication',
    desc: "Proposals, follow-ups, and client emails drafted in your voice. You review and send. That's it.",
  },
  {
    title: 'Lead Gen and Intake',
    desc: 'Automate how you qualify leads, scope projects, and calculate ROI. Spend less time on calls that go nowhere.',
  },
  {
    title: 'Workflow Automation',
    desc: 'Approvals, reports, scheduling, internal processes. If you do it every week and it follows a pattern, we can automate it.',
  },
]

const trustBadges = [
  {
    label: 'Your Approval Required',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    label: 'Full Audit Trail',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2M12 12h.01M12 16h.01M8 12h.01M8 16h.01M16 12h.01M16 16h.01" />
      </svg>
    ),
  },
  {
    label: 'Human in the Loop',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 3a4 4 0 100 8 4 4 0 000-8z" />
      </svg>
    ),
  },
  {
    label: 'Private and Secure',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
  },
]

export default function Home() {
  return (
    <main className="min-h-screen">
      <NavBar />

      {/* Hero (nature bg, light overlay + vignette) */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden hero-vignette">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${HERO_BG}')` }}
        />
        <div className="absolute inset-0 bg-white/10" />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(255,255,255,0.15) 0%, transparent 70%)',
          }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center pt-20">
          <AnimateIn delay={0} distance={20}>
            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-tight mb-6 text-white drop-shadow-lg"
              style={{ textShadow: '0 2px 40px rgba(0,0,0,0.15)' }}
            >
              We build AI that does
              <br />
              your busywork.
            </h1>
          </AnimateIn>

          <AnimateIn delay={200} distance={15}>
            <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-8 leading-relaxed drop-shadow-sm">
              So you can stop wasting time on tasks a machine should handle.
            </p>
          </AnimateIn>

          <AnimateIn delay={400} distance={10}>
            <Link
              href="/audit"
              className="inline-flex items-center px-8 py-3.5 rounded-xl bg-white/90 backdrop-blur-sm hover:bg-white text-navy font-medium transition-all duration-300 shadow-lg shadow-black/10 hover:shadow-xl hover:-translate-y-0.5 hover:scale-[1.02] active:scale-[0.98]"
            >
              Get Started
            </Link>
          </AnimateIn>

          <AnimateIn delay={600} distance={10}>
            <p
              className="mt-8 text-sm text-white/90 tracking-wide font-medium"
              style={{ textShadow: '0 1px 3px rgba(0,0,0,0.3)' }}
            >
              Logan Kay | Founder, Kaleos | AI &amp; Operations @ Harvard
              Business School
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* How It Works (dark) */}
      <section className="relative py-24 bg-navy dot-grid-dark">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.06]" style={{ backgroundImage: `url('${HERO_BG}')` }} />
        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <AnimateIn>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-center mb-14 text-white">
              How It Works
            </h2>
          </AnimateIn>

          <div className="flex flex-col md:flex-row items-stretch gap-4 md:gap-0">
            {howItWorks.map((item, i) => (
              <Fragment key={i}>
                {i > 0 && (
                  <div className="hidden md:flex items-center justify-center px-1">
                    <div className="w-10 border-t border-dashed border-white/20" />
                  </div>
                )}
                <AnimateIn delay={i * 100} className="flex-1">
                  <GlassCard hover className="p-8 h-full">
                    <div className="text-accent text-sm font-mono mb-3">
                      {item.step}
                    </div>
                    <h3 className="text-xl font-semibold tracking-tight mb-3 text-white">
                      {item.title}
                    </h3>
                    <p className="text-white/70 leading-relaxed">
                      {item.desc}
                    </p>
                  </GlassCard>
                </AnimateIn>
              </Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* What We Can Build For You (dark, continued) */}
      <section className="relative py-24 bg-navy dot-grid-dark">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.06]" style={{ backgroundImage: `url('${HERO_BG}')` }} />
        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <AnimateIn>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-center mb-14 text-white">
              What We Can Build For You
            </h2>
          </AnimateIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {whatWeBuild.map((item, i) => (
              <AnimateIn key={i} delay={i * 100}>
                <GlassCard hover className="p-8 h-full">
                  <h3 className="text-lg font-semibold tracking-tight mb-3 text-white">
                    {item.title}
                  </h3>
                  <p className="text-white/70 leading-relaxed text-sm">
                    {item.desc}
                  </p>
                </GlassCard>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* Proof Section (deeper dark for depth) */}
      <section className="relative py-24 bg-[#162035]">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.06]" style={{ backgroundImage: `url('${HERO_BG}')` }} />
        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <AnimateIn>
            <p className="text-accent text-xs font-mono tracking-widest text-center mb-2 uppercase">
              Live Operator Dashboard Preview
            </p>
            <p className="text-white/60 text-center mb-10 tracking-wide">
              This is what it actually looks like when it&apos;s running.
            </p>
          </AnimateIn>

          <AnimateIn delay={150}>
            <div className="max-w-4xl mx-auto">
              <DemoFrame />
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* Trust Strip (light — nature bg shows through) */}
      <section className="relative py-24 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${HERO_BG}')` }}
        />
        <div className="absolute inset-0 bg-white/70 backdrop-blur-sm" />

        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <AnimateIn>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {trustBadges.map((badge, i) => (
                <div
                  key={i}
                  className="flex items-center justify-center gap-3 px-4 py-4 rounded-xl bg-white/[0.5] backdrop-blur-lg border border-white/[0.3] shadow-md shadow-black/5 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                >
                  <span className="text-accent">{badge.icon}</span>
                  <span className="text-slate-700 text-sm font-medium tracking-wide">
                    {badge.label}
                  </span>
                </div>
              ))}
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* Bottom CTA (dark) */}
      <section className="relative py-24 bg-navy">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.06]" style={{ backgroundImage: `url('${HERO_BG}')` }} />
        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
          <AnimateIn>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-4 text-white">
              You&apos;re spending hours on work a machine
              <br className="hidden sm:inline" /> could do in minutes.
            </h2>
          </AnimateIn>
          <AnimateIn delay={100}>
            <p className="text-white/60 mb-8 max-w-xl mx-auto">
              Let&apos;s figure out where AI saves you the most time and money.
            </p>
          </AnimateIn>
          <AnimateIn delay={200}>
            <Link
              href="/audit"
              className="inline-flex items-center px-8 py-3.5 rounded-xl bg-white text-navy hover:bg-white/90 font-medium transition-all duration-300 shadow-lg shadow-black/10 hover:shadow-xl hover:-translate-y-0.5 hover:scale-[1.02] active:scale-[0.98]"
            >
              Request a Free Discovery Call
            </Link>
          </AnimateIn>
        </div>
      </section>

      <Footer />
    </main>
  )
}
