'use client'

import { useState, type FormEvent } from 'react'

const challengeOptions = [
  'Revenue Operations',
  'Process Automation',
  'AI Strategy',
  'Client Operations',
  'Not Sure Yet',
]

const sizeOptions = ['Just me', '2-10', '11-50', '50+']

export function AuditForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    challenges: [] as string[],
    company_size: '',
    desired_outcome: '',
    honeypot: '',
  })
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const update = (field: string, value: string) =>
    setFormData((prev) => ({ ...prev, [field]: value }))

  const toggleChallenge = (challenge: string) => {
    setFormData((prev) => ({
      ...prev,
      challenges: prev.challenges.includes(challenge)
        ? prev.challenges.filter((c) => c !== challenge)
        : [...prev.challenges, challenge],
    }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (formData.honeypot) return

    if (
      !formData.name ||
      !formData.email ||
      !formData.company ||
      formData.challenges.length === 0
    ) {
      setErrorMessage('Please fill in all required fields.')
      setStatus('error')
      return
    }

    setStatus('loading')
    setErrorMessage('')

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          companySize: formData.company_size,
          lookingToSolve: formData.challenges,
          desiredOutcome: formData.desired_outcome,
          sourcePage: window.location.pathname,
          honeypot: formData.honeypot,
        }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => null)
        setStatus('error')
        setErrorMessage(
          data?.error ||
            'The form could not submit. Email logan@kaleoshq.com directly and you will get a reply today.'
        )
        return
      }

      setStatus('success')
    } catch {
      setStatus('error')
      setErrorMessage(
        'The form could not submit. Check your connection and try once more, or email logan@kaleoshq.com.'
      )
    }
  }

  if (status === 'success') {
    return (
      <div className="text-center py-12">
        <div className="mx-auto mb-6 w-14 h-14 rounded-full bg-accent/20 flex items-center justify-center">
          <svg
            className="w-7 h-7 text-accent"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <div className="text-h3 font-semibold text-white mb-3">
          Thank you! You&apos;ll hear back within 24 hours.
        </div>
        <p className="text-white/40 mb-8">No spam, no sales pitch.</p>
        <div className="inline-block text-left space-y-2 text-body text-white/40">
          <p className="font-medium text-white/60">Next steps:</p>
          <p>1. We review your submission</p>
          <p>2. We schedule a discovery call</p>
          <p>3. Assessment delivered within 2 weeks</p>
        </div>
      </div>
    )
  }

  const inputClass = 'input-dark px-4 py-3'
  const labelClass =
    'block font-system text-white/50 text-caption tracking-wide uppercase mb-2'

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Honeypot */}
      <div
        className="absolute opacity-0 pointer-events-none"
        aria-hidden="true"
      >
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={formData.honeypot}
          onChange={(e) => update('honeypot', e.target.value)}
        />
      </div>

      <div>
        <label className={labelClass}>Name *</label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => update('name', e.target.value)}
          className={inputClass}
          placeholder="Your name"
        />
      </div>

      <div>
        <label className={labelClass}>Email *</label>
        <input
          type="email"
          required
          value={formData.email}
          onChange={(e) => update('email', e.target.value)}
          className={inputClass}
          placeholder="you@company.com"
        />
      </div>

      <div>
        <label className={labelClass}>Company *</label>
        <input
          type="text"
          required
          value={formData.company}
          onChange={(e) => update('company', e.target.value)}
          className={inputClass}
          placeholder="Company name"
        />
      </div>

      <div>
        <label className={labelClass}>
          Company Size
        </label>
        <div className="flex flex-wrap gap-2">
          {sizeOptions.map((size) => {
            const selected = formData.company_size === size
            return (
              <button
                key={size}
                type="button"
                onClick={() =>
                  update('company_size', selected ? '' : size)
                }
                className={`btn px-4 text-body border ${
                  selected
                    ? 'bg-accent/20 text-teal-bright border-accent/50'
                    : 'bg-white/[0.04] text-white/40 border-white/[0.08] hover:border-white/[0.18] hover:text-white/60'
                }`}
              >
                {size}
              </button>
            )
          })}
        </div>
      </div>

      <div>
        <label className={labelClass}>
          What are you looking to solve? *
        </label>
        <div className="flex flex-wrap gap-2">
          {challengeOptions.map((challenge) => {
            const selected = formData.challenges.includes(challenge)
            return (
              <button
                key={challenge}
                type="button"
                onClick={() => toggleChallenge(challenge)}
                className={`btn px-4 text-body border ${
                  selected
                    ? 'bg-accent/20 text-teal-bright border-accent/50'
                    : 'bg-white/[0.04] text-white/40 border-white/[0.08] hover:border-white/[0.18] hover:text-white/60'
                }`}
              >
                {challenge}
              </button>
            )
          })}
        </div>
      </div>

      <div>
        <label className={labelClass}>
          Desired Outcome
        </label>
        <textarea
          value={formData.desired_outcome}
          onChange={(e) => update('desired_outcome', e.target.value)}
          rows={4}
          className={`${inputClass} resize-none`}
          placeholder="What would winning look like for you?"
        />
      </div>

      {status === 'error' && (
        <div className="flex items-center gap-2 px-4 py-3 rounded-control bg-red-500/10 border border-red-500/20 text-red-400 text-caption">
          <svg
            className="w-4 h-4 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          {errorMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="btn btn-primary w-full py-4"
      >
        <span>
          {status === 'loading' ? (
            <span className="flex items-center gap-2">
              <svg
                className="w-4 h-4 animate-spin"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Submitting...
            </span>
          ) : (
            "Let's Talk"
          )}
        </span>
      </button>

      <p className="text-white/25 text-caption text-center">
        You&apos;ll hear back within 24 hours. No spam, no sales pitch.
      </p>
    </form>
  )
}
