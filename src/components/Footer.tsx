import Link from 'next/link'
import { KLogo } from '@/components/KLogo'
import { CALENDLY, CTA } from '@/components/NavBar'

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-[88rem] px-5 py-14 md:px-8 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-6">
            <Link href="/" className="inline-flex items-center gap-3 text-star" aria-label="KALEOS, home">
              <KLogo className="h-7" />
              <span className="wordmark text-[1.05rem]">Kaleos</span>
            </Link>
            <p className="mt-6 max-w-sm text-[1.05rem] leading-relaxed text-mist">
              Premium AI implementation. Agents do the work. You make the calls. Everything is logged.
            </p>
          </div>
          <div className="md:col-span-3">
            <p className="eyebrow text-ash">Site</p>
            <ul className="mt-4 space-y-3">
              <li><Link href="/" className="text-mist hover:text-star">Home</Link></li>
              <li><Link href="/audit" className="text-mist hover:text-star">Assessment</Link></li>
              <li><Link href="/about" className="text-mist hover:text-star">About</Link></li>
            </ul>
          </div>
          <div className="md:col-span-3">
            <p className="eyebrow text-ash">Reach us</p>
            <ul className="mt-4 space-y-3">
              <li><a href="mailto:logan@kaleoshq.com" className="text-mist hover:text-star">logan@kaleoshq.com</a></li>
              <li><a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="text-mist hover:text-star">{CTA}</a></li>
              <li>
                <a href="https://x.com/KaleosHQ" target="_blank" rel="noopener noreferrer" aria-label="KALEOS on X" className="inline-flex h-10 w-10 items-center justify-center text-mist hover:text-star">
                  <XIcon />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-14 flex flex-col gap-3 border-t border-line pt-6 font-mono text-[0.75rem] tracking-wide text-ash sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} KALEOS</span>
          <span>Built with Claude</span>
        </div>
      </div>
    </footer>
  )
}
