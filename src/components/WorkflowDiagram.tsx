'use client'

import { useRef, useEffect, useState } from 'react'

// --- Icons ---
function MailIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  )
}
function DocIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
  )
}
function DataIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375" />
    </svg>
  )
}
function UsersIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
    </svg>
  )
}
function CpuIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z" />
    </svg>
  )
}
function ShieldIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  )
}
function ClipboardIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 7h.01M9 16h.01M12 12h3m-3 4h3" />
    </svg>
  )
}
function CheckCircleIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
}
function ChartIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
    </svg>
  )
}
function RocketIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
    </svg>
  )
}
function PaperPlaneIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
    </svg>
  )
}

// --- Glassmorphic box wrapper ---
function GlassBox({
  children,
  className = '',
  delay = 0,
  visible,
  glow = false,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  visible: boolean
  glow?: boolean
}) {
  return (
    <div
      className={`relative rounded-2xl backdrop-blur-2xl border border-white/[0.12] bg-white/[0.06] shadow-lg shadow-black/10 ${className}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.6s ease-out ${delay}ms, transform 0.6s ease-out ${delay}ms`,
      }}
    >
      {/* Inner highlight */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/[0.06] via-transparent to-transparent pointer-events-none" />
      {/* Optional pulsing glow border */}
      {glow && (
        <div
          className="absolute -inset-px rounded-2xl pointer-events-none"
          style={{
            boxShadow: '0 0 24px rgba(13,148,136,0.3), inset 0 0 24px rgba(13,148,136,0.05)',
            animation: 'systemGlow 3s ease-in-out infinite',
          }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  )
}

// --- Animated connection line with flowing dots ---
function ConnectionLine({
  visible,
  delay = 0,
  vertical = false,
}: {
  visible: boolean
  delay?: number
  vertical?: boolean
}) {
  if (vertical) {
    return (
      <div className="relative flex flex-col items-center" style={{ height: 40 }}>
        <div
          className="w-[2px] bg-gradient-to-b from-teal-500/60 to-teal-500/30"
          style={{
            height: visible ? '100%' : '0%',
            transition: `height 0.5s ease-out ${delay}ms`,
          }}
        />
        {/* Flowing dot */}
        <div
          className="absolute left-1/2 -translate-x-1/2 w-[5px] h-[5px] rounded-full bg-teal-400 shadow-[0_0_6px_rgba(13,148,136,0.8)]"
          style={{
            opacity: visible ? 1 : 0,
            animation: visible ? `flowDotVertical 2s ease-in-out ${delay + 400}ms infinite` : 'none',
          }}
        />
        {/* Arrow */}
        <svg className="absolute -bottom-1" width="10" height="8" viewBox="0 0 10 8"
          style={{ opacity: visible ? 0.6 : 0, transition: `opacity 0.3s ease-out ${delay + 300}ms` }}>
          <path d="M1 1L5 6L9 1" stroke="#0d9488" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    )
  }

  return (
    <div className="relative flex items-center shrink-0" style={{ width: 56 }}>
      <div
        className="h-[2px] bg-gradient-to-r from-teal-500/60 to-teal-500/30"
        style={{
          width: visible ? '100%' : '0%',
          transition: `width 0.5s ease-out ${delay}ms`,
        }}
      />
      {/* Flowing dots — two staggered */}
      {[0, 1000].map((extraDelay, i) => (
        <div
          key={i}
          className="absolute top-1/2 -translate-y-1/2 w-[5px] h-[5px] rounded-full bg-teal-400 shadow-[0_0_6px_rgba(13,148,136,0.8)]"
          style={{
            opacity: visible ? 1 : 0,
            animation: visible ? `flowDotH 2s ease-in-out ${delay + 400 + extraDelay}ms infinite` : 'none',
          }}
        />
      ))}
      {/* Arrow */}
      <svg className="absolute -right-1 top-1/2 -translate-y-1/2" width="8" height="10" viewBox="0 0 8 10"
        style={{ opacity: visible ? 0.6 : 0, transition: `opacity 0.3s ease-out ${delay + 300}ms` }}>
        <path d="M1 1L6 5L1 9" stroke="#0d9488" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  )
}

// --- Internal node inside the center system box ---
function InternalNode({
  icon,
  label,
  visible,
  delay,
}: {
  icon: React.ReactNode
  label: string
  visible: boolean
  delay: number
}) {
  return (
    <div
      className="flex items-center gap-2.5 rounded-lg bg-white/[0.06] border border-white/[0.1] px-3 py-2"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'scale(1)' : 'scale(0.9)',
        transition: `opacity 0.4s ease-out ${delay}ms, transform 0.4s ease-out ${delay}ms`,
      }}
    >
      <span className="text-accent">{icon}</span>
      <span className="text-white/80 text-xs font-medium whitespace-nowrap">{label}</span>
    </div>
  )
}

// --- Small labeled icon ---
function SmallItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-white/40">{icon}</span>
      <span className="text-white/50 text-[11px]">{label}</span>
    </div>
  )
}

// ===================== MAIN COMPONENT =====================
export function WorkflowDiagram() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: '50px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="mb-14">
      {/* ===== DESKTOP / TABLET ===== */}
      <div className="hidden md:flex items-stretch justify-center gap-0">
        {/* LEFT — Your Business */}
        <GlassBox visible={visible} delay={0} className="p-5 w-[170px] flex flex-col justify-center">
          <p className="text-white font-semibold text-sm mb-3 tracking-tight">Your Business</p>
          <div className="flex flex-col gap-2">
            <SmallItem icon={<MailIcon />} label="Emails" />
            <SmallItem icon={<DataIcon />} label="Data" />
            <SmallItem icon={<DocIcon />} label="Documents" />
            <SmallItem icon={<UsersIcon />} label="Clients" />
          </div>
        </GlassBox>

        {/* Connection 1 */}
        <ConnectionLine visible={visible} delay={400} />

        {/* CENTER — Kaleos System */}
        <GlassBox visible={visible} delay={300} glow className="p-6 w-[280px]">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_rgba(13,148,136,0.6)]"
              style={{ animation: visible ? 'corePulse 2s ease-in-out infinite' : 'none' }} />
            <p className="text-white font-semibold text-sm tracking-tight">Kaleos System</p>
          </div>
          <div className="flex flex-col gap-2.5">
            <InternalNode icon={<CpuIcon />} label="AI Processing" visible={visible} delay={600} />
            <InternalNode icon={<ShieldIcon />} label="Approval Gate" visible={visible} delay={750} />
            <InternalNode icon={<ClipboardIcon />} label="Audit Log" visible={visible} delay={900} />
          </div>
        </GlassBox>

        {/* Connection 2 */}
        <ConnectionLine visible={visible} delay={800} />

        {/* RIGHT — Output */}
        <GlassBox visible={visible} delay={600} className="p-5 w-[170px] flex flex-col justify-center">
          <p className="text-white font-semibold text-sm mb-3 tracking-tight">Output</p>
          <div className="flex flex-col gap-2">
            <SmallItem icon={<PaperPlaneIcon />} label="Proposals sent" />
            <SmallItem icon={<ChartIcon />} label="Reports generated" />
            <SmallItem icon={<RocketIcon />} label="Leads qualified" />
            <SmallItem icon={<CheckCircleIcon />} label="Tasks completed" />
          </div>
        </GlassBox>
      </div>

      {/* ===== MOBILE ===== */}
      <div className="flex md:hidden flex-col items-center gap-0">
        {/* Your Business */}
        <GlassBox visible={visible} delay={0} className="p-5 w-[260px]">
          <p className="text-white font-semibold text-sm mb-3 tracking-tight">Your Business</p>
          <div className="flex flex-wrap gap-x-4 gap-y-1.5">
            <SmallItem icon={<MailIcon />} label="Emails" />
            <SmallItem icon={<DataIcon />} label="Data" />
            <SmallItem icon={<DocIcon />} label="Documents" />
            <SmallItem icon={<UsersIcon />} label="Clients" />
          </div>
        </GlassBox>

        <ConnectionLine visible={visible} delay={300} vertical />

        {/* Kaleos System */}
        <GlassBox visible={visible} delay={300} glow className="p-5 w-[260px]">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_rgba(13,148,136,0.6)]"
              style={{ animation: visible ? 'corePulse 2s ease-in-out infinite' : 'none' }} />
            <p className="text-white font-semibold text-sm tracking-tight">Kaleos System</p>
          </div>
          <div className="flex flex-col gap-2">
            <InternalNode icon={<CpuIcon />} label="AI Processing" visible={visible} delay={500} />
            <InternalNode icon={<ShieldIcon />} label="Approval Gate" visible={visible} delay={650} />
            <InternalNode icon={<ClipboardIcon />} label="Audit Log" visible={visible} delay={800} />
          </div>
        </GlassBox>

        <ConnectionLine visible={visible} delay={700} vertical />

        {/* Output */}
        <GlassBox visible={visible} delay={600} className="p-5 w-[260px]">
          <p className="text-white font-semibold text-sm mb-3 tracking-tight">Output</p>
          <div className="flex flex-wrap gap-x-4 gap-y-1.5">
            <SmallItem icon={<PaperPlaneIcon />} label="Proposals sent" />
            <SmallItem icon={<ChartIcon />} label="Reports" />
            <SmallItem icon={<RocketIcon />} label="Leads qualified" />
            <SmallItem icon={<CheckCircleIcon />} label="Tasks done" />
          </div>
        </GlassBox>
      </div>

      {/* Summary line */}
      <p
        className="text-center text-white/50 text-sm mt-10 max-w-xl mx-auto leading-relaxed"
        style={{
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.6s ease-out 1100ms',
        }}
      >
        Every system we build follows this architecture. AI processes, humans approve, everything logged.
      </p>

      {/* Keyframes */}
      <style>{`
        @keyframes flowDotH {
          0% { left: 0; }
          100% { left: calc(100% - 5px); }
        }
        @keyframes flowDotVertical {
          0% { top: 0; }
          100% { top: calc(100% - 5px); }
        }
        @keyframes systemGlow {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
        @keyframes corePulse {
          0%, 100% { box-shadow: 0 0 8px rgba(13,148,136,0.6); transform: scale(1); }
          50% { box-shadow: 0 0 16px rgba(13,148,136,0.9); transform: scale(1.2); }
        }
      `}</style>
    </div>
  )
}
