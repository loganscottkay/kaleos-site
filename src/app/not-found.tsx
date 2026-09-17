import Link from 'next/link'
import { NavBar, CALENDLY } from '@/components/NavBar'
import { Footer } from '@/components/Footer'
import { KMark } from '@/components/KMark'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-void text-star">
      <NavBar theme="dark" />
      <section className="flex min-h-[80vh] items-center px-5 pt-24 md:px-8">
        <div className="mx-auto w-full max-w-[88rem]">
          <KMark className="h-14 w-auto text-star/30" />
          <p className="eyebrow mt-10 text-mist">404</p>
          <h1 className="mt-4 max-w-3xl text-h1 font-light tracking-tightest">
            This page is not in the log.
          </h1>
          <p className="mt-6 max-w-lg text-body-lg text-mist">
            The address may have changed, or it never existed. Everything that does exist is one click away.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/" className="btn btn-star">Back to the start</Link>
            <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="btn btn-ghost-dark">
              Book a Discovery Call
            </a>
          </div>
        </div>
      </section>
      <Footer theme="dark" />
    </main>
  )
}
