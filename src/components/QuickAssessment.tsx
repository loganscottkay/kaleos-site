'use client'

import { useState, useRef, useEffect, useCallback } from 'react'

/* ── Question data ── */

const questions = [
  {
    question: "What takes up most of your team's time?",
    options: [
      { label: 'Reporting & analysis' },
      { label: 'Client communication' },
      { label: 'Admin & coordination' },
      { label: 'Repetitive processes' },
    ],
    multi: true,
  },
  {
    question: 'How would you describe your current AI situation?',
    options: [
      { label: "Haven't started" },
      { label: 'Tried tools, nothing stuck' },
      { label: 'Using some, want more' },
      { label: 'Advanced, want to optimize' },
    ],
    multi: false,
  },
  {
    question: 'What would change your business the most right now?',
    options: [
      { label: 'More capacity without more hires' },
      { label: 'Faster client response time' },
      { label: 'Better data and decision-making' },
      { label: 'Reducing operational errors' },
    ],
    multi: false,
  },
]

/* ── Result logic ── */

function getResult(answers: string[][]) {
  const q1Labels = answers[0]
  const q2 = answers[1][0]
  const q3 = answers[2][0]

  // Mirror Q1 answer for body text
  const q1Text = q1Labels.map((l) => l.toLowerCase()).join(' and ')

  let headline = ''
  let body = ''
  let key = ''

  const q3Lower = q3.toLowerCase()

  if (q2 === "Haven't started" || q2 === 'Tried tools, nothing stuck') {
    headline = "You're sitting on untapped capacity."
    body = `There are clear opportunities to reclaim time your team is burning on ${q1Text}. You told us ${q3Lower} would change your business the most. That's exactly what a strategic assessment is designed to unlock. Companies in your position typically find 2-3 high-leverage automation opportunities in the first conversation.`
    key = 'untapped_capacity'
  } else if (q2 === 'Using some, want more') {
    headline = "You've got the foundation. Now it's about precision."
    body = `You're already ahead of most companies. With your team spending time on ${q1Text}, the next step isn't more tools. It's connecting what you have to specific outcomes. You told us ${q3Lower} would change your business the most. A strategic assessment identifies exactly where to double down to make that happen.`
    key = 'foundation_precision'
  } else if (q2 === 'Advanced, want to optimize') {
    headline = "Time to compound what's working."
    body = `At your stage, the biggest gains come from expansion and optimization, not new experiments. Your team is still spending time on ${q1Text}, and you told us ${q3Lower} would change your business the most. A Kaleos HQ engagement maps your next highest-leverage system based on what's already delivering.`
    key = 'compound'
  } else {
    headline = "Let's figure it out together."
    body = `Every business is different. With your team focused on ${q1Text} and ${q3Lower} as your top priority, a 30-minute conversation will tell us both whether there's a fit.`
    key = 'default'
  }

  return { headline, body, key, q1Text, q3 }
}

/* ── Main component ── */

export function QuickAssessment() {
  const [step, setStep] = useState(0) // 0,1,2 = questions, 3 = result
  const [answers, setAnswers] = useState<string[][]>([[], [], []])
  const [multiSelected, setMultiSelected] = useState<Set<string>>(new Set())
  const [transitioning, setTransitioning] = useState(false)
  const [slideDir, setSlideDir] = useState<'enter' | 'exit'>('enter')
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

  const advanceStep = useCallback(() => {
    setSlideDir('exit')
    setTransitioning(true)

    setTimeout(() => {
      setStep((s) => s + 1)
      setMultiSelected(new Set())
      setSlideDir('enter')

      setTimeout(() => {
        setTransitioning(false)
      }, 50)
    }, 300)
  }, [])

  // Single-select handler
  const handleSingleSelect = (option: string) => {
    if (transitioning) return
    const newAnswers = [...answers]
    newAnswers[step] = [option]
    setAnswers(newAnswers)

    setTimeout(() => advanceStep(), 400)
  }

  // Multi-select toggle
  const handleMultiToggle = (option: string) => {
    if (transitioning) return
    setMultiSelected((prev) => {
      const next = new Set(prev)
      if (next.has(option)) next.delete(option)
      else next.add(option)
      return next
    })
  }

  // Multi-select confirm
  const handleMultiConfirm = () => {
    if (multiSelected.size === 0 || transitioning) return
    const newAnswers = [...answers]
    newAnswers[step] = Array.from(multiSelected)
    setAnswers(newAnswers)
    advanceStep()
  }

  const progress = step < 3 ? ((step + 1) / 3) * 100 : 100
  const result = step === 3 ? getResult(answers) : null
  const currentQ = step < 3 ? questions[step] : null

  return (
    <section ref={sectionRef} className="relative py-28 bg-navy">
      <div className="relative max-w-6xl mx-auto px-4">
        {/* Header */}
        <div
          className="text-center mb-14"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(10px)',
            transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
          }}
        >
          <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-white mb-4">
            Where does AI create leverage in your business?
          </h2>
          <p className="text-white/50 text-lg tracking-wide">
            3 questions. 60 seconds. A clear answer.
          </p>
        </div>

        {/* Quiz card */}
        <div
          className="max-w-[800px] mx-auto"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(15px)',
            transition: 'opacity 0.6s ease-out 200ms, transform 0.6s ease-out 200ms',
          }}
        >
          <div className="relative">
            <div className="relative bg-white/[0.045] border border-white/[0.1] rounded-xl p-10 sm:p-14 overflow-hidden min-h-[340px]">

              {/* Progress bar */}
              <div className="relative z-10 mb-10">
                <div className="h-1 w-full rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700 ease-out"
                    style={{
                      width: `${progress}%`,
                      background: 'linear-gradient(90deg, #0d9488, #2dd4bf)',
                    }}
                  />
                </div>
                <div className="flex justify-between mt-2">
                  {[1, 2, 3].map((n) => (
                    <span
                      key={n}
                      className="text-xs font-medium transition-colors duration-300"
                      style={{
                        color:
                          step + 1 >= n
                            ? 'rgba(45,212,191,0.8)'
                            : 'rgba(255,255,255,0.25)',
                      }}
                    >
                      Q{n}
                    </span>
                  ))}
                </div>
              </div>

              <div className="relative z-10">
                {/* Questions */}
                {step < 3 && currentQ && (
                  <div
                    key={step}
                    style={{
                      opacity: slideDir === 'enter' && !transitioning ? 1 : 0,
                      transform:
                        slideDir === 'enter' && !transitioning
                          ? 'translateX(0)'
                          : slideDir === 'exit'
                            ? 'translateX(-60px)'
                            : 'translateX(60px)',
                      transition: 'opacity 0.3s ease, transform 0.3s ease',
                    }}
                  >
                    <p className="text-white text-xl sm:text-2xl font-semibold mb-10 leading-relaxed text-center">
                      {currentQ.question}
                    </p>

                    <div className="flex flex-wrap gap-3 justify-center">
                      {currentQ.options.map((opt) => {
                        const isSelected = currentQ.multi
                          ? multiSelected.has(opt.label)
                          : answers[step]?.[0] === opt.label

                        return (
                          <button
                            key={opt.label}
                            onClick={() =>
                              currentQ.multi
                                ? handleMultiToggle(opt.label)
                                : handleSingleSelect(opt.label)
                            }
                            disabled={transitioning}
                            className="relative px-6 py-3.5 rounded-full border text-sm sm:text-base font-medium transition-all duration-200 cursor-pointer min-w-[280px] text-center"
                            style={{
                              background: isSelected
                                ? 'rgba(13,148,136,0.25)'
                                : 'rgba(255,255,255,0.08)',
                              borderColor: isSelected
                                ? 'rgb(45,212,191)'
                                : 'rgba(255,255,255,0.18)',
                              color: isSelected ? 'rgb(45,212,191)' : 'white',
                              boxShadow: isSelected
                                ? '0 0 16px rgba(13,148,136,0.35)'
                                : 'none',
                              transform: isSelected
                                ? 'scale(1.04)'
                                : 'scale(1)',
                            }}
                          >
                            {opt.label}
                            {isSelected && currentQ.multi && (
                              <span className="ml-2 text-xs">✓</span>
                            )}
                          </button>
                        )
                      })}
                    </div>

                    {/* Multi-select continue button */}
                    {currentQ.multi && (
                      <div className="mt-8 flex justify-center">
                        <button
                          onClick={handleMultiConfirm}
                          disabled={multiSelected.size === 0 || transitioning}
                          className="px-8 py-3 rounded-xl text-sm font-medium transition-all duration-300"
                          style={{
                            background:
                              multiSelected.size > 0
                                ? 'linear-gradient(135deg, #0d9488, #0f766e)'
                                : 'rgba(255,255,255,0.06)',
                            color:
                              multiSelected.size > 0
                                ? 'white'
                                : 'rgba(255,255,255,0.3)',
                            cursor:
                              multiSelected.size > 0
                                ? 'pointer'
                                : 'not-allowed',
                            boxShadow:
                              multiSelected.size > 0
                                ? '0 0 20px rgba(13,148,136,0.3)'
                                : 'none',
                          }}
                        >
                          Continue →
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Result */}
                {step === 3 && result && (
                  <div
                    className="text-center"
                    style={{
                      animation: 'quizResultIn 0.5s ease-out both',
                    }}
                  >
                    <p className="text-teal-400 text-xs font-semibold tracking-widest uppercase mb-6">
                      Personalized for you
                    </p>

                    <p className="text-white/50 text-sm mb-3">Based on your answers:</p>
                    <div className="flex flex-wrap gap-2 justify-center mb-8">
                      {[...answers[0], ...answers[1], ...answers[2]].map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1.5 rounded-full text-xs font-medium"
                          style={{
                            background: 'rgba(13,148,136,0.15)',
                            border: '1px solid rgba(45,212,191,0.3)',
                            color: 'rgb(45,212,191)',
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <h3 className="text-2xl font-medium text-white mb-5">
                      {result.headline}
                    </h3>
                    <p className="text-white/70 leading-relaxed mb-10 max-w-lg mx-auto text-base sm:text-lg">
                      {result.body}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <a
                        href={`https://calendly.com/logan-kaleoshq/30min?utm_source=kaleoshq&utm_medium=quiz&utm_content=${result.key}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl font-medium transition-all duration-300 shadow-lg hover:scale-[1.03] active:scale-[0.97]"
                        style={{
                          background: 'linear-gradient(135deg, #0d9488, #0f766e)',
                          color: 'white',
                          boxShadow: '0 4px 20px rgba(13,148,136,0.35)',
                        }}
                      >
                        Book a Discovery Call
                      </a>
                      <a
                        href="#methodology"
                        className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl border border-white/20 text-white/80 font-medium transition-all duration-300 hover:bg-white/[0.08] hover:border-white/30 hover:scale-[1.03] active:scale-[0.97]"
                      >
                        See Our Framework
                      </a>
                    </div>

                    <p className="text-white/35 text-sm mt-8">
                      No obligation. Just clarity.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}
