'use client'

import { useRef, useEffect, useState } from 'react'

interface StrategyGraphProps {
  variant: 'decline' | 'growth'
  delay?: number
}

const particles = [
  { x: 30, y: 120, dx: 2, dur: 5.2 },
  { x: 65, y: 105, dx: -1.5, dur: 4.6 },
  { x: 95, y: 130, dx: 1, dur: 5.8 },
  { x: 125, y: 95, dx: -2, dur: 4.3 },
  { x: 160, y: 115, dx: 1.5, dur: 5.5 },
  { x: 45, y: 85, dx: -1, dur: 6.1 },
  { x: 110, y: 75, dx: 2, dur: 4.8 },
  { x: 145, y: 135, dx: -1.5, dur: 5.0 },
  { x: 75, y: 110, dx: 1, dur: 5.4 },
  { x: 175, y: 100, dx: -2, dur: 4.5 },
  { x: 50, y: 125, dx: 1.5, dur: 5.9 },
  { x: 135, y: 90, dx: -1, dur: 4.7 },
]

const config = {
  decline: {
    header: 'AI Without Strategy',
    subtitle: 'Tools without direction. Budget spent, nothing to show.',
    headerColor: 'text-red-400/90',
    lineColor: '#ef4444',
    glowColor: 'rgba(239, 68, 68, 0.45)',
    gradientId: 'declineFill',
    gradientColor: '#ef4444',
    borderColor: 'border-red-500/[0.25]',
    glowBorder: 'rgba(239, 68, 68, 0.15)',
    cardBg: 'rgba(50, 15, 15, 0.65)',
    linePath: 'M 25,18 C 50,20 70,30 95,55 C 120,80 145,105 165,118 C 175,124 182,127 185,128',
    fillPath:
      'M 25,18 C 50,20 70,30 95,55 C 120,80 145,105 165,118 C 175,124 182,127 185,128 L 185,140 L 25,140 Z',
    dataPoints: [
      { cx: 25, cy: 18, pct: 0 },
      { cx: 58, cy: 25, pct: 0.17 },
      { cx: 95, cy: 55, pct: 0.42 },
      { cx: 148, cy: 108, pct: 0.75 },
      { cx: 185, cy: 128, pct: 1.0 },
    ],
  },
  growth: {
    header: 'AI With Kaleos',
    subtitle: 'Strategy first. Compounding returns.',
    headerColor: 'text-emerald-400/90',
    lineColor: '#10b981',
    glowColor: 'rgba(16, 185, 129, 0.45)',
    gradientId: 'growthFill',
    gradientColor: '#10b981',
    borderColor: 'border-emerald-500/[0.25]',
    glowBorder: 'rgba(16, 185, 129, 0.15)',
    cardBg: 'rgba(10, 35, 30, 0.65)',
    linePath: 'M 25,128 C 50,127 75,124 100,112 C 125,95 145,65 160,40 C 172,22 180,15 185,12',
    fillPath:
      'M 25,128 C 50,127 75,124 100,112 C 125,95 145,65 160,40 C 172,22 180,15 185,12 L 185,140 L 25,140 Z',
    dataPoints: [
      { cx: 25, cy: 128, pct: 0 },
      { cx: 62, cy: 125, pct: 0.18 },
      { cx: 100, cy: 112, pct: 0.42 },
      { cx: 150, cy: 52, pct: 0.78 },
      { cx: 185, cy: 12, pct: 1.0 },
    ],
  },
}

const CHART_LEFT = 25
const CHART_RIGHT = 185
const CHART_TOP = 8
const CHART_BOTTOM = 140
const DRAW_DURATION = 2500

export function StrategyGraph({ variant, delay = 0 }: StrategyGraphProps) {
  const c = config[variant]
  const pathRef = useRef<SVGPathElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [revealedDots, setRevealedDots] = useState<Set<number>>(new Set())
  const [pathLength, setPathLength] = useState(500)

  useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength())
    }
  }, [])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay)
          observer.disconnect()
        }
      },
      { threshold: 0.15 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])

  useEffect(() => {
    if (!isVisible) return

    const timers = c.dataPoints.map((p, i) =>
      setTimeout(
        () => setRevealedDots((prev) => new Set([...prev, i])),
        p.pct * DRAW_DURATION,
      ),
    )

    return () => timers.forEach(clearTimeout)
  }, [isVisible, variant, c.dataPoints])

  const hGridCount = 6
  const vGridCount = 6

  return (
    <div ref={containerRef} className="h-full">
      <div className="relative h-full">
        {/* Pulsing glow border */}
        <div
          className="absolute -inset-px rounded-2xl"
          style={{
            background: `linear-gradient(145deg, ${c.lineColor}35, transparent 40%, transparent 60%, ${c.lineColor}25)`,
            animation: 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
          }}
        />

        {/* Card */}
        <div
          className={`relative rounded-2xl backdrop-blur-2xl border ${c.borderColor} overflow-hidden h-full flex flex-col`}
          style={{
            backgroundColor: c.cardBg,
            boxShadow: `0 0 40px ${c.glowBorder}, inset 0 1px 0 rgba(255,255,255,0.07)`,
          }}
        >
          {/* Top highlight */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.07] via-transparent to-transparent pointer-events-none" />

          <div className="relative p-5 pb-4 flex flex-col h-full">
            <p
              className={`text-xs font-semibold ${c.headerColor} mb-1 tracking-widest uppercase`}
            >
              {c.header}
            </p>
            <p className="text-[10px] text-white/40 mb-3">
              {c.subtitle}
            </p>

            <div className="flex-1 min-h-[200px]">
              <svg
                viewBox="0 0 200 158"
                className="w-full h-full"
                preserveAspectRatio="xMidYMid meet"
              >
                <defs>
                  <linearGradient
                    id={c.gradientId}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor={c.gradientColor}
                      stopOpacity={0.28}
                    />
                    <stop
                      offset="50%"
                      stopColor={c.gradientColor}
                      stopOpacity={0.1}
                    />
                    <stop
                      offset="100%"
                      stopColor={c.gradientColor}
                      stopOpacity={0}
                    />
                  </linearGradient>
                  <filter id={`glow-${variant}`}>
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <radialGradient id={`dotGlow-${variant}`}>
                    <stop
                      offset="0%"
                      stopColor={c.lineColor}
                      stopOpacity={0.5}
                    />
                    <stop
                      offset="100%"
                      stopColor={c.lineColor}
                      stopOpacity={0}
                    />
                  </radialGradient>
                </defs>

                {/* Floating particles */}
                {particles.map((p, i) => (
                  <circle key={`p${i}`} cx={p.x} cy={p.y} r={0.7} fill="white">
                    <animateTransform
                      attributeName="transform"
                      type="translate"
                      values={`0,0;${p.dx},${-28}`}
                      dur={`${p.dur}s`}
                      begin={`${(i * 0.7) % 3}s`}
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      values="0;0.18;0.12;0"
                      dur={`${p.dur}s`}
                      begin={`${(i * 0.7) % 3}s`}
                      repeatCount="indefinite"
                    />
                  </circle>
                ))}

                {/* Horizontal grid lines */}
                {Array.from({ length: hGridCount }, (_, i) => {
                  const y =
                    CHART_TOP +
                    i * ((CHART_BOTTOM - CHART_TOP) / (hGridCount - 1))
                  return (
                    <line
                      key={`h${i}`}
                      x1={CHART_LEFT}
                      y1={y}
                      x2={CHART_RIGHT}
                      y2={y}
                      stroke="white"
                      strokeOpacity={0.08}
                      strokeWidth={0.5}
                      strokeDasharray={i === hGridCount - 1 ? 'none' : '2,3'}
                    />
                  )
                })}

                {/* Vertical grid lines */}
                {Array.from({ length: vGridCount }, (_, i) => {
                  const x =
                    CHART_LEFT +
                    i * ((CHART_RIGHT - CHART_LEFT) / (vGridCount - 1))
                  return (
                    <line
                      key={`v${i}`}
                      x1={x}
                      y1={CHART_TOP}
                      x2={x}
                      y2={CHART_BOTTOM}
                      stroke="white"
                      strokeOpacity={0.08}
                      strokeWidth={0.5}
                      strokeDasharray={i === 0 ? 'none' : '2,3'}
                    />
                  )
                })}

                {/* X axis */}
                <line
                  x1={CHART_LEFT}
                  y1={CHART_BOTTOM}
                  x2={CHART_RIGHT}
                  y2={CHART_BOTTOM}
                  stroke="white"
                  strokeOpacity={0.2}
                  strokeWidth={0.7}
                />
                {/* Y axis */}
                <line
                  x1={CHART_LEFT}
                  y1={CHART_TOP}
                  x2={CHART_LEFT}
                  y2={CHART_BOTTOM}
                  stroke="white"
                  strokeOpacity={0.2}
                  strokeWidth={0.7}
                />

                {/* Y-axis label */}
                <text
                  x={CHART_LEFT - 4}
                  y={(CHART_TOP + CHART_BOTTOM) / 2}
                  fill="white"
                  fillOpacity={0.25}
                  fontSize={7}
                  textAnchor="middle"
                  transform={`rotate(-90, ${CHART_LEFT - 4}, ${(CHART_TOP + CHART_BOTTOM) / 2})`}
                >
                  ROI
                </text>

                {/* X-axis label */}
                <text
                  x={(CHART_LEFT + CHART_RIGHT) / 2}
                  y={CHART_BOTTOM + 13}
                  fill="white"
                  fillOpacity={0.25}
                  fontSize={7}
                  textAnchor="middle"
                >
                  Time
                </text>

                {/* Fill area under curve */}
                <path
                  d={c.fillPath}
                  fill={`url(#${c.gradientId})`}
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transition: 'opacity 1.5s ease-out 0.4s',
                  }}
                />

                {/* Glow behind main line */}
                <path
                  d={c.linePath}
                  fill="none"
                  stroke={c.glowColor}
                  strokeWidth={10}
                  strokeLinecap="round"
                  filter={`url(#glow-${variant})`}
                  style={{
                    strokeDasharray: pathLength,
                    strokeDashoffset: isVisible ? 0 : pathLength,
                    transition: `stroke-dashoffset ${DRAW_DURATION}ms ease-in-out`,
                    opacity: 0.35,
                  }}
                />

                {/* Main line */}
                <path
                  ref={pathRef}
                  d={c.linePath}
                  fill="none"
                  stroke={c.lineColor}
                  strokeWidth={3}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    strokeDasharray: pathLength,
                    strokeDashoffset: isVisible ? 0 : pathLength,
                    transition: `stroke-dashoffset ${DRAW_DURATION}ms ease-in-out`,
                  }}
                />

                {/* Data points — appear sequentially as line reaches them */}
                {c.dataPoints.map((p, i) => {
                  const show = revealedDots.has(i)
                  return (
                    <g key={`dot${i}`}>
                      {/* Outer glow ring */}
                      <circle
                        cx={p.cx}
                        cy={p.cy}
                        r={9}
                        fill={`url(#dotGlow-${variant})`}
                        style={{
                          opacity: show ? 1 : 0,
                          transition: 'opacity 0.5s ease-out',
                        }}
                      >
                        <animate
                          attributeName="r"
                          values="9;13;9"
                          dur="3s"
                          begin={`${i * 0.4}s`}
                          repeatCount="indefinite"
                        />
                      </circle>
                      {/* Core dot */}
                      <circle
                        cx={p.cx}
                        cy={p.cy}
                        r={3.5}
                        fill={c.lineColor}
                        style={{
                          opacity: show ? 1 : 0,
                          transition: 'opacity 0.5s ease-out',
                        }}
                      >
                        <animate
                          attributeName="r"
                          values="3.5;4.5;3.5"
                          dur="3s"
                          begin={`${i * 0.4}s`}
                          repeatCount="indefinite"
                        />
                      </circle>
                      {/* Bright center */}
                      <circle
                        cx={p.cx}
                        cy={p.cy}
                        r={1.5}
                        fill="white"
                        style={{
                          opacity: show ? 0.7 : 0,
                          transition: 'opacity 0.5s ease-out',
                        }}
                      >
                        <animate
                          attributeName="opacity"
                          values="0.7;0.4;0.7"
                          dur="3s"
                          begin={`${i * 0.4}s`}
                          repeatCount="indefinite"
                        />
                      </circle>
                    </g>
                  )
                })}
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
