import { KLogo } from '@/components/KLogo'
import { CALENDLY, CTA } from '@/components/NavBar'
import { Starfield } from '@/components/home/Starfield'
import { Reveal } from '@/components/Reveal'

/* The close. The field again, the mark low and faint like a moon, one blue
   button. The only place royal blue fills a surface. */
export function FinalCall() {
  return (
    <section id="call" className="relative isolate overflow-hidden border-t border-line" aria-labelledby="close-heading">
      <Starfield density={0.00009} />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-[12%] right-[-4%] w-[42vw] max-w-[34rem] opacity-[0.09] md:right-[4%]">
        <KLogo className="w-full" />
      </div>
      <div className="relative mx-auto max-w-[88rem] px-5 py-32 md:px-8 md:py-48">
        <Reveal>
          <h2 id="close-heading" className="max-w-[9ch] text-display">
            Ready when <span className="cosmic-outline">you are.</span>
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <p className="measure mt-8 text-body-lg text-mist">
            Thirty minutes. We look at where your team&apos;s time goes and tell you plainly whether a system is worth building. No deck, no pitch.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="btn btn-royal btn-lg">{CTA}</a>
            <a href="mailto:logan@kaleoshq.com" className="btn btn-ghost btn-lg">Email us</a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
