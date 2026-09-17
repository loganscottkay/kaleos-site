'use client'

import { useMemo, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { CALENDLY } from '@/components/NavBar'

gsap.registerPlugin(ScrollTrigger, useGSAP)

/* The constellation is the K. A scatter of points drifts into the vertices
   of the mark as the section scrolls into view, and the lines between them
   resolve last. Cosmology earned at the end, not decorated across the top.
   Under reduced motion the mark is drawn from the first frame. */

// Vertices of the K in the mark's own coordinate space (viewBox 440 430 825 910).
const K_POINTS: [number, number][] = [
  [440, 430], [650, 430], [650, 720], [490, 860], [650, 1000], [650, 1340], [440, 1340],
  [960, 430], [1210, 430], [840, 860], [660, 780],
  [1265, 1340], [975, 1340], [660, 960],
]
// Edges to draw between vertex indices, following the outline of each piece.
const K_EDGES: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 0],
  [7, 8], [8, 9], [9, 10], [10, 7],
  [9, 11], [11, 12], [12, 13], [13, 9],
]

function seeded(n: number) {
  // Deterministic scatter so server and client agree.
  let s = 1234 + n * 7919
  return () => {
    s = (s * 16807) % 2147483647
    return s / 2147483647
  }
}

export function FinalCall() {
  const root = useRef<HTMLDivElement>(null)
  const scatter = useMemo(() => {
    const r = seeded(K_POINTS.length)
    return K_POINTS.map(() => [440 + r() * 825, 430 + r() * 910] as [number, number])
  }, [])

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const dots = root.current?.querySelectorAll<SVGCircleElement>('.const-dot')
      const lines = root.current?.querySelectorAll<SVGLineElement>('.const-line')
      if (!dots || !lines) return
      if (reduced) {
        dots.forEach((d, i) => {
          d.setAttribute('cx', String(K_POINTS[i][0]))
          d.setAttribute('cy', String(K_POINTS[i][1]))
        })
        lines.forEach((l) => l.setAttribute('opacity', '1'))
        return
      }
      const tl = gsap.timeline({
        scrollTrigger: { trigger: root.current, start: 'top 70%', end: 'center center', scrub: 1 },
      })
      dots.forEach((d, i) => {
        tl.to(d, { attr: { cx: K_POINTS[i][0], cy: K_POINTS[i][1] }, ease: 'power2.inOut', duration: 1 }, 0)
      })
      tl.to(lines, { opacity: 1, stagger: 0.02, duration: 0.5 }, 0.7)
    },
    { scope: root },
  )

  return (
    <section className="border-t border-line-dark" aria-labelledby="close-heading">
      <div ref={root} className="mx-auto grid max-w-[88rem] items-center gap-12 px-5 py-28 md:grid-cols-12 md:px-8 md:py-44">
        <div className="md:col-span-7">
          <h2 id="close-heading" className="max-w-[10ch] text-display font-light tracking-tightest">
            You make the call.
          </h2>
          <p className="measure mt-8 text-body-lg text-mist">
            Thirty minutes. We look at where your team&apos;s time goes and tell you plainly whether a system is worth building. No deck, no pitch.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="btn btn-royal btn-lg">
              Book a Discovery Call
            </a>
            <a href="mailto:logan@kaleoshq.com" className="btn btn-ghost-dark btn-lg">
              Email Logan
            </a>
          </div>
        </div>
        <div className="md:col-span-4 md:col-start-9">
          <svg viewBox="380 370 945 1030" className="mx-auto w-full max-w-[22rem] text-star" aria-hidden="true">
            {K_EDGES.map(([a, b], i) => (
              <line
                key={i}
                className="const-line"
                x1={K_POINTS[a][0]}
                y1={K_POINTS[a][1]}
                x2={K_POINTS[b][0]}
                y2={K_POINTS[b][1]}
                stroke="currentColor"
                strokeOpacity="0.5"
                strokeWidth="1.5"
                vectorEffect="non-scaling-stroke"
                opacity="0"
              />
            ))}
            {scatter.map(([x, y], i) => (
              <circle key={i} className="const-dot" cx={x} cy={y} r="5" fill="currentColor" />
            ))}
          </svg>
        </div>
      </div>
    </section>
  )
}
