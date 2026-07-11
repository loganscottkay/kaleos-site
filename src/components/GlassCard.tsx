import type { ReactNode } from 'react'

interface GlassCardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  light?: boolean
}

// Solid card system (name kept from the v1 glass era to avoid churn at call sites)
export function GlassCard({
  children,
  className = '',
  hover = false,
  light = false,
}: GlassCardProps) {
  const base = light
    ? 'bg-white border border-slate-200 shadow-sm'
    : 'bg-white/[0.045] border border-white/[0.1] shadow-sm shadow-black/20'

  const hoverClass = hover
    ? light
      ? 'transition-colors duration-300 hover:border-accent/40'
      : 'transition-colors duration-300 hover:border-accent/40 hover:bg-white/[0.07]'
    : ''

  return (
    <div
      className={['rounded-xl h-full', base, hoverClass, className].join(' ')}
    >
      {children}
    </div>
  )
}
