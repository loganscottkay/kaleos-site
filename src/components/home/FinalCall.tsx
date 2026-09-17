import Image from 'next/image'
import { CALENDLY, CTA } from '@/components/NavBar'
import { Starfield } from '@/components/home/Starfield'
import { Reveal } from '@/components/Reveal'
import { Words } from '@/components/Words'

/* The close. The field again, and behind it the Crab Nebula (Hubble,
   NASA/ESA) graded into the site's light. One blue button: the only place
   royal blue fills a surface. */
export function FinalCall() {
  return (
    <section id="call" className="horizon relative isolate overflow-hidden" aria-labelledby="close-heading">
      <Starfield density={0.00009} />
      <div aria-hidden="true" className="nova-photo pointer-events-none absolute inset-y-0 right-0 w-full md:w-[62%]">
        <Image src="/nova.webp" alt="" fill sizes="(min-width: 768px) 62vw, 100vw" className="object-cover object-center opacity-75 max-md:opacity-55" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--color-void)_0%,rgb(5_5_7/0.72)_32%,rgb(5_5_7/0.15)_60%,transparent_100%)] max-md:bg-[linear-gradient(180deg,var(--color-void)_0%,rgb(5_5_7/0.45)_28%,rgb(5_5_7/0.88)_58%,var(--color-void)_100%)]" />
      </div>
      <div className="relative mx-auto max-w-[88rem] px-5 py-32 md:px-8 md:py-48">
        <Reveal>
          <Words as="h2" id="close-heading" className="block max-w-[9ch] text-display">
            Ready when you are
          </Words>
        </Reveal>
        <Reveal delay={100}>
          <p className="measure mt-8 text-body-lg text-mist">
            In thirty minutes we look at where your team&apos;s time goes and tell you plainly whether a system is worth building. You will not sit through a deck.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="btn btn-royal btn-lg">{CTA}</a>
            <a href="mailto:logan@kaleoshq.com" className="btn btn-ghost btn-lg">Email us</a>
            <a href="/audit#contact" className="self-center text-body text-mist underline decoration-line underline-offset-4 hover:text-star">or send a note first</a>
          </div>
          <p className="mt-14 text-[0.72rem] text-ash/70">Crab Nebula photograph: NASA and ESA, Hubble Space Telescope.</p>
        </Reveal>

      </div>
    </section>
  )
}
