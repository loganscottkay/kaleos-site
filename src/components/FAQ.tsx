'use client'

import { useState, useEffect, useRef } from 'react'

const faqs = [
  {
    q: 'How is this different from hiring an AI freelancer?',
    a: "Freelancers build what you ask for. We figure out what you should be asking for. Our methodology starts with your strategy and works backwards to the right system. Most AI projects fail because this step gets skipped.",
  },
  {
    q: "What if AI can't handle my workflows?",
    a: "That's what the assessment is for. We map every workflow before we build anything. If AI isn't the right solution for something, we'll tell you. We'd rather keep your trust than sell you something that doesn't work.",
  },
  {
    q: 'How long before I see results?',
    a: 'Assessment clients get their full analysis within 2 weeks. Implementation clients typically have their first system deployed within 30 days.',
  },
  {
    q: 'Is my data safe?',
    a: "Every system we build runs in your infrastructure with your security protocols. We don't store your data. Full audit trails on every action.",
  },
  {
    q: 'What industries do you work with?',
    a: "Any business with complex operations and a genuine need for AI. We've worked across professional services, finance, and operations-heavy businesses. The methodology adapts. The principles don't change.",
  },
  {
    q: "What if I'm not sure which tier is right?",
    a: "Start with a conversation. We'll tell you honestly whether the Assessment, Implementation, or Strategic Partner tier fits your situation. Or if we're not the right fit at all.",
  },
  {
    q: 'Do I need to be technical?',
    a: "No. We handle everything from architecture to deployment. You just need to know your business. We'll translate that into systems.",
  },
  {
    q: 'What does human-in-the-loop actually mean?',
    a: 'Nothing AI generates in our systems goes out without your explicit approval. Every email, report, decision, and output gets reviewed by a human before it touches your clients or operations.',
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set())
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          faqs.forEach((_, i) => {
            setTimeout(() => {
              setVisibleItems((prev) => new Set([...prev, i]))
            }, i * 100)
          })
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div ref={sectionRef} className="space-y-3">
      {faqs.map((faq, i) => {
        const isOpen = openIndex === i
        const isVisible = visibleItems.has(i)

        return (
          <div
            key={i}
            className={`rounded-2xl backdrop-blur-xl border overflow-hidden transition-all duration-500 ${
              isOpen
                ? 'bg-white/[0.08] border-accent/30 shadow-[0_0_20px_rgba(13,148,136,0.15)]'
                : 'bg-white/[0.05] border-white/[0.1] shadow-lg shadow-black/10 hover:border-white/[0.2]'
            } ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-4'
            }`}
            style={{
              transitionProperty: 'opacity, transform, background-color, border-color, box-shadow',
            }}
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="w-full px-6 py-5 flex items-center justify-between text-left cursor-pointer"
            >
              <span className="text-white font-medium pr-4">{faq.q}</span>
              <svg
                className={`w-5 h-5 text-accent/70 transition-transform duration-300 ease-in-out shrink-0 ${
                  isOpen ? 'rotate-180' : ''
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
                isOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <p className="px-6 pb-5 text-white/60 leading-relaxed">
                {faq.a}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
