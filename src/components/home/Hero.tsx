import { KMark } from '@/components/KMark'
import { CALENDLY } from '@/components/NavBar'
import { Starfield } from '@/components/home/Starfield'

/* The headline is the building. One statement at display size on the void,
   the K assembling above it, one button. Everything here paints without
   JavaScript; the starfield and the assembly are additive. */
export function Hero() {
  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden">
      <Starfield />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-void"
      />

      <div className="relative mx-auto flex min-h-[100svh] max-w-[88rem] flex-col justify-end px-5 pb-16 pt-32 md:px-8 md:pb-24">
        <KMark
          assemble
          className="mb-10 h-[18vh] min-h-[7rem] w-auto self-start text-star md:mb-14 md:h-[24vh]"
          title="Kaleos HQ"
        />

        <h1 className="rise max-w-[12ch] text-display font-light tracking-tightest" style={{ '--rise-delay': '300ms' } as React.CSSProperties}>
          Agents run the work.
          <br />
          You make the calls.
        </h1>

        <div className="mt-10 grid gap-8 md:mt-14 md:grid-cols-12 md:items-end">
          <p
            className="rise measure text-body-lg text-mist md:col-span-6"
            style={{ '--rise-delay': '520ms' } as React.CSSProperties}
          >
            Kaleos HQ designs and ships AI systems for operators. Agents draft, score, and prepare. A person you trust approves every consequential step. Every action is logged.
          </p>
          <div
            className="rise flex flex-wrap items-center gap-4 md:col-span-6 md:justify-end"
            style={{ '--rise-delay': '680ms' } as React.CSSProperties}
          >
            <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="btn btn-star btn-lg">
              Book a Discovery Call
            </a>
            <a href="#work" className="btn btn-ghost-dark btn-lg">
              See the work
            </a>
          </div>
        </div>

        <p
          className="rise mt-14 font-mono text-[0.75rem] tracking-wide text-mist md:mt-20"
          style={{ '--rise-delay': '820ms' } as React.CSSProperties}
        >
          Logan Kay, founder. Prev. AI at Harvard Business School. Incoming, Anthropic.
        </p>
      </div>
    </section>
  )
}
