'use client'

import { useRef, type ReactNode } from 'react'

/* A small physical give: the wrapped element drifts a few pixels toward the
   pointer and settles back when it leaves. Pointer devices only. */
export function Magnet({ children, strength = 0.18, className = '' }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const dx = (e.clientX - (r.left + r.width / 2)) * strength
    const dy = (e.clientY - (r.top + r.height / 2)) * strength
    el.style.transform = `translate(${dx.toFixed(1)}px, ${dy.toFixed(1)}px)`
  }
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = ''
  }
  return (
    <span ref={ref} onPointerMove={onMove} onPointerLeave={onLeave} className={`magnet inline-block ${className}`}>
      {children}
    </span>
  )
}
