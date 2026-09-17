import Link from 'next/link'
import { KMark } from '@/components/KMark'
import { CALENDLY, type Theme } from '@/components/NavBar'

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

/* The footer carries the positioning line and the ways to reach Logan.
   Nothing decorative, no status lights. */
export function Footer({ theme = 'dark' }: { theme?: Theme }) {
  const dark = theme === 'dark'
  const fg = dark ? 'text-star' : 'text-ink'
  const muted = dark ? 'text-mist' : 'text-slate'
  const link = dark ? 'text-mist hover:text-star' : 'text-slate hover:text-ink'
  const line = dark ? 'border-line-dark' : 'border-line-light'

  return (
    <footer className={`border-t ${line}`}>
      <div className="mx-auto max-w-[88rem] px-5 py-14 md:px-8 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-6">
            <Link href="/" className={`inline-flex items-center gap-3 ${fg}`} aria-label="Kaleos HQ, home">
              <KMark className="h-7 w-auto" />
              <span className="wordmark text-[1.15rem]">Kaleos HQ</span>
            </Link>
            <p className={`mt-6 max-w-sm text-[1.05rem] leading-relaxed ${muted}`}>
              Agents do the work. You make the calls. Everything is logged.
            </p>
          </div>

          <div className="md:col-span-3">
            <p className={`eyebrow ${muted}`}>Site</p>
            <ul className="mt-4 space-y-3">
              <li><Link href="/" className={link}>Home</Link></li>
              <li><Link href="/audit" className={link}>Assessment</Link></li>
              <li><Link href="/about" className={link}>About</Link></li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className={`eyebrow ${muted}`}>Reach Logan</p>
            <ul className="mt-4 space-y-3">
              <li>
                <a href="mailto:logan@kaleoshq.com" className={link}>logan@kaleoshq.com</a>
              </li>
              <li>
                <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className={link}>
                  Book a Discovery Call
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/KaleosHQ"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Kaleos HQ on X"
                  className={`inline-flex h-10 w-10 items-center justify-center ${link}`}
                >
                  <XIcon />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className={`mt-14 flex flex-col gap-3 border-t ${line} pt-6 font-mono text-[0.75rem] tracking-wide sm:flex-row sm:items-center sm:justify-between ${muted}`}>
          <span>© {new Date().getFullYear()} Kaleos HQ</span>
          <span>Built with Claude</span>
        </div>
      </div>
    </footer>
  )
}
