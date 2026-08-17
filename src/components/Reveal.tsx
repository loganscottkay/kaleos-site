'use client'

import { useEffect, useRef } from 'react'
import type { CSSProperties, ReactNode } from 'react'

/* ══════════════════════════════════════════════════════════════════
   Reveal
   Scroll-entrance primitive. Content-bearing motion deliberately runs
   on IntersectionObserver rather than a CSS scroll timeline: universal
   browser support, one-shot semantics, and no chance of a timeline
   desyncing and stranding an element mid-animation.

   Three guarantees, in order of importance:
   1. The hidden start state lives behind `@media (scripting: enabled)`
      in globals.css, so without JS every element paints at full
      opacity. Motion is additive and can never strand content.
   2. A single shared observer serves the whole page.
   3. A bottom-of-page flush reveals anything the observer's bottom
      inset could otherwise strand in the last slice of the viewport.
   ══════════════════════════════════════════════════════════════════ */

let observer: IntersectionObserver | null = null
let bottomGuardAttached = false

function reveal(el: Element) {
  el.classList.add('is-in')
}

/** Reveal every element still waiting. Used when the page can't scroll further. */
function flushPending() {
  document.querySelectorAll('.reveal:not(.is-in)').forEach(reveal)
}

function atPageBottom() {
  const doc = document.documentElement
  return window.scrollY + window.innerHeight >= doc.scrollHeight - 2
}

function getObserver(): IntersectionObserver {
  if (observer) return observer

  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        reveal(entry.target)
        observer?.unobserve(entry.target)
      }
    },
    {
      // Fire a little before the element reaches the bottom edge so the
      // motion resolves while the element is comfortably in frame.
      rootMargin: '0px 0px -10% 0px',
      threshold: 0,
    },
  )

  // Safety net for the failure this inset would otherwise create: an
  // element sitting in the bottom 10% of a page that cannot scroll any
  // further would never intersect, and would stay invisible forever.
  if (!bottomGuardAttached) {
    bottomGuardAttached = true
    const guard = () => {
      if (atPageBottom()) flushPending()
    }
    window.addEventListener('scroll', guard, { passive: true })
    window.addEventListener('resize', guard, { passive: true })
    // Short pages may already be at the bottom with nothing to scroll.
    requestAnimationFrame(guard)
  }

  return observer
}

type RevealVariant = 'up' | 'far' | 'left' | 'right' | 'scale'

const variantClass: Record<RevealVariant, string> = {
  up: '',
  far: 'reveal-far',
  left: 'reveal-left',
  right: 'reveal-right',
  scale: 'reveal-scale',
}

export interface RevealProps {
  children: ReactNode
  className?: string
  /** Stagger offset in ms. */
  delay?: number
  variant?: RevealVariant
  style?: CSSProperties
}

export function Reveal({
  children,
  className = '',
  delay = 0,
  variant = 'up',
  style,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Honour the OS setting here too, not just in CSS: skip observation
    // entirely so the element is simply present from the first frame.
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reducedMotion.matches) {
      reveal(el)
      return
    }

    const io = getObserver()
    io.observe(el)
    return () => io.unobserve(el)
  }, [])

  return (
    <div
      ref={ref}
      className={['reveal', variantClass[variant], className]
        .filter(Boolean)
        .join(' ')}
      style={{ ...style, '--reveal-delay': `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════
   SpotlightGroup
   One delegated, rAF-throttled pointer handler for every `.spotlight`
   descendant, instead of a listener per card. Writes the pointer
   position into two custom properties; all the painting is CSS.
   ══════════════════════════════════════════════════════════════════ */

export function SpotlightGroup({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = ref.current
    if (!root) return

    // Coarse pointers never hover, so the effect would only ever fire
    // mid-drag. Skip the listener entirely on touch.
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    let frame = 0
    let pending: { el: HTMLElement; x: number; y: number } | null = null

    const paint = () => {
      frame = 0
      if (!pending) return
      pending.el.style.setProperty('--mx', `${pending.x}px`)
      pending.el.style.setProperty('--my', `${pending.y}px`)
      pending = null
    }

    const onMove = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null
      const card = target?.closest<HTMLElement>('.spotlight')
      if (!card || !root.contains(card)) return

      const rect = card.getBoundingClientRect()
      pending = {
        el: card,
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      }
      if (!frame) frame = requestAnimationFrame(paint)
    }

    root.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      root.removeEventListener('pointermove', onMove)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
