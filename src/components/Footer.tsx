export function SocialIcons({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <a
        href="https://x.com/KaleosHQ"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="X / Twitter"
        className="text-white/50 hover:text-accent transition-colors duration-300"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </a>
    </span>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-slate-200/60 py-8">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-center gap-4 text-slate-400 text-sm tracking-wide">
        <span>
          &copy; 2026 Kaleos &middot;{' '}
          <a href="https://kaleoshq.com" className="hover:text-slate-600 transition-colors">
            kaleoshq.com
          </a>
          {' '}&middot;{' '}
          <a href="mailto:logan@kaleoshq.com" className="hover:text-slate-600 transition-colors">
            logan@kaleoshq.com
          </a>
        </span>
        <SocialIcons className="[&_a]:text-slate-400/50 [&_a:hover]:text-accent" />
      </div>
    </footer>
  )
}
