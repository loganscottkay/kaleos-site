'use client'

import { useEffect, useRef, useState } from 'react'

/* One second at warp, then the page. A field of stars in depth flies past
   the camera: each one is projected from a z position toward the viewer, so
   the ones near the center barely move while the ones at the edge streak.
   Speed ramps in, holds, then drops out with a short flash of light as the
   overlay fades and the stars settle back into points. Plays on every full
   load of the home page. Skipped under reduced motion. */

const WARP_MS = 1000
const SETTLE_MS = 650

export function WarpIntro() {
  const ref = useRef<HTMLCanvasElement>(null)
  const [phase, setPhase] = useState<'warp' | 'fade' | 'done'>('warp')

  useEffect(() => {
    const root = document.documentElement
    const finish = () => {
      root.classList.remove('warping')
      requestAnimationFrame(() => setPhase('done'))
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return finish()
    root.classList.add('warping')

    const canvas = ref.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return finish()

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const w = window.innerWidth, h = window.innerHeight
    canvas.width = w * dpr; canvas.height = h * dpr
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    const cx = w / 2, cy = h / 2
    const focal = Math.min(w, h) * 0.9
    const count = Math.round(Math.min(900, Math.max(320, (w * h) / 2600)))

    type Star = { x: number; y: number; z: number; pz: number; hue: number }
    const spawn = (deep: boolean): Star => ({
      x: (Math.random() - 0.5) * 2.4,
      y: (Math.random() - 0.5) * 2.4,
      z: deep ? 0.15 + Math.random() * 1.85 : 2,
      pz: 0,
      hue: Math.random(),
    })
    const stars: Star[] = Array.from({ length: count }, () => spawn(true))
    for (const s of stars) s.pz = s.z

    const t0 = performance.now()
    let last = t0
    let raf = 0
    let fading = false

    const draw = (now: number) => {
      const t = (now - t0) / WARP_MS
      const dt = Math.min(48, now - last) / 16.67
      last = now

      // Speed curve: ease in over the first third, hold, then drop out.
      let speed: number
      if (t < 0.35) speed = 0.004 + 0.07 * (t / 0.35) ** 2.2
      else if (t < 1) speed = 0.074
      else speed = 0.074 * Math.max(0, 1 - (t - 1) / (SETTLE_MS / WARP_MS)) ** 2

      // Trails: the field is never fully cleared while at speed.
      ctx.globalCompositeOperation = 'source-over'
      ctx.fillStyle = `rgba(5,5,7,${t < 1 ? 0.28 : 0.55})`
      ctx.fillRect(0, 0, w, h)
      ctx.globalCompositeOperation = 'lighter'
      ctx.lineCap = 'round'

      for (const s of stars) {
        s.pz = s.z
        s.z -= speed * dt
        if (s.z <= 0.03) { Object.assign(s, spawn(false)); s.pz = s.z; continue }
        const k0 = focal / s.pz, k1 = focal / s.z
        const x0 = cx + s.x * k0, y0 = cy + s.y * k0
        const x1 = cx + s.x * k1, y1 = cy + s.y * k1
        if (x1 < -80 || x1 > w + 80 || y1 < -80 || y1 > h + 80) { Object.assign(s, spawn(false)); s.pz = s.z; continue }
        const near = 1 - Math.min(1, s.z / 2)
        const alpha = Math.min(1, 0.12 + near * 0.9) * Math.min(1, 0.35 + t * 1.2)
        const width = 0.5 + near * 2.2
        const g = ctx.createLinearGradient(x0, y0, x1, y1)
        // Cool tint at the tail, white at the head. A few run violet.
        const tail = s.hue < 0.18 ? '139,124,248' : '99,217,230'
        g.addColorStop(0, `rgba(${tail},0)`)
        g.addColorStop(0.55, `rgba(${tail},${alpha * 0.45})`)
        g.addColorStop(1, `rgba(247,247,244,${alpha})`)
        ctx.strokeStyle = g
        ctx.lineWidth = width
        ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke()
      }

      // Dropping out of warp: a short bloom from the center as speed falls.
      if (t >= 0.92) {
        const f = t < 1 ? (t - 0.92) / 0.08 : Math.max(0, 1 - (t - 1) / 0.42)
        const r = Math.max(w, h) * 0.5
        const rg = ctx.createRadialGradient(cx, cy, 0, cx, cy, r)
        rg.addColorStop(0, `rgba(247,247,244,${0.34 * f})`)
        rg.addColorStop(0.3, `rgba(99,217,230,${0.09 * f})`)
        rg.addColorStop(1, 'rgba(5,5,7,0)')
        ctx.globalCompositeOperation = 'lighter'
        ctx.fillStyle = rg
        ctx.fillRect(0, 0, w, h)
      }
      ctx.globalCompositeOperation = 'source-over'

      if (t >= 1 && !fading) {
        fading = true
        setPhase('fade')
        root.classList.remove('warping')
      }
      if (t < 1 + SETTLE_MS / WARP_MS) raf = requestAnimationFrame(draw)
      else setPhase('done')
    }
    raf = requestAnimationFrame(draw)
    return () => { cancelAnimationFrame(raf); root.classList.remove('warping') }
  }, [])

  if (phase === 'done') return null
  return (
    <div className={`warp ${phase === 'fade' ? 'warp-out' : ''}`} aria-hidden="true">
      <canvas ref={ref} className="h-full w-full" />
    </div>
  )
}
