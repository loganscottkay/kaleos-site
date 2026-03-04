'use client'

import { useState, useEffect, useLayoutEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/', label: 'Home' },
  { href: '/audit', label: 'Audit' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
]

function JetIcon() {
  return (
    <svg width="32" height="16" viewBox="0 0 32 16" fill="none">
      {/* Engine glow */}
      <ellipse cx="1" cy="8" rx="3.5" ry="2.5" fill="#0d9488" opacity="0.4">
        <animate attributeName="rx" values="3;4;3" dur="0.6s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.3;0.5;0.3" dur="0.6s" repeatCount="indefinite" />
      </ellipse>
      {/* Fuselage */}
      <path d="M32 8 C29 6.2, 22 5.2, 14 5.8 L6 6.2 L0 8 L6 9.8 L14 10.2 C22 10.8, 29 9.8, 32 8Z" fill="#1B2A4A" />
      {/* Port wing */}
      <path d="M17 5.8 L11 0.5 L7 1.8 L12 6Z" fill="#1B2A4A" opacity="0.88" />
      {/* Starboard wing */}
      <path d="M17 10.2 L11 15.5 L7 14.2 L12 10Z" fill="#1B2A4A" opacity="0.88" />
      {/* Port tail fin */}
      <path d="M5 6.2 L2 2 L0.5 3.2 L3.5 6.8Z" fill="#1B2A4A" opacity="0.8" />
      {/* Starboard tail fin */}
      <path d="M5 9.8 L2 14 L0.5 12.8 L3.5 9.2Z" fill="#1B2A4A" opacity="0.8" />
      {/* Canopy */}
      <ellipse cx="23" cy="7.2" rx="3" ry="0.9" fill="#3a5a8a" opacity="0.35" />
      {/* Intake lines */}
      <line x1="18" y1="6.5" x2="14" y2="6.2" stroke="#0F1A2E" strokeWidth="0.3" opacity="0.4" />
      <line x1="18" y1="9.5" x2="14" y2="9.8" stroke="#0F1A2E" strokeWidth="0.3" opacity="0.4" />
    </svg>
  )
}

type SkyPhase = 'flight' | 'hold' | 'morph' | 'text' | 'fadeout'

export function NavBar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [skyPhase, setSkyPhase] = useState<SkyPhase | null>(null)
  const jetRef = useRef<HTMLDivElement>(null)
  const trailRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Phase progression
  useEffect(() => {
    const timers = [
      setTimeout(() => setSkyPhase('flight'), 300),
      setTimeout(() => setSkyPhase('hold'), 2800),
      setTimeout(() => setSkyPhase('morph'), 3100),
      setTimeout(() => setSkyPhase('text'), 4200),
      setTimeout(() => setSkyPhase('fadeout'), 5700),
      setTimeout(() => setSkyPhase(null), 6200),
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  // Clip trail behind jet position — useLayoutEffect prevents flash on first frame
  useLayoutEffect(() => {
    if (skyPhase !== 'flight') {
      if (trailRef.current) trailRef.current.style.clipPath = 'none'
      return
    }
    if (trailRef.current) trailRef.current.style.clipPath = 'inset(0 100% 0 0)'
    let rafId: number
    const update = () => {
      if (jetRef.current && trailRef.current && containerRef.current) {
        const jetRect = jetRef.current.getBoundingClientRect()
        const cRect = containerRef.current.getBoundingClientRect()
        const visible = Math.max(0, jetRect.left - cRect.left - 10)
        const clipRight = Math.max(0, cRect.width - visible)
        trailRef.current.style.clipPath = `inset(0 ${clipRight}px 0 0)`
      }
      rafId = requestAnimationFrame(update)
    }
    rafId = requestAnimationFrame(update)
    return () => cancelAnimationFrame(rafId)
  }, [skyPhase])

  const showOverlay = skyPhase !== null
  const isCloud = skyPhase === 'flight' || skyPhase === 'hold'

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b border-slate-200/60 transition-all duration-300 ${scrolled ? 'bg-white/90 shadow-sm' : 'bg-white/70'}`}>
      <div className="mx-auto px-5 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="text-navy font-semibold text-lg tracking-tight flex items-center"
          style={{ gap: 10 }}
        >
          <img src="/kaleos-logo.png" width={28} height={28} alt="Kaleos" style={{ borderRadius: 6, objectFit: 'cover' }} />
          Kaleos
        </Link>

        {/* Skywriting flyover — desktop only, one-time */}
        {showOverlay && (
          <div
            ref={containerRef}
            className={`hidden md:flex absolute inset-0 items-center pointer-events-none overflow-hidden transition-opacity duration-500 ${skyPhase === 'fadeout' ? 'opacity-0' : 'opacity-100'}`}
          >
            {/* Single trail element — starts as blurry cloud streak, morphs into text */}
            <div ref={trailRef} className="absolute inset-0 flex items-center justify-center">
              <span className={`skywriting-trail ${isCloud ? 'is-cloud' : ''}`}>
                Kaleos is for you
              </span>
            </div>

            {/* Jet — flies across and exits right */}
            {skyPhase === 'flight' && (
              <div
                ref={jetRef}
                className="skywriting-jet absolute flex items-center"
                style={{ top: '50%', transform: 'translateY(-50%)' }}
              >
                <JetIcon />
              </div>
            )}
          </div>
        )}

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`group/nav relative text-sm font-medium tracking-wide transition-colors duration-300 ease-in-out pb-1 ${
                  isActive
                    ? 'text-navy'
                    : 'text-slate-400 hover:text-navy'
                }`}
              >
                {link.label}
                <span
                  className={`absolute left-0 bottom-0 h-[2px] bg-accent transition-all duration-300 ease-in-out ${
                    isActive ? 'w-full' : 'w-0 group-hover/nav:w-full'
                  }`}
                />
              </Link>
            )
          })}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-navy/70 hover:text-navy transition-colors"
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {open ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-b border-slate-200/60">
          <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`text-sm font-medium tracking-wide transition-colors duration-300 ease-in-out ${
                  pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
                    ? 'text-navy'
                    : 'text-slate-400 hover:text-navy'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
