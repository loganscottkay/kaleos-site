'use client'

import { useState, useEffect, useRef } from 'react'

const PROCESSING_TEXT =
  'Analyzing inbound lead from Sarah Chen, CFO at Meridian Group. Matching against qualification criteria...'

const STEP1_TIME = 0
const STEP2_TIME = 1500
const STEP3_TIME = 3000
const FADE_TIME = 6000
const RESET_TIME = 7200
const RESTART_TIME = 7800

export function DemoFrame() {
  const [phase, setPhase] = useState(0)
  const [typedChars, setTypedChars] = useState(0)
  const [score, setScore] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.25 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    let cancelled = false
    const timeouts: ReturnType<typeof setTimeout>[] = []

    const schedule = (fn: () => void, ms: number) => {
      timeouts.push(
        setTimeout(() => {
          if (!cancelled) fn()
        }, ms),
      )
    }

    const runCycle = () => {
      if (cancelled) return

      setPhase(1)
      setTypedChars(0)
      setScore(0)

      schedule(() => setPhase(2), STEP2_TIME)
      schedule(() => setPhase(3), STEP3_TIME)
      schedule(() => setPhase(4), FADE_TIME)
      schedule(() => setPhase(0), RESET_TIME)
      schedule(runCycle, RESTART_TIME)
    }

    runCycle()

    return () => {
      cancelled = true
      timeouts.forEach(clearTimeout)
    }
  }, [isVisible])

  // Typing effect
  useEffect(() => {
    if (phase < 1 || phase === 4) return
    if (typedChars >= PROCESSING_TEXT.length) return

    const timer = setTimeout(
      () => setTypedChars((prev) => Math.min(prev + 1, PROCESSING_TEXT.length)),
      22,
    )
    return () => clearTimeout(timer)
  }, [phase, typedChars])

  // Score count-up
  useEffect(() => {
    if (phase < 2 || phase === 4) return
    if (score >= 94) return

    const timer = setTimeout(
      () => setScore((prev) => Math.min(prev + 2, 94)),
      12,
    )
    return () => clearTimeout(timer)
  }, [phase, score])

  const showStep1 = phase >= 1 && phase < 4
  const showStep2 = phase >= 2 && phase < 4
  const showStep3 = phase >= 3 && phase < 4

  return (
    <div ref={containerRef}>
      <div className="rounded-2xl overflow-hidden bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] ring-1 ring-white/5 shadow-2xl shadow-black/30">
        {/* macOS title bar */}
        <div className="flex items-center gap-2 px-5 py-3.5 bg-white/[0.03] border-b border-white/[0.06]">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/60" />
            <div className="w-3 h-3 rounded-full bg-amber-500/60" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
          </div>
          <span className="text-white/25 text-xs font-mono ml-2 tracking-wider">
            Kaleos Operator
          </span>
        </div>

        {/* Content area */}
        <div
          className="p-6 space-y-5 min-h-[340px]"
          style={{
            opacity: phase === 0 || phase === 4 ? 0 : 1,
            transition:
              phase === 4
                ? 'opacity 1s ease-out'
                : phase >= 1
                  ? 'opacity 0.5s ease-in'
                  : 'none',
          }}
        >
          {/* Step 1: AI Processing */}
          <div
            style={{
              opacity: showStep1 ? 1 : 0,
              transform: showStep1 ? 'translateY(0)' : 'translateY(12px)',
              transition: 'all 0.5s ease-out',
            }}
          >
            <div className="flex items-center gap-2.5 mb-2.5">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-accent text-xs font-medium tracking-wide uppercase">
                AI Processing
              </span>
            </div>
            <p className="text-white/50 text-sm font-mono leading-relaxed pl-[18px]">
              {PROCESSING_TEXT.slice(0, typedChars)}
              {typedChars < PROCESSING_TEXT.length && phase >= 1 && phase < 4 && (
                <span className="inline-block w-[2px] h-[14px] bg-accent/70 animate-pulse ml-0.5 align-text-bottom" />
              )}
            </p>
          </div>

          {/* Step 2: Output Ready */}
          <div
            style={{
              opacity: showStep2 ? 1 : 0,
              transform: showStep2 ? 'translateY(0)' : 'translateY(16px)',
              transition: 'all 0.6s ease-out',
            }}
          >
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-emerald-400 text-xs font-medium tracking-wide uppercase">
                Output Ready
              </span>
            </div>
            <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-4 space-y-3 ml-[18px]">
              <div className="flex items-center justify-between">
                <span className="text-white/30 text-xs uppercase tracking-wide">
                  Lead Score
                </span>
                <span className="text-emerald-400 text-lg font-bold font-mono tabular-nums">
                  {score}
                  <span className="text-white/20 text-sm font-normal">
                    /100
                  </span>
                </span>
              </div>
              <div className="h-px bg-white/[0.05]" />
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                <span className="text-white/30 text-xs uppercase tracking-wide">
                  Match
                </span>
                <span className="text-white/60 text-sm">
                  Revenue Operations — High-value fit
                </span>
              </div>
              <div className="h-px bg-white/[0.05]" />
              <div>
                <span className="text-white/30 text-xs uppercase tracking-wide block mb-1">
                  Recommended Action
                </span>
                <span className="text-white/60 text-sm">
                  Send personalized follow-up with ROI case study
                </span>
              </div>
              <div className="h-px bg-white/[0.05]" />
              <div>
                <span className="text-white/30 text-xs uppercase tracking-wide block mb-1">
                  Draft Preview
                </span>
                <p className="text-white/40 text-sm italic">
                  &quot;Hi Sarah, I noticed Meridian Group is scaling its finance
                  operations...&quot;
                </p>
              </div>
            </div>
          </div>

          {/* Step 3: Awaiting Approval */}
          <div
            style={{
              opacity: showStep3 ? 1 : 0,
              transform: showStep3 ? 'translateY(0)' : 'translateY(16px)',
              transition: 'all 0.6s ease-out',
            }}
          >
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-amber-400 text-xs font-medium tracking-wide uppercase">
                Awaiting Your Approval
              </span>
            </div>
            <div className="flex items-center gap-3 ml-[18px]">
              <div className="relative">
                <div
                  className="absolute -inset-1 rounded-xl bg-accent/20 blur-sm"
                  style={{
                    animation:
                      'pulse 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                  }}
                />
                <button className="relative px-5 py-2.5 rounded-xl bg-accent text-white text-sm font-medium cursor-default">
                  Approve &amp; Send
                </button>
              </div>
              <button className="px-5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white/40 text-sm font-medium cursor-default">
                Edit First
              </button>
            </div>
            <p className="text-white/20 text-xs mt-3 ml-[18px]">
              Nothing sends without your say-so.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
