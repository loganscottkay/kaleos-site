'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

/* ───────── tiny helpers ───────── */
function cn(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}

/* ───────── Document Processor Card ───────── */

const docs = [
  { name: 'Q4_Financial_Summary.pdf', classification: 'Financial Report', route: 'Finance Team', alert: false },
  { name: 'Vendor_Contract_Renewal.docx', classification: 'Legal / Contract', route: 'Legal Review', alert: false },
  { name: 'Customer_Complaint_4891.eml', classification: 'Urgent / Support', route: 'Account Manager', alert: true },
  { name: 'Partnership_Inquiry.eml', classification: 'Revenue Opportunity', route: 'BD Pipeline', alert: false },
]

type DocStatus = 'queued' | 'processing' | 'extracting' | 'classified' | 'routed'

function DocIcon() {
  return (
    <svg className="w-4 h-4 text-white/40 shrink-0" viewBox="0 0 16 20" fill="none">
      <path d="M10 1H3a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V6l-5-5z" stroke="currentColor" strokeWidth="1.2" />
      <path d="M10 1v5h5" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  )
}

function DocumentProcessor({ active }: { active: boolean }) {
  const [statuses, setStatuses] = useState<DocStatus[]>(['queued', 'queued', 'queued', 'queued'])
  const [progresses, setProgresses] = useState([0, 0, 0, 0])
  const [showSummary, setShowSummary] = useState(false)
  const [summaryOpacity, setSummaryOpacity] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const animFrameRef = useRef<number | null>(null)

  const reset = useCallback(() => {
    setStatuses(['queued', 'queued', 'queued', 'queued'])
    setProgresses([0, 0, 0, 0])
    setShowSummary(false)
    setSummaryOpacity(0)
  }, [])

  useEffect(() => {
    if (!active) return
    let cancelled = false

    function runCycle() {
      if (cancelled) return
      reset()

      const ITEM_DURATION = 2500
      const steps: DocStatus[] = ['processing', 'extracting', 'classified', 'routed']

      docs.forEach((_, idx) => {
        const base = idx * ITEM_DURATION

        // start processing
        setTimeout(() => {
          if (cancelled) return
          setStatuses(s => { const n = [...s]; n[idx] = 'processing'; return n })
          // animate progress bar
          const start = performance.now()
          function tick(now: number) {
            if (cancelled) return
            const elapsed = now - start
            const pct = Math.min(elapsed / 1000, 1)
            setProgresses(p => { const n = [...p]; n[idx] = pct; return n })
            if (pct < 1) animFrameRef.current = requestAnimationFrame(tick)
          }
          animFrameRef.current = requestAnimationFrame(tick)
        }, base)

        // extracting
        setTimeout(() => {
          if (cancelled) return
          setStatuses(s => { const n = [...s]; n[idx] = 'extracting'; return n })
        }, base + 1000)

        // classified
        setTimeout(() => {
          if (cancelled) return
          setStatuses(s => { const n = [...s]; n[idx] = 'classified'; return n })
        }, base + 1700)

        // routed
        setTimeout(() => {
          if (cancelled) return
          setStatuses(s => { const n = [...s]; n[idx] = 'routed'; return n })
        }, base + 2200)
      })

      // show summary
      const totalTime = docs.length * ITEM_DURATION + 500
      setTimeout(() => {
        if (cancelled) return
        setShowSummary(true)
        setTimeout(() => { if (!cancelled) setSummaryOpacity(1) }, 50)
      }, totalTime)

      // reset and loop
      setTimeout(() => {
        if (cancelled) return
        setSummaryOpacity(0)
        setTimeout(() => {
          if (!cancelled) runCycle()
        }, 500)
      }, totalTime + 3500)
    }

    runCycle()

    return () => {
      cancelled = true
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
    }
  }, [active, reset])

  return (
    <div className="flex flex-col h-full">
      {/* inner dark card */}
      <div className="rounded-lg bg-[#0f172a] shadow-inner flex-1 flex flex-col overflow-hidden">
        {/* header */}
        <div className="flex items-center justify-between px-3 py-2 border-b border-white/5">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse-slow" />
            <span className="text-[10px] font-mono text-teal-400/80">Document Processor v2.1</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
            <span className="text-[10px] font-mono text-green-400/80">Live</span>
          </div>
        </div>

        {/* queue */}
        <div className="flex-1 px-3 py-2 space-y-1.5 min-h-0">
          {docs.map((doc, i) => (
            <div key={i} className="flex items-center gap-2 py-1.5 px-2 rounded bg-white/[0.02]">
              <DocIcon />
              <span className="text-[10px] font-mono text-white/80 truncate flex-1 min-w-0">{doc.name}</span>
              <div className="w-28 shrink-0 flex items-center justify-end">
                {statuses[i] === 'queued' && (
                  <span className="text-[9px] font-mono text-white/30">Queued</span>
                )}
                {statuses[i] === 'processing' && (
                  <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-teal-700 to-teal-400 shimmer-bar"
                      style={{ width: `${progresses[i] * 100}%` }}
                    />
                  </div>
                )}
                {statuses[i] === 'extracting' && (
                  <span className="text-[9px] font-mono text-teal-400 shimmer-text">Extracting data...</span>
                )}
                {statuses[i] === 'classified' && (
                  <span className="text-[9px] font-mono text-white/80">{doc.classification}</span>
                )}
                {statuses[i] === 'routed' && (
                  <div className="flex items-center gap-1">
                    <span className="text-[9px] font-mono text-green-400 pop-in">&rarr; {doc.route}</span>
                    <svg className="w-3 h-3 text-green-400 pop-in" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    {doc.alert && <span className="text-[8px] font-mono bg-amber-500/20 text-amber-400 px-1 rounded flash-in ml-1">Alert Sent</span>}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* summary bar */}
        {showSummary && (
          <div
            className="px-3 py-2 border-t border-white/5 transition-opacity duration-500"
            style={{ opacity: summaryOpacity }}
          >
            <p className="text-[9px] font-mono text-white/50 text-center">
              <span className="text-teal-400">4</span> processed &middot; <span className="text-teal-400">3</span> departments routed &middot; <span className="text-teal-400">1</span> alert triggered &middot; <span className="text-teal-400">0</span> human hours spent
            </p>
          </div>
        )}
      </div>

      {/* description below */}
      <p className="text-[11px] text-white/40 leading-relaxed mt-3 px-1">
        Incoming documents classified, prioritized, and routed instantly. Urgent items flagged. Nothing slips through.
      </p>
    </div>
  )
}

/* ───────── Decision Engine Card ───────── */

const factors = [
  { label: 'Market Demand', value: 82, color: '#10b981' },
  { label: 'Competitive Density', value: 64, color: '#f59e0b' },
  { label: 'Operational Readiness', value: 41, color: '#ef4444' },
]

function DecisionEngine({ active }: { active: boolean }) {
  const [typedPrompt, setTypedPrompt] = useState('')
  const [visibleFactors, setVisibleFactors] = useState(0)
  const [factorWidths, setFactorWidths] = useState([0, 0, 0])
  const [showRec, setShowRec] = useState(false)
  const [recLine1, setRecLine1] = useState('')
  const [recLine2, setRecLine2] = useState('')
  const [confidence, setConfidence] = useState(0)
  const [showAwait, setShowAwait] = useState(false)
  const [phase, setPhase] = useState<'idle' | 'typing' | 'factors' | 'rec' | 'await'>('idle')

  const prompt = 'Analyzing: Should we expand into the Northeast market?'
  const rec1 = 'Recommendation: Conditional expansion.'
  const rec2 = 'Operational capacity needs 30-day ramp. Hire 2 ops roles before greenlight.'

  useEffect(() => {
    if (!active) return
    let cancelled = false

    function runCycle() {
      if (cancelled) return
      // reset
      setTypedPrompt('')
      setVisibleFactors(0)
      setFactorWidths([0, 0, 0])
      setShowRec(false)
      setRecLine1('')
      setRecLine2('')
      setConfidence(0)
      setShowAwait(false)
      setPhase('typing')

      // Phase 1: type prompt
      let charIdx = 0
      const typeInterval = setInterval(() => {
        if (cancelled) { clearInterval(typeInterval); return }
        charIdx++
        setTypedPrompt(prompt.slice(0, charIdx))
        if (charIdx >= prompt.length) clearInterval(typeInterval)
      }, 25)

      // Phase 2: factors (start at 2s)
      setTimeout(() => {
        if (cancelled) return
        setPhase('factors')

        factors.forEach((f, i) => {
          // show factor
          setTimeout(() => {
            if (cancelled) return
            setVisibleFactors(i + 1)
            // animate bar
            const start = performance.now()
            function tick(now: number) {
              if (cancelled) return
              const pct = Math.min((now - start) / 1000, 1)
              const eased = 1 - Math.pow(1 - pct, 3) // easeOutCubic
              setFactorWidths(w => { const n = [...w]; n[i] = eased * f.value; return n })
              if (pct < 1) requestAnimationFrame(tick)
            }
            requestAnimationFrame(tick)
          }, i * 800)
        })
      }, 2000)

      // Phase 3: recommendation (start at 7s)
      setTimeout(() => {
        if (cancelled) return
        setPhase('rec')
        setShowRec(true)

        // type rec line 1
        let c1 = 0
        const t1 = setInterval(() => {
          if (cancelled) { clearInterval(t1); return }
          c1++
          setRecLine1(rec1.slice(0, c1))
          if (c1 >= rec1.length) {
            clearInterval(t1)
            // type rec line 2
            let c2 = 0
            const t2 = setInterval(() => {
              if (cancelled) { clearInterval(t2); return }
              c2++
              setRecLine2(rec2.slice(0, c2))
              if (c2 >= rec2.length) clearInterval(t2)
            }, 18)
          }
        }, 18)

        // count up confidence
        setTimeout(() => {
          if (cancelled) return
          const start = performance.now()
          function tick(now: number) {
            if (cancelled) return
            const pct = Math.min((now - start) / 800, 1)
            setConfidence(Math.round(pct * 78))
            if (pct < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        }, 1500)
      }, 7000)

      // Phase 4: awaiting (start at 10s)
      setTimeout(() => {
        if (cancelled) return
        setPhase('await')
        setShowAwait(true)
      }, 10000)

      // Reset and loop (at 13s)
      setTimeout(() => {
        if (cancelled) return
        setPhase('idle')
        setTimeout(() => { if (!cancelled) runCycle() }, 1000)
      }, 13000)
    }

    runCycle()
    return () => { cancelled = true }
  }, [active])

  return (
    <div className="flex flex-col h-full">
      <div className="rounded-lg bg-[#0f172a] shadow-inner flex-1 flex flex-col overflow-hidden">
        {/* header */}
        <div className="flex items-center justify-between px-3 py-2 border-b border-white/5">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse-slow" />
            <span className="text-[10px] font-mono text-amber-400/80">Decision Engine v1.4</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span className="text-[10px] font-mono text-amber-400/80">Processing</span>
          </div>
        </div>

        {/* content */}
        <div className="flex-1 px-3 py-3 flex flex-col min-h-0">
          {/* prompt */}
          <p className="text-[11px] font-mono text-white/90 mb-3 min-h-[2em]">
            {typedPrompt}
            {phase === 'typing' && <span className="inline-block w-[5px] h-[11px] bg-teal-400 ml-0.5 animate-blink" />}
          </p>

          {/* factors */}
          <div className="space-y-2 mb-3">
            {factors.map((f, i) => (
              <div
                key={i}
                className="transition-all duration-500"
                style={{ opacity: visibleFactors > i ? 1 : 0, transform: visibleFactors > i ? 'translateX(0)' : 'translateX(-10px)' }}
              >
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-[9px] font-mono text-white/60">{f.label}</span>
                  <span className="text-[9px] font-mono text-white/60">{Math.round(factorWidths[i])}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-white/5">
                  <div
                    className="h-full rounded-full transition-none"
                    style={{
                      width: `${factorWidths[i]}%`,
                      backgroundColor: f.color,
                      boxShadow: `0 0 6px ${f.color}40`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* recommendation */}
          {showRec && (
            <div className="rounded-md bg-white/[0.03] border-l-2 border-teal-500 px-2.5 py-2 mt-auto fade-slide-up">
              <p className="text-[10px] font-mono text-white/80">{recLine1}</p>
              <p className="text-[10px] font-mono text-white/60 mt-1">{recLine2}</p>
              {confidence > 0 && (
                <p className="text-lg font-mono font-bold text-teal-400 mt-1">
                  Confidence: {confidence}%
                </p>
              )}
            </div>
          )}

          {/* awaiting */}
          {showAwait && (
            <p className="text-[10px] font-mono text-white/40 mt-2 fade-in">
              Awaiting executive approval <span className="animate-pulse-slow">&raquo;</span>
            </p>
          )}
        </div>
      </div>

      <p className="text-[11px] text-white/40 leading-relaxed mt-3 px-1">
        Complex decisions backed by data, delivered as clear recommendations. You decide. The system executes.
      </p>
    </div>
  )
}

/* ───────── Performance Monitor Card ───────── */

// Generate a somewhat realistic sparkline path
function generateSparkline(): string {
  const points: number[] = []
  let y = 50
  for (let i = 0; i <= 30; i++) {
    y += (Math.random() - 0.42) * 12
    y = Math.max(15, Math.min(85, y))
    points.push(y)
  }
  // normalize so it trends up
  const min = Math.min(...points)
  const max = Math.max(...points)
  const normalized = points.map((p, i) => {
    const base = ((p - min) / (max - min)) * 60 + 10
    return base - (i / 30) * 15 // trend upward (lower y = higher on svg)
  })
  const w = 280
  const h = 60
  return normalized.map((p, i) => {
    const x = (i / 30) * w
    const yPos = (p / 100) * h
    return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${yPos.toFixed(1)}`
  }).join(' ')
}

function PerformanceMonitor({ active }: { active: boolean }) {
  const [pipeline, setPipeline] = useState(0)
  const [responseTime, setResponseTime] = useState(8.0)
  const [tasks, setTasks] = useState(0)
  const [sparkDrawn, setSparkDrawn] = useState(false)
  const [sparkPath] = useState(generateSparkline)
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (!active) return
    let cancelled = false

    // Count up animations
    const start = performance.now()
    function countUp(now: number) {
      if (cancelled) return
      const pct = Math.min((now - start) / 2000, 1)
      const eased = 1 - Math.pow(1 - pct, 3)
      setPipeline(eased * 2.4)
      setResponseTime(8.0 - eased * 6.8)
      setTasks(Math.round(eased * 1847))
      if (pct < 1) requestAnimationFrame(countUp)
    }
    requestAnimationFrame(countUp)

    // Draw sparkline after 1s
    setTimeout(() => { if (!cancelled) setSparkDrawn(true) }, 1000)

    // Live ticks every 5s
    tickRef.current = setInterval(() => {
      if (cancelled) return
      setPipeline(v => v + (Math.random() * 0.04 + 0.01))
      setTasks(v => v + Math.floor(Math.random() * 3 + 1))
      setResponseTime(v => {
        const next = v + (Math.random() - 0.5) * 0.2
        return Math.max(0.8, Math.min(2.0, next))
      })
    }, 5000)

    return () => {
      cancelled = true
      if (tickRef.current) clearInterval(tickRef.current)
    }
  }, [active])

  return (
    <div className="flex flex-col h-full">
      <div className="rounded-lg bg-[#0f172a] shadow-inner flex-1 flex flex-col overflow-hidden">
        {/* header */}
        <div className="flex items-center justify-between px-3 py-2 border-b border-white/5">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse-slow" />
            <span className="text-[10px] font-mono text-green-400/80">Performance Monitor</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
            <span className="text-[10px] font-mono text-green-400/80">Live</span>
          </div>
        </div>

        {/* metrics grid */}
        <div className="grid grid-cols-2 gap-1.5 px-3 py-2">
          <div className="rounded-md bg-[#141e30] p-2.5">
            <p className="text-[8px] font-mono text-white/40 mb-1">Revenue Pipeline</p>
            <p className="text-base font-mono font-bold text-white">${pipeline.toFixed(1)}M</p>
            <p className="text-[8px] font-mono text-green-400 flex items-center gap-0.5 mt-0.5">
              <span>&uarr;</span> +12% vs last month
            </p>
          </div>
          <div className="rounded-md bg-[#141e30] p-2.5">
            <p className="text-[8px] font-mono text-white/40 mb-1">Avg Response Time</p>
            <p className="text-base font-mono font-bold text-white">{responseTime.toFixed(1)} hrs</p>
            <p className="text-[8px] font-mono text-green-400 flex items-center gap-0.5 mt-0.5">
              <span>&darr;</span> -34%
            </p>
          </div>
          <div className="rounded-md bg-[#141e30] p-2.5">
            <p className="text-[8px] font-mono text-white/40 mb-1">Tasks Automated</p>
            <p className="text-base font-mono font-bold text-teal-400">{tasks.toLocaleString()}</p>
            <div className="w-full h-1 rounded-full bg-white/5 mt-1">
              <div className="h-full rounded-full bg-teal-500/60" style={{ width: '73%' }} />
            </div>
          </div>
          <div className="rounded-md bg-[#141e30] p-2.5">
            <p className="text-[8px] font-mono text-white/40 mb-1">Approval Queue</p>
            <p className="text-base font-mono font-bold text-amber-400 animate-pulse-slow">3 pending</p>
            <p className="text-[8px] font-mono text-amber-400/60 mt-0.5">needs review</p>
          </div>
        </div>

        {/* sparkline */}
        <div className="px-3 pb-2 mt-auto">
          <svg viewBox="0 0 280 60" className="w-full h-10" preserveAspectRatio="none">
            <defs>
              <linearGradient id="sparkFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0d9488" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#0d9488" stopOpacity="0" />
              </linearGradient>
            </defs>
            {sparkDrawn && (
              <>
                <path
                  d={sparkPath + ' L280,60 L0,60 Z'}
                  fill="url(#sparkFill)"
                  className="sparkline-fill"
                />
                <path
                  d={sparkPath}
                  fill="none"
                  stroke="#0d9488"
                  strokeWidth="1.5"
                  className="sparkline-draw"
                  style={{ strokeDasharray: 500, strokeDashoffset: 0 }}
                />
              </>
            )}
          </svg>
          <div className="flex justify-between">
            <span className="text-[7px] font-mono text-white/20">30 days ago</span>
            <span className="text-[7px] font-mono text-white/20">Today</span>
          </div>
        </div>
      </div>

      <p className="text-[11px] text-white/40 leading-relaxed mt-3 px-1">
        Every metric that matters, always current. Bottlenecks surface before they become problems.
      </p>
    </div>
  )
}

/* ───────── Main Section ───────── */

export function BuiltToDemo() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-24 bg-[#1B2A4A]">
      <div className="relative z-10 max-w-6xl mx-auto px-4">
        {/* heading */}
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-center mb-3 text-white"
            style={{ fontFamily: "'Playfair Display', serif" }}>
          Built to Demonstrate
        </h2>
        <p className="text-white/50 text-center max-w-2xl mx-auto mb-14 text-sm">
          These aren&apos;t mockups. They&apos;re live systems running on this page right now.
        </p>

        {/* cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 demo-cards-grid">
          {/* Card 1 */}
          <div className="group rounded-xl p-4 bg-white/[0.06] backdrop-blur-xl border border-white/[0.12] shadow-lg shadow-black/10 transition-all duration-300 hover:bg-white/[0.08] hover:border-teal-500/30 hover:shadow-[0_0_20px_rgba(13,148,136,0.15)] hover:scale-[1.02] demo-card-glow-teal">
            <h3 className="text-xs font-mono text-teal-400 mb-3 tracking-wide">Intelligent Document Processor</h3>
            <DocumentProcessor active={isVisible} />
          </div>

          {/* Card 2 */}
          <div className="group rounded-xl p-4 bg-white/[0.06] backdrop-blur-xl border border-white/[0.12] shadow-lg shadow-black/10 transition-all duration-300 hover:bg-white/[0.08] hover:border-amber-500/30 hover:shadow-[0_0_20px_rgba(245,158,11,0.15)] hover:scale-[1.02] demo-card-glow-amber">
            <h3 className="text-xs font-mono text-amber-400 mb-3 tracking-wide">Executive Decision Engine</h3>
            <DecisionEngine active={isVisible} />
          </div>

          {/* Card 3 */}
          <div className="group rounded-xl p-4 bg-white/[0.06] backdrop-blur-xl border border-white/[0.12] shadow-lg shadow-black/10 transition-all duration-300 hover:bg-white/[0.08] hover:border-green-500/30 hover:shadow-[0_0_20px_rgba(16,185,129,0.15)] hover:scale-[1.02] demo-card-glow-green md:col-span-2 md:max-w-[calc(50%-0.75rem)] md:mx-auto lg:col-span-1 lg:max-w-none">
            <h3 className="text-xs font-mono text-green-400 mb-3 tracking-wide">Real-Time Performance Monitor</h3>
            <PerformanceMonitor active={isVisible} />
          </div>
        </div>
      </div>
    </section>
  )
}
