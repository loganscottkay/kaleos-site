'use client'

import { useState, type FormEvent } from 'react'
import { supabase } from '@/lib/supabase'

export function AuditForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    pain_type: '',
    desired_outcome: '',
    honeypot: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const update = (field: string, value: string) =>
    setFormData((prev) => ({ ...prev, [field]: value }))

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (formData.honeypot) return

    if (!formData.name || !formData.email || !formData.company || !formData.pain_type) {
      setErrorMessage('Please fill in all required fields.')
      setStatus('error')
      return
    }

    setStatus('loading')
    setErrorMessage('')

    try {
      const { error } = await supabase.from('leads').insert({
        name: formData.name,
        email: formData.email,
        company: formData.company,
        pain_type: formData.pain_type,
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
        <div className="text-2xl font-semibold text-navy mb-4">Thank you.</div>
        <p className="text-slate-500 mb-8">
          We&apos;ll get back to you within 24 hours.
        </p>
        <div className="space-y-2 text-sm text-slate-400">
          <p className="font-medium text-slate-500">Next steps:</p>
          <p>1. We review your submission</p>
          <p>2. We schedule a discovery call</p>
          <p>3. Audit delivered within 2 weeks</p>
        </div>
      </div>
    )
  }

  const inputClass =
    'w-full px-4 py-3 rounded-xl bg-white/80 border border-gray-200/60 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-400 transition-all duration-200'

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Honeypot */}
      <div className="absolute opacity-0 pointer-events-none" aria-hidden="true">
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
        <label className="block text-slate-600 text-sm mb-2">Name *</label>
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
        <label className="block text-slate-600 text-sm mb-2">Email *</label>
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
        <label className="block text-slate-600 text-sm mb-2">Company *</label>
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
        <label className="block text-slate-600 text-sm mb-2">Pain Type *</label>
        <select
          required
          value={formData.pain_type}
          onChange={(e) => update('pain_type', e.target.value)}
          className={`${inputClass} appearance-none`}
        >
          <option value="">Select a pain type</option>
          <option value="Revenue Leak">Revenue Leak</option>
          <option value="Ops Automation">Ops Automation</option>
          <option value="Agent Build">Agent Build</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div>
        <label className="block text-slate-600 text-sm mb-2">
          Desired Outcome
        </label>
        <textarea
          value={formData.desired_outcome}
          onChange={(e) => update('desired_outcome', e.target.value)}
          rows={4}
          className={`${inputClass} resize-none`}
          placeholder="What would success look like for you?"
        />
      </div>

      {status === 'error' && (
        <p className="text-red-500 text-sm">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full py-3.5 rounded-xl bg-[#1B2A4A] hover:bg-[#243656] text-white font-medium transition-all duration-300 hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {status === 'loading' ? (
          <>
            <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
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
          </>
        ) : (
          'Submit Request'
        )}
      </button>

      <div className="text-center space-y-1">
        <p className="text-slate-400 text-xs">
          We&apos;ll get back to you within 24 hours.
        </p>
        <p className="text-slate-400 text-xs">
          Your info stays private. We don&apos;t sell or share your data.
        </p>
      </div>
    </form>
  )
}
