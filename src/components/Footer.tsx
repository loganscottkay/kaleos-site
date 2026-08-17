import Image from 'next/image'
import Link from 'next/link'

export function SocialIcons({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-3 text-muted-text ${className}`}>
      <a
        href="https://x.com/KaleosHQ"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="X / Twitter"
        className="inline-flex items-center justify-center p-3 -m-3 text-current hover:text-link transition-colors duration-200"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </a>
    </span>
  )
}

const siteLinks = [
  { href: '/', label: 'Home' },
  { href: '/audit', label: 'Assessment' },
  { href: '/about', label: 'About' },
]

function Column({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="font-system text-caption uppercase tracking-widest text-white/35 mb-4">
        {title}
      </p>
      <ul className="space-y-2.5">{children}</ul>
    </div>
  )
}

const linkClass =
  'text-white/70 text-body hover:text-teal-bright transition-colors duration-200 inline-flex min-h-10 items-center'

/* The footer runs on the dark ground rather than paper. Every page ends on
   a dark section, so a light strip underneath read as an accidental gap
   instead of an ending. */
export function Footer() {
  return (
    <footer className="atmos bg-ink border-t border-white/10">
      <div className="atmos-layer atmos-depth" aria-hidden="true" />
      <div className="atmos-layer atmos-grid" aria-hidden="true" />
      <div className="atmos-layer atmos-vignette" aria-hidden="true" />
      <div className="atmos-layer atmos-grain" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-12 gap-y-12">
          {/* Identity */}
          <div className="md:col-span-5">
            <Link href="/" className="inline-flex items-center gap-3 mb-5">
              <Image
                src="/kaleos-logo.png"
                width={28}
                height={28}
                alt=""
                className="rounded-control object-cover"
              />
              <span
                className="text-white font-semibold text-body-lg tracking-tight"
                style={{ fontFamily: 'var(--font-display), sans-serif' }}
              >
                Kaleos HQ
              </span>
            </Link>
            <p className="text-mist text-body leading-relaxed max-w-sm">
              Agents do the work. Humans make the calls. Everything is logged.
            </p>
            <div className="mt-6">
              <div className="gate-rule on-dark align-start" aria-hidden="true" />
            </div>
          </div>

          <div className="md:col-span-3">
            <Column title="Site">
              {siteLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </Column>
          </div>

          <div className="md:col-span-4">
            <Column title="Get in touch">
              <li>
                <a href="mailto:logan@kaleoshq.com" className={linkClass}>
                  logan@kaleoshq.com
                </a>
              </li>
              <li>
                <a
                  href="https://calendly.com/logan-kaleoshq/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  Book a Discovery Call
                </a>
              </li>
            </Column>
          </div>
        </div>

        {/* Baseline */}
        <div className="mt-16 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-system text-caption text-white/40">
          <span>
            &copy; 2026 Kaleos HQ &middot;{' '}
            <a
              href="https://www.kaleoshq.com"
              className="hover:text-white/70 transition-colors"
            >
              kaleoshq.com
            </a>
          </span>
          <span className="inline-flex items-center gap-5">
            <span className="inline-flex items-center gap-2">
              <span
                className="status-dot inline-block w-1.5 h-1.5 rounded-full bg-teal-bright"
                aria-hidden="true"
              />
              Systems operational
            </span>
            <SocialIcons className="[&_a]:text-white/40 [&_a:hover]:text-teal-bright" />
          </span>
        </div>
      </div>
    </footer>
  )
}
