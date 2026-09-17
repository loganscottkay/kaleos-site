import { CALENDLY, CTA } from '@/components/NavBar'
import { Starfield } from '@/components/home/Starfield'
import { Reveal } from '@/components/Reveal'
import { Words } from '@/components/Words'

/* The close. The field again, and the mark filled with the colors of a
   nebula, low and to the right. One blue button: the only place royal blue
   fills a surface. */
export function FinalCall() {
  return (
    <section id="call" className="horizon relative isolate overflow-hidden" aria-labelledby="close-heading">
      <Starfield density={0.00009} />
      <div aria-hidden="true" className="k-nebula bottom-[3%] right-[-8%] h-[64vw] w-[58vw] max-h-[42rem] max-w-[38rem] md:right-[4%] md:h-[60vw] md:w-[54vw]" />
      <div className="relative mx-auto max-w-[88rem] px-5 pb-[64vw] pt-32 md:px-8 md:py-48">
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
