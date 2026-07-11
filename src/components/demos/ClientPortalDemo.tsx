'use client'

import { useState } from 'react'
import { DemoShell, DemoButton, GateStatus } from './GateAction'

const DRAFT_TEXT =
  'Framing inspection passed this morning. Electrical rough-in starts Wednesday, and we are still tracking to the June 28 drywall date. Photos from today are in your documents folder.'

export function ClientPortalDemo() {
  const [approved, setApproved] = useState(false)
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(DRAFT_TEXT)
  const [publishedAt, setPublishedAt] = useState('')

  const approve = () => {
    setEditing(false)
    setApproved(true)
    setPublishedAt(
      new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
    )
  }

  return (
    <DemoShell title="Client Portal · Operator view">
      {/* Project snapshot: seeded, never zero */}
      <div className="px-4 pt-3.5 pb-3 border-b border-white/5">
        <div className="flex items-baseline justify-between mb-2">
          <span className="text-white/85 text-xs font-medium">Riverside kitchen renovation</span>
          <span className="font-system text-[10px] text-white/40">Phase 3 of 5</span>
        </div>
        <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden mb-2.5">
          <div
            className="h-full rounded-full bg-accent transition-all duration-700"
            style={{ width: approved ? '72%' : '68%' }}
          />
        </div>
        <div className="flex gap-4 font-system text-[10px] text-white/45">
          <span>{approved ? '72%' : '68%'} complete</span>
          <span>24 documents</span>
          <span>3 messages</span>
        </div>
      </div>

      {/* Agent draft at the gate */}
      <div className="px-4 py-3.5 flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <span className="font-system text-[10px] tracking-wide uppercase text-white/40">
            Status update drafted by agent
          </span>
          <GateStatus
            approved={approved}
            approvedLabel="Published to client"
          />
        </div>

        {editing ? (
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            rows={4}
            className="w-full text-[11px] leading-relaxed rounded-md bg-white/[0.05] border border-accent/40 text-white/80 p-2.5 mb-3 resize-none focus:outline-none"
          />
        ) : (
          <p
            className={`text-[11px] leading-relaxed rounded-md border p-2.5 mb-3 transition-colors duration-300 ${
              approved
                ? 'bg-accent/[0.07] border-accent/25 text-white/75'
                : 'bg-white/[0.03] border-white/[0.07] text-white/60'
            }`}
          >
            {draft}
          </p>
        )}

        {!approved ? (
          <div className="flex gap-2 mt-auto">
            <DemoButton onClick={approve}>
              {editing ? 'Approve edit & publish' : 'Approve & publish'}
            </DemoButton>
            {!editing && (
              <DemoButton variant="ghost" onClick={() => setEditing(true)}>
                Edit first
              </DemoButton>
            )}
          </div>
        ) : (
          <div className="mt-auto rounded-md bg-white/[0.03] border border-white/[0.07] p-2.5">
            <p className="font-system text-[10px] text-white/40 mb-1">What the client sees</p>
            <p className="text-[11px] text-white/70 leading-relaxed mb-1.5">{draft}</p>
            <p className="font-system text-[9px] text-white/30">
              Posted {publishedAt} · Approved by operator · Audit log updated
            </p>
          </div>
        )}
      </div>
    </DemoShell>
  )
}
