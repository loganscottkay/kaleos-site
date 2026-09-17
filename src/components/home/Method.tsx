'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Reveal } from '@/components/Reveal'

gsap.registerPlugin(ScrollTrigger, useGSAP)

/* One orbit. The line draws itself as you scroll. Work travels the orbit
   as small marks and can only pass the gate, the one ring on the path,
   after a person signs. Four annotations sit on the orbit instead of in
   cards. Under reduced motion the orbit is fully drawn. */

const steps = [
  { n: '01', when: 'Weeks 1 to 2', title: 'Map how you actually work', body: 'Every workflow, start to finish. We separate the parts that need your judgment from the parts that do not, then rank what is worth automating first.', out: 'A workflow map and a ranked shortlist' },
  { n: '02', when: 'Weeks 3 to 4', title: 'Design one system, not ten', body: 'One workflow, one outcome you can measure. Scoped to how your business runs, not to a demo. You see the design before anyone writes code.', out: 'A system design tied to one number' },
  { n: '03', when: 'By day 30', title: 'It goes live with you at the gate', body: 'Approval and audit logging from day one. The agent drafts and prepares. Nothing reaches a client, an inbox, or a ledger without your sign-off.', out: 'A working system in production' },
  { n: '04', when: 'Ongoing', title: 'We prove it worked, then extend', body: 'We track the number we agreed on. If it moved, we take on the next workflow. If it did not, we fix it or tell you it is not worth building.', out: 'Reporting against the number we picked' },
]

// Orbit geometry (viewBox 0 0 1200 520). Nodes sit on the ellipse.
const ORBIT = 'M600,60 C900,60 1140,150 1140,260 C1140,370 900,460 600,460 C300,460 60,370 60,260 C60,150 300,60 600,60 Z'
const NODES = [
  { x: 300, y: 86 },
  { x: 1090, y: 200 },
  { x: 600, y: 460 }, // the gate
  { x: 110, y: 320 },
]

export function Method() {
  const root = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      const path = root.current?.querySelector<SVGPathElement>('.orbit-path')
      const marks = root.current?.querySelectorAll<SVGCircleElement>('.orbit-mark')
      const nodes = root.current?.querySelectorAll<SVGGElement>('.orbit-node')
      if (!path) return
      const len = path.getTotalLength()
      gsap.set(path, { strokeDasharray: len, strokeDashoffset: len })
      gsap.to(path, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top 75%', end: 'bottom 60%', scrub: 0.8 },
      })
      if (nodes) {
        gsap.fromTo(
          nodes,
          { opacity: 0, scale: 0.6, transformOrigin: 'center' },
          { opacity: 1, scale: 1, stagger: 0.12, ease: 'power2.out', scrollTrigger: { trigger: root.current, start: 'top 70%', end: 'bottom 60%', scrub: 0.8 } },
        )
      }
      if (marks && marks.length) {
        marks.forEach((m, i) => {
          const proxy = { t: 0 }
          gsap.to(proxy, {
            t: 1,
            ease: 'none',
            scrollTrigger: { trigger: root.current, start: 'top 75%', end: 'bottom 60%', scrub: 0.8 },
            onUpdate: () => {
              const p = ((proxy.t + i * 0.22) % 1) * len
              const pt = path.getPointAtLength(p)
              m.setAttribute('cx', String(pt.x))
              m.setAttribute('cy', String(pt.y))
            },
          })
        })
      }
    },
    { scope: root },
  )

  return (
    <section className="border-t border-line-dark" aria-labelledby="method-heading">
      <div ref={root} className="mx-auto max-w-[88rem] px-5 py-24 md:px-8 md:py-36">
        <Reveal>
          <p className="eyebrow text-mist">How the work goes</p>
          <h2 id="method-heading" className="mt-5 max-w-[18ch] text-h2 font-light">
            One orbit. One gate. Everything passes through you.
          </h2>
        </Reveal>

        <div className="relative mt-16 md:mt-24">
          <svg
            viewBox="0 0 1200 520"
            className="hidden w-full md:block"
            aria-hidden="true"
          >
            <path className="orbit-path" d={ORBIT} />
            {[0, 1, 2].map((i) => (
              <circle key={i} className="orbit-mark" r="3.5" cx="600" cy="60" />
            ))}
            {NODES.map((p, i) => (
              <g key={i} className="orbit-node">
                {i === 2 ? (
                  <>
                    <circle cx={p.x} cy={p.y} r="22" className="orbit-gate" />
                    <circle cx={p.x} cy={p.y} r="4" fill="var(--color-royal-bright)" />
                  </>
                ) : (
                  <circle cx={p.x} cy={p.y} r="6" fill="var(--color-star)" />
                )}
                <text
                  x={p.x + (i === 1 ? -34 : i === 3 ? 34 : 0)}
                  y={p.y + (i === 0 ? -26 : i === 2 ? 48 : 6)}
                  textAnchor={i === 1 ? 'end' : i === 3 ? 'start' : 'middle'}
                  fill="var(--color-mist)"
                  fontFamily="var(--font-mono)"
                  fontSize="13"
                  letterSpacing="2"
                >
                  {steps[i].n}
                  {i === 2 ? '  THE GATE' : ''}
                </text>
              </g>
            ))}
          </svg>

          <ol className="mt-4 grid gap-px bg-line-dark md:mt-16 md:grid-cols-4">
            {steps.map((s, i) => (
              <li key={s.n} className="bg-void">
                <Reveal delay={i * 90} className="flex h-full flex-col p-6 md:p-8">
                  <div className="flex items-baseline justify-between font-mono text-[0.72rem] uppercase tracking-[0.18em] text-mist">
                    <span>{s.n}</span>
                    <span>{s.when}</span>
                  </div>
                  <h3 className="mt-5 text-h3 font-light text-star">{s.title}</h3>
                  <p className="mt-4 text-body text-mist">{s.body}</p>
                  <p className="mt-auto pt-8 text-caption text-star/80">
                    <span className="text-mist">You get: </span>
                    {s.out}
                  </p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
