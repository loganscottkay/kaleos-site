import { NavBar } from '@/components/NavBar'
import { Footer } from '@/components/Footer'
import { GlassCard } from '@/components/GlassCard'
import { DemoFrame } from '@/components/DemoFrame'
import { AnimateIn } from '@/components/AnimateIn'
import { WorkflowDiagram } from '@/components/WorkflowDiagram'
import { QuickAssessment } from '@/components/QuickAssessment'
import { StickyCTA } from '@/components/StickyCTA'
import { BuiltToDemo } from '@/components/BuiltToDemo'
import { InProduction } from '@/components/InProduction'
import { GateFlow } from '@/components/GateFlow'
import { GateRule } from '@/components/GateRule'

const implementationGap = [
  {
    title: 'The Strategy Problem',
    desc: "Most vendors start with the tool and look for a problem. We start with your strategy and work backwards.",
  },
  {
    title: 'The Trust Problem',
    desc: "Approval gates, audit trails, and human checkpoints on every system. You see everything before it executes.",
  },
  {
    title: 'The Execution Problem',
    desc: "Most firms tell you what AI can do. We build it, deploy it, and hand you a working system.",
  },
]

const methodology = [
  {
    phase: 'Phase 1',
    title: 'Strategic Assessment',
    desc: "Map every workflow, separate essential human judgment from procedural execution, and prioritize by impact.",
  },
  {
    phase: 'Phase 2',
    title: 'Precision Architecture',
    desc: "One system, one measurable outcome, designed around your specific workflows and operational reality.",
  },
  {
    phase: 'Phase 3',
    title: 'Deployment and Control',
    desc: "Approval gates, audit logging, and human-in-the-loop controls. Nothing executes without your sign-off.",
  },
  {
    phase: 'Phase 4',
    title: 'Measurement and Expansion',
    desc: "Track performance against KPIs. When results compound, expand to the next highest-leverage opportunity.",
  },
]

const trustBadges = [
  {
    label: 'Human-in-the-Loop',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 3a4 4 0 100 8 4 4 0 000-8z" />
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
    label: 'Complete Transparency',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
  },
  {
    label: 'Strategy-First Approach',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
]

export default function Home() {
  return (
    <main className="min-h-screen">
      <NavBar />

      {/* Hero */}
      <section className="relative bg-paper pt-40 pb-24">
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <AnimateIn delay={100} distance={16}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight leading-[1.1] mb-8 text-ink">
              AI doesn&apos;t fail because of the technology.
              <br />
              It fails because of the implementation.
            </h1>
          </AnimateIn>

          <AnimateIn delay={300} distance={10}>
            <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto mb-10">
              Everyone wants AI. Most of it never leaves the slide deck.
              Kaleos is the implementation partner that gets it into
              production.
            </p>
          </AnimateIn>

          <AnimateIn delay={500} distance={8}>
            <div className="mb-12">
              <GateFlow />
            </div>
          </AnimateIn>

          <AnimateIn delay={650} distance={8}>
            <a
              href="https://calendly.com/logan-kaleoshq/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-3.5 rounded-lg bg-accent text-white font-medium transition-colors duration-300 hover:bg-teal-700"
            >
              Book a Discovery Call
            </a>
            <p className="mt-8 text-sm text-slate-500 tracking-wide">
              Logan Kay &middot; Founder, Kaleos &middot; Agentic AI systems,
              built and deployed
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* The Implementation Gap */}
      <section className="relative py-24 bg-ink">
        <div className="relative max-w-6xl mx-auto px-4">
          <AnimateIn>
            <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-center mb-5 text-white">
              The Implementation Gap
            </h2>
            <div className="mb-6">
              <GateRule onDark />
            </div>
          </AnimateIn>

          <AnimateIn delay={100}>
            <p className="text-mist text-center max-w-3xl mx-auto mb-14 leading-relaxed">
              Most companies that start with AI never get past the demo. Not
              because the technology doesn&apos;t work, but because nobody
              connected it to how the business actually operates. That gap is
              what Kaleos exists to close.
            </p>
          </AnimateIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {implementationGap.map((item, i) => (
              <AnimateIn key={i} delay={i * 100} className="h-full">
                <GlassCard hover className="p-8 h-full">
                  <h3 className="text-lg font-semibold tracking-tight mb-3 text-white">
                    {item.title}
                  </h3>
                  <p className="text-mist leading-relaxed text-sm">
                    {item.desc}
                  </p>
                </GlassCard>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* In Production */}
      <InProduction />

      {/* Our Methodology */}
      <section id="methodology" className="relative py-24 bg-ink">
        <div className="relative max-w-6xl mx-auto px-4">
          <AnimateIn>
            <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-center mb-5 text-white">
              Agentic AI implementation, done as a discipline.
            </h2>
            <div className="mb-6">
              <GateRule onDark />
            </div>
            <p className="text-mist text-center max-w-3xl mx-auto mb-14 leading-relaxed">
              Agents do the work. Humans make the calls. Everything is logged.
              Every system we ship runs through the same architecture: AI
              processing, an approval gate, and a full audit log.
            </p>
          </AnimateIn>

          <WorkflowDiagram />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {methodology.map((item, i) => (
              <AnimateIn key={i} delay={i * 100} className="h-full">
                <GlassCard hover className="p-8 h-full">
                  <div className="font-system text-accent/80 text-xs uppercase tracking-widest mb-3">
                    {item.phase}
                  </div>
                  <h3 className="text-xl font-semibold tracking-tight mb-3 text-white">
                    {item.title}
                  </h3>
                  <p className="text-mist leading-relaxed text-sm">
                    {item.desc}
                  </p>
                </GlassCard>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* Proof Section */}
      <section className="relative py-24 bg-navy">
        <div className="relative max-w-6xl mx-auto px-4">
          <AnimateIn>
            <p className="font-system text-accent text-xs tracking-widest text-center mb-3 uppercase">
              What it looks like in practice
            </p>
            <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-center mb-12 text-white">
              AI does the work. You make the call.
            </h2>
          </AnimateIn>

          <AnimateIn delay={150}>
            <div className="max-w-4xl mx-auto">
              <DemoFrame />
            </div>
          </AnimateIn>

          <StickyCTA />
        </div>
      </section>

      {/* Built to Demonstrate */}
      <BuiltToDemo />

      {/* Who This Is For */}
      <section className="relative py-24 bg-paper">
        <div className="relative max-w-6xl mx-auto px-4">
          <AnimateIn>
            <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-center mb-5 text-ink">
              Who This Is For
            </h2>
            <div className="mb-10">
              <GateRule />
            </div>
          </AnimateIn>

          <AnimateIn delay={100}>
            <div className="max-w-3xl mx-auto">
              <p className="text-slate-600 leading-relaxed text-lg text-center">
                Founders and operators running $2M-$100M+ companies with real
                complexity and no internal AI capability. If you need a chatbot,
                we&apos;re not the right fit. If you need a strategic
                implementation partner, we should talk.
              </p>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* Quick Assessment Quiz */}
      <QuickAssessment />

      {/* Trust strip + Bottom CTA */}
      <section className="relative py-24 bg-ink">
        <div className="relative max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
            {trustBadges.map((badge, i) => (
              <AnimateIn key={i} delay={i * 100}>
                <div className="flex items-center justify-center gap-3 px-5 py-5 rounded-xl bg-white/[0.045] border border-white/[0.1] transition-colors duration-300 hover:border-accent/40">
                  <span className="text-accent">{badge.icon}</span>
                  <span className="text-white/80 text-sm font-medium tracking-wide">
                    {badge.label}
                  </span>
                </div>
              </AnimateIn>
            ))}
          </div>

          <div className="text-center">
            <AnimateIn>
              <h2 className="text-3xl sm:text-4xl font-medium tracking-tight mb-8 text-white">
                AI won&apos;t replace your business.
                <br className="hidden sm:inline" /> But a competitor with better AI
                <br className="hidden sm:inline" /> implementation will.
              </h2>
            </AnimateIn>
            <AnimateIn delay={200}>
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
        </div>
      </section>

      <Footer />
    </main>
  )
}
