import type { ReactNode } from 'react'
import { Reveal } from '@/components/Reveal'

// Thin compatibility shim over Reveal. Call sites across the site already
// pass `delay` and `distance`, so the wrapper keeps that signature and
// maps it onto the reveal variants. New code should import Reveal directly.
interface AnimateInProps {
  children: ReactNode
  delay?: number
  distance?: 24 | 32
  className?: string
}

export function AnimateIn({
  children,
  delay = 0,
  distance = 24,
  className = '',
}: AnimateInProps) {
  return (
    <Reveal delay={delay} variant={distance === 32 ? 'far' : 'up'} className={className}>
      {children}
    </Reveal>
  )
}
