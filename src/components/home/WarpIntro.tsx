'use client'

import { useEffect, useRef, useState } from 'react'

/* One second at warp, then the page. Stars streak out from the center with
   rising speed, the overlay fades, and the hero's own entrance begins.
   Plays on every full load of the home page. Skipped under reduced motion. */

export function WarpIntro() {
  const ref = useRef<HTMLCanvasElement>(null)
  const [phase, setPhase] = useState<'warp' | 'fade' | 'done'>('warp')

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      document.documentElement.classList.remove('warping')
      const id = requestAnimationFrame(() => setPhase('done'))
      return () => cancelAnimationFrame(id)
    }
    document.documentElement.classList.add('warping')

    const canvas = ref.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) { document.documentElement.classList.remove('warping'); requestAnimationFrame(() => setPhase('done')); return }
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const w = window.innerWidth, h = window.innerHeight
    canvas.width = w * dpr; canvas.height = h * dpr
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    const cx = w / 2, cy = h / 2
    const stars = Array.from({ length: 260 }, () => ({
      a: Math.random() * Math.PI * 2,
      r: 10 + Math.random() * Math.max(w, h) * 0.6,
      s: 0.6 + Math.random() * 1.4,
    }))
    const t0 = performance.now()
    const DUR = 1000
    let raf = 0
    const draw = (now: number) => {
      const t = Math.min(1, (now - t0) / DUR)
      const speed = 2 + t * t * 60
      ctx.fillStyle = 'rgba(5,5,7,0.35)'
      ctx.fillRect(0, 0, w, h)
      ctx.lineCap = 'round'
      for (const s of stars) {
        const r0 = s.r
        s.r += speed * s.s
        const x0 = cx + Math.cos(s.a) * r0, y0 = cy + Math.sin(s.a) * r0
        const x1 = cx + Math.cos(s.a) * s.r, y1 = cy + Math.sin(s.a) * s.r
        const alpha = Math.min(1, 0.25 + t) * (0.5 + Math.random() * 0.5)
        const g = ctx.createLinearGradient(x0, y0, x1, y1)
        g.addColorStop(0, 'rgba(99,217,230,0)')
        g.addColorStop(0.6, `rgba(247,247,244,${alpha * 0.9})`)
        g.addColorStop(1, `rgba(247,247,244,${alpha})`)
        ctx.strokeStyle = g
        ctx.lineWidth = 0.6 + t * 1.6 * s.s
        ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke()
        if (s.r > Math.max(w, h)) { s.r = 5 + Math.random() * 40; s.a = Math.random() * Math.PI * 2 }
      }
      if (t < 1) raf = requestAnimationFrame(draw)
      else {
        setPhase('fade')
        document.documentElement.classList.remove('warping')
        setTimeout(() => setPhase('done'), 600)
      }
    }
    raf = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(raf)
  }, [])

  if (phase === 'done') return null
  return (
    <div className={`warp ${phase === 'fade' ? 'warp-out' : ''}`} aria-hidden="true">
      <canvas ref={ref} className="h-full w-full" />
    </div>
  )
}
