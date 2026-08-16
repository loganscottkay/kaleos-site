'use client'

import type { ReactNode } from 'react'

// The shared approval-gate motif: same chip as the GateRule signature,
// here as the live control the visitor actually clicks.
export function GateChip({ approved }: { approved: boolean }) {
  return (
    <span
      className={`inline-flex items-center justify-center w-5 h-5 rounded-control border-[1.5px] transition-colors duration-200 ${
        approved ? 'border-approved bg-approved/15' : 'border-pending-bright/80 bg-transparent'
      }`}
      aria-hidden="true"
    >
      {approved ? (
        <svg className="w-3 h-3 text-teal-bright" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
        </svg>
      ) : (
        <span className="w-1.5 h-1.5 rounded-full bg-pending-bright/80 animate-pulse-slow" />
      )}
    </span>
  )
}

export function GateStatus({
  approved,
  pendingLabel = 'Awaiting your approval',
  approvedLabel = 'Approved and logged',
}: {
  approved: boolean
  pendingLabel?: string
  approvedLabel?: string
}) {
  return (
    <div className="flex items-center gap-2">
      <GateChip approved={approved} />
      <span
        className={`font-system text-[10px] tracking-wide uppercase transition-colors duration-200 ${
          approved ? 'text-teal-bright' : 'text-pending-bright/90'
        }`}
      >
        {approved ? approvedLabel : pendingLabel}
      </span>
    </div>
  )
}

export function DemoButton({
  onClick,
  variant = 'primary',
  children,
  disabled = false,
}: {
  onClick: () => void
  variant?: 'primary' | 'ghost' | 'danger'
  children: ReactNode
  disabled?: boolean
}) {
  const styles = {
    primary: 'btn-primary',
    ghost: 'btn-ghost-dark',
    // Reject affordance in the demos; red has no brand token, kept as the
    // one explicit exception
    danger: 'bg-white/[0.04] text-red-300/80 border border-red-400/20 hover:border-red-400/40',
  }
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`btn px-3.5 font-system text-xs ${styles[variant]}`}
    >
      {children}
    </button>
  )
}

export function DemoShell({
  title,
  live,
  children,
}: {
  title: string
  live?: boolean
  children: ReactNode
}) {
  return (
    <div className="rounded-card bg-navy-950 border border-white/[0.06] flex-1 flex flex-col overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/5">
        <span className="font-system text-[10px] text-white/60 tracking-wide">{title}</span>
        {live !== false && (
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-approved animate-pulse-slow" />
            <span className="font-system text-[10px] text-teal-bright/80">Live</span>
          </span>
        )}
      </div>
      <div className="flex-1 flex flex-col min-h-0">{children}</div>
    </div>
  )
}
