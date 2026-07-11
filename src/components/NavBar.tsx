'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/', label: 'Home' },
  { href: '/audit', label: 'Assessment' },
  { href: '/about', label: 'About' },
]

export function NavBar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? 'bg-paper/95 border-slate-200 shadow-sm'
          : 'bg-paper/80 border-transparent'
      } backdrop-blur-sm`}
    >
      <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <img
            src="/kaleos-logo.png"
            width={28}
            height={28}
            alt=""
            style={{ borderRadius: 6, objectFit: 'cover' }}
          />
          <span
            className="text-navy font-semibold text-lg tracking-tight"
            style={{ fontFamily: 'var(--font-display), sans-serif' }}
          >
            Kaleos HQ
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== '/' && pathname.startsWith(link.href))
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`group/nav relative text-sm font-medium tracking-wide transition-colors duration-300 ease-in-out pb-1 ${
                  isActive ? 'text-navy' : 'text-slate-500 hover:text-navy'
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
          <a
            href="https://calendly.com/logan-kaleoshq/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 rounded-lg bg-navy text-white text-sm font-medium transition-colors duration-300 hover:bg-accent"
          >
            Book a Discovery Call
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-navy/70 hover:text-navy transition-colors"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-paper border-b border-slate-200">
          <div className="max-w-6xl mx-auto px-5 py-4 flex flex-col gap-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`text-sm font-medium tracking-wide transition-colors duration-300 ${
                  pathname === link.href ||
                  (link.href !== '/' && pathname.startsWith(link.href))
                    ? 'text-navy'
                    : 'text-slate-500 hover:text-navy'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://calendly.com/logan-kaleoshq/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-4 py-2.5 rounded-lg bg-navy text-white text-sm font-medium"
            >
              Book a Discovery Call
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
