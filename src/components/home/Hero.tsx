'use client'

import { useRef, type CSSProperties } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { KLogo } from '@/components/KLogo'
import { CALENDLY, CTA } from '@/components/NavBar'
import { Starfield } from '@/components/home/Starfield'
import { WarpIntro } from '@/components/home/WarpIntro'
import { Magnet } from '@/components/Magnet'

gsap.registerPlugin(ScrollTrigger, useGSAP)

/* After the warp: the mark, glowing, with the star lit at its center. Then
   one line. Then one button. Scrolling pulls the mark back into the field. */
export function Hero() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      const mark = root.current?.querySelector('.hero-mark')
      const copy = root.current?.querySelector('.hero-copy')
      const field = root.current?.querySelector('.starfield')
      if (!mark || !copy) return
      const tl = gsap.timeline({
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: 0.8 },
      })
      tl.to(mark, { y: -90, scale: 0.82, opacity: 0, ease: 'none' }, 0)
      tl.to(copy, { y: -40, opacity: 0, ease: 'none' }, 0.15)
      if (field) tl.to(field, { y: 120, ease: 'none' }, 0)
    },
    { scope: root },
  )

  return (
    <section ref={root} className="relative isolate min-h-[100svh] overflow-hidden">
      <WarpIntro />
      <Starfield />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-void" />

      <div className="relative mx-auto flex min-h-[100svh] max-w-[88rem] flex-col items-center justify-center px-5 pb-28 pt-28 text-center md:px-8">
        <div className="hero-mark k-settle">
          <div className="k-glow relative">
            <KLogo priority alt="KALEOS" className="h-[26vh] min-h-[9rem] md:h-[34vh]" />
            <span className="k-star" style={{ left: '30.4%', top: '47.3%' }} aria-hidden="true" />
          </div>
        </div>

        <div className="hero-copy flex flex-col items-center">
          <h1 className="rise mt-12 max-w-[16ch] text-display md:mt-16" style={{ '--rise-delay': '500ms' } as CSSProperties}>
            Custom AI solutions for the <span className="glint">modern business</span>
          </h1>

          <p className="rise mt-8 max-w-[40rem] text-body-lg text-mist" style={{ '--rise-delay': '700ms' } as CSSProperties}>
            KALEOS is a premium AI implementation practice. We design and ship systems where agents handle the work and a person you trust signs off before anything reaches a client, an inbox, or a ledger. Thirty days to the first system, scoped and priced on a call.
          </p>

          <div className="rise mt-10 flex flex-wrap items-center justify-center gap-4" style={{ '--rise-delay': '860ms' } as CSSProperties}>
            <Magnet><a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="btn btn-star btn-lg">{CTA}</a></Magnet>
            <Magnet><a href="#method" className="btn btn-ghost btn-lg">How we work</a></Magnet>
          </div>
        </div>
      </div>
    </section>
  )
}
