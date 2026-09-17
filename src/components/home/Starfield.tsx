'use client'

import { useEffect, useRef } from 'react'

/* A sparse field of points on the void with slow drift, a little parallax
   from the pointer, and a shooting star every so often. Canvas 2D, paused
   off screen, hidden under reduced motion (CSS). */
export function Starfield({ density = 0.00013, shooting = true }: { density?: number; shooting?: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = 0, h = 0, raf = 0, running = true
    let px = 0, py = 0, tx = 0, ty = 0
    type Star = { x: number; y: number; z: number; r: number; a: number; tw: number }
    type Streak = { x: number; y: number; vx: number; vy: number; life: number; max: number }
    let stars: Star[] = []
    let streak: Streak | null = null
    let nextStreak = performance.now() + 4000 + Math.random() * 6000

    const seed = () => {
      const count = Math.round(w * h * density)
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        z: 0.3 + Math.random() * 0.7, r: 0.4 + Math.random() * 1.1,
        a: 0.2 + Math.random() * 0.6, tw: Math.random() * Math.PI * 2,
      }))
    }
    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = rect.width; h = rect.height
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      seed()
    }

    const draw = (now: number) => {
      if (!running) return
      px += (tx - px) * 0.03
      py += (ty - py) * 0.03
      ctx.clearRect(0, 0, w, h)
      ctx.fillStyle = '#f7f7f4'
      for (const s of stars) {
        s.y -= 0.016 * s.z
        if (s.y < -2) s.y = h + 2
        const twinkle = 0.85 + 0.15 * Math.sin(now / 1400 + s.tw)
        ctx.globalAlpha = s.a * twinkle
        ctx.beginPath()
        ctx.arc(s.x + px * 14 * s.z, s.y + py * 10 * s.z, s.r * s.z, 0, Math.PI * 2)
        ctx.fill()
      }
      if (shooting) {
        if (!streak && now > nextStreak) {
          const fromLeft = Math.random() > 0.5
          streak = {
            x: fromLeft ? Math.random() * w * 0.4 : w * 0.6 + Math.random() * w * 0.4,
            y: Math.random() * h * 0.35,
            vx: (fromLeft ? 1 : -1) * (9 + Math.random() * 5),
            vy: 4 + Math.random() * 3,
            life: 0, max: 42 + Math.random() * 18,
          }
          nextStreak = now + 7000 + Math.random() * 9000
        }
        if (streak) {
          const t = streak.life / streak.max
          const fade = t < 0.2 ? t / 0.2 : 1 - (t - 0.2) / 0.8
          const len = 90
          const nx = -streak.vx, ny = -streak.vy
          const m = Math.hypot(nx, ny) || 1
          const ex = streak.x + (nx / m) * len, ey = streak.y + (ny / m) * len
          const g = ctx.createLinearGradient(streak.x, streak.y, ex, ey)
          g.addColorStop(0, `rgba(247,247,244,${0.95 * fade})`)
          g.addColorStop(0.35, `rgba(99,217,230,${0.5 * fade})`)
          g.addColorStop(1, 'rgba(139,124,248,0)')
          ctx.globalAlpha = 1
          ctx.strokeStyle = g
          ctx.lineWidth = 1.4
          ctx.lineCap = 'round'
          ctx.beginPath(); ctx.moveTo(streak.x, streak.y); ctx.lineTo(ex, ey); ctx.stroke()
          streak.x += streak.vx; streak.y += streak.vy; streak.life += 1
          if (streak.life > streak.max || streak.x < -100 || streak.x > w + 100 || streak.y > h + 100) streak = null
        }
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
  }, [density, shooting])

  return <canvas ref={ref} className="starfield" aria-hidden="true" />
}
