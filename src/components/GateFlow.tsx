// The one orchestrated motion moment: a pulse travels the track, pauses at
// the approval gate, the gate approves, the pulse ships.
// Four stops distributed evenly (12.5% / 37.5% / 62.5% / 87.5%), each label
// centered under its stop. Pure CSS, runs once, skipped under reduced motion.
const stops = [
  { label: 'Input', gate: false },
  { label: 'Agent', gate: false },
  { label: 'Approval gate', gate: true },
  { label: 'Shipped', gate: false },
]

export function GateFlow() {
  return (
    <div className="w-full max-w-md mx-auto" aria-hidden="true">
      <div className="relative h-8">
        {/* Track */}
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-ink/15" />

        {/* Stop markers at even intervals; the gate chip sits on its own stop */}
        {stops.map((stop, i) => {
          const left = `${12.5 + i * 25}%`
          return stop.gate ? (
            <div
              key={stop.label}
              className="gate-flow-chip absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-lg border-[1.5px] bg-paper flex items-center justify-center"
              style={{ left }}
            >
              <svg
                className="gate-flow-check w-3.5 h-3.5 text-accent"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          ) : (
            <div
              key={stop.label}
              className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-ink/25"
              style={{ left }}
            />
          )
        })}

        {/* Traveling pulse */}
        <div className="gate-flow-pulse absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_rgba(13,148,136,0.6)]" />
      </div>

      {/* Labels: one centered column per stop */}
      <div className="grid grid-cols-4 mt-2 font-system text-[10px] tracking-[0.15em] uppercase text-ink/40">
        {stops.map((stop) => (
          <span
            key={stop.label}
            className={`text-center ${stop.gate ? 'text-accent/80' : ''}`}
          >
            {stop.label}
          </span>
        ))}
      </div>
    </div>
  )
}
