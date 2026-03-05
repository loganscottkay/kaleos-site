'use client'

import { useRef, useEffect, useState } from 'react'

function AcademicIcon() {
  return (
    <svg className="w-10 h-10" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5">
      {/* Columns */}
      <line x1="10" y1="18" x2="10" y2="30" strokeLinecap="round" />
      <line x1="16" y1="18" x2="16" y2="30" strokeLinecap="round" />
      <line x1="24" y1="18" x2="24" y2="30" strokeLinecap="round" />
      <line x1="30" y1="18" x2="30" y2="30" strokeLinecap="round" />
      {/* Pediment / triangle */}
      <path d="M6 18h28L20 8 6 18z" strokeLinejoin="round" />
      {/* Base */}
      <line x1="6" y1="30" x2="34" y2="30" strokeLinecap="round" />
      {/* Top accent */}
      <line x1="4" y1="18" x2="36" y2="18" strokeLinecap="round" />
    </svg>
  )
}

function SystemIcon() {
  return (
    <svg className="w-10 h-10" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5">
      {/* Outer gear shape simplified */}
      <circle cx="20" cy="20" r="8" />
      <circle cx="20" cy="20" r="3" />
      {/* Gear teeth as lines */}
      <line x1="20" y1="4" x2="20" y2="10" strokeLinecap="round" />
      <line x1="20" y1="30" x2="20" y2="36" strokeLinecap="round" />
      <line x1="4" y1="20" x2="10" y2="20" strokeLinecap="round" />
      <line x1="30" y1="20" x2="36" y2="20" strokeLinecap="round" />
      <line x1="8.7" y1="8.7" x2="13" y2="13" strokeLinecap="round" />
      <line x1="27" y1="27" x2="31.3" y2="31.3" strokeLinecap="round" />
      <line x1="31.3" y1="8.7" x2="27" y2="13" strokeLinecap="round" />
      <line x1="13" y1="27" x2="8.7" y2="31.3" strokeLinecap="round" />
    </svg>
  )
}

export function AuthorityTimeline() {
  const ref = useRef<HTMLDivElement>(null)
  const [phase, setPhase] = useState(0) // 0=hidden, 1=left, 2=line, 3=right, 4=tagline

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPhase(1)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Stagger: left (0ms) -> line (400ms) -> right (900ms) -> tagline (1400ms)
  useEffect(() => {
    if (phase === 0) return
    const timers = [
      setTimeout(() => setPhase(2), 400),
      setTimeout(() => setPhase(3), 900),
      setTimeout(() => setPhase(4), 1400),
    ]
    return () => timers.forEach(clearTimeout)
  }, [phase >= 1]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section ref={ref} className="relative py-24 bg-[#1B2A4A]">
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.06]"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=2070&q=80')" }} />
      <div className="relative z-10 max-w-4xl mx-auto px-4">
        {/* Header */}
        <h2
          className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-center mb-16 text-white transition-all duration-700"
          style={{
            opacity: phase >= 1 ? 1 : 0,
            transform: phase >= 1 ? 'translateY(0)' : 'translateY(20px)',
          }}
        >
          Trained at Harvard Business School. Built for Your Business.
        </h2>

        {/* Timeline — desktop: horizontal, mobile: vertical */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-0 mb-16">

          {/* Left node */}
          <div
            className="flex flex-col items-center text-center transition-all duration-700 w-[200px] shrink-0"
            style={{
              opacity: phase >= 1 ? 1 : 0,
              transform: phase >= 1 ? 'scale(1)' : 'scale(0.8)',
            }}
          >
            <div className="w-[120px] h-[120px] rounded-2xl bg-white/[0.06] backdrop-blur-xl border border-white/[0.12] flex items-center justify-center mb-4 shadow-lg shadow-black/10">
              <span className="text-teal-400">
                <AcademicIcon />
              </span>
            </div>
            <p className="text-white font-semibold text-sm mb-1.5">Harvard Business School</p>
            <p className="text-white/45 text-xs leading-relaxed max-w-[180px]">
              AI implementation across admissions and operations. Real workflows. Real constraints.
            </p>
          </div>

          {/* Connecting line — horizontal on desktop, vertical on mobile */}
          <div className="hidden md:block relative shrink-0" style={{ width: 160, height: 4 }}>
            {/* Track */}
            <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-[2px] bg-white/5 rounded-full" />
            {/* Animated fill */}
            <div
              className="absolute top-1/2 -translate-y-1/2 left-0 h-[2px] rounded-full bg-gradient-to-r from-teal-500/60 to-teal-400/80"
              style={{
                width: phase >= 2 ? '100%' : '0%',
                transition: 'width 0.6s ease-out',
              }}
            />
            {/* Flowing dots */}
            {phase >= 3 && [0, 700, 1400].map((delay, i) => (
              <div
                key={i}
                className="absolute top-1/2 -translate-y-1/2 w-[5px] h-[5px] rounded-full bg-teal-400 shadow-[0_0_6px_rgba(13,148,136,0.8)]"
                style={{
                  animation: `authorityFlowH 2s ease-in-out ${delay}ms infinite`,
                }}
              />
            ))}
            {/* Arrow */}
            <svg
              className="absolute -right-1 top-1/2 -translate-y-1/2"
              width="8" height="10" viewBox="0 0 8 10"
              style={{ opacity: phase >= 2 ? 0.6 : 0, transition: 'opacity 0.3s ease-out' }}
            >
              <path d="M1 1L6 5L1 9" stroke="#0d9488" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          {/* Mobile vertical connector */}
          <div className="md:hidden relative my-4" style={{ width: 4, height: 60 }}>
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-white/5 rounded-full" />
            <div
              className="absolute left-1/2 -translate-x-1/2 top-0 w-[2px] rounded-full bg-gradient-to-b from-teal-500/60 to-teal-400/80"
              style={{
                height: phase >= 2 ? '100%' : '0%',
                transition: 'height 0.6s ease-out',
              }}
            />
            {phase >= 3 && [0, 700, 1400].map((delay, i) => (
              <div
                key={i}
                className="absolute left-1/2 -translate-x-1/2 w-[5px] h-[5px] rounded-full bg-teal-400 shadow-[0_0_6px_rgba(13,148,136,0.8)]"
                style={{
                  animation: `authorityFlowV 2s ease-in-out ${delay}ms infinite`,
                }}
              />
            ))}
            <svg
              className="absolute -bottom-1 left-1/2 -translate-x-1/2"
              width="10" height="8" viewBox="0 0 10 8"
              style={{ opacity: phase >= 2 ? 0.6 : 0, transition: 'opacity 0.3s ease-out' }}
            >
              <path d="M1 1L5 6L9 1" stroke="#0d9488" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          {/* Right node */}
          <div
            className="flex flex-col items-center text-center transition-all duration-700 w-[200px] shrink-0"
            style={{
              opacity: phase >= 3 ? 1 : 0,
              transform: phase >= 3 ? 'scale(1)' : 'scale(0.8)',
            }}
          >
            <div className="w-[120px] h-[120px] rounded-2xl bg-white/[0.06] backdrop-blur-xl border border-white/[0.12] flex items-center justify-center mb-4 shadow-lg shadow-black/10">
              <span className="text-teal-400">
                <SystemIcon />
              </span>
            </div>
            <p className="text-white font-semibold text-sm mb-1.5">Kaleos</p>
            <p className="text-white/45 text-xs leading-relaxed max-w-[180px]">
              Same methodology. Same precision. Now available to your business.
            </p>
          </div>
        </div>

        {/* Tagline */}
        <p
          className="text-white/70 text-center text-base sm:text-lg leading-relaxed max-w-2xl mx-auto transition-all duration-700"
          style={{
            opacity: phase >= 4 ? 1 : 0,
            transform: phase >= 4 ? 'translateY(0)' : 'translateY(12px)',
          }}
        >
          The same principles that drive AI inside one of the world&apos;s most complex institutions now drive yours.
        </p>
      </div>

      <style>{`
        @keyframes authorityFlowH {
          0% { left: 0; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { left: calc(100% - 5px); opacity: 0; }
        }
        @keyframes authorityFlowV {
          0% { top: 0; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: calc(100% - 5px); opacity: 0; }
        }
      `}</style>
    </section>
  )
}
