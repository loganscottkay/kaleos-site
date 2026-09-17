'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { KMark } from '@/components/KMark'

export type Theme = 'dark' | 'light'

const links = [
  { href: '/audit', label: 'Assessment' },
  { href: '/about', label: 'About' },
]

export const CALENDLY = 'https://calendly.com/logan-kaleoshq/30min'

/* Quiet by design: a small K, the wordmark in light weight, two links, one
   button. The bar is transparent over the hero and gains a hairline and a
   blur once the page moves. `theme` also paints the document ground so
   overscroll on phones matches the page. */
export function NavBar({ theme = 'dark' }: { theme?: Theme }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

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

  const dark = theme === 'dark'
  const fg = dark ? 'text-star' : 'text-ink'
  const muted = dark ? 'text-mist hover:text-star' : 'text-slate hover:text-ink'
  const line = dark ? 'border-line-dark' : 'border-line-light'
  const ground = dark ? 'bg-void/80' : 'bg-paper/85'

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-300 ${
        scrolled || open ? `${ground} backdrop-blur-md border-b ${line}` : 'border-b border-transparent'
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-[88rem] items-center justify-between px-5 md:h-18 md:px-8"
      >
        <Link
          href="/"
          className={`group flex items-center gap-3 ${fg}`}
          aria-label="Kaleos HQ, home"
        >
          <KMark className="h-6 w-auto" />
          <span className="wordmark text-[1.05rem]">Kaleos HQ</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => {
            const active = pathname === l.href
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? 'page' : undefined}
                className={`text-[0.95rem] tracking-tight transition-colors ${
                  active ? fg : muted
                }`}
              >
                {l.label}
              </Link>
            )
          })}
          <a
            href={CALENDLY}
            target="_blank"
            rel="noopener noreferrer"
            className={dark ? 'btn btn-star' : 'btn btn-ink'}
          >
            Book a Discovery Call
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          className={`flex h-11 w-11 items-center justify-center md:hidden ${fg}`}
        >
          <span className="relative block h-[10px] w-5" aria-hidden="true">
            <span
              className={`absolute left-0 top-0 h-px w-5 bg-current transition-transform duration-300 ${
                open ? 'translate-y-[5px] rotate-45' : ''
              }`}
            />
            <span
              className={`absolute bottom-0 left-0 h-px w-5 bg-current transition-transform duration-300 ${
                open ? '-translate-y-[4px] -rotate-45' : ''
              }`}
            />
          </span>
        </button>
      </nav>

      <div
        id="mobile-menu"
        hidden={!open}
        className={`md:hidden border-t ${line} ${ground} backdrop-blur-md`}
      >
        <div className="flex flex-col gap-1 px-5 pb-6 pt-3">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`py-3 text-[1.35rem] font-light tracking-tight ${fg}`}
            >
              {l.label}
            </Link>
          ))}
          <a
            href={CALENDLY}
            target="_blank"
            rel="noopener noreferrer"
            className={`mt-3 ${dark ? 'btn btn-star' : 'btn btn-ink'} w-full`}
          >
            Book a Discovery Call
          </a>
        </div>
      </div>
    </header>
  )
}
