import type { Metadata } from 'next'
import Image from 'next/image'
import { NavBar } from '@/components/NavBar'
import { Footer, SocialIcons } from '@/components/Footer'
import { GlassCard } from '@/components/GlassCard'
import { AnimateIn } from '@/components/AnimateIn'
import { StrategyGraph } from '@/components/StrategyGraph'
import { NewsletterSignup } from '@/components/NewsletterSignup'

export const metadata: Metadata = {
  title: 'About',
  description:
    'I helped spearhead AI implementation at Harvard Business School. Now I help founders and executives deploy AI where it creates real strategic leverage.',
  alternates: {
    canonical: 'https://kaleoshq.com/about',
  },
  openGraph: {
    title: 'About | Kaleos',
    description:
      'I helped spearhead AI implementation at Harvard Business School. Now I help founders and executives deploy AI where it creates real strategic leverage.',
    url: 'https://kaleoshq.com/about',
  },
}

const HERO_BG =
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=2070&q=80'

export default function AboutPage() {
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
              className="text-4xl sm:text-5xl font-semibold tracking-tight text-white drop-shadow-lg"
              style={{ textShadow: '0 2px 40px rgba(0,0,0,0.15)' }}
            >
              Who We Are
            </h1>
          </AnimateIn>
        </div>
      </section>

      {/* Origin + Photo */}
      <section className="relative py-24 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${HERO_BG}')` }}
        />
        <div className="absolute inset-0 bg-white/70 backdrop-blur-sm" />

        <div className="relative z-10 max-w-[92rem] mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[1fr_3fr_1fr] gap-8 xl:gap-24 items-stretch">
            {/* Left Graph — The Decline */}
            <div className="order-1">
              <StrategyGraph variant="decline" />
            </div>

            {/* Right Graph — The Growth */}
            <div className="order-2 xl:order-3">
              <StrategyGraph variant="growth" delay={500} />
            </div>

            {/* Bio + Photo (center content) */}
            <div className="order-3 xl:order-2 md:col-span-2 xl:col-span-1">
              <div className="flex flex-col md:flex-row gap-10 items-center max-w-4xl mx-auto">
                {/* Text */}
                <div className="flex-1">
                  <AnimateIn>
                    <p className="text-xl text-slate-800 font-medium leading-relaxed mb-8 tracking-tight">
                      I helped spearhead AI implementation initiatives at Harvard Business School. Now I work
                      with founders who understand the AI advantage isn&apos;t about
                      the best tools. It&apos;s about the best implementation.
                    </p>
                  </AnimateIn>

                  <div className="space-y-6 text-slate-600 leading-relaxed">
                    <AnimateIn delay={100}>
                      <p>
                        Kaleos exists because brilliant executives keep getting
                        stuck. They have the vision but nobody to translate it into
                        AI systems that actually run in production.
                      </p>
                    </AnimateIn>

                    <AnimateIn delay={200}>
                      <p>
                        Every system starts with one question: what is this business
                        actually trying to accomplish? The AI comes second. The
                        strategy comes first.
                      </p>
                    </AnimateIn>
                  </div>
                </div>

                {/* Photo */}
                <AnimateIn delay={200} className="w-full md:w-auto shrink-0">
                  <div className="max-w-[400px] mx-auto md:mx-0 md:w-[280px] xl:w-[260px]">
                    <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-xl shadow-black/10 relative">
                      <Image src="/photo.png" alt="Logan Kay, Founder of Kaleos" fill className="object-cover" sizes="(max-width: 1280px) 100vw, 280px" />
                    </div>
                    <p className="mt-4 text-navy font-semibold text-center">
                      Logan Kay, Founder
                    </p>
                    <p className="text-slate-500 text-sm text-center">
                      AI &amp; Operations, Harvard Business School
                    </p>
                    <div className="flex justify-center mt-3">
                      <SocialIcons className="[&_a]:text-slate-400/50 [&_a:hover]:text-accent" />
                    </div>
                  </div>
                </AnimateIn>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Background */}
      <section className="relative py-24 bg-navy dot-grid-dark">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.06]" style={{ backgroundImage: `url('${HERO_BG}')` }} />
        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <AnimateIn>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-center mb-10 text-white">
              Background
            </h2>
          </AnimateIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-fr">
            <AnimateIn delay={0} className="h-full">
              <GlassCard className="p-8 h-full">
                {/* Brain/circuit icon */}
                <div className="mb-4">
                  <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold tracking-tight mb-3 text-white">
                  AI Implementation
                </h3>
                <p className="text-white/70 leading-relaxed text-sm">
                  Designed and deployed AI systems across admissions and
                  operations at Harvard Business School.
                </p>
              </GlassCard>
            </AnimateIn>

            <AnimateIn delay={150} className="h-full">
              <GlassCard className="p-8 h-full">
                {/* Chart icon */}
                <div className="mb-4">
                  <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold tracking-tight mb-3 text-white">
                  Data &amp; Analysis
                </h3>
                <p className="text-white/70 leading-relaxed text-sm">
                  Fraud detection and financial transaction analysis at scale.
                  The analytical foundation behind every system I build.
                </p>
              </GlassCard>
            </AnimateIn>

            <AnimateIn delay={300} className="h-full">
              <GlassCard className="p-8 h-full">
                {/* Rocket/growth icon */}
                <div className="mb-4">
                  <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold tracking-tight mb-3 text-white">
                  Growth &amp; Operations
                </h3>
                <p className="text-white/70 leading-relaxed text-sm">
                  Nonprofit fundraising, product development, and growth
                  strategy. Every engagement is informed by real operational experience.
                </p>
              </GlassCard>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* How We're Different */}
      <section className="relative py-24 bg-navy dot-grid-dark">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.06]" style={{ backgroundImage: `url('${HERO_BG}')` }} />
        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <AnimateIn>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-center mb-10 text-white">
              How We&apos;re Different
            </h2>
          </AnimateIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-fr">
            <AnimateIn delay={100} className="h-full">
              <GlassCard className="p-8 h-full">
                <h3 className="text-lg font-semibold tracking-tight mb-3 text-white">
                  Methodology over tools.
                </h3>
                <p className="text-white/80 leading-relaxed">
                  Strategy determines what gets built. The methodology is the product.
                </p>
              </GlassCard>
            </AnimateIn>

            <AnimateIn delay={200} className="h-full">
              <GlassCard className="p-8 h-full">
                <h3 className="text-lg font-semibold tracking-tight mb-3 text-white">
                  Single-outcome precision.
                </h3>
                <p className="text-white/80 leading-relaxed">
                  One system, one KPI, clear results. Then expand based on data.
                </p>
              </GlassCard>
            </AnimateIn>

            <AnimateIn delay={300} className="h-full">
              <GlassCard className="p-8 h-full">
                <h3 className="text-lg font-semibold tracking-tight mb-3 text-white">
                  Absolute executive control.
                </h3>
                <p className="text-white/80 leading-relaxed">
                  Nothing executes without human approval. AI amplifies your
                  judgment, never replaces it.
                </p>
              </GlassCard>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* The Operation */}
      <section className="relative py-24 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${HERO_BG}')` }}
        />
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm" />

        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <div className="max-w-3xl mx-auto text-slate-600 leading-relaxed">
            <AnimateIn>
              <p>
                Kaleos is currently a focused operation. Every engagement is
                personally delivered. The systems I build for clients run on the
                same architecture I use for my own business.
              </p>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 bg-navy">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.06]" style={{ backgroundImage: `url('${HERO_BG}')` }} />
        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
          <AnimateIn>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-6 text-white">
              Want to see if AI can help your business?
            </h2>
          </AnimateIn>
          <AnimateIn delay={150}>
            <a
              href="https://calendly.com/logan-kaleoshq/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-3.5 rounded-xl bg-[#1B2A4A] border border-white/[0.15] text-white font-medium transition-all duration-300 shadow-lg shadow-black/10 hover:shadow-[0_0_20px_rgba(13,148,136,0.4)] hover:scale-[1.03] hover:border-accent/30 active:scale-[0.97]"
            >
              Book a Discovery Call
            </a>
          </AnimateIn>
        </div>
      </section>

      <NewsletterSignup />
      <Footer />
    </main>
  )
}
