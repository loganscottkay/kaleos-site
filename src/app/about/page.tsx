import type { Metadata } from 'next'
import Image from 'next/image'
import { NavBar } from '@/components/NavBar'
import { Footer, SocialIcons } from '@/components/Footer'
import { GlassCard } from '@/components/GlassCard'
import { AnimateIn } from '@/components/AnimateIn'
import { StrategyGraph } from '@/components/StrategyGraph'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Kaleos HQ is an agentic AI implementation firm founded by Logan Kay, who designed and deployed AI systems across admissions and operations at Harvard Business School.',
  alternates: {
    canonical: 'https://www.kaleoshq.com/about',
  },
  openGraph: {
    title: 'About | Kaleos HQ',
    description:
      'Kaleos HQ is an agentic AI implementation firm founded by Logan Kay, who designed and deployed AI systems across admissions and operations at Harvard Business School.',
    url: 'https://www.kaleoshq.com/about',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Logan Kay',
  url: 'https://www.kaleoshq.com/about',
  jobTitle: 'Founder & CEO',
  worksFor: {
    '@type': 'Organization',
    name: 'Kaleos HQ',
    url: 'https://www.kaleoshq.com',
  },
  alumniOf: {
    '@type': 'Organization',
    name: 'Harvard Business School',
  },
  sameAs: ['https://x.com/KaleosHQ'],
}

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <NavBar />

      {/* Hero */}
      <section className="relative bg-paper pt-36 pb-12">
        <div className="relative max-w-6xl mx-auto px-4 text-center">
          <AnimateIn distance={16}>
            <h1 className="text-4xl sm:text-5xl font-medium tracking-tight text-ink">
              Who we are
            </h1>
          </AnimateIn>
        </div>
      </section>

      {/* Origin + Photo */}
      <section className="relative py-24 bg-paper">
        <div className="relative max-w-[92rem] mx-auto px-4">
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
                    <p className="text-lg text-slate-800 font-medium leading-relaxed mb-6 tracking-tight max-w-xl">
                      Kaleos HQ exists because wanting AI and running AI are
                      different problems. The AI advantage isn&apos;t about the
                      best tools. It&apos;s about the best implementation.
                    </p>
                  </AnimateIn>

                  <div className="space-y-4 text-slate-600 leading-relaxed max-w-xl">
                    <AnimateIn delay={100}>
                      <p>
                        Brilliant executives keep getting stuck. They have the
                        vision but nobody to translate it into AI systems that
                        actually run in production. We close that gap: strategy
                        first, then precision-scoped systems with human
                        approval on every consequential call.
                      </p>
                    </AnimateIn>

                    <AnimateIn delay={200}>
                      <p>
                        Kaleos HQ was founded by Logan Kay, who designed and
                        deployed AI systems across admissions and operations at
                        Harvard Business School. The implementation methodology
                        we run today comes directly from that work.
                      </p>
                    </AnimateIn>
                  </div>
                </div>

                {/* Photo */}
                <AnimateIn delay={200} className="w-full md:w-auto shrink-0">
                  <div className="max-w-[400px] mx-auto md:mx-0 md:w-[280px] xl:w-[260px]">
                    <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-xl shadow-black/10 relative">
                      <Image src="/photo.png" alt="Logan Kay, Founder of Kaleos HQ" fill className="object-cover" sizes="(max-width: 1280px) 100vw, 280px" />
                    </div>
                    <p className="mt-4 text-navy font-semibold text-center">
                      Logan Kay
                    </p>
                    <p className="text-slate-500 text-sm text-center">
                      Founder &amp; CEO, Kaleos HQ
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
      <section className="relative py-24 bg-ink">
        <div className="relative max-w-6xl mx-auto px-4">
          <AnimateIn>
            <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-center mb-10 text-white">
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
                  AI at Harvard Business School
                </h3>
                <p className="text-mist leading-relaxed text-sm">
                  Logan designed and deployed AI systems across admissions and
                  operations at Harvard Business School. The Kaleos HQ
                  implementation methodology comes from that work.
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
                  Production systems
                </h3>
                <p className="text-mist leading-relaxed text-sm">
                  Agentic AI systems that real businesses run on every day:
                  client portals, coaching platforms, and outreach engines,
                  each with human approval built in.
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
                  Data and operations
                </h3>
                <p className="text-mist leading-relaxed text-sm">
                  Fraud detection and financial transaction analysis at scale,
                  plus hands-on operating experience. Every engagement is
                  informed by real operational work, not theory.
                </p>
              </GlassCard>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* How We're Different */}
      <section className="relative py-24 bg-navy">
        <div className="relative max-w-6xl mx-auto px-4">
          <AnimateIn>
            <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-center mb-10 text-white">
              How we&apos;re different
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
      <section className="relative py-24 bg-paper">
        <div className="relative max-w-6xl mx-auto px-4">
          <div className="max-w-3xl mx-auto text-slate-600 leading-relaxed">
            <AnimateIn>
              <p className="text-center">
                Kaleos HQ is a focused firm by design. Every engagement gets
                senior attention from strategy through deployment, and the
                systems we ship for clients run on the same architecture we
                use to run Kaleos HQ itself.
              </p>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 bg-ink">
        <div className="relative max-w-6xl mx-auto px-4 text-center">
          <AnimateIn>
            <h2 className="text-3xl sm:text-4xl font-medium tracking-tight mb-6 text-white">
              Want to see if AI can help your business?
            </h2>
          </AnimateIn>
          <AnimateIn delay={150}>
            <a
              href="https://calendly.com/logan-kaleoshq/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-3.5 rounded-lg bg-accent text-white font-medium transition-colors duration-300 hover:bg-teal-700"
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
