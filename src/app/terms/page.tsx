import type { Metadata } from 'next'
import { NavBar } from '@/components/NavBar'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Terms',
  description: 'The terms for using the KALEOS website: what it is for, what we ask of you, and what we do not promise.',
  alternates: { canonical: 'https://www.kaleoshq.com/terms' },
}

/* Covers the website only. Client engagements run on their own written
   agreement. Written plainly from what the site does; counsel review is
   tracked in docs/redesign/FOR-LOGAN.md. */
const UPDATED = 'September 17, 2026'

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-void text-star">
      <NavBar />
      <article className="mx-auto max-w-[88rem] px-5 pb-24 pt-36 md:px-8 md:pb-32 md:pt-48">
        <header className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-8">
            <h1 className="max-w-[14ch] text-h1">Terms for using this site</h1>
            <p className="mt-6 max-w-2xl text-body-lg text-mist">
              These terms cover the KALEOS website. Work we do for clients runs on a separate written agreement. Last updated {UPDATED}.
            </p>
          </div>
        </header>

        <div className="prose mt-16 max-w-3xl md:mt-24">
          <h2>What this site is for</h2>
          <p>
            The site describes what KALEOS does and gives you ways to reach us: a form, a chat assistant, and a scheduling link. Using it does not create a client relationship. That happens only when both sides sign an engagement agreement.
          </p>

          <h2>The chat assistant</h2>
          <p>
            The chat assistant is software. It answers in Logan&apos;s voice from information about KALEOS, and it can be wrong. Treat its answers as a starting point for a conversation, not as advice you should act on. Anything that matters gets confirmed by a person on a call or by email.
          </p>

          <h2>What we ask of you</h2>
          <p>
            Give us accurate contact details, do not use the form or the chat to send anything unlawful or abusive, and do not try to interfere with how the site runs. We limit how often the chat and the form can be used from one place so they stay available for everyone.
          </p>

          <h2>Content and marks</h2>
          <p>
            The text, design, and the KALEOS mark on this site belong to KALEOS. Third-party names and logos shown on the site belong to their owners and appear only to say what we build with and where the method comes from. Quotes from clients appear with their permission.
          </p>

          <h2>What we do not promise</h2>
          <p>
            The site is offered as it is. We keep it accurate and available as best we can, but we do not guarantee it will always be either. Statistics on the site link to their sources, and the sources, not KALEOS, stand behind those numbers. To the extent the law allows, KALEOS is not liable for losses that come from relying on the site.
          </p>

          <h2>Your information</h2>
          <p>
            How we handle what you send us is described on the <a href="/privacy">privacy page</a>.
          </p>

          <h2>Changes and contact</h2>
          <p>
            If these terms change, the date at the top changes with them. Questions go to <a href="mailto:logan@kaleoshq.com">logan@kaleoshq.com</a>.
          </p>
        </div>
      </article>
      <Footer />
    </main>
  )
}
