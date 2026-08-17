import type { CSSProperties } from 'react'

/* The signature object: a live approval queue.

   Three items clear in sequence as the panel settles; the fourth holds
   at pending, waiting on a person. That last row is the entire pitch in
   one detail, so it is the only thing left moving once the sequence ends.

   Pure CSS with server-rendered markup: no timers, no hydration gap, and
   the fully-settled state is what a crawler or a reduced-motion visitor
   sees. */

type Row = {
  title: string
  meta: string
  /** The one row still waiting on a human. */
  awaiting?: boolean
}

const rows: Row[] = [
  { title: 'Client proposal', meta: 'Northwind Partners' },
  { title: 'Weekly status update', meta: 'Vela Group' },
  { title: 'Outreach sequence', meta: '24 qualified leads' },
  { title: 'Contract summary', meta: 'Kestrel Industries', awaiting: true },
]

function CheckIcon() {
  return (
    <svg
      className="w-3 h-3"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={3}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  )
}

export function ApprovalQueue() {
  return (
    <div className="queue-panel overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 px-5 py-3.5 border-b border-white/10">
        <span className="font-system text-caption uppercase tracking-widest text-white/55">
          Approval queue
        </span>
        <span className="inline-flex items-center gap-2">
          <span
            className="status-dot inline-block w-1.5 h-1.5 rounded-full bg-teal-bright"
            aria-hidden="true"
          />
          <span className="font-system text-caption uppercase tracking-widest text-teal-bright">
            Live
          </span>
        </span>
      </div>

      {/* Rows */}
      <ul>
        {rows.map((row, i) => (
          <li
            key={row.title}
            className="queue-row relative flex items-center justify-between gap-4 px-5 py-4 border-b border-white/[0.06]"
            style={{ '--row': i } as CSSProperties}
          >
            {/* Hairline that sweeps the row as it clears */}
            {!row.awaiting && (
              <span
                className="queue-row-flash absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-teal-bright to-transparent"
                style={{ '--row': i } as CSSProperties}
                aria-hidden="true"
              />
            )}

            <span className="min-w-0">
              <span className="block text-white/90 text-body truncate">
                {row.title}
              </span>
              <span className="block font-system text-caption text-white/40 truncate">
                {row.meta}
              </span>
            </span>

            {row.awaiting ? (
              <span className="awaiting shrink-0 inline-flex items-center gap-1.5 rounded-control border px-2.5 py-1 font-system text-caption uppercase tracking-widest text-pending-bright">
                Pending
              </span>
            ) : (
              <span
                className="chip-swap shrink-0"
                style={{ '--row': i } as CSSProperties}
              >
                <span className="chip-state chip-pending inline-flex items-center rounded-control border border-white/15 px-2.5 py-1 font-system text-caption uppercase tracking-widest text-white/45">
                  Queued
                </span>
                <span className="chip-state chip-approved inline-flex items-center gap-1.5 rounded-control border border-teal-bright/50 bg-accent/10 px-2.5 py-1 font-system text-caption uppercase tracking-widest text-teal-bright">
                  <CheckIcon />
                  Approved
                </span>
              </span>
            )}
          </li>
        ))}
      </ul>

      {/* Footer */}
      <div className="flex items-center justify-between gap-4 px-5 py-3.5 font-system text-caption text-white/40">
        {/* Both labels together overflow the panel below ~420px, so the
            descriptive half drops and the count (the useful half) stays. */}
        <span className="hidden sm:block">Nothing sends without a human</span>
        <span className="numeral whitespace-nowrap">
          <span className="text-pending-bright">1</span> awaiting you
        </span>
      </div>
    </div>
  )
}
