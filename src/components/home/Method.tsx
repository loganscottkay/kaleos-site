'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Reveal } from '@/components/Reveal'

gsap.registerPlugin(ScrollTrigger, useGSAP)

/* One orbit, one gate. The ring draws itself once when the section comes
   into view. Three marks travel the orbit on their own clock, not the
   scroll, so nothing fights the page. The gate is the only blue ring on
   the site. Under reduced motion the orbit is simply drawn. */

const steps = [
  { n: '01', when: 'Weeks 1 to 2', title: 'Map the work', body: 'Every workflow, start to finish. We separate the parts that need your judgment from the parts that do not, then rank what is worth building first.' },
  { n: '02', when: 'Weeks 3 to 4', title: 'Design one system', body: 'One workflow, one number you can measure. Scoped to how your business runs, not to a demo. You see the design before anyone writes code.' },
  { n: '03', when: 'By day 30', title: 'Live, with you at the gate', body: 'Approval and audit logging from day one. The agent drafts and prepares. Nothing reaches a client, an inbox, or a ledger without your sign-off.' },
  { n: '04', when: 'Ongoing', title: 'Prove it, then extend', body: 'We track the number we agreed on. If it moved, we take the next workflow. If it did not, we fix it or tell you it is not worth building.' },
]

// viewBox 0 0 1000 400. A wide ellipse, the gate at the bottom.
const ORBIT = 'M500,40 C770,40 940,110 940,200 C940,290 770,360 500,360 C230,360 60,290 60,200 C60,110 230,40 500,40 Z'

export function Method() {
  const root = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const path = root.current?.querySelector<SVGPathElement>('.orbit-path')
      const marks = root.current?.querySelectorAll<SVGCircleElement>('.orbit-mark')
      if (!path || !marks) return
      const len = path.getTotalLength()

      if (!reduced) {
        gsap.set(path, { strokeDasharray: len, strokeDashoffset: len })
        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 2.2,
          ease: 'power2.inOut',
          scrollTrigger: { trigger: root.current, start: 'top 70%', once: true },
        })
      }

      // Marks orbit on their own clock. Paused off screen.
      const proxies = [...marks].map((m, i) => ({ m, t: i / marks.length }))
      const place = () => {
        for (const p of proxies) {
          const pt = path.getPointAtLength((p.t % 1) * len)
          p.m.setAttribute('cx', String(pt.x))
          p.m.setAttribute('cy', String(pt.y))
        }
      }
      place()
      if (reduced) return
      const tween = gsap.to(proxies, {
        t: '+=1',
        duration: 26,
        ease: 'none',
        repeat: -1,
        onUpdate: place,
        paused: true,
      })
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
    <section id="method" className="border-t border-line" aria-labelledby="method-heading">
      <div ref={root} className="mx-auto max-w-[88rem] px-5 py-24 md:px-8 md:py-36">
        <div className="grid gap-10 md:grid-cols-12 md:items-end">
          <Reveal className="md:col-span-7">
            <p className="eyebrow text-ash">How it works</p>
            <h2 id="method-heading" className="mt-5 max-w-[14ch] text-h2">
              One orbit. <span className="cosmic-outline">One gate.</span>
            </h2>
          </Reveal>
          <Reveal delay={100} className="md:col-span-4 md:col-start-9">
            <p className="text-body-lg text-mist">
              Work moves in a loop. It can only cross the gate when a person signs. Thirty days from first map to a system in production.
            </p>
          </Reveal>
        </div>

        <div className="relative mx-auto mt-14 max-w-4xl md:mt-20">
          <svg viewBox="0 0 1000 400" className="w-full" aria-hidden="true">
            <path className="orbit-path" d={ORBIT} />
            {[0, 1, 2].map((i) => (
              <circle key={i} className="orbit-mark" r="4" cx="500" cy="40" />
            ))}
            <circle cx="500" cy="360" r="22" className="orbit-gate-halo" />
            <circle cx="500" cy="360" r="22" className="orbit-gate" />
            <circle cx="500" cy="360" r="4" fill="var(--color-royal-bright)" />
            <text x="500" y="392" textAnchor="middle" fill="var(--color-mist)" fontFamily="var(--font-mono)" fontSize="13" letterSpacing="2.5">
              THE GATE
            </text>
          </svg>
        </div>

        <ol className="mt-16 grid gap-x-8 gap-y-12 md:mt-24 md:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.n}>
              <Reveal delay={i * 90} className="flex h-full flex-col border-t border-line pt-6">
                <div className="flex items-baseline justify-between">
                  <span className="font-display text-[2rem] font-bold cosmic-outline-nebula">{s.n}</span>
                  <span className="eyebrow text-ash">{s.when}</span>
                </div>
                <h3 className="mt-5 text-h3">{s.title}</h3>
                <p className="mt-4 text-body text-mist">{s.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
