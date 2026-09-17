import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  light?: boolean
}

// The one card system: white on paper (`light`), white-at-opacity on dark grounds.
export function Card({
  children,
  className = '',
  hover = false,
  light = false,
}: CardProps) {
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
