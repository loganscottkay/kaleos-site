'use client'

import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { AnimateIn } from '@/components/AnimateIn'
import { GateRule } from '@/components/GateRule'
import { StickyCTA } from '@/components/StickyCTA'

// Below the fold on every viewport: load each demo only when the section nears view.
// Fixed-height placeholders reserve the space so nothing shifts.
const DEMO_MIN_H = 420

function DemoPlaceholder() {
  return (
    <div
      className="rounded-lg bg-[#0B1626] border border-white/[0.06] flex-1"
      style={{ minHeight: DEMO_MIN_H }}
    />
  )
}

const ClientPortalDemo = dynamic(
  () => import('./demos/ClientPortalDemo').then((m) => m.ClientPortalDemo),
  { ssr: false, loading: DemoPlaceholder }
)
const AccountabilityDemo = dynamic(
  () => import('./demos/AccountabilityDemo').then((m) => m.AccountabilityDemo),
  { ssr: false, loading: DemoPlaceholder }
)
const OutreachDemo = dynamic(
  () => import('./demos/OutreachDemo').then((m) => m.OutreachDemo),
  { ssr: false, loading: DemoPlaceholder }
)

const demos = [
  {
    title: 'Client Operations Portal',
    desc: 'Modeled on portal work for a services business. The agent drafts the status update, you approve it, the client sees it. No status-update phone calls.',
    Component: ClientPortalDemo,
  },
  {
    title: 'Performance & Accountability Platform',
    desc: 'Modeled on a multi-tenant coaching platform. Streaks and goals track themselves; the weekly summary waits for a human before it reaches the team.',
    Component: AccountabilityDemo,
  },
  {
    title: 'AI Outreach Engine',
    desc: 'Modeled on a live outreach system. Leads come in scored, drafts come out personalized, and nothing sends until you say so.',
    Component: OutreachDemo,
  },
]

export function BuiltToDemo() {
  const sectionRef = useRef<HTMLElement>(null)
  const [near, setNear] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true)
          observer.disconnect()
        }
      },
      { rootMargin: '400px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-24 bg-navy">
      <div className="relative max-w-6xl mx-auto px-4">
        <AnimateIn>
          <p className="font-system text-accent text-xs tracking-widest text-center mb-3 uppercase">
            What it looks like in practice
          </p>
          <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-center mb-5 text-white">
            AI does the work. You make the call.
          </h2>
          <div className="mb-6">
            <GateRule onDark />
          </div>
          <p className="text-mist text-center max-w-2xl mx-auto mb-14 text-sm leading-relaxed">
            Working demos, modeled on systems Kaleos has deployed. Sample data.
            Click around: the approve button is real, and it is the same gate
            every Kaleos system ships with.
          </p>
        </AnimateIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {demos.map((demo, i) => (
            <AnimateIn
              key={demo.title}
              delay={i * 100}
              className={`h-full ${i === 2 ? 'md:col-span-2 lg:col-span-1 md:max-w-[calc(50%-0.75rem)] md:mx-auto md:w-full lg:max-w-none' : ''}`}
            >
              <div className="rounded-xl p-5 bg-white/[0.045] border border-white/[0.1] transition-colors duration-300 hover:border-accent/30 flex flex-col h-full">
                <h3 className="font-system text-[11px] font-semibold text-accent mb-4 tracking-widest uppercase">
                  {demo.title}
                </h3>
                <div className="flex-1 flex flex-col" style={{ minHeight: DEMO_MIN_H }}>
                  {near ? <demo.Component /> : <DemoPlaceholder />}
                </div>
                <p className="text-[11px] text-mist/80 leading-relaxed mt-4 pt-3 border-t border-white/5">
                  {demo.desc}
                </p>
              </div>
            </AnimateIn>
          ))}
        </div>

        <StickyCTA />
      </div>
    </section>
  )
}
