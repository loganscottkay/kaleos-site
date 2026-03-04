'use client'

import { useState, type FormEvent } from 'react'
import { supabase } from '@/lib/supabase'

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
      const painType = formData.company_size
        ? `${formData.challenges.join(', ')} | Team: ${formData.company_size}`
        : formData.challenges.join(', ')

      const { error } = await supabase.from('leads').insert({
        name: formData.name,
        email: formData.email,
        company: formData.company,
        pain_type: painType,
        desired_outcome: formData.desired_outcome,
      })

      if (error) throw error
      setStatus('success')
    } catch {
      setStatus('error')
      setErrorMessage('Something went wrong. Please try again.')
    }
  }

  if (status === 'success') {
    return (
      <div className="text-center py-12">
        <div className="mx-auto mb-5 w-14 h-14 rounded-full bg-accent/20 flex items-center justify-center">
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
        <div className="text-2xl font-semibold text-white mb-3">
          Thank you! You&apos;ll hear back within 24 hours.
        </div>
        <p className="text-white/40 mb-8">No spam, no sales pitch.</p>
        <div className="inline-block text-left space-y-2 text-sm text-white/40">
          <p className="font-medium text-white/60">Next steps:</p>
          <p>1. We review your submission</p>
          <p>2. We schedule a discovery call</p>
          <p>3. Assessment delivered within 2 weeks</p>
        </div>
      </div>
    )
  }

  const inputClass =
    'w-full px-4 py-3 rounded-xl bg-white/[0.06] border border-white/[0.1] text-white placeholder-white/25 focus:outline-none focus:border-accent/50 focus:shadow-[0_0_15px_rgba(13,148,136,0.12)] transition-all duration-300'

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
        <label className="block text-white/50 text-sm mb-2">Name *</label>
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
        <label className="block text-white/50 text-sm mb-2">Email *</label>
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
        <label className="block text-white/50 text-sm mb-2">Company *</label>
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
        <label className="block text-white/50 text-sm mb-2">
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
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 active:scale-[0.95] cursor-pointer ${
                  selected
                    ? 'bg-accent/20 text-accent border-accent/40 shadow-[0_0_12px_rgba(13,148,136,0.2)]'
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
        <label className="block text-white/50 text-sm mb-2">
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
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 active:scale-[0.95] cursor-pointer ${
                  selected
                    ? 'bg-accent/20 text-accent border-accent/40 shadow-[0_0_12px_rgba(13,148,136,0.2)]'
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
        <label className="block text-white/50 text-sm mb-2">
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
        <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
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
        className="w-full py-3.5 rounded-xl bg-navy text-white font-medium transition-all duration-300 hover:shadow-[0_0_25px_rgba(13,148,136,0.2)] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 relative overflow-hidden group border border-white/[0.08] hover:border-accent/30 cursor-pointer"
      >
        <span className="relative z-10">
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
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
      </button>

      <p className="text-white/25 text-xs text-center">
        You&apos;ll hear back within 24 hours. No spam, no sales pitch.
      </p>
    </form>
  )
}
