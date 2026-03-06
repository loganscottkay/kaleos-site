'use client'

import { useState } from 'react'

export function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return

    setSubmitted(true)

    // Save to Supabase via API route
    fetch('/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    }).catch(() => {})

    // Open Beehiiv subscribe page
    window.open('https://kaleos.beehiiv.com/subscribe', '_blank')
  }

  return (
    <section className="relative py-16 bg-[#0F1A2E] border-t border-white/[0.08]">
      <div className="relative z-10 max-w-2xl mx-auto px-4 text-center">
        <h3 className="font-[family-name:var(--font-playfair)] text-xl font-semibold text-white mb-2">
          The Kaleos Newsletter
        </h3>
        <p className="text-white/70 text-base mb-6">
          Weekly insights on AI that actually matters for your business.
        </p>

        {submitted ? (
          <p className="text-white/60 text-sm">Redirecting to subscribe...</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
            <input
              type="email"
              required
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 rounded-xl bg-white/10 text-white placeholder-white/40 border border-white/10 focus:border-teal-500 focus:outline-none transition-colors duration-200 text-sm"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-[#0d9488] text-white font-medium text-sm transition-all duration-300 hover:shadow-[0_0_20px_rgba(13,148,136,0.4)] hover:bg-[#0d9488]/90 shrink-0"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
