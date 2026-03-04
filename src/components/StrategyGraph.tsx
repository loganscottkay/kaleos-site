'use client'

import { useRef, useEffect, useState } from 'react'

interface StrategyGraphProps {
  variant: 'decline' | 'growth'
  delay?: number
}

const config = {
  decline: {
    header: 'AI without strategy',
    headerColor: 'text-red-400',
    lineColor: '#ef4444',
    glowColor: 'rgba(239, 68, 68, 0.3)',
    gradientId: 'declineFill',
    gradientColor: '#ef4444',
    borderColor: 'border-red-500/20',
    bgTint: 'bg-red-950/[0.15]',
    glowShadow: '0 0 20px rgba(239, 68, 68, 0.12)',
    linePath: 'M 15,15 C 30,18 50,32 80,60 S 155,115 185,130',
    fillPath: 'M 15,15 C 30,18 50,32 80,60 S 155,115 185,130 L 185,145 L 15,145 Z',
    dataPoints: [
      { cx: 15, cy: 15 },
      { cx: 50, cy: 32 },
      { cx: 100, cy: 72 },
      { cx: 145, cy: 108 },
      { cx: 185, cy: 130 },
    ],
  },
  growth: {
    header: 'Strategic vision meets AI implementation',
    headerColor: 'text-emerald-400',
    lineColor: '#10b981',
    glowColor: 'rgba(16, 185, 129, 0.3)',
    gradientId: 'growthFill',
    gradientColor: '#10b981',
    borderColor: 'border-emerald-500/20',
    bgTint: 'bg-emerald-950/[0.15]',
    glowShadow: '0 0 20px rgba(16, 185, 129, 0.12)',
    linePath: 'M 15,130 C 40,128 65,122 100,100 S 160,20 185,10',
    fillPath: 'M 15,130 C 40,128 65,122 100,100 S 160,20 185,10 L 185,145 L 15,145 Z',
    dataPoints: [
      { cx: 15, cy: 130 },
      { cx: 55, cy: 123 },
      { cx: 100, cy: 100 },
      { cx: 150, cy: 32 },
      { cx: 185, cy: 10 },
    ],
  },
}

export function StrategyGraph({ variant, delay = 0 }: StrategyGraphProps) {
  const c = config[variant]
  const pathRef = useRef<SVGPathElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isDrawn, setIsDrawn] = useState(false)
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
      { threshold: 0.15 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => setIsDrawn(true), 2100)
      return () => clearTimeout(timer)
    }
  }, [isVisible])

  return (
    <div ref={containerRef} className="h-full">
      <div
        className={`relative rounded-2xl backdrop-blur-xl border ${c.borderColor} ${c.bgTint} overflow-hidden h-full flex flex-col`}
        style={{ boxShadow: c.glowShadow }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.05] via-transparent to-transparent pointer-events-none" />

        <div className="relative p-5 flex flex-col h-full">
          <p className={`text-sm font-medium ${c.headerColor} mb-3 leading-tight`}>
            {c.header}
          </p>

          <div className="flex-1 min-h-[180px]">
            <svg
              viewBox="0 0 200 150"
              className="w-full h-full"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <linearGradient id={c.gradientId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={c.gradientColor} stopOpacity={0.15} />
                  <stop offset="100%" stopColor={c.gradientColor} stopOpacity={0} />
                </linearGradient>
                <filter id={`glow-${variant}`}>
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Grid lines */}
              {Array.from({ length: 6 }, (_, i) => {
                const x = 15 + i * 34
                return (
                  <line
                    key={`v${i}`}
                    x1={x}
                    y1={5}
                    x2={x}
                    y2={145}
                    stroke="white"
                    strokeOpacity={0.1}
                    strokeWidth={0.5}
                  />
                )
              })}
              {Array.from({ length: 7 }, (_, i) => {
                const y = 5 + i * 23.3
                return (
                  <line
                    key={`h${i}`}
                    x1={15}
                    y1={y}
                    x2={185}
                    y2={y}
                    stroke="white"
                    strokeOpacity={0.1}
                    strokeWidth={0.5}
                  />
                )
              })}

              {/* Fill area under line */}
              <path
                d={c.fillPath}
                fill={`url(#${c.gradientId})`}
                style={{
                  opacity: isVisible ? 1 : 0,
                  transition: 'opacity 1.5s ease-out 0.8s',
                }}
              />

              {/* Glow behind main line */}
              <path
                d={c.linePath}
                fill="none"
                stroke={c.glowColor}
                strokeWidth={6}
                strokeLinecap="round"
                filter={`url(#glow-${variant})`}
                style={{
                  strokeDasharray: pathLength,
                  strokeDashoffset: isVisible ? 0 : pathLength,
                  transition: 'stroke-dashoffset 2s ease-in-out',
                  opacity: 0.5,
                }}
              />

              {/* Main line */}
              <path
                ref={pathRef}
                d={c.linePath}
                fill="none"
                stroke={c.lineColor}
                strokeWidth={2.5}
                strokeLinecap="round"
                style={{
                  strokeDasharray: pathLength,
                  strokeDashoffset: isVisible ? 0 : pathLength,
                  transition: 'stroke-dashoffset 2s ease-in-out',
                }}
              />

              {/* Pulsing data points */}
              <g
                style={{
                  opacity: isDrawn ? 1 : 0,
                  transition: 'opacity 0.6s ease-out',
                }}
              >
                {c.dataPoints.map((p, i) => (
                  <circle key={i} cx={p.cx} cy={p.cy} r={3} fill={c.lineColor}>
                    <animate
                      attributeName="r"
                      values="3;4.5;3"
                      dur="3s"
                      begin={`${i * 0.6}s`}
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      values="1;0.5;1"
                      dur="3s"
                      begin={`${i * 0.6}s`}
                      repeatCount="indefinite"
                    />
                  </circle>
                ))}
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
