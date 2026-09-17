import Link from 'next/link'
import { KLogo } from '@/components/KLogo'
import { CALENDLY, CTA, LINKEDIN } from '@/components/NavBar'

export const MOTTO = 'AI that answers to you.'

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.119 20.452H3.555V9h3.564v11.452z" />
    </svg>
  )
}

export function Footer() {
  return (
    <footer className="horizon">
      <div className="mx-auto max-w-[88rem] px-5 py-16 md:px-8 md:py-24">
        <div className="grid gap-12 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <Link href="/" className="inline-flex items-center gap-3 text-star" aria-label="KALEOS, home">
              <KLogo className="h-8" />
              <span className="wordmark text-[1.25rem]">Kaleos</span>
            </Link>
            <p className="mt-8 max-w-[14ch] font-display text-h2 font-bold text-star">{MOTTO}</p>
            <p className="mt-4 max-w-md text-body text-mist">
              Custom AI solutions for the modern business, with a person at the gate.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 md:col-span-5">
            <div>
              <ul className="space-y-3 text-body">
                <li><Link href="/" className="text-mist hover:text-star">Home</Link></li>
                <li><Link href="/audit" className="text-mist hover:text-star">Assessment</Link></li>
                <li><Link href="/about" className="text-mist hover:text-star">About</Link></li>
                <li><Link href="/privacy" className="text-mist hover:text-star">Privacy</Link></li>
                <li><Link href="/terms" className="text-mist hover:text-star">Terms</Link></li>
              </ul>
            </div>
            <div>
              <ul className="space-y-3 text-body">
                <li><a href="mailto:logan@kaleoshq.com" className="break-all text-mist hover:text-star">logan@kaleoshq.com</a></li>
                <li><a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="text-mist hover:text-star">{CTA}</a></li>
                <li className="flex gap-2 pt-1">
                  <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" aria-label="KALEOS on LinkedIn" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-mist hover:border-star hover:text-star">
                    <LinkedInIcon />
                  </a>
                  <a href="https://x.com/KaleosHQ" target="_blank" rel="noopener noreferrer" aria-label="KALEOS on X" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-mist hover:border-star hover:text-star">
                    <XIcon />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-16 flex flex-col gap-3 font-mono text-[0.72rem] tracking-wide text-ash sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} KALEOS</span>
          <span>Every action is logged.</span>
        </div>
      </div>
    </footer>
  )
}
