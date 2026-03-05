'use client'

import { useEffect, useState, useRef } from 'react'

export function StickyCTA() {
  const [visible, setVisible] = useState(false)
  const triggerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = triggerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show CTA once the trigger element has been scrolled past (exits viewport above)
        setVisible(!entry.isIntersecting && entry.boundingClientRect.top < 0)
      },
      { threshold: 0 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      {/* Invisible trigger placed at the end of the proof/demo section */}
      <div ref={triggerRef} className="h-0 w-0" aria-hidden="true" />

      {/* Floating CTA - hidden on mobile to avoid crowding with chatbot */}
      <a
        href="https://calendly.com/logan-kaleoshq/30min"
        target="_blank"
        rel="noopener noreferrer"
        className={`fixed z-40 right-6 bottom-[100px] hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1B2A4A] text-white text-sm font-medium border border-white/10 shadow-lg shadow-black/20 transition-all duration-500 hover:shadow-[0_0_20px_rgba(13,148,136,0.4)] hover:scale-[1.03] hover:border-accent/30 ${
          visible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        Book a Call
      </a>
    </>
  )
}
