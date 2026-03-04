import { NavBar } from '@/components/NavBar'
import { Footer } from '@/components/Footer'
import { GlassCard } from '@/components/GlassCard'
import { DemoFrame } from '@/components/DemoFrame'
import { AnimateIn } from '@/components/AnimateIn'
import { WorkflowDiagram } from '@/components/WorkflowDiagram'
import { QuickAssessment } from '@/components/QuickAssessment'

const HERO_BG =
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=2070&q=80'

const implementationGap = [
  {
    title: 'The Strategy Problem',
    desc: "Most AI vendors start with the tool and look for a problem. We start with your strategy and work backwards to what actually needs to be built.",
  },
  {
    title: 'The Trust Problem',
    desc: "Every system we deploy has approval gates, audit trails, and human checkpoints. You see everything the AI does before it does it.",
  },
  {
    title: 'The Execution Problem',
    desc: "Most consulting firms tell you what AI can do. We build it. Architecture, deployment, testing, documentation, and a working system.",
  },
]

const methodology = [
  {
    phase: 'Phase 1',
    title: 'Strategic Assessment',
    desc: "We map every workflow, identify where human judgment is essential versus wasted on procedural execution, and build a prioritized opportunity matrix. You get a clear picture of where AI creates the most leverage.",
  },
  {
    phase: 'Phase 2',
    title: 'Precision Architecture',
    desc: "Every system is designed around your specific workflows, voice, and operational reality. One system, one measurable outcome, clear accountability.",
  },
  {
    phase: 'Phase 3',
    title: 'Deployment and Control',
    desc: "We deploy with approval gates, audit logging, and human-in-the-loop controls at every critical point. Nothing executes without explicit human approval.",
  },
  {
    phase: 'Phase 4',
    title: 'Measurement and Expansion',
    desc: "We track performance against defined KPIs and refine based on real usage data. When results compound, we expand to the next highest-leverage opportunity.",
  },
]

const leverage = [
  {
    title: 'Revenue Operations',
    desc: 'Invoice auditing, reconciliation, and financial workflow systems that recover revenue and reduce errors. Built for operators managing high-volume financial operations.',
  },
  {
    title: 'Client Intelligence and Communication',
    desc: 'Proposals, briefs, and client communications generated in your voice with your strategic context. Every output goes through human review before it reaches anyone.',
  },
  {
    title: 'Pipeline and Growth Operations',
    desc: 'Lead qualification, intake automation, and opportunity scoring that turns inbound interest into scoped engagements. Stop losing deals to slow follow-up.',
  },
  {
    title: 'Operational Infrastructure',
    desc: 'Workflows, approvals, reporting, and coordination encoded into repeatable, scalable processes. Add capacity without adding headcount.',
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
              AI doesn&apos;t fail because of the technology.
              <br />
              It fails because of the implementation.
            </h1>
          </AnimateIn>

          <AnimateIn delay={200} distance={15}>
            <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-8 leading-relaxed drop-shadow-sm">
              We deploy AI systems designed around how your business actually
              operates, not how a demo looks on stage.
            </p>
          </AnimateIn>

          <AnimateIn delay={400} distance={10}>
            <a
              href="https://calendly.com/logan-kaleoshq/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-3.5 rounded-xl bg-[#1B2A4A] border border-white/[0.15] text-white font-medium transition-all duration-300 shadow-lg shadow-black/10 hover:shadow-[0_0_20px_rgba(13,148,136,0.4)] hover:scale-[1.03] hover:border-accent/30 active:scale-[0.97]"
            >
              Get Started
            </a>
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
            <p className="text-white/90 text-center text-lg sm:text-xl leading-relaxed mb-12">
              This methodology didn&apos;t come from a textbook. It came from
              building real systems inside one of the most complex institutions
              in higher education.
            </p>
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
                    operations teams. Designed systems that handle real workflows
                    under real institutional constraints. Learned firsthand why
                    most AI projects fail: nobody connects the technology to how
                    the organization actually makes decisions.
                  </p>
                </div>
                <div className="p-8">
                  <h3 className="text-accent font-semibold text-lg mb-3">
                    Kaleos
                  </h3>
                  <p className="text-white/70 leading-relaxed text-sm">
                    Built on the same principles. Every client engagement uses
                    the same strategic assessment methodology, the same
                    human-in-the-loop architecture, and the same single-outcome
                    precision. The framework scales. The approach doesn&apos;t
                    change.
                  </p>
                </div>
              </div>
            </GlassCard>
          </AnimateIn>

          {/* Teal divider */}
          <div className="mt-16 mx-auto max-w-xs h-px bg-teal-500/20" />
        </div>
      </section>

      {/* Our Methodology */}
      <section className="relative py-24 bg-navy dot-grid-dark">
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
                We work with established businesses with real revenue, real
                complexity, and a genuine strategic need for AI. Our clients are
                typically founders and operators running $2M-$100M+ companies
                who don&apos;t have the internal capability to implement AI
                properly. If you&apos;re looking for a chatbot, we&apos;re not
                the right fit. If you need a strategic implementation partner,
                we should talk.
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
              The companies that win with AI aren&apos;t the ones
              <br className="hidden sm:inline" /> using the most of it.
              They&apos;re the ones implementing
              <br className="hidden sm:inline" /> it the most strategically.
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
