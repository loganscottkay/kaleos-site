import type { Metadata } from 'next'
import { NavBar } from '@/components/NavBar'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Privacy',
  description: 'What KALEOS collects on this site, why, which services handle it, and how to ask for it to be removed.',
  alternates: { canonical: 'https://www.kaleoshq.com/privacy' },
}

/* Written from what the site actually does: the contact form, the chat
   widget, analytics, and the scheduling link. Items that need Logan's
   confirmation are tracked in docs/redesign/FOR-LOGAN.md, not here. */
const UPDATED = 'September 17, 2026'

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-void text-star">
      <NavBar />
      <article className="mx-auto max-w-[88rem] px-5 pb-24 pt-36 md:px-8 md:pb-32 md:pt-48">
        <header className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-8">
            <h1 className="max-w-[14ch] text-h1">How we handle your information</h1>
            <p className="mt-6 max-w-2xl text-body-lg text-mist">
              This page describes what this website collects, why, which services process it, and how to ask us to remove it. Last updated {UPDATED}.
            </p>
          </div>
        </header>

        <div className="prose mt-16 max-w-3xl md:mt-24">
          <h2>What we collect</h2>
          <p>
            When you send the form on the Assessment page, we receive the name, email address, company, company size, the areas you want to solve, and the outcome you describe. When you use the chat assistant, we receive the messages you type. When you book a call, Calendly collects what it needs to schedule it under Calendly&apos;s own privacy policy.
          </p>
          <p>
            We also collect anonymous usage data through Vercel Web Analytics, which records page views and general device and region information without cookies and without identifying you.
          </p>

          <h2>Why we collect it</h2>
          <p>
            To reply to you, to prepare for a discovery call, and to understand which pages people read. We do not sell your information and we do not use it for advertising.
          </p>

          <h2>Who processes it</h2>
          <ul>
            <li>Vercel hosts the site and provides the analytics.</li>
            <li>Resend delivers form submissions to our inbox by email.</li>
            <li>Airtable stores form submissions so we can track and respond to them.</li>
            <li>OpenAI generates the chat assistant&apos;s replies from the messages you send it.</li>
            <li>Calendly handles scheduling when you book a call.</li>
          </ul>
          <p>
            Each of these companies processes information under its own terms and privacy policy. We share only what each one needs to do its job.
          </p>

          <h2>How long we keep it</h2>
          <p>
            We keep form submissions and chat messages for as long as we need them to respond to you and to run any engagement that follows. If you ask us to delete them, we will.
          </p>

          <h2>Your choices</h2>
          <p>
            You can ask what we hold about you, ask us to correct it, or ask us to delete it by writing to{' '}
            <a href="mailto:logan@kaleoshq.com">logan@kaleoshq.com</a>. We answer within a few business days.
          </p>

          <h2>Security</h2>
          <p>
            Submissions travel over encrypted connections and are stored with the providers listed above, each of which publishes its own security practices. Systems we build for clients run in the client&apos;s own infrastructure, and this website does not receive client operational data.
          </p>

          <h2>Changes</h2>
          <p>
            If this page changes, the date at the top changes with it.
          </p>
        </div>
      </article>
      <Footer />
    </main>
  )
}
