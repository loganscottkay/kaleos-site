'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabase'

/* ── Question data ── */

const questions = [
  {
    question: "What takes up most of your team's time?",
    options: [
      { icon: '📊', label: 'Reporting & analysis' },
      { icon: '📧', label: 'Client communication' },
      { icon: '📋', label: 'Admin & coordination' },
      { icon: '🔄', label: 'Repetitive processes' },
    ],
    multi: true,
  },
  {
    question: 'How would you describe your current AI situation?',
    options: [
      { icon: '', label: "Haven't started" },
      { icon: '', label: 'Tried tools, nothing stuck' },
      { icon: '', label: 'Using some, want more' },
      { icon: '', label: 'Advanced, want to optimize' },
    ],
    multi: false,
  },
  {
    question: 'What would change your business the most right now?',
    options: [
      { icon: '', label: 'More capacity without more hires' },
      { icon: '', label: 'Faster client response time' },
      { icon: '', label: 'Better data and decision-making' },
      { icon: '', label: 'Reducing operational errors' },
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

  if (q2 === "Haven't started" || q2 === 'Tried tools, nothing stuck') {
    headline = "You're sitting on untapped capacity."
    body = `Based on what you've told us, there are clear opportunities to reclaim time your team is burning on ${q1Text}. Companies in your position typically find 2-3 high-leverage automation opportunities in the first assessment.`
    key = 'untapped_capacity'
  } else if (q2 === 'Using some, want more') {
    headline = "You've got the foundation. Now it's about precision."
    body = "You're already ahead of most companies. The next step isn't more tools. It's connecting what you have to specific operational outcomes. A strategic assessment identifies exactly where to double down."
    key = 'foundation_precision'
  } else if (q2 === 'Advanced, want to optimize') {
    headline = "Time to compound what's working."
    body = "At your stage, the biggest gains come from expansion and optimization, not new experiments. A Kaleos engagement maps your next highest-leverage system based on what's already delivering."
    key = 'compound'
  } else {
    headline = "Let's figure it out together."
    body = "Every business is different. A 30-minute conversation will tell us both whether there's a fit."
    key = 'default'
  }

  return { headline, body, key, q1Text, q3 }
}

/* ── Sparkle canvas ── */

function SparkleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    const particles: { x: number; y: number; vx: number; vy: number; life: number; maxLife: number; size: number }[] = []

    const resize = () => {
      canvas.width = canvas.offsetWidth * 2
      canvas.height = canvas.offsetHeight * 2
      ctx.scale(2, 2)
    }
    resize()

    const spawn = () => {
      if (particles.length > 30) return
      particles.push({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        life: 0,
        maxLife: 80 + Math.random() * 120,
        size: 1 + Math.random() * 1.5,
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)

      if (Math.random() < 0.15) spawn()

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy
        p.life++

        if (p.life >= p.maxLife) {
          particles.splice(i, 1)
          continue
        }

        const progress = p.life / p.maxLife
        const alpha = progress < 0.3 ? progress / 0.3 : progress > 0.7 ? (1 - progress) / 0.3 : 1
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(13,148,136,${alpha * 0.35})`
        ctx.fill()
      }

      animId = requestAnimationFrame(draw)
    }

    draw()

    const resizeObs = new ResizeObserver(resize)
    resizeObs.observe(canvas)

    return () => {
      cancelAnimationFrame(animId)
      resizeObs.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  )
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

    // Log on final question
    if (step === 2) {
      const result = getResult(newAnswers)
      supabase
        .from('quiz_responses')
        .insert({
          q1_time_spent: newAnswers[0].join(', '),
          q2_ai_situation: newAnswers[1].join(', '),
          q3_biggest_change: newAnswers[2].join(', '),
          result_headline: result.headline,
          result_body: result.body,
          result_key: result.key,
        })
        .then(() => {})
    }

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
          className="text-center mb-14"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(10px)',
            transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
          }}
        >
          <h2
            className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
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
          <div className="relative group">
            <div
              className="hidden md:block absolute -inset-[3px] rounded-2xl opacity-30 blur-[8px] transition-opacity duration-[400ms] group-hover:opacity-70 pointer-events-none"
              style={{
                background:
                  'linear-gradient(135deg, rgba(13,148,136,0.4), rgba(13,148,136,0.1))',
              }}
            />
            <div className="relative z-10 bg-white/[0.08] backdrop-blur-xl border border-white/[0.15] shadow-lg shadow-black/10 ring-1 ring-inset ring-white/10 rounded-2xl p-10 sm:p-14 overflow-hidden min-h-[340px]">
              <SparkleCanvas />

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
                    <p className="text-white text-xl sm:text-2xl font-semibold mb-10 leading-relaxed">
                      {currentQ.question}
                    </p>

                    <div className="flex flex-wrap gap-3">
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
                            className="relative px-6 py-3.5 rounded-full border text-sm sm:text-base font-medium transition-all duration-200 cursor-pointer"
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
                            {opt.icon && (
                              <span className="mr-2">{opt.icon}</span>
                            )}
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
                    <h3
                      className="text-2xl sm:text-3xl font-bold text-white mb-5"
                      style={{ fontFamily: 'var(--font-playfair)' }}
                    >
                      {result.headline}
                    </h3>
                    <p className="text-white/70 leading-relaxed mb-10 max-w-lg mx-auto text-base sm:text-lg">
                      {result.body}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <a
                        href="https://calendly.com/logan-kaleoshq/30min"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl font-medium transition-all duration-300 shadow-lg hover:scale-[1.03] active:scale-[0.97]"
                        style={{
                          background: 'linear-gradient(135deg, #0d9488, #0f766e)',
                          color: 'white',
                          boxShadow: '0 4px 20px rgba(13,148,136,0.35)',
                        }}
                      >
                        Book a Call
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

      <style jsx>{`
        @keyframes quizResultIn {
          from {
            opacity: 0;
            transform: scale(0.93);
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
