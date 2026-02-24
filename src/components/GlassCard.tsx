import type { ReactNode } from 'react'

interface GlassCardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  light?: boolean
}

export function GlassCard({
  children,
  className = '',
  hover = false,
  light = false,
}: GlassCardProps) {
  const base = light
    ? 'bg-white/[0.55] backdrop-blur-xl border border-white/[0.3] shadow-md ring-1 ring-inset ring-white/30'
    : 'bg-white/[0.08] backdrop-blur-xl border border-white/[0.15] shadow-lg shadow-black/10 ring-1 ring-inset ring-white/10'

  const hoverClass = hover
    ? light
      ? 'transition-all duration-300 hover:bg-white/[0.65] hover:shadow-xl hover:shadow-black/8 hover:-translate-y-0.5'
      : 'glass-shimmer transition-all duration-500 hover:bg-white/15 hover:border-white/30 hover:-translate-y-0.5'
    : ''

  const highlight = light
    ? 'bg-gradient-to-b from-white/60 via-white/20 to-transparent'
    : 'bg-gradient-to-b from-white/[0.12] via-transparent to-transparent'

  return (
    <div
      className={['relative overflow-hidden rounded-2xl', base, hoverClass, className].join(' ')}
    >
      <div
        className={`absolute inset-0 ${highlight} pointer-events-none`}
      />
      <div className="relative">{children}</div>
    </div>
  )
}
