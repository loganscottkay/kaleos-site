'use client'

import { useState, useRef, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

const questions = [
  {
    question: 'How many hours per week does your team spend on repetitive operational tasks?',
    options: ['Under 10', '10-30', '30-50', '50+'],
  },
  {
    question: 'Do you currently use any AI tools in your business?',
    options: ['No', 'Experimenting', 'Yes, but not strategically', 'Yes, fully integrated'],
  },
  {
    question: "What's your biggest bottleneck right now?",
    options: ['Revenue operations', 'Client communication', 'Internal workflows', 'Not sure yet'],
  },
]

function getResult(answers: string[]) {
  const [q1, q2] = answers

  if ((q1 === '30-50' || q1 === '50+') && (q2 === 'No' || q2 === 'Experimenting')) {
    return {
      title: 'High leverage opportunity.',
      text: "You're spending significant time on work AI can accelerate. A strategic assessment would map exactly where to start and what the ROI looks like.",
      cta: 'Book a Call',
      href: 'https://calendly.com/logan-kaleoshq/30min',
      key: 'high_leverage',
    }
  }

  if (q1 === '10-30') {
    return {
      title: "There's real potential here.",
      text: 'Most businesses at this stage have 2-3 high-value automation opportunities hiding in their workflows. The assessment finds them.',
      cta: 'Start with an Assessment',
      href: '/audit',
      key: 'real_potential',
    }
  }

  if (q2 === 'Yes, fully integrated') {
    return {
      title: "You're ahead of most companies.",
      text: "At this stage, the opportunity is optimization and expansion. A Kaleos engagement identifies the next highest-leverage system to build on what's already working.",
      cta: "Let's Talk",
      href: '/audit',
      key: 'ahead',
    }
  }

  return {
    title: "Let's figure it out together.",
    text: "Every business is different. A 30-minute conversation will tell us both whether there's a fit.",
    cta: 'Book a Call',
    href: 'https://calendly.com/logan-kaleoshq/30min',
    key: 'default',
  }
}

export function QuickAssessment() {
  const [step, setStep] = useState(0) // 0,1,2 = questions, 3 = result
  const [answers, setAnswers] = useState<string[]>([])
  const [selected, setSelected] = useState<string | null>(null)
  const [direction, setDirection] = useState<'in' | 'out'>('in')
  const containerRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const handleSelect = (option: string) => {
    setSelected(option)

    setTimeout(() => {
      const newAnswers = [...answers, option]
      setAnswers(newAnswers)
      setSelected(null)
      setDirection('out')

      setTimeout(() => {
        setStep((s) => s + 1)
        setDirection('in')

        // Log to Supabase on completion
        if (newAnswers.length === 3) {
          const result = getResult(newAnswers)
          supabase
            .from('quiz_responses')
            .insert({
              q1_hours: newAnswers[0],
              q2_ai_usage: newAnswers[1],
              q3_bottleneck: newAnswers[2],
              result_shown: result.key,
            })
            .then(() => {})
        }
      }, 300)
    }, 500)
  }

  const result = step === 3 ? getResult(answers) : null
  const isExternal = result?.href.startsWith('http')

  return (
    <section ref={sectionRef} className="relative py-24 bg-navy">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.06]"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=2070&q=80')",
        }}
      />
      <div className="relative z-10 max-w-6xl mx-auto px-4">
        {/* Header */}
        <div
          className="text-center mb-10"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(10px)',
            transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
          }}
        >
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white mb-3" style={{ fontFamily: 'var(--font-playfair)' }}>
            Find out in 60 seconds
          </h2>
          <p className="text-white/60 max-w-xl mx-auto">
            Answer 3 questions. We&apos;ll tell you where AI creates leverage in your business.
          </p>
        </div>

        {/* Quiz card */}
        <div
          className="max-w-[700px] mx-auto"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(15px)',
            transition: 'opacity 0.6s ease-out 200ms, transform 0.6s ease-out 200ms',
          }}
        >
          <div className="relative group">
            <div className="hidden md:block absolute -inset-[3px] rounded-2xl opacity-30 blur-[8px] transition-opacity duration-[400ms] group-hover:opacity-70 pointer-events-none" style={{ background: 'linear-gradient(135deg, rgba(13,148,136,0.4), rgba(13,148,136,0.1))' }} />
            <div className="relative z-10 bg-white/[0.08] backdrop-blur-xl border border-white/[0.15] shadow-lg shadow-black/10 ring-1 ring-inset ring-white/10 rounded-2xl p-8 sm:p-10 overflow-hidden min-h-[280px]">
              <div ref={containerRef} className="relative">
                {/* Questions */}
                {step < 3 && (
                  <div
                    key={step}
                    style={{
                      opacity: direction === 'in' ? 1 : 0,
                      transform: direction === 'in' ? 'translateX(0)' : 'translateX(-40px)',
                      transition: 'opacity 0.3s ease, transform 0.3s ease',
                    }}
                  >
                    <p className="text-white text-lg font-medium mb-8 leading-relaxed">
                      {questions[step].question}
                    </p>

                    <div className="flex flex-wrap gap-3">
                      {questions[step].options.map((option) => (
                        <button
                          key={option}
                          onClick={() => handleSelect(option)}
                          disabled={selected !== null}
                          className="px-5 py-2.5 rounded-full border text-sm font-medium transition-all duration-200"
                          style={{
                            background:
                              selected === option
                                ? 'rgba(13,148,136,0.3)'
                                : 'rgba(255,255,255,0.1)',
                            borderColor:
                              selected === option
                                ? 'rgb(45,212,191)'
                                : 'rgba(255,255,255,0.2)',
                            color:
                              selected === option
                                ? 'rgb(45,212,191)'
                                : 'white',
                            boxShadow:
                              selected === option
                                ? '0 0 12px rgba(13,148,136,0.3)'
                                : 'none',
                            transform:
                              selected === option
                                ? 'scale(1.05)'
                                : 'scale(1)',
                          }}
                        >
                          {option}
                        </button>
                      ))}
                    </div>

                    {/* Progress dots */}
                    <div className="flex gap-2 justify-center mt-8">
                      {[0, 1, 2].map((dot) => (
                        <div
                          key={dot}
                          className="w-2 h-2 rounded-full transition-all duration-300"
                          style={{
                            background:
                              dot === step
                                ? '#0d9488'
                                : 'transparent',
                            border:
                              dot === step
                                ? '1px solid #0d9488'
                                : '1px solid rgba(255,255,255,0.3)',
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Result */}
                {step === 3 && result && (
                  <div
                    style={{
                      opacity: 1,
                      transform: 'scale(1)',
                      animation: 'resultIn 0.3s ease-out',
                    }}
                    className="text-center"
                  >
                    <h3 className="text-2xl font-semibold text-white mb-4">
                      {result.title}
                    </h3>
                    <p className="text-white/70 leading-relaxed mb-8 max-w-lg mx-auto">
                      {result.text}
                    </p>
                    <a
                      href={result.href}
                      {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="inline-flex items-center px-8 py-3.5 rounded-xl bg-[#1B2A4A] border border-white/[0.15] text-white font-medium transition-all duration-300 shadow-lg shadow-black/10 hover:shadow-[0_0_20px_rgba(13,148,136,0.4)] hover:scale-[1.03] hover:border-accent/30 active:scale-[0.97]"
                    >
                      {result.cta}
                    </a>
                    <p className="text-white/40 text-sm mt-6">
                      No obligation. No sales pitch.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes resultIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </section>
  )
}
