'use client'

import { useEffect, useRef } from 'react'

/* A dot that sits exactly on the pointer and a ring that follows a beat
   behind. Fine pointers only; touch devices and reduced motion never see it.
   Over anything pressable the ring grows and turns cyan; over text inputs
   it steps aside for the native caret. */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const root = document.documentElement
    root.classList.add('has-cursor')
    let x = -100, y = -100, rx = -100, ry = -100, raf = 0, seen = false

    const move = (e: PointerEvent) => {
      x = e.clientX; y = e.clientY
      if (!seen) { seen = true; rx = x; ry = y; root.dataset.cursor = '' }
      const t = e.target as Element | null
      const press = t?.closest('a, button, [role="button"], summary, label, .chip')
      const text = t?.closest('input, textarea, [contenteditable="true"]')
      root.dataset.cursor = text ? 'text' : press ? 'press' : ''
    }
    const tick = () => {
      rx += (x - rx) * 0.18; ry += (y - ry) * 0.18
      if (dot.current) dot.current.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`
      if (ring.current) ring.current.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`
      raf = requestAnimationFrame(tick)
    }
    const leave = () => { root.dataset.cursor = 'hidden' }
    const enter = () => { root.dataset.cursor = '' }
    root.dataset.cursor = 'hidden'
    window.addEventListener('pointermove', move, { passive: true })
    document.addEventListener('pointerleave', leave)
    document.addEventListener('pointerenter', enter)
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', move)
      document.removeEventListener('pointerleave', leave)
      document.removeEventListener('pointerenter', enter)
      root.classList.remove('has-cursor')
      delete root.dataset.cursor
    }
  }, [])

  return (
    <>
      <div ref={dot} className="cursor-dot" aria-hidden="true" />
      <div ref={ring} className="cursor-ring" aria-hidden="true" />
    </>
  )
}
