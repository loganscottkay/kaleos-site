import { KLogo } from '@/components/KLogo'
import { CALENDLY, CTA } from '@/components/NavBar'
import { Starfield } from '@/components/home/Starfield'
import { Reveal } from '@/components/Reveal'
import { Words } from '@/components/Words'

/* The close. The field again, the mark low and faint like a moon, one blue
   button. The only place royal blue fills a surface. */
export function FinalCall() {
  return (
    <section id="call" className="horizon relative isolate overflow-hidden" aria-labelledby="close-heading">
      <Starfield density={0.00009} />
      <div aria-hidden="true" className="nova -top-[20%] right-[-10%] h-[70vw] w-[70vw] max-h-[52rem] max-w-[52rem] md:right-[2%]" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-[12%] right-[-4%] w-[42vw] max-w-[34rem] opacity-[0.09] md:right-[4%]">
        <KLogo className="w-full" />
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
        </Reveal>
      </div>
    </section>
  )
}
