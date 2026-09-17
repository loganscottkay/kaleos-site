'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { KLogo } from '@/components/KLogo'

const links = [
  { href: '/audit', label: 'Assessment' },
  { href: '/about', label: 'About' },
]

export const CALENDLY = 'https://calendly.com/logan-kaleoshq/30min'
export const CTA = 'Talk with us'

/* Quiet: the mark, KALEOS, two links, one button. Transparent over the
   hero, a hairline and a blur once the page moves. */
export function NavBar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header
      data-scrolled={scrolled || open}
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-300 ${
        scrolled || open ? 'bg-void/80 backdrop-blur-md border-b border-line' : 'border-b border-transparent'
      }`}
    >
      <nav aria-label="Primary" className="mx-auto flex h-[4.5rem] max-w-[88rem] items-center justify-between px-5 md:h-20 md:px-8">
        <Link href="/" className="flex items-center gap-3 text-star" aria-label="KALEOS, home">
          <KLogo className="h-8 md:h-9" />
          <span className="wordmark text-[1.25rem] md:text-[1.45rem]">Kaleos</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => {
            const active = pathname === l.href
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? 'page' : undefined}
                className={`text-[0.95rem] transition-colors ${active ? 'text-star' : 'text-mist hover:text-star'}`}
              >
                {l.label}
              </Link>
            )
          })}
          <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="btn btn-star">
            {CTA}
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="flex h-11 w-11 items-center justify-center text-star md:hidden"
        >
          <span className="relative block h-[10px] w-5" aria-hidden="true">
            <span className={`absolute left-0 top-0 h-px w-5 bg-current transition-transform duration-300 ${open ? 'translate-y-[5px] rotate-45' : ''}`} />
            <span className={`absolute bottom-0 left-0 h-px w-5 bg-current transition-transform duration-300 ${open ? '-translate-y-[4px] -rotate-45' : ''}`} />
          </span>
        </button>
      </nav>

      <div id="mobile-menu" hidden={!open} className="border-t border-line bg-void/90 backdrop-blur-md md:hidden">
        <div className="flex flex-col gap-1 px-5 pb-6 pt-3">
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="font-display py-3 text-[1.5rem] font-semibold text-star">
              {l.label}
            </Link>
          ))}
          <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="btn btn-star mt-3 w-full">
            {CTA}
          </a>
        </div>
      </div>
    </header>
  )
}
