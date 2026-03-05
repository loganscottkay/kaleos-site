import { NavBar } from '@/components/NavBar'
import { Footer } from '@/components/Footer'
import { GlassCard } from '@/components/GlassCard'
import { DemoFrame } from '@/components/DemoFrame'
import { AnimateIn } from '@/components/AnimateIn'
import { WorkflowDiagram } from '@/components/WorkflowDiagram'
import { QuickAssessment } from '@/components/QuickAssessment'
import { StickyCTA } from '@/components/StickyCTA'

const HERO_BG =
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=2070&q=80'

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

const leverage = [
  {
    title: 'Revenue Operations',
    desc: 'Invoice auditing, reconciliation, and financial workflows that recover revenue and reduce errors.',
  },
  {
    title: 'Client Intelligence',
    desc: 'Proposals, briefs, and communications generated in your voice, reviewed by you before they reach anyone.',
  },
  {
    title: 'Pipeline and Growth',
    desc: 'Lead qualification, intake automation, and opportunity scoring. Stop losing deals to slow follow-up.',
  },
  {
    title: 'Operational Infrastructure',
    desc: 'Workflows, approvals, and reporting encoded into repeatable processes. Add capacity without headcount.',
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

function SectionChevron() {
  return (
    <div className="flex justify-center py-4 bg-navy">
      <svg
        className="w-5 h-5 text-teal-500/30"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </div>
  )
}

export default function Home() {
  return (
    <main className="min-h-screen">
      <NavBar />

      {/* Hero */}
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
          <AnimateIn delay={300} distance={20}>
            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-tight mb-6 text-white drop-shadow-lg"
              style={{ textShadow: '0 2px 40px rgba(0,0,0,0.15)' }}
            >
              AI doesn&apos;t fail because of the technology.
              <br />
              It fails because of the implementation.
            </h1>
          </AnimateIn>

          <AnimateIn delay={600} distance={15}>
            <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-6 leading-relaxed drop-shadow-sm">
              We deploy AI systems designed around how your business actually
              operates, not how a demo looks on stage.
            </p>
          </AnimateIn>

          <AnimateIn delay={900} distance={10}>
            <p
              className="mt-4 text-sm text-white/90 tracking-wide font-medium"
              style={{ textShadow: '0 1px 3px rgba(0,0,0,0.3)' }}
            >
              Logan Kay | Founder, Kaleos | AI &amp; Operations @ Harvard
              Business School
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* The Implementation Gap */}
      <section className="relative py-24 bg-navy dot-grid-dark">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.06]" style={{ backgroundImage: `url('${HERO_BG}')` }} />
        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <AnimateIn>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-center mb-6 text-white">
              The Implementation Gap
            </h2>
          </AnimateIn>

          <AnimateIn delay={100}>
            <p className="text-white/70 text-center max-w-3xl mx-auto mb-14 leading-relaxed">
              Most companies that start with AI fail. Not because the technology
              doesn&apos;t work, but because nobody connected it to what
              actually matters.
            </p>
          </AnimateIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {implementationGap.map((item, i) => (
              <AnimateIn key={i} delay={i * 100} className="h-full">
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

      <SectionChevron />

      {/* Where This Thinking Comes From */}
      <section className="relative py-24 bg-[#1B2A4A]">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.06]" style={{ backgroundImage: `url('${HERO_BG}')` }} />
        <div className="relative z-10 max-w-[800px] mx-auto px-4">
          <AnimateIn>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-center mb-6 text-white">
              Where This Thinking Comes From
            </h2>
          </AnimateIn>

          <AnimateIn delay={100}>
            <div className="mb-12" />
          </AnimateIn>

          <AnimateIn delay={200}>
            <GlassCard className="p-0">
              <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/10">
                <div className="p-8">
                  <h3 className="text-accent font-semibold text-lg mb-3">
                    Harvard Business School
                  </h3>
                  <p className="text-white/70 leading-relaxed text-sm">
                    Helped spearhead AI implementation across admissions and
                    operations. Learned firsthand why most AI projects fail:
                    nobody connects the technology to how the organization
                    actually makes decisions.
                  </p>
                </div>
                <div className="p-8">
                  <h3 className="text-accent font-semibold text-lg mb-3">
                    Kaleos
                  </h3>
                  <p className="text-white/70 leading-relaxed text-sm">
                    Same strategic methodology, same human-in-the-loop
                    architecture, same single-outcome precision. The framework
                    scales. The principles don&apos;t change.
                  </p>
                </div>
              </div>
            </GlassCard>
          </AnimateIn>

          {/* Teal divider */}
          <div className="mt-16 mx-auto max-w-xs h-px bg-teal-500/20" />
        </div>
      </section>

      <SectionChevron />

      {/* Our Methodology */}
      <section id="methodology" className="relative py-24 bg-navy dot-grid-dark">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.06]" style={{ backgroundImage: `url('${HERO_BG}')` }} />
        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <AnimateIn>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-center mb-14 text-white">
              A framework for AI that actually works.
            </h2>
          </AnimateIn>

          <WorkflowDiagram />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {methodology.map((item, i) => (
              <AnimateIn key={i} delay={i * 100} className="h-full">
                <GlassCard hover className="p-8 h-full">
                  <div className="text-accent text-sm font-mono mb-3">
                    {item.phase}
                  </div>
                  <h3 className="text-xl font-semibold tracking-tight mb-3 text-white">
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

      <SectionChevron />

      {/* Where AI Creates Leverage */}
      <section className="relative py-24 bg-navy dot-grid-dark">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.06]" style={{ backgroundImage: `url('${HERO_BG}')` }} />
        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <AnimateIn>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-center mb-14 text-white">
              Where AI Creates Leverage
            </h2>
          </AnimateIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {leverage.map((item, i) => (
              <AnimateIn key={i} delay={i * 100} className="h-full">
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

      <SectionChevron />

      {/* Proof Section */}
      <section className="relative py-24 bg-[#162035]">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.06]" style={{ backgroundImage: `url('${HERO_BG}')` }} />
        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <AnimateIn>
            <p className="text-accent text-xs font-mono tracking-widest text-center mb-3 uppercase">
              What it looks like in practice
            </p>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-center mb-12 text-white">
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

      {/* Who This Is For */}
      <section className="relative py-24 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${HERO_BG}')` }}
        />
        <div className="absolute inset-0 bg-white/70 backdrop-blur-sm" />

        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <AnimateIn>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-center mb-10 text-navy">
              Who This Is For
            </h2>
          </AnimateIn>

          <AnimateIn delay={100}>
            <div className="max-w-3xl mx-auto">
              <p className="text-slate-600 leading-relaxed text-lg">
                Founders and operators running $2M-$100M+ companies with real
                complexity and no internal AI capability. If you need a chatbot,
                we&apos;re not the right fit. If you need a strategic
                implementation partner, we should talk.
              </p>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* Trust Strip */}
      <section className="relative py-24 bg-navy overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.06]" style={{ backgroundImage: `url('${HERO_BG}')` }} />

        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {trustBadges.map((badge, i) => (
              <AnimateIn key={i} delay={i * 100}>
                <div className="flex items-center justify-center gap-3 px-5 py-5 rounded-xl bg-white/[0.06] backdrop-blur-xl border border-white/[0.12] shadow-lg shadow-black/10 transition-all duration-300 hover:bg-white/[0.1] hover:border-accent/20 hover:shadow-[0_0_15px_rgba(13,148,136,0.15)] hover:scale-[1.02]">
                  <span className="text-accent">{badge.icon}</span>
                  <span className="text-white/80 text-sm font-medium tracking-wide">
                    {badge.label}
                  </span>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Assessment Quiz */}
      <QuickAssessment />

      {/* Bottom CTA */}
      <section className="relative py-24 bg-navy">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.06]" style={{ backgroundImage: `url('${HERO_BG}')` }} />
        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
          <AnimateIn>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-4 text-white">
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
              className="inline-flex items-center px-8 py-3.5 rounded-xl bg-[#1B2A4A] border border-white/[0.15] text-white font-medium transition-all duration-300 shadow-lg shadow-black/10 hover:shadow-[0_0_20px_rgba(13,148,136,0.4)] hover:scale-[1.03] hover:border-accent/30 active:scale-[0.97]"
            >
              Start with an Assessment
            </a>
          </AnimateIn>
        </div>
      </section>

      <Footer />
    </main>
  )
}
