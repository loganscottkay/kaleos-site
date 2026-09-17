'use client'

import { useState, type FormEvent } from 'react'

/* Posts to /api/lead with the same field names the backend expects. Do not
   change the payload shape. Everything visible is fair game. */

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
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
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

    if (!formData.name || !formData.email || !formData.company || formData.challenges.length === 0) {
      setErrorMessage('Name, email, company, and at least one thing to solve are required.')
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
            'The form could not submit. Email logan@kaleoshq.com directly and you will get a reply today.',
        )
        return
      }

      setStatus('success')
    } catch {
      setStatus('error')
      setErrorMessage(
        'The form could not submit. Check your connection and try once more, or email logan@kaleoshq.com.',
      )
    }
  }

  if (status === 'success') {
    return (
      <div className="surface p-8 md:p-10" role="status">
        <p className="eyebrow text-ash">Received</p>
        <h3 className="mt-4 text-h3">Thank you. You will hear back within 24 hours.</h3>
        <ol className="mt-6 space-y-2 text-body text-mist">
          <li>1. We read your submission.</li>
          <li>2. You get a discovery call on the calendar.</li>
          <li>3. The assessment is delivered within two weeks.</li>
        </ol>
      </div>
    )
  }

  const label = 'block eyebrow text-ash'

  return (
    <form onSubmit={handleSubmit} className="space-y-8" noValidate>
      <div className="absolute opacity-0 pointer-events-none" aria-hidden="true">
        <label htmlFor="lead-website">Website</label>
        <input
          id="lead-website"
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={formData.honeypot}
          onChange={(e) => update('honeypot', e.target.value)}
        />
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <label htmlFor="lead-name" className={label}>Name</label>
          <input
            id="lead-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            value={formData.name}
            onChange={(e) => update('name', e.target.value)}
            className="input mt-3"
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="lead-email" className={label}>Email</label>
          <input
            id="lead-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            value={formData.email}
            onChange={(e) => update('email', e.target.value)}
            className="input mt-3"
            placeholder="you@company.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="lead-company" className={label}>Company</label>
        <input
          id="lead-company"
          name="company"
          type="text"
          required
          autoComplete="organization"
          value={formData.company}
          onChange={(e) => update('company', e.target.value)}
          className="input mt-3"
          placeholder="Company name"
        />
      </div>

      <fieldset>
        <legend className={label}>Company size</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {sizeOptions.map((size) => {
            const selected = formData.company_size === size
            return (
              <button
                key={size}
                type="button"
                aria-pressed={selected}
                onClick={() => update('company_size', selected ? '' : size)}
                className="chip"
              >
                {size}
              </button>
            )
          })}
        </div>
      </fieldset>

      <fieldset>
        <legend className={label}>What are you looking to solve? Pick any.</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {challengeOptions.map((challenge) => {
            const selected = formData.challenges.includes(challenge)
            return (
              <button
                key={challenge}
                type="button"
                aria-pressed={selected}
                onClick={() => toggleChallenge(challenge)}
                className="chip"
              >
                {challenge}
              </button>
            )
          })}
        </div>
      </fieldset>

      <div>
        <label htmlFor="lead-outcome" className={label}>What outcome are you hoping for?</label>
        <textarea
          id="lead-outcome"
          name="desired_outcome"
          value={formData.desired_outcome}
          onChange={(e) => update('desired_outcome', e.target.value)}
          rows={4}
          className="input mt-3 resize-none"
          placeholder="One or two plain sentences is plenty."
        />
      </div>

      {status === 'error' && (
        <p role="alert" className="border-l-2 border-comet pl-4 text-body text-star">
          {errorMessage}
        </p>
      )}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button type="submit" disabled={status === 'loading'} className="btn btn-star btn-lg">
          {status === 'loading' ? 'Sending' : 'Send it'}
        </button>
        <p className="text-caption text-mist">You will hear back within 24 hours. No spam, no pitch.</p>
      </div>
    </form>
  )
}
