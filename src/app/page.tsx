import { NavBar } from '@/components/NavBar'
import { Footer } from '@/components/Footer'
import { GlassCard } from '@/components/GlassCard'
import { Reveal, SpotlightGroup } from '@/components/Reveal'
import { WorkflowDiagram } from '@/components/WorkflowDiagram'
import { QuickAssessment } from '@/components/QuickAssessment'
import { BuiltToDemo } from '@/components/BuiltToDemo'
import { InProduction } from '@/components/InProduction'
import { ApprovalQueue } from '@/components/ApprovalQueue'
import { GateRule } from '@/components/GateRule'

const implementationGap = [
  {
    title: 'The strategy problem',
    desc: "Most vendors start with the tool and look for a problem. We start with your strategy and work backwards.",
  },
  {
    title: 'The trust problem',
    desc: "Approval gates, audit trails, and human checkpoints on every system. You see everything before it executes.",
  },
  {
    title: 'The execution problem',
    desc: "Most firms tell you what AI can do. We build it, deploy it, and hand you a working system.",
  },
]

// The timing column matches what the FAQ already commits to publicly
// (assessment inside two weeks, first system live inside thirty days).
// The deliverable column is there so every phase names something real you
// end up holding, rather than describing an activity.
const methodology = [
  {
    when: 'Weeks 1-2',
    title: 'We map how you actually work',
    desc: "Every workflow, start to finish. We separate the parts that need your judgment from the parts that are just steps, then rank what is worth automating first.",
    deliverable: 'A workflow map and a ranked shortlist',
  },
  {
    when: 'Weeks 3-4',
    title: 'We design one system, not ten',
    desc: "One workflow, one outcome you can measure. Scoped to how your business runs, not to a demo. You see the design before anyone writes code.",
    deliverable: 'A system design tied to one number',
  },
  {
    when: 'By day 30',
    title: 'It goes live with you in control',
    desc: "Approval gates and audit logging from day one. The agent drafts and prepares; nothing reaches a client, an inbox, or a ledger without your sign-off.",
    deliverable: 'A working system in production',
  },
  {
    when: 'Ongoing',
    title: 'We prove it worked, then extend',
    desc: "We track the number we agreed on. If it moved, we take on the next workflow. If it did not, we fix it or tell you it is not worth building.",
    deliverable: 'Reporting against the number we picked',
  },
]

const trustBadges = [
  {
    label: 'You approve every action',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 3a4 4 0 100 8 4 4 0 000-8z" />
      </svg>
    ),
  },
  {
    label: 'Every action is logged',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2M12 12h.01M12 16h.01M8 12h.01M8 16h.01M16 12h.01M16 16h.01" />
      </svg>
    ),
  },
  {
    label: 'Runs in your infrastructure',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
  },
  {
    label: 'Strategy before tools',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Kaleos HQ',
  url: 'https://www.kaleoshq.com',
  description:
    'Agentic AI implementation and applied AI consulting. Kaleos HQ deploys AI systems designed around how your business actually operates, with human approval on everything.',
  founder: {
    '@type': 'Person',
    name: 'Logan Kay',
  },
  areaServed: 'United States',
  sameAs: ['https://x.com/KaleosHQ'],
}

export default function Home() {
  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <NavBar />

      {/* Hero */}
      <section className="atmos bg-paper pt-24 md:pt-32 pb-16 md:pb-24">
        {/* Backdrop: fine blueprint grid over a whisper of drifting colour.
            Non-interactive and decorative; all of it sits behind z-index 1. */}
        <div className="atmos-layer atmos-grid-fine parallax-slow" aria-hidden="true" />
        <div className="atmos-layer atmos-aurora atmos-aurora-soft" aria-hidden="true" />

        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-16 items-center">
            {/* Copy */}
            <div className="lg:col-span-7">
              <p className="hero-rise inline-flex items-center gap-3 font-system text-caption uppercase tracking-widest text-muted-text mb-6">
                <span
                  className="status-dot inline-block w-1.5 h-1.5 rounded-full bg-accent"
                  aria-hidden="true"
                />
                Agentic AI implementation
              </p>

              {/* Each sentence rises out of its own clipping mask. Pure CSS
                  so it begins at first paint rather than waiting on
                  hydration; the h1 is the LCP element. */}
              {/* Wrapping is width-dependent: balancing at narrow widths
                  makes a stubby middle line, but not balancing at desktop
                  leaves "technology." orphaned on its own line. So: pretty
                  on mobile, balanced once the column is wide enough. */}
              <h1 className="text-h1 font-semibold mb-6 text-ink text-pretty lg:text-balance">
                <span className="line-mask">
                  <span className="line-rise line-rise-1">
                    AI doesn&apos;t fail because of the technology.
                  </span>
                </span>
                <span className="line-mask">
                  <span className="line-rise line-rise-2">
                    It fails because of the implementation.
                  </span>
                </span>
              </h1>

              <p className="hero-rise hero-rise-1 text-body-lg text-slate-600 leading-relaxed max-w-xl mb-10">
                Everyone wants AI. Most of it never leaves the slide deck.
                Kaleos HQ is the implementation partner that gets it into
                production.
              </p>

              <div className="hero-rise hero-rise-2 flex flex-wrap items-center gap-x-6 gap-y-4">
                <a
                  href="https://calendly.com/logan-kaleoshq/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary px-8 py-4"
                >
                  Book a Discovery Call
                </a>
                <a
                  href="#methodology"
                  className="group btn text-body font-medium text-muted-text hover:text-ink transition-colors"
                >
                  See how it works
                  <span
                    className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-1"
                    aria-hidden="true"
                  >
                    &rarr;
                  </span>
                </a>
              </div>

              <p className="hero-rise hero-rise-3 mt-10 text-caption text-muted-text tracking-wide">
                Logan Kay &middot; Founder &amp; CEO, Kaleos HQ &middot; Agentic
                AI systems, built and deployed
              </p>
            </div>

            {/* The signature object */}
            <div className="hero-rise hero-rise-2 lg:col-span-5">
              <ApprovalQueue />
            </div>
          </div>
        </div>
      </section>

      {/* The Implementation Gap */}
      <section className="atmos py-16 md:py-24 bg-ink">
        <div className="atmos-layer atmos-horizon" aria-hidden="true" />
        <div className="atmos-layer atmos-grid parallax-slow" aria-hidden="true" />
        <div className="atmos-layer atmos-aurora" aria-hidden="true" />
        <div className="atmos-layer atmos-grain" aria-hidden="true" />

        <div className="max-w-6xl mx-auto px-4">
          <Reveal>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-x-12 gap-y-6 items-end mb-16">
              <div className="md:col-span-6">
                <h2 className="text-h2 font-medium text-white">
                  The implementation gap
                </h2>
                <div className="mt-6">
                  <GateRule onDark align="start" />
                </div>
              </div>
              <p className="md:col-span-5 md:col-start-8 text-mist leading-relaxed">
                Most companies that start with AI never get past the demo. Not
                because the technology doesn&apos;t work, but because nobody
                connected it to how the business actually operates. That gap is
                what Kaleos HQ exists to close.
              </p>
            </div>
          </Reveal>

          <SpotlightGroup className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {implementationGap.map((item, i) => (
              <Reveal key={item.title} delay={i * 90} className="h-full">
                <GlassCard
                  hover
                  className="spotlight lift lift-dark p-8 h-full"
                >
                  <h3 className="text-h4 font-semibold mb-3 text-white">
                    {item.title}
                  </h3>
                  <p className="text-mist leading-relaxed text-body">
                    {item.desc}
                  </p>
                </GlassCard>
              </Reveal>
            ))}
          </SpotlightGroup>
        </div>
      </section>

      {/* In Production */}
      <InProduction />

      {/* Our Methodology */}
      <section id="methodology" className="atmos py-16 md:py-24 bg-ink">
        <div className="atmos-layer atmos-grid parallax-slow" aria-hidden="true" />
        <div className="atmos-layer atmos-aurora" aria-hidden="true" />
        <div className="atmos-layer atmos-grain" aria-hidden="true" />

        <div className="max-w-6xl mx-auto px-4">
          <Reveal>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-x-12 gap-y-6 items-end mb-16">
              <div className="md:col-span-7">
                <h2 className="text-h2 font-medium text-white">
                  How the work actually goes.
                </h2>
                <div className="mt-6">
                  <GateRule onDark align="start" />
                </div>
              </div>
              <p className="md:col-span-5 text-mist leading-relaxed">
                Agents do the work. Humans make the calls. Everything is logged.
                Every system we ship runs through the same architecture: AI
                processing, an approval gate, and a full audit log.
              </p>
            </div>
          </Reveal>

          <WorkflowDiagram />

          {/* Phase timeline. The spine draws itself as the section passes
              through the viewport where scroll timelines are supported, and
              renders fully drawn where they are not. */}
          <div className="relative">
            <div
              className="absolute top-2 bottom-2 left-5 w-px -translate-x-1/2 bg-white/10"
              aria-hidden="true"
            >
              <div className="phase-rail-fill absolute inset-0 bg-gradient-to-b from-teal-bright to-accent" />
            </div>

            <ol className="space-y-10 md:space-y-14">
              {methodology.map((item, i) => (
                <li key={item.title}>
                  <Reveal delay={i * 80} variant="left">
                    <div className="relative pl-16 grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-4">
                      <div className="absolute left-0 top-0 w-10 h-10 rounded-control border border-white/15 bg-ink flex items-center justify-center">
                        <span className="font-system numeral text-caption font-semibold text-teal-bright">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                      </div>

                      <div className="md:col-span-7">
                        <div className="font-system text-teal-bright text-caption uppercase tracking-widest mb-2">
                          {item.when}
                        </div>
                        <h3 className="text-h4 font-semibold mb-3 text-white">
                          {item.title}
                        </h3>
                        <p className="text-mist leading-relaxed text-body">
                          {item.desc}
                        </p>
                      </div>

                      {/* Names the artifact you end up holding. Fills the
                          right column with substance instead of air. */}
                      <div className="md:col-span-4 md:col-start-9 md:border-l md:border-white/10 md:pl-8">
                        <div className="font-system text-caption uppercase tracking-widest text-white/35 mb-2">
                          What you get
                        </div>
                        <p className="text-white/75 text-body">
                          {item.deliverable}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Built to Demonstrate */}
      <BuiltToDemo />

      {/* Who This Is For */}
      <section className="atmos py-16 md:py-24 bg-paper">
        <div className="atmos-layer atmos-grid-paper parallax-slow" aria-hidden="true" />

        <div className="max-w-6xl mx-auto px-4">
          <Reveal>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-x-12 gap-y-6 items-end">
              <div className="md:col-span-4">
                <h2 className="text-h2 font-medium text-ink">
                  Who this is for
                </h2>
                <div className="mt-6">
                  <GateRule align="start" />
                </div>
              </div>
              <p className="md:col-span-7 md:col-start-6 text-slate-600 leading-relaxed text-body-lg">
                Founders and operators running $2M-$100M+ companies with real
                complexity and no internal AI capability. If you need a chatbot,
                we&apos;re not the right fit. If you need a strategic
                implementation partner, we should talk.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Quick Assessment Quiz */}
      <QuickAssessment />

      {/* Trust strip + Bottom CTA */}
      <section className="atmos py-16 md:py-24 bg-ink">
        <div className="atmos-layer atmos-horizon" aria-hidden="true" />
        <div className="atmos-layer atmos-grid parallax-slow" aria-hidden="true" />
        <div className="atmos-layer atmos-aurora" aria-hidden="true" />
        <div className="atmos-layer atmos-grain" aria-hidden="true" />

        <div className="max-w-6xl mx-auto px-4">
          <SpotlightGroup className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-24">
            {trustBadges.map((badge, i) => (
              <Reveal key={badge.label} delay={i * 80} variant="scale">
                <div className="card-dark spotlight lift lift-dark flex items-center justify-center gap-3 px-6 py-6">
                  <span className="text-teal-bright">{badge.icon}</span>
                  <span className="text-white/80 text-caption font-medium tracking-wide">
                    {badge.label}
                  </span>
                </div>
              </Reveal>
            ))}
          </SpotlightGroup>

          <div className="text-center">
            <Reveal>
              <h2 className="text-h2 font-medium mb-8 text-white">
                AI won&apos;t replace your business.
                <br className="hidden sm:inline" /> But a competitor with better AI
                <br className="hidden sm:inline" /> implementation will.
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <a
                href="https://calendly.com/logan-kaleoshq/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary px-8 py-4"
              >
                Book a Discovery Call
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
