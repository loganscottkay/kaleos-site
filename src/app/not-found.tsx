import Link from 'next/link'
import { NavBar, CALENDLY, CTA } from '@/components/NavBar'
import { Footer } from '@/components/Footer'
import { Starfield } from '@/components/home/Starfield'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-void text-star">
      <NavBar />
      <section className="relative flex min-h-[80vh] items-center overflow-hidden px-5 pt-24 md:px-8">
        <Starfield />
        <div className="relative mx-auto w-full max-w-[88rem]">
          <p className="eyebrow text-ash">404</p>
          <h1 className="mt-6 max-w-3xl text-h1">
            This page is <span className="cosmic-outline">not in the log.</span>
          </h1>
          <p className="mt-6 max-w-lg text-body-lg text-mist">
            The address may have changed, or it never existed. Everything that does exist is one click away.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/" className="btn btn-star">Back to the start</Link>
            <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">{CTA}</a>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
