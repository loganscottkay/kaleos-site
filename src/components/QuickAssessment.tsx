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
    <section ref={sectionRef} className="relative py-24 md:py-32 bg-navy">
      <div className="relative max-w-6xl mx-auto px-4">
        {/* Header */}
        <div
          className="grid grid-cols-1 md:grid-cols-12 gap-x-12 gap-y-4 items-end mb-16"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(var(--space-12))',
            transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
          }}
        >
          <h2 className="md:col-span-7 text-h2 font-medium text-white">
            Where does AI create leverage in your business?
          </h2>
          <p className="md:col-span-4 md:col-start-9 font-system text-white/50 text-body tracking-wide">
            3 questions. 60 seconds. A clear answer.
          </p>
        </div>

        {/* Quiz card */}
        <div
          className="max-w-200 mx-auto"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(var(--space-16))',
            transition: 'opacity 0.6s ease-out 200ms, transform 0.6s ease-out 200ms',
          }}
        >
          <div className="relative">
            <div className="card-dark relative p-6 sm:p-12 md:p-16 overflow-hidden min-h-85">

              {/* Progress bar */}
              <div className="relative z-10 mb-12">
                <div className="h-1 w-full rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-teal-bright transition-all duration-200 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="flex justify-between mt-2">
                  {[1, 2, 3].map((n) => (
                    <span
                      key={n}
                      className={`font-system text-caption font-medium transition-colors duration-200 ${
                        step + 1 >= n ? 'text-teal-bright/80' : 'text-white/60'
                      }`}
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
                            ? 'translateX(calc(-1 * var(--space-64)))'
                            : 'translateX(var(--space-64))',
                      transition: 'opacity 0.3s ease, transform 0.3s ease',
                    }}
                  >
                    <p className="text-white text-h4 font-semibold mb-12 text-center">
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
                            className={`btn relative px-6 py-4 border text-body min-w-0 sm:min-w-70 text-center ${
                              isSelected
                                ? 'bg-accent/25 border-teal-bright text-teal-bright'
                                : 'bg-white/8 border-white/18 text-white hover:border-white/35'
                            }`}
                          >
                            {opt.label}
                            {isSelected && currentQ.multi && (
                              <span className="ml-2 text-caption">✓</span>
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
                          className="btn btn-primary px-8 text-body"
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
                      
                    }}
                  >
                    <p className="font-system text-teal-bright text-caption font-semibold tracking-widest uppercase mb-6">
                      Personalized for you
                    </p>

                    <p className="text-white/50 text-body mb-3">Based on your answers:</p>
                    <div className="flex flex-wrap gap-2 justify-center mb-8">
                      {[...answers[0], ...answers[1], ...answers[2]].map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-2 rounded-control text-caption font-medium bg-accent/15 border border-teal-bright/30 text-teal-bright"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <h3 className="text-h3 font-medium text-white mb-6">
                      {result.headline}
                    </h3>
                    <p className="text-white/70 mb-12 max-w-lg mx-auto text-body-lg">
                      {result.body}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <a
                        href={`https://calendly.com/logan-kaleoshq/30min?utm_source=kaleoshq&utm_medium=quiz&utm_content=${result.key}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary px-8 py-4"
                      >
                        Book a Discovery Call
                      </a>
                      <a
                        href="#methodology"
                        className="btn btn-ghost-dark px-8 py-4"
                      >
                        See Our Framework
                      </a>
                    </div>

                    <p className="text-white/70 text-body mt-8">
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
