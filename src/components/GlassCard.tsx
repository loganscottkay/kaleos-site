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
  const base = light ? 'card' : 'card-dark'

  const hoverClass = hover
    ? light
      ? 'card-hover'
      : 'card-hover hover:bg-white/[0.07]'
    : ''

  return (
    <div className={['h-full', base, hoverClass, className].join(' ')}>
      {children}
    </div>
  )
}
