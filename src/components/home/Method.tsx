'use client'

import { useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Reveal } from '@/components/Reveal'
import { Words } from '@/components/Words'

gsap.registerPlugin(ScrollTrigger, useGSAP)

/* The orbit, with your business at the center. Four stations sit on the
   orbit, one per phase. Work travels the ring as small marks and the only way
   through the gate is a person's signature. On desktop the diagram stays put
   while the phases scroll beside it, and the station for the phase in view
   lights up. Under reduced motion everything is drawn and still. */

const steps = [
  { n: '01', when: 'Weeks 1 to 2', title: 'Map the work', body: 'We map every workflow from start to finish, separate the parts that need your judgment from the parts that do not, and rank what is worth building first.', out: 'A workflow map and a ranked shortlist' },
  { n: '02', when: 'Weeks 3 to 4', title: 'Design one system', body: 'We scope one workflow to one number you can measure and design it around how your business already runs. You see the design before anyone writes code.', out: 'A system design tied to one number' },
  { n: '03', when: 'By day 30', title: 'Live, with you at the gate', body: 'Approval and audit logging are built in from day one. The agent drafts and prepares, and nothing reaches a client, an inbox, or a ledger without your sign-off.', out: 'A working system in production' },
  { n: '04', when: 'Ongoing', title: 'Prove it, then extend', body: 'We track the number we agreed on. If it moved, we take on the next workflow. If it did not, we fix the system or tell you plainly that it is not worth building.', out: 'Reporting against the number we chose' },
]

// viewBox 0 0 600 600. Circle orbit, r = 230. Stations at 12, 3, 6, 9 o'clock. The gate is 6 o'clock.
const R = 230
const C = 300
const STATIONS = [
  { x: C, y: C - R, label: 'Map', anchor: 'middle', dx: 0, dy: -22 },
  { x: C + R, y: C, label: 'Design', anchor: 'start', dx: 22, dy: 5 },
  { x: C, y: C + R, label: 'The gate', anchor: 'middle', dx: 0, dy: 40 },
  { x: C - R, y: C, label: 'Prove', anchor: 'end', dx: -22, dy: 5 },
]
const ORBIT = `M${C},${C - R} A${R},${R} 0 1,1 ${C - 0.01},${C - R} Z`

export function Method() {
  const root = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const path = root.current?.querySelector<SVGPathElement>('.orbit-path')
      const marks = root.current?.querySelectorAll<SVGCircleElement>('.orbit-mark')
      const items = root.current?.querySelectorAll<HTMLElement>('[data-step]')
      if (!path || !marks) return
      const len = path.getTotalLength()

      if (!reduced) {
        gsap.set(path, { strokeDasharray: len, strokeDashoffset: len })
        gsap.to(path, { strokeDashoffset: 0, duration: 2, ease: 'power2.inOut', scrollTrigger: { trigger: root.current, start: 'top 70%', once: true } })
      }

      const proxies = [...marks].map((m, i) => ({ m, t: i / marks.length }))
      const place = () => {
        for (const p of proxies) {
          const pt = path.getPointAtLength((p.t % 1) * len)
          p.m.setAttribute('cx', String(pt.x))
          p.m.setAttribute('cy', String(pt.y))
        }
      }
      place()

      items?.forEach((el, i) => {
        ScrollTrigger.create({
          trigger: el,
          start: 'top 60%',
          end: 'bottom 40%',
          onEnter: () => setActive(i),
          onEnterBack: () => setActive(i),
        })
      })

      if (reduced) return
      const tween = gsap.to(proxies, { t: '+=1', duration: 24, ease: 'none', repeat: -1, onUpdate: place, paused: true })
      ScrollTrigger.create({
        trigger: root.current,
        start: 'top bottom',
        end: 'bottom top',
        onToggle: (self) => (self.isActive ? tween.play() : tween.pause()),
      })
    },
    { scope: root },
  )

  return (
    <section id="method" className="horizon" aria-labelledby="method-heading">
      <div ref={root} className="mx-auto max-w-[88rem] px-5 py-24 md:px-8 md:py-36">
        <div className="grid gap-10 md:grid-cols-12 md:items-end">
          <Reveal className="md:col-span-7">
            <Words as="h2" id="method-heading" className="block max-w-[14ch] text-h2">
              How we work with you
            </Words>
          </Reveal>
          <Reveal delay={100} className="md:col-span-4 md:col-start-9">
            <p className="text-body-lg text-mist">
              Your business sits at the center and the work moves around it in a loop. The gate is the point where a person you trust reads what the system produced and signs it, or sends it back. Nothing passes without that signature, and the first system is in production within thirty days.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-12 md:mt-24 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-6">
            <div className="md:sticky md:top-28">
              <svg viewBox="-90 -40 780 690" className="mx-auto w-full max-w-[36rem]" aria-hidden="true">
                <defs>
                  <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="rgb(99 217 230 / 0.35)" />
                    <stop offset="60%" stopColor="rgb(139 124 248 / 0.12)" />
                    <stop offset="100%" stopColor="rgb(5 5 7 / 0)" />
                  </radialGradient>
                </defs>
                <circle cx={C} cy={C} r="120" fill="url(#coreGlow)" />
                <path className="orbit-path" d={ORBIT} />
                {[0, 1, 2].map((i) => (
                  <circle key={i} className="orbit-mark" r="4" cx={C} cy={C - R} />
                ))}

                {/* The core: your business, your call. */}
                <g className="orbit-core">
                  <image href="/kaleos-k.png" x={C - 42} y={C - 46} width="84" height="92" />
                </g>
                <text x={C} y={C + 82} textAnchor="middle" fill="var(--color-mist)" fontFamily="var(--font-mono)" fontSize="12" letterSpacing="2.5">
                  YOUR BUSINESS
                </text>

                {STATIONS.map((s, i) => (
                  <g key={s.label} className="orbit-station" data-active={active === i}>
                    {i === 2 && <circle cx={s.x} cy={s.y} r="22" className="orbit-gate-halo" />}
                    <circle cx={s.x} cy={s.y} r={i === 2 ? 16 : 11} className="orbit-station-ring" />
                    <text x={s.x} y={s.y + 4} textAnchor="middle" fill={active === i ? 'var(--color-comet)' : 'var(--color-star)'} fontFamily="var(--font-mono)" fontSize="11" fontWeight="500">
                      {steps[i].n}
                    </text>
                    <text x={s.x + s.dx} y={s.y + s.dy} textAnchor={s.anchor as 'start' | 'middle' | 'end'} fill="var(--color-mist)" fontFamily="var(--font-mono)" fontSize="12" letterSpacing="2.5">
                      {s.label.toUpperCase()}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
          </div>

          <ol className="space-y-16 md:col-span-5 md:col-start-8 md:space-y-[26vh] md:py-[10vh]">
            {steps.map((s, i) => (
              <li key={s.n} data-step={i}>
                <Reveal className="rule flex flex-col border-t border-line pt-6">
                  <div className="flex items-baseline justify-between">
                    <span className={`font-display text-[2rem] font-bold transition-colors duration-300 ${active === i ? 'text-comet' : 'text-star'}`}>{s.n}</span>
                    <span className="eyebrow text-ash">{s.when}</span>
                  </div>
                  <h3 className="mt-5 text-h3">{s.title}</h3>
                  <p className="mt-4 text-body text-mist">{s.body}</p>
                  <p className="mt-6 text-caption text-star">
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
