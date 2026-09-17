'use client'

import { useRef, type ReactNode } from 'react'

/* A phrase that turns to chrome under the pointer. The metal is painted
   under the letters at all times; hovering fades the white fill away and a
   specular band follows the pointer across the word. */
export function ChromeWord({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null)
  const onMove = (e: React.PointerEvent<HTMLSpanElement>) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${Math.round(((e.clientX - r.left) / r.width) * 100)}%`)
  }
  return (
    <span ref={ref} className="chrome-hover" onPointerMove={onMove}>
      {children}
    </span>
  )
}
