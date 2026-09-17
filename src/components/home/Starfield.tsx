'use client'

import { useEffect, useRef } from 'react'

/* A sparse field of points on the void. Slow drift, a little parallax with
   the pointer, no twinkle loops fighting for attention. Canvas 2D, paused
   when off screen, hidden entirely under reduced motion (CSS). */
export function Starfield({ density = 0.00012 }: { density?: number }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = 0
    let h = 0
    let dpr = 1
    let raf = 0
    let running = true
    let px = 0
    let py = 0
    let tx = 0
    let ty = 0

    type Star = { x: number; y: number; z: number; r: number; a: number }
    let stars: Star[] = []

    const seed = () => {
      const count = Math.round(w * h * density)
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        z: 0.3 + Math.random() * 0.7,
        r: 0.4 + Math.random() * 1.1,
        a: 0.25 + Math.random() * 0.55,
      }))
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = rect.width
      h = rect.height
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      seed()
    }

    const draw = () => {
      if (!running) return
      px += (tx - px) * 0.03
      py += (ty - py) * 0.03
      ctx.clearRect(0, 0, w, h)
      for (const s of stars) {
        s.y -= 0.018 * s.z
        if (s.y < -2) s.y = h + 2
        const ox = px * 14 * s.z
        const oy = py * 10 * s.z
        ctx.globalAlpha = s.a
        ctx.fillStyle = '#f7f7f4'
        ctx.beginPath()
        ctx.arc(s.x + ox, s.y + oy, s.r * s.z, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
      raf = requestAnimationFrame(draw)
    }

    const onMove = (e: PointerEvent) => {
      tx = (e.clientX / window.innerWidth - 0.5) * 2
      ty = (e.clientY / window.innerHeight - 0.5) * 2
    }

    const io = new IntersectionObserver(([entry]) => {
      running = entry.isIntersecting
      if (running) raf = requestAnimationFrame(draw)
      else cancelAnimationFrame(raf)
    })

    resize()
    io.observe(canvas)
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onMove, { passive: true })

    return () => {
      running = false
      cancelAnimationFrame(raf)
      io.disconnect()
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
    }
  }, [density])

  return <canvas ref={ref} className="starfield" aria-hidden="true" />
}
