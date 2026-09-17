'use client'

import { useEffect, useRef } from 'react'

/* A field of stars on the void with slow drift, a little parallax from the
   pointer, and a shooting star every so often. With `real`, the field is
   the actual sky: 3,000 stars from the Yale Bright Star Catalog (via the
   d3-celestial data set) projected stereographically around the winter
   sky, Orion at the center, sized by magnitude and tinted by color index,
   turning slowly like the night does. Canvas 2D, paused off screen, hidden
   under reduced motion (CSS). */
type Catalog = [number, number, number, number][]
let catalog: Promise<Catalog> | null = null
const loadCatalog = () => (catalog ??= fetch('/stars.json').then((r) => r.json() as Promise<Catalog>))

function tint(bv: number) {
  if (bv < -0.05) return '#b9cdff'
  if (bv < 0.35) return '#f7f7f4'
  if (bv < 0.8) return '#fff1d6'
  if (bv < 1.3) return '#ffd9a8'
  return '#ffc48a'
}

export function Starfield({ density = 0.00013, shooting = true, real = false }: { density?: number; shooting?: boolean; real?: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = 0, h = 0, raf = 0, running = true
    let px = 0, py = 0, tx = 0, ty = 0
    type Star = { x: number; y: number; z: number; r: number; a: number; tw: number; c: string }
    type Sky = { ra: number; dec: number; r: number; a: number; c: string; tw: number }
    let sky: Sky[] = []
    let ra0 = 84
    const dec0 = 8 // between Orion and Taurus; the field turns slowly westward
    if (real) loadCatalog().then((cat) => { sky = cat.map(([ra, dec, mag, bv]) => ({ ra, dec, r: Math.max(0.35, (6.2 - mag) * 0.42), a: Math.min(1, 0.25 + (6 - mag) * 0.16), c: tint(bv), tw: Math.random() * Math.PI * 2 })) }).catch(() => {})
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
        c: (() => { const h = Math.random(); return h < 0.03 ? '#ff5fa2' : h < 0.06 ? '#ffb457' : h < 0.12 ? '#63d9e6' : '#f7f7f4' })(),
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
      if (real && sky.length) {
        // Stereographic projection of the real sky around (ra0, dec0).
        ra0 += 0.00035
        const scale = Math.max(w, h) * 0.62
        const d0 = (dec0 * Math.PI) / 180, sd0 = Math.sin(d0), cd0 = Math.cos(d0)
        for (const s of sky) {
          const dra = ((s.ra - ra0) * Math.PI) / 180, d = (s.dec * Math.PI) / 180
          const sd = Math.sin(d), cd = Math.cos(d), cdra = Math.cos(dra)
          const k = 2 / (1 + sd0 * sd + cd0 * cd * cdra)
          if (k > 3.2) continue
          const x = w / 2 + k * cd * Math.sin(dra) * scale * -1 + px * 12
          const y = h / 2 - k * (cd0 * sd - sd0 * cd * cdra) * scale + py * 8
          if (x < -4 || x > w + 4 || y < -4 || y > h + 4) continue
          const twinkle = 0.86 + 0.14 * Math.sin(now / 1600 + s.tw)
          ctx.globalAlpha = s.a * twinkle
          ctx.fillStyle = s.c
          ctx.beginPath(); ctx.arc(x, y, s.r, 0, Math.PI * 2); ctx.fill()
        }
      } else for (const s of stars) {
        ctx.fillStyle = s.c
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
          if (!Number.isFinite(streak.x + streak.y + ex + ey)) { streak = null; ctx.globalAlpha = 1; raf = requestAnimationFrame(draw); return }
          const g = ctx.createLinearGradient(streak.x, streak.y, ex, ey)
          g.addColorStop(0, `rgba(247,247,244,${0.95 * fade})`)
          g.addColorStop(0.3, `rgba(99,217,230,${0.5 * fade})`)
          g.addColorStop(0.62, `rgba(255,95,162,${0.28 * fade})`)
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
  }, [density, shooting, real])

  return <canvas ref={ref} className="starfield" aria-hidden="true" />
}
