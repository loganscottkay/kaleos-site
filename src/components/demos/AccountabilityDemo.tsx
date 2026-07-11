'use client'

import { useState } from 'react'
import { DemoShell, DemoButton, GateStatus } from './GateAction'

const team = [
  { name: 'M. Torres', streak: 15, goals: 5, done: 5 },
  { name: 'J. Whitfield', streak: 12, goals: 5, done: 4 },
  { name: 'A. Osei', streak: 8, goals: 4, done: 3 },
]

const SUMMARY =
  'Strong week: the team hit 87% of weekly targets. Torres closed out all five goals and holds the longest streak at 15 days. Osei slipped on one check-in Thursday; a nudge is queued for Monday.'

export function AccountabilityDemo() {
  const [approved, setApproved] = useState(false)
  const [sentAt, setSentAt] = useState('')

  const approve = () => {
    setApproved(true)
    setSentAt(
      new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
    )
  }

  return (
    <DemoShell title="Accountability Platform · Team view">
      {/* Seeded team metrics */}
      <div className="px-4 pt-3.5 pb-3 border-b border-white/5 space-y-2">
        {team.map((m) => (
          <div key={m.name} className="flex items-center gap-3">
            <span className="text-white/80 text-[11px] font-medium w-20 shrink-0">{m.name}</span>
            <div className="flex-1 h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
              <div
                className="h-full rounded-full bg-accent/80"
                style={{ width: `${(m.done / m.goals) * 100}%` }}
              />
            </div>
            <span className="font-system text-[10px] text-white/45 w-12 text-right shrink-0">
              {m.done}/{m.goals} goals
            </span>
            <span className="font-system text-[10px] text-amber-500/80 w-14 text-right shrink-0">
              {m.streak}-day
            </span>
          </div>
        ))}
        <div className="flex justify-between pt-1 font-system text-[10px] text-white/40">
          <span>Weekly targets: 87%</span>
          <span>Check-ins logged: 34</span>
        </div>
      </div>

      {/* Agent weekly summary at the gate */}
      <div className="px-4 py-3.5 flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <span className="font-system text-[10px] tracking-wide uppercase text-white/40">
            Weekly summary drafted by agent
          </span>
          <GateStatus approved={approved} approvedLabel="Sent to team" />
        </div>

        <p
          className={`text-[11px] leading-relaxed rounded-md border p-2.5 mb-3 transition-colors duration-300 ${
            approved
              ? 'bg-accent/[0.07] border-accent/25 text-white/75'
              : 'bg-white/[0.03] border-white/[0.07] text-white/60'
          }`}
        >
          {SUMMARY}
        </p>

        {!approved ? (
          <div className="mt-auto">
            <DemoButton onClick={approve}>Approve & send to team</DemoButton>
          </div>
        ) : (
          <p className="mt-auto font-system text-[9px] text-white/30">
            Sent {sentAt} · 3 recipients · Approved by manager · Audit log updated
          </p>
        )}
      </div>
    </DemoShell>
  )
}
