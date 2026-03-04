'use client'

import { useRef, useEffect, useState } from 'react'

const nodes = [
  'Your Strategy',
  'Workflow Mapping',
  'System Design',
  'Deployment',
  'Measurement',
]

export function WorkflowDiagram() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: '50px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="mb-14">
      {/* Desktop / Tablet: horizontal */}
      <div className="hidden md:flex items-center justify-center gap-0 flex-wrap">
        {nodes.map((label, i) => (
          <div key={label} className="flex items-center">
            {/* Node */}
            <div
              className="relative flex items-center justify-center rounded-xl border border-teal-400/30 bg-white/[0.06] backdrop-blur-xl shadow-lg shadow-black/10"
              style={{
                width: 140,
                height: 60,
                opacity: visible ? 1 : 0,
                transform: visible ? 'scale(1)' : 'scale(0.85)',
                transition: `opacity 0.5s ease-out ${i * 300}ms, transform 0.5s ease-out ${i * 300}ms, box-shadow 0.5s ease-out ${i * 300 + 200}ms`,
                boxShadow: visible
                  ? `0 0 ${12 + (i === 0 ? 8 : 0)}px rgba(13,148,136,0.25)`
                  : '0 0 0px rgba(13,148,136,0)',
              }}
            >
              {/* Pulse glow on arrival */}
              <div
                className="absolute inset-0 rounded-xl pointer-events-none"
                style={{
                  boxShadow: '0 0 20px rgba(13,148,136,0.5)',
                  opacity: visible ? 0 : 0,
                  animation: visible
                    ? `nodePulse 0.8s ease-out ${i * 300 + 400}ms forwards`
                    : 'none',
                }}
              />
              <span className="relative z-10 text-white font-medium text-sm text-center px-2">
                {label}
              </span>
            </div>

            {/* Connection line + animated dot + arrow */}
            {i < nodes.length - 1 && (
              <div className="relative flex items-center" style={{ width: 48 }}>
                {/* Line */}
                <div
                  className="h-[2px] bg-teal-500/60"
                  style={{
                    width: visible ? '100%' : '0%',
                    transition: `width 0.4s ease-out ${i * 300 + 250}ms`,
                  }}
                />
                {/* Animated dot */}
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-[4px] h-[4px] rounded-full bg-teal-400"
                  style={{
                    opacity: visible ? 1 : 0,
                    transition: `opacity 0.3s ease-out ${i * 300 + 600}ms`,
                    animation: visible
                      ? `flowDot 1.8s ease-in-out ${i * 200}ms infinite`
                      : 'none',
                  }}
                />
                {/* Arrow */}
                <svg
                  className="absolute right-0 top-1/2 -translate-y-1/2"
                  width="8"
                  height="10"
                  viewBox="0 0 8 10"
                  style={{
                    opacity: visible ? 0.7 : 0,
                    transition: `opacity 0.3s ease-out ${i * 300 + 400}ms`,
                  }}
                >
                  <path d="M1 1L6 5L1 9" stroke="#0d9488" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Mobile: vertical stack */}
      <div className="flex md:hidden flex-col items-center gap-0">
        {nodes.map((label, i) => (
          <div key={label} className="flex flex-col items-center">
            {/* Node */}
            <div
              className="relative flex items-center justify-center rounded-xl border border-teal-400/30 bg-white/[0.06] backdrop-blur-xl shadow-lg shadow-black/10"
              style={{
                width: 160,
                height: 52,
                opacity: visible ? 1 : 0,
                transform: visible ? 'scale(1)' : 'scale(0.85)',
                transition: `opacity 0.5s ease-out ${i * 200}ms, transform 0.5s ease-out ${i * 200}ms`,
                boxShadow: visible
                  ? '0 0 12px rgba(13,148,136,0.25)'
                  : '0 0 0px rgba(13,148,136,0)',
              }}
            >
              <span className="relative z-10 text-white font-medium text-sm text-center px-2">
                {label}
              </span>
            </div>

            {/* Vertical connector */}
            {i < nodes.length - 1 && (
              <div className="relative flex flex-col items-center" style={{ height: 32 }}>
                <div
                  className="w-[2px] bg-teal-500/60"
                  style={{
                    height: visible ? '100%' : '0%',
                    transition: `height 0.3s ease-out ${i * 200 + 150}ms`,
                  }}
                />
                {/* Down arrow */}
                <svg
                  className="absolute bottom-0"
                  width="10"
                  height="8"
                  viewBox="0 0 10 8"
                  style={{
                    opacity: visible ? 0.7 : 0,
                    transition: `opacity 0.3s ease-out ${i * 200 + 300}ms`,
                  }}
                >
                  <path d="M1 1L5 6L9 1" stroke="#0d9488" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Keyframes */}
      <style jsx>{`
        @keyframes flowDot {
          0% { left: 0; }
          100% { left: calc(100% - 4px); }
        }
        @keyframes nodePulse {
          0% { opacity: 0; }
          40% { opacity: 1; }
          100% { opacity: 0; }
        }
      `}</style>
    </div>
  )
}
