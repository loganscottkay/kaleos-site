// The one orchestrated motion moment: a pulse travels the track as input,
// pauses at the approval gate, the gate approves, the pulse ships.
// Pure CSS animation, runs once on load, skipped under prefers-reduced-motion.
export function GateFlow() {
  return (
    <div className="w-full max-w-md mx-auto" aria-hidden="true">
      <div className="relative h-8">
        {/* Track */}
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-ink/15" />

        {/* Traveling pulse */}
        <div className="gate-flow-pulse absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_rgba(13,148,136,0.6)]" />

        {/* Gate chip at center */}
        <div className="gate-flow-chip absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-lg border-[1.5px] bg-paper flex items-center justify-center">
          <svg
            className="gate-flow-check w-3.5 h-3.5 text-accent"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>

      <div className="flex justify-between mt-2 font-system text-[10px] tracking-[0.15em] uppercase text-ink/40">
        <span>Input</span>
        <span>Agent</span>
        <span className="text-accent/80">Approval gate</span>
        <span>Shipped</span>
      </div>
    </div>
  )
}
