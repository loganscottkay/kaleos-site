import type { Metadata } from 'next'
import Image from 'next/image'
import { NavBar } from '@/components/NavBar'
import { Footer } from '@/components/Footer'
import { GlassCard } from '@/components/GlassCard'
import { AnimateIn } from '@/components/AnimateIn'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Logan Kay built AI systems at Harvard Business School. Now he builds them for businesses like yours.',
  alternates: {
    canonical: 'https://kaleoshq.com/about',
  },
  openGraph: {
    title: 'About | Kaleos',
    description:
      'Logan Kay built AI systems at Harvard Business School. Now he builds them for businesses like yours.',
    url: 'https://kaleoshq.com/about',
  },
}

const HERO_BG =
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=2070&q=80'

export default function AboutPage() {
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
              className="text-4xl sm:text-5xl font-semibold tracking-tight text-white drop-shadow-lg"
              style={{ textShadow: '0 2px 40px rgba(0,0,0,0.15)' }}
            >
              Who We Are
            </h1>
          </AnimateIn>
        </div>
      </section>

      {/* Origin + Photo (light — nature bg shows through) */}
      <section className="relative py-24 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${HERO_BG}')` }}
        />
        <div className="absolute inset-0 bg-white/70 backdrop-blur-sm" />

        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-12 items-start">
            {/* Text */}
            <div className="flex-1">
              <AnimateIn>
                <p className="text-xl text-slate-800 font-medium leading-relaxed mb-8 tracking-tight">
                  I worked on AI implementation at Harvard Business School. Now
                  I build AI systems for businesses like yours.
                </p>
              </AnimateIn>

              <div className="space-y-6 text-slate-600 leading-relaxed">
                <AnimateIn delay={100}>
                  <p>
                    Most AI tools are built to demo well. They look impressive
                    in a pitch but don&apos;t actually do the work. I got tired
                    of seeing that. So I started Kaleos to build AI that actually
                    runs your business operations, not just reports on them.
                  </p>
                </AnimateIn>

                <AnimateIn delay={200}>
                  <p>
                    We build systems that draft proposals in your voice, send
                    follow-ups on your schedule, catch revenue leaks you
                    didn&apos;t know existed, and automate the repetitive stuff
                    that eats up your week. Everything runs under your control.
                    You approve every output before it goes anywhere.
                  </p>
                </AnimateIn>

                <AnimateIn delay={300}>
                  <p>
                    If you&apos;re spending 10, 15, 20 hours a week on work that
                    follows a pattern, there&apos;s a good chance we can cut that
                    in half. And if we can&apos;t, the audit will tell you that
                    too.
                  </p>
                </AnimateIn>
              </div>
            </div>

            <AnimateIn delay={200} className="w-full md:w-auto shrink-0">
              <div className="w-full max-w-[400px] mx-auto md:mx-0">
                <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-xl shadow-black/10 relative">
                  <Image src="/photo.png" alt="Logan Kay, Founder of Kaleos" fill className="object-cover" sizes="(max-width: 768px) 100vw, 400px" />
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
      </section>

      {/* How We're Different (dark) */}
      <section className="relative py-24 bg-navy dot-grid-dark">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.06]" style={{ backgroundImage: `url('${HERO_BG}')` }} />
        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <AnimateIn>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-center mb-10 text-white">
              How We&apos;re Different
            </h2>
          </AnimateIn>

          <div className="max-w-3xl mx-auto space-y-6">
            <AnimateIn delay={100}>
              <GlassCard className="p-8">
                <p className="text-white/80 leading-relaxed">
                  These aren&apos;t chatbots. Every system we build is trained on
                  your actual documents, your writing style, and your
                  decision-making process.
                </p>
              </GlassCard>
            </AnimateIn>

            <AnimateIn delay={200}>
              <GlassCard className="p-8">
                <p className="text-white/80 leading-relaxed">
                  Everything is scoped to a specific workflow. We don&apos;t
                  build generic tools. We build systems that do one job really
                  well.
                </p>
              </GlassCard>
            </AnimateIn>

            <AnimateIn delay={300}>
              <GlassCard className="p-8">
                <p className="text-white/80 leading-relaxed">
                  You stay in control. Nothing sends, publishes, or executes
                  without your review. Every action is logged.
                </p>
              </GlassCard>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* The Operation (light — nature bg) */}
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

      {/* CTA (dark) */}
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
              className="inline-flex items-center px-8 py-3.5 rounded-xl bg-white text-navy hover:bg-white/90 font-medium transition-all duration-300 shadow-lg shadow-black/10 hover:shadow-xl hover:-translate-y-0.5 hover:scale-[1.02] active:scale-[0.98]"
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
