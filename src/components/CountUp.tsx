'use client'

import { useEffect, useRef } from 'react'

/* A numeral that rolls up from zero when it enters view. Renders the final
   value in the markup so nothing depends on JavaScript. */
export function CountUp({ value, suffix = '', prefix = '', duration = 1400, className = '' }: { value: number; suffix?: string; prefix?: string; duration?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let raf = 0
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      io.disconnect()
      const t0 = performance.now()
      const tick = (now: number) => {
        const t = Math.min(1, (now - t0) / duration)
        const eased = 1 - Math.pow(1 - t, 3)
        el.textContent = `${prefix}${Math.round(value * eased)}${suffix}`
        if (t < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }, { threshold: 0.6 })
    io.observe(el)
    return () => { io.disconnect(); cancelAnimationFrame(raf) }
  }, [value, suffix, prefix, duration])
  return <span ref={ref} className={`stat ${className}`}>{prefix}{value}{suffix}</span>
}
