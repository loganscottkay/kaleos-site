'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/', label: 'Home' },
  { href: '/audit', label: 'Audit' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
]

function JetIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22 2L11 13"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 2L15 22L11 13L2 9L22 2Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.15"
      />
    </svg>
  )
}

export function NavBar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [showSkywriting, setShowSkywriting] = useState(false)
  const [fadingOut, setFadingOut] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Trigger skywriting once on mount
  useEffect(() => {
    const startTimer = setTimeout(() => setShowSkywriting(true), 300)
    // Total: 2.5s flight + 1.5s hold + 0.5s fade = 4.5s
    const fadeTimer = setTimeout(() => setFadingOut(true), 4300)
    const removeTimer = setTimeout(() => setShowSkywriting(false), 4800)
    return () => {
      clearTimeout(startTimer)
      clearTimeout(fadeTimer)
      clearTimeout(removeTimer)
    }
  }, [])

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
        {showSkywriting && (
          <div
            className={`hidden md:flex absolute inset-0 items-center pointer-events-none overflow-hidden transition-opacity duration-500 ${fadingOut ? 'opacity-0' : 'opacity-100'}`}
          >
            {/* Text trail with glow */}
            <div className="skywriting-track absolute inset-0 flex items-center justify-center">
              <span className="skywriting-text relative">
                Kaleos is for you
                {/* Glow layer behind text */}
                <span className="skywriting-glow" aria-hidden="true">
                  Kaleos is for you
                </span>
              </span>
            </div>
            {/* Jet icon */}
            <div className="skywriting-jet absolute flex items-center" style={{ top: '50%', transform: 'translateY(-50%)' }}>
              <JetIcon className="text-accent opacity-70" />
            </div>
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
