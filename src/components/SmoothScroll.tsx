'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* One smooth-scroll instance for the whole site, driven by the GSAP ticker so
   ScrollTrigger and Lenis share a clock. Off entirely under reduced motion:
   the page scrolls natively and every scroll-linked effect resolves to its
   end state through CSS. */
export function SmoothScroll() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reduced.matches) return

    const lenis = new Lenis({
      lerp: 0.09,
      smoothWheel: true,
      autoRaf: false,
    })

    lenis.on('scroll', ScrollTrigger.update)
    const tick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    const onChange = () => {
      if (reduced.matches) lenis.stop()
      else lenis.start()
    }
    reduced.addEventListener('change', onChange)

    return () => {
      reduced.removeEventListener('change', onChange)
      gsap.ticker.remove(tick)
      lenis.destroy()
    }
  }, [])

  return null
}
