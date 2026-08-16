interface StrategyGraphProps {
  variant: 'decline' | 'growth'
}

const config = {
  decline: {
    header: 'AI Without Strategy',
    subtitle: 'Tools without direction. Budget spent, nothing to show.',
    headerColor: 'text-decline/90',
    lineColor: 'var(--decline)',
    glowColor: 'color-mix(in srgb, var(--decline) 45%, transparent)',
    gradientId: 'declineFill',
    gradientColor: 'var(--decline)',
    borderColor: 'border-decline/25',
    labelColor: 'var(--decline-bright)',
    cardBg: 'rgba(255, 255, 255, 0.045)',
    linePath: 'M 25,18 C 50,20 70,30 95,55 C 120,80 145,105 165,118 C 175,124 182,127 185,128',
    fillPath:
      'M 25,18 C 50,20 70,30 95,55 C 120,80 145,105 165,118 C 175,124 182,127 185,128 L 185,140 L 25,140 Z',
    dataPoints: [
      { cx: 25, cy: 18 },
      { cx: 58, cy: 25 },
      { cx: 95, cy: 55 },
      { cx: 148, cy: 108 },
      { cx: 185, cy: 128 },
    ],
  },
  growth: {
    header: 'AI With Kaleos HQ',
    subtitle: 'Strategy first. Compounding returns.',
    headerColor: 'text-teal-bright/90',
    lineColor: 'var(--teal)',
    glowColor: 'color-mix(in srgb, var(--teal) 45%, transparent)',
    gradientId: 'growthFill',
    gradientColor: 'var(--teal)',
    borderColor: 'border-accent/25',
    labelColor: 'var(--teal-bright)',
    cardBg: 'rgba(255, 255, 255, 0.045)',
    linePath: 'M 25,128 C 50,127 75,124 100,112 C 125,95 145,65 160,40 C 172,22 180,15 185,12',
    fillPath:
      'M 25,128 C 50,127 75,124 100,112 C 125,95 145,65 160,40 C 172,22 180,15 185,12 L 185,140 L 25,140 Z',
    dataPoints: [
      { cx: 25, cy: 128 },
      { cx: 62, cy: 125 },
      { cx: 100, cy: 112 },
      { cx: 150, cy: 52 },
      { cx: 185, cy: 12 },
    ],
  },
}

const CHART_LEFT = 25
const CHART_RIGHT = 185
const CHART_TOP = 8
const CHART_BOTTOM = 140

export function StrategyGraph({ variant }: StrategyGraphProps) {
  const c = config[variant]
  const hGridCount = 6
  const vGridCount = 6

  return (
    <div className="h-full">
      <div className="relative h-full">
        {/* Card */}
        <div
          className={`relative rounded-card border ${c.borderColor} overflow-hidden h-full flex flex-col`}
          style={{ backgroundColor: c.cardBg }}
        >
          {/* Top highlight */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.07] via-transparent to-transparent pointer-events-none" />

          <div className="relative p-6 pb-4 flex flex-col h-full">
            <p
              className={`text-caption font-semibold ${c.headerColor} mb-1 tracking-widest uppercase`}
            >
              {c.header}
            </p>
            <p className="text-caption text-white/60 mb-3">
              {c.subtitle}
            </p>

            <div className="flex-1 min-h-50">
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
                  x={CHART_LEFT - 6}
                  y={(CHART_TOP + CHART_BOTTOM) / 2}
                  fill={c.labelColor}
                  fillOpacity={0.75}
                  fontSize={9}
                  fontWeight={600}
                  textAnchor="middle"
                  transform={`rotate(-90, ${CHART_LEFT - 6}, ${(CHART_TOP + CHART_BOTTOM) / 2})`}
                >
                  ROI
                </text>

                {/* Fill area under curve */}
                <path d={c.fillPath} fill={`url(#${c.gradientId})`} />

                {/* Glow behind main line */}
                <path
                  d={c.linePath}
                  fill="none"
                  stroke={c.glowColor}
                  strokeWidth={10}
                  strokeLinecap="round"
                  filter={`url(#glow-${variant})`}
                  style={{ opacity: 0.35 }}
                />

                {/* Main line */}
                <path
                  d={c.linePath}
                  fill="none"
                  stroke={c.lineColor}
                  strokeWidth={3}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Data points */}
                {c.dataPoints.map((p, i) => (
                  <g key={`dot${i}`}>
                    {/* Outer glow ring */}
                    <circle cx={p.cx} cy={p.cy} r={9} fill={`url(#dotGlow-${variant})`} />
                    {/* Core dot */}
                    <circle cx={p.cx} cy={p.cy} r={3.5} fill={c.lineColor} />
                    {/* Bright center */}
                    <circle cx={p.cx} cy={p.cy} r={1.5} fill="white" fillOpacity={0.7} />
                  </g>
                ))}
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
