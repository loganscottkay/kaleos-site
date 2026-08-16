'use client'

import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { AnimateIn } from '@/components/AnimateIn'
import { GateRule } from '@/components/GateRule'

// Below the fold on every viewport: load each demo only when the section nears view.
// Fixed-height placeholders reserve the space so nothing shifts.
const DEMO_MIN_H = 420

function DemoPlaceholder() {
  return (
    <div
      className="rounded-card bg-navy-950 border border-white/[0.06] flex-1"
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
    <section ref={sectionRef} className="relative py-16 md:py-24 bg-navy">
      <div className="relative max-w-6xl mx-auto px-4">
        <AnimateIn>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-x-12 gap-y-6 items-end mb-16">
            <div className="md:col-span-6">
              <p className="font-system text-teal-bright text-caption tracking-widest mb-3 uppercase">
                What it looks like in practice
              </p>
              <h2 className="text-h2 font-medium text-white">
                AI does the work. You make the call.
              </h2>
              <div className="mt-6">
                <GateRule onDark align="start" />
              </div>
            </div>
            <p className="md:col-span-5 md:col-start-8 text-mist text-body">
              Working demos, modeled on systems Kaleos HQ has deployed. Sample data.
              Click around: the approve button is real, and it is the same gate
              every Kaleos HQ system ships with.
            </p>
          </div>
        </AnimateIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {demos.map((demo, i) => (
            <AnimateIn
              key={demo.title}
              delay={i * 100}
              className={`h-full ${i === 2 ? 'md:col-span-2 lg:col-span-1 md:max-w-[calc(50%-var(--space-12))] md:mx-auto md:w-full lg:max-w-none' : ''}`}
            >
              <div className="card-dark card-hover shadow-demo-card p-6 flex flex-col h-full">
                <h3 className="font-system text-caption font-semibold text-accent mb-4 tracking-widest uppercase">
                  {demo.title}
                </h3>
                <div className="flex-1 flex flex-col" style={{ minHeight: DEMO_MIN_H }}>
                  {near ? <demo.Component /> : <DemoPlaceholder />}
                </div>
                <p className="text-caption text-mist/80 mt-4 pt-3 border-t border-white/5">
                  {demo.desc}
                </p>
              </div>
            </AnimateIn>
          ))}
        </div>

      </div>
    </section>
  )
}
