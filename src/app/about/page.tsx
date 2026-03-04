import type { Metadata } from 'next'
import Image from 'next/image'
import { NavBar } from '@/components/NavBar'
import { Footer } from '@/components/Footer'
import { GlassCard } from '@/components/GlassCard'
import { AnimateIn } from '@/components/AnimateIn'
import { StrategyGraph } from '@/components/StrategyGraph'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Logan Kay led AI implementation at Harvard Business School. Now he builds strategic AI systems for founders and executives.',
  alternates: {
    canonical: 'https://kaleoshq.com/about',
  },
  openGraph: {
    title: 'About | Kaleos',
    description:
      'Logan Kay led AI implementation at Harvard Business School. Now he builds strategic AI systems for founders and executives.',
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

        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[1fr_3fr_1fr] gap-8 xl:gap-14 items-stretch">
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
              <div className="flex flex-col md:flex-row gap-10 items-start max-w-4xl mx-auto xl:max-w-none">
                {/* Text */}
                <div className="flex-1">
                  <AnimateIn>
                    <p className="text-xl text-slate-800 font-medium leading-relaxed mb-8 tracking-tight">
                      I led AI implementation at Harvard Business School. Now I work
                      with founders who understand the AI advantage isn&apos;t about
                      the best tools. It&apos;s about the best implementation.
                    </p>
                  </AnimateIn>

                  <div className="space-y-6 text-slate-600 leading-relaxed">
                    <AnimateIn delay={100}>
                      <p>
                        Most companies approach AI backwards. They buy a tool, try to
                        plug it in, and wonder why nobody uses it six months later.
                        The implementation was always the problem.
                      </p>
                    </AnimateIn>

                    <AnimateIn delay={200}>
                      <p>
                        Kaleos exists because brilliant executives with clear
                        strategic vision keep getting stuck. Nobody translates that
                        vision into AI systems that actually run in production.
                      </p>
                    </AnimateIn>

                    <AnimateIn delay={300}>
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
                  </div>
                </AnimateIn>
              </div>
            </div>
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
                  We lead with a strategic framework that determines where AI
                  creates the most leverage, then build the right tools for that
                  application. The methodology is the product.
                </p>
              </GlassCard>
            </AnimateIn>

            <AnimateIn delay={200} className="h-full">
              <GlassCard className="p-8 h-full">
                <h3 className="text-lg font-semibold tracking-tight mb-3 text-white">
                  Single-outcome precision.
                </h3>
                <p className="text-white/80 leading-relaxed">
                  Every engagement targets one measurable outcome. One system,
                  one KPI, clear results. Then we expand based on data.
                </p>
              </GlassCard>
            </AnimateIn>

            <AnimateIn delay={300} className="h-full">
              <GlassCard className="p-8 h-full">
                <h3 className="text-lg font-semibold tracking-tight mb-3 text-white">
                  Absolute executive control.
                </h3>
                <p className="text-white/80 leading-relaxed">
                  Nothing executes without human approval. Every action is
                  logged, every output reviewable. AI amplifies your judgment,
                  never replaces it.
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

      <Footer />
    </main>
  )
}
