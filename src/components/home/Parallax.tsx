'use client'

import { useRef, type ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

/* A small vertical drift tied to scroll. Decorative only: under reduced
   motion nothing moves and the element sits at rest. */
export function Parallax({ children, amount = 40, className = '' }: { children: ReactNode; amount?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      const el = ref.current
      if (!el) return
      gsap.fromTo(
        el,
        { y: -amount },
        {
          y: amount,
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 0.6 },
        },
      )
    },
    { scope: ref, dependencies: [amount] },
  )

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
