'use client'

import { useState } from 'react'

const tabs = ['Approvals', 'Audit Log', 'Skill Output'] as const
type Tab = (typeof tabs)[number]

const approvals = [
  {
    type: 'Proposal Draft',
    badge: 'bg-accent/20 text-accent',
    time: '2 min ago',
    client: 'Acme Corp',
  },
  {
    type: 'Follow-up Email',
    badge: 'bg-emerald-500/20 text-emerald-400',
    time: '15 min ago',
    client: 'Meridian Group',
  },
  {
    type: 'Invoice Dispute',
    badge: 'bg-amber-500/20 text-amber-400',
    time: '1 hour ago',
    client: 'Atlas Partners',
  },
]

const auditLog = [
  {
    status: 'Success',
    statusClass: 'bg-emerald-500/10 text-emerald-400',
    dot: 'bg-emerald-500',
    desc: 'Revenue reconciliation completed: $12,400 recovered',
    time: '09:41 AM',
  },
  {
    status: 'Success',
    statusClass: 'bg-emerald-500/10 text-emerald-400',
    dot: 'bg-emerald-500',
    desc: 'Proposal generated for Acme Corp',
    time: '09:38 AM',
  },
  {
    status: 'Pending',
    statusClass: 'bg-amber-500/10 text-amber-400',
    dot: 'bg-amber-500',
    desc: 'Follow-up sequence queued for Meridian Group',
    time: '09:35 AM',
  },
  {
    status: 'Failed',
    statusClass: 'bg-red-500/10 text-red-400',
    dot: 'bg-red-500',
    desc: 'Invoice dispute rejected. Manual review required.',
    time: '09:22 AM',
  },
  {
    status: 'Success',
    statusClass: 'bg-emerald-500/10 text-emerald-400',
    dot: 'bg-emerald-500',
    desc: 'Discovery intake processed for new lead',
    time: '09:15 AM',
  },
]

const skillOutput = [
  {
    label: 'Context',
    content:
      'Acme Corp operates a 200-room hotel portfolio with $2.4M annual OTA revenue. Current dispute recovery rate: 12%.',
  },
  {
    label: 'Objective',
    content:
      'Deploy automated reconciliation system to recover underpaid commissions and disputed charges.',
  },
  {
    label: 'Scope',
    content:
      'Phase 1: OTA reconciliation across 3 platforms. Phase 2: Automated dispute filing. Phase 3: Monthly reporting.',
  },
  {
    label: 'ROI',
    content:
      'Estimated recovery: $18,000/month. System cost: $3,500/month. Net gain: $14,500/month (414% ROI).',
  },
  {
    label: 'Next Steps',
    content:
      'Schedule 30-minute scoping call. Provide read-only access to PMS and OTA dashboards. Deployment timeline: 2 weeks.',
  },
]

export function DemoFrame() {
  const [activeTab, setActiveTab] = useState<Tab>('Approvals')
  const [actionedItems, setActionedItems] = useState<Record<number, 'approved' | 'rejected'>>({})

  return (
    <div className="rounded-2xl overflow-hidden bg-white/6 backdrop-blur-xl border border-white/10 ring-1 ring-white/5 shadow-2xl shadow-teal-500/10 animate-[float_6s_ease-in-out_infinite]">
      {/* Terminal header */}
      <div className="flex items-center gap-2 px-4 py-3 bg-white/4 border-b border-white/8">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/60" />
          <div className="w-3 h-3 rounded-full bg-amber-500/60" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
        </div>
        <span className="text-white/30 text-xs font-mono ml-2 tracking-wider">
          KALEOS OPERATOR
        </span>
      </div>

      {/* Tab bar */}
      <div className="flex border-b border-white/8">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 text-sm transition-colors relative ${
              activeTab === tab
                ? 'text-white'
                : 'text-white/40 hover:text-white/60'
            }`}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 right-0 h-px bg-accent" />
            )}
          </button>
        ))}
      </div>

      {/* Description + Content */}
      <div className="p-6 space-y-4">
        <p className="text-white/40 text-xs leading-relaxed">
          Every action your AI takes is logged, reviewed, and approved by you
          before it executes.
        </p>

        {activeTab === 'Approvals' && (
          <div className="space-y-4">
            {approvals.map((item, i) => (
              <div
                key={i}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-white/4 border border-white/6"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${item.badge}`}
                  >
                    {item.type}
                  </span>
                  <span className="text-white/60 text-sm">{item.client}</span>
                  <span className="text-white/30 text-xs">{item.time}</span>
                </div>
                <div className="flex gap-2">
                  {actionedItems[i] ? (
                    <span className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 ${
                      actionedItems[i] === 'approved'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-red-500/20 text-red-400 border border-red-500/30'
                    }`}>
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={
                          actionedItems[i] === 'approved' ? 'M5 13l4 4L19 7' : 'M6 18L18 6M6 6l12 12'
                        } />
                      </svg>
                      {actionedItems[i] === 'approved' ? 'Approved' : 'Rejected'}
                    </span>
                  ) : (
                    <>
                      <button
                        onClick={() => setActionedItems(prev => ({ ...prev, [i]: 'approved' }))}
                        className="px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 text-xs font-medium border border-emerald-500/20 hover:bg-emerald-500/20 transition-colors btn-shimmer"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => setActionedItems(prev => ({ ...prev, [i]: 'rejected' }))}
                        className="px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 text-xs font-medium border border-red-500/20 hover:bg-red-500/20 transition-colors btn-shimmer"
                      >
                        Reject
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'Audit Log' && (
          <div className="space-y-3">
            {auditLog.map((item, i) => (
              <div
                key={i}
                className="flex flex-wrap items-center gap-3 p-3 rounded-lg"
              >
                <span
                  className={`w-2 h-2 rounded-full ${item.dot} shrink-0`}
                />
                <span
                  className={`px-2 py-0.5 rounded text-xs font-medium ${item.statusClass}`}
                >
                  {item.status}
                </span>
                <span className="text-white/70 text-sm flex-1 min-w-0">
                  {item.desc}
                </span>
                <span className="text-white/30 text-xs font-mono">
                  {item.time}
                </span>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'Skill Output' && (
          <div className="space-y-4">
            <div className="text-white/30 text-xs font-mono tracking-wider">
              GENERATED OUTPUT / Proposal Draft
            </div>
            {skillOutput.map((section, i) => (
              <div
                key={i}
                className="p-4 rounded-lg bg-white/3 border border-white/5"
              >
                <div className="text-accent text-xs mb-1.5 uppercase tracking-wider font-medium">
                  {section.label}
                </div>
                <div className="text-white/70 text-sm leading-relaxed">
                  {section.content}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
