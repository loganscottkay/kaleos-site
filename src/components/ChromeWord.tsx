'use client'

import { useRef, type ReactNode } from 'react'

/* Chrome under the pointer. Two things make it read as metal rather than a
   gradient: a studio environment (bright softboxes above, a hard horizon,
   a dark floor) mapped onto the letters, and a real bevel from an SVG
   lighting filter whose light source follows the pointer. The white fill
   fades out to reveal it and fades back when the pointer leaves. */
export function ChromeWord({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null)
  const light = useRef<SVGFEPointLightElement>(null)
  const onMove = (e: React.PointerEvent<HTMLSpanElement>) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    el.style.setProperty('--mx', `${Math.round(px * 100)}%`)
    el.style.setProperty('--my', `${Math.round(py * 100)}%`)
    if (light.current) {
      light.current.setAttribute('x', String(Math.round(px * 1000 - 500)))
      light.current.setAttribute('y', String(Math.round(py * 300 - 400)))
    }
  }
  return (
    <>
      <svg width="0" height="0" aria-hidden="true" style={{ position: 'absolute' }}>
        <filter id="chrome-bevel" x="-10%" y="-30%" width="120%" height="160%" colorInterpolationFilters="sRGB">
          <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur" />
          <feSpecularLighting in="blur" surfaceScale="11" specularConstant="1.2" specularExponent="38" lightingColor="#ffffff" result="spec">
            <fePointLight ref={light} x="0" y="-360" z="380" />
          </feSpecularLighting>
          <feComposite in="spec" in2="SourceAlpha" operator="in" result="specIn" />
          <feComposite in="SourceGraphic" in2="specIn" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" />
        </filter>
      </svg>
      <span ref={ref} className="chrome-hover" onPointerMove={onMove}>
        {children}
      </span>
    </>
  )
}
