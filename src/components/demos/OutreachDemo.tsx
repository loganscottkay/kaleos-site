'use client'

import { useEffect, useRef, useState } from 'react'
import { DemoShell, DemoButton, GateStatus } from './GateAction'

const leads = [
  {
    name: 'Sarah Chen',
    role: 'CFO, regional logistics firm',
    score: 94,
    fit: 'Revenue operations, high-value fit',
    draft:
      'Hi Sarah, saw your team is adding a third distribution hub this quarter. When finance ops scale that fast, month-end close is usually the first thing to crack. We build systems that cut close time without adding headcount. Worth a 20-minute look?',
  },
  {
    name: 'David Okafor',
    role: 'Managing partner, consulting firm',
    score: 88,
    fit: 'Client operations, strong fit',
    draft:
      'Hi David, congrats on the new healthcare practice line. Partner time spent on status decks is usually the hidden tax at your size. We deploy client portals that answer the "where are we" question automatically. Open to a short call?',
  },
  {
    name: 'Lena Marsh',
    role: 'Owner, commercial contractor',
    score: 79,
    fit: 'Process automation, qualified',
    draft:
      'Hi Lena, noticed you are bidding public projects now. The paperwork load roughly triples there. We automate submittal tracking with a human sign-off on every document that leaves your office. Fifteen minutes to see if it fits?',
  },
]

type Decision = { lead: string; action: 'Sent' | 'Rejected'; time: string }

export function OutreachDemo() {
  const [index, setIndex] = useState(0)
  const [decided, setDecided] = useState<null | 'approved' | 'rejected'>(null)
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(leads[0].draft)
  const [log, setLog] = useState<Decision[]>([])
  const [displayScore, setDisplayScore] = useState(leads[0].score - 20)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const lead = leads[index]

  // Score settles from a seeded value to final; never starts at zero
  useEffect(() => {
    const target = leads[index].score
    let current = target - 20
    const tick = () => {
      current += 2
      setDisplayScore(Math.min(current, target))
      if (current < target) timerRef.current = setTimeout(tick, 40)
    }
    // Seed the display asynchronously, then settle toward the final score
    timerRef.current = setTimeout(() => {
      setDisplayScore(current)
      timerRef.current = setTimeout(tick, 250)
    }, 0)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [index])

  const advance = (action: 'Sent' | 'Rejected') => {
    const time = new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
    setDecided(action === 'Sent' ? 'approved' : 'rejected')
    setLog((prev) => [{ lead: lead.name, action, time }, ...prev].slice(0, 3))
    setTimeout(() => {
      const next = (index + 1) % leads.length
      setIndex(next)
      setDraft(leads[next].draft)
      setEditing(false)
      setDecided(null)
    }, 1400)
  }

  return (
    <DemoShell title="Outreach Engine · Approval queue">
      {/* Scored lead: seeded values */}
      <div className="px-4 pt-3.5 pb-3 border-b border-white/5">
        <div className="flex items-center justify-between mb-1.5">
          <div>
            <span className="text-white/85 text-xs font-medium">{lead.name}</span>
            <span className="text-white/40 text-[11px] ml-2">{lead.role}</span>
          </div>
          <span className="font-system text-sm font-semibold text-accent tabular-nums">
            {displayScore}
            <span className="text-white/25 text-[10px] font-normal">/100</span>
          </span>
        </div>
        <p className="font-system text-[10px] text-white/45">{lead.fit}</p>
      </div>

      {/* Draft at the gate */}
      <div className="px-4 py-3.5 flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <span className="font-system text-[10px] tracking-wide uppercase text-white/40">
            Personalized draft
          </span>
          <GateStatus
            approved={decided === 'approved'}
            pendingLabel={decided === 'rejected' ? 'Rejected and logged' : 'Awaiting your approval'}
            approvedLabel="Sent and logged"
          />
        </div>

        {editing ? (
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            rows={5}
            className="w-full text-[11px] leading-relaxed rounded-md bg-white/[0.05] border border-accent/40 text-white/80 p-2.5 mb-3 resize-none focus:outline-none"
          />
        ) : (
          <p
            className={`text-[11px] leading-relaxed rounded-md border p-2.5 mb-3 transition-colors duration-300 ${
              decided === 'approved'
                ? 'bg-accent/[0.07] border-accent/25 text-white/75'
                : decided === 'rejected'
                  ? 'bg-white/[0.02] border-white/[0.05] text-white/30 line-through'
                  : 'bg-white/[0.03] border-white/[0.07] text-white/60'
            }`}
          >
            {draft}
          </p>
        )}

        {!decided && (
          <div className="flex flex-wrap gap-2">
            <DemoButton onClick={() => advance('Sent')}>
              {editing ? 'Approve edit & send' : 'Approve & send'}
            </DemoButton>
            {!editing && (
              <DemoButton variant="ghost" onClick={() => setEditing(true)}>
                Edit
              </DemoButton>
            )}
            <DemoButton variant="danger" onClick={() => advance('Rejected')}>
              Reject
            </DemoButton>
          </div>
        )}

        {/* Audit trail */}
        <div className="mt-auto pt-3">
          <p className="font-system text-[9px] text-white/30 mb-1">Audit log</p>
          {log.length === 0 ? (
            <p className="font-system text-[9px] text-white/20">
              12 sends approved this week · 2 rejected · every action logged
            </p>
          ) : (
            <ul className="space-y-0.5">
              {log.map((entry, i) => (
                <li key={i} className="font-system text-[9px] text-white/35">
                  {entry.time} · {entry.lead} · {entry.action} by operator
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </DemoShell>
  )
}
