import type { ReactNode } from 'react'

// The one orchestrated motion moment per page is the approval gate
// (GateFlow). This wrapper renders content in its final state
// immediately rather than staging a scroll-triggered reveal, so pages
// stay complete with motion off and no scattered scroll effects
// compete with the gate. Kept as a stable layout wrapper so call sites
// (and their className/spacing usage) don't need to change.
interface AnimateInProps {
  children: ReactNode
  delay?: number
  distance?: 24 | 32
  className?: string
}

export function AnimateIn({ children, className = '' }: AnimateInProps) {
  return <div className={className}>{children}</div>
}
