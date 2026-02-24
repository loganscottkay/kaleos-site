'use client'

import { useState } from 'react'

const faqs = [
  {
    q: "What if AI can't handle my workflows?",
    a: "That's literally what the audit figures out. We'll tell you what can be automated and what can't. You only move forward on what makes sense.",
  },
  {
    q: 'Is my data safe?',
    a: "Yes. Nothing runs without your approval. Every output gets reviewed by you before it goes anywhere. Your data stays private and is never shared or sold.",
  },
  {
    q: 'Is this actually worth it?',
    a: "The audit pays for itself. We show you the exact ROI before you spend another dollar. Most clients find 10-20 hours per week of automatable work.",
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => (
        <div
          key={i}
          className="rounded-xl bg-white/[0.45] backdrop-blur-md border border-white/[0.2] shadow-md shadow-black/5 overflow-hidden"
        >
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full px-6 py-4 flex items-center justify-between text-left"
          >
            <span className="text-navy font-medium">{faq.q}</span>
            <svg
              className={`w-5 h-5 text-slate-400 transition-transform duration-300 shrink-0 ml-4 ${
                openIndex === i ? 'rotate-180' : ''
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              openIndex === i
                ? 'max-h-40 opacity-100'
                : 'max-h-0 opacity-0'
            }`}
          >
            <p className="px-6 pb-4 text-slate-600 leading-relaxed">
              {faq.a}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
