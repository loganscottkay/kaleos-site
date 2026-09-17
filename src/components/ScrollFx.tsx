'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* Scroll-linked space pieces, all declared in markup:
   data-fx="parallax" data-speed="0.15"  moves with the scroll at a fraction
   data-fx="comet"                        crosses its section left to right
   data-fx="rim"                          a lit arc whose light travels
   Everything is scrubbed to the scroll, so it is still when you are. Off
   under reduced motion. */
export function ScrollFx() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      document.querySelectorAll<HTMLElement>('[data-fx="parallax"]').forEach((el) => {
        const speed = Number(el.dataset.speed || 0.15)
        gsap.fromTo(el, { y: () => -120 * speed }, {
          y: () => 120 * speed, ease: 'none',
          scrollTrigger: { trigger: el.closest('section') || el, start: 'top bottom', end: 'bottom top', scrub: true },
        })
      })
      document.querySelectorAll<HTMLElement>('[data-fx="comet"]').forEach((el) => {
        const section = el.closest('section') || el
        gsap.fromTo(el, { xPercent: -120, opacity: 0 }, {
          xPercent: 0, opacity: 1, ease: 'none',
          scrollTrigger: { trigger: section, start: 'top 80%', end: 'bottom 20%', scrub: 0.6,
            onUpdate: (st) => { el.style.opacity = String(Math.sin(st.progress * Math.PI)) } },
        })
        gsap.to(el, { left: '70%', ease: 'none', scrollTrigger: { trigger: section, start: 'top 80%', end: 'bottom 20%', scrub: 0.6 } })
      })
      document.querySelectorAll<SVGPathElement>('[data-fx="rim"] .rim-arc').forEach((path) => {
        const len = path.getTotalLength()
        path.style.strokeDasharray = `${len * 0.18} ${len}`
        gsap.fromTo(path, { strokeDashoffset: len * 0.18 }, {
          strokeDashoffset: -len, ease: 'none',
          scrollTrigger: { trigger: path.closest('section') || path, start: 'top 90%', end: 'bottom 10%', scrub: 0.8 },
        })
      })
    })
    return () => ctx.revert()
  }, [])
  return null
}
