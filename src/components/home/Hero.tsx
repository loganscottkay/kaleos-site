import type { CSSProperties } from 'react'
import { KLogo } from '@/components/KLogo'
import { CALENDLY, CTA } from '@/components/NavBar'
import { Starfield } from '@/components/home/Starfield'

/* The mark first, with the star lit at its center. Then four words. Then
   one button. Everything paints without JavaScript; the settle, the star,
   and the field are additive. */
export function Hero() {
  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden">
      <Starfield />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-void" />

      <div className="relative mx-auto flex min-h-[100svh] max-w-[88rem] flex-col items-center justify-center px-5 pb-28 pt-28 text-center md:px-8">
        <div className="k-settle relative">
          <KLogo priority alt="KALEOS" className="h-[26vh] min-h-[9rem] md:h-[34vh]" />
          {/* The pinch of the K sits at 47.5% across, 42.5% down the trimmed artwork. */}
          <span className="k-star" style={{ left: '30.4%', top: '47.3%' }} aria-hidden="true" />
        </div>

        <h1
          className="rise mt-12 text-display md:mt-16"
          style={{ '--rise-delay': '500ms' } as CSSProperties}
        >
          Your judgment,<br className="hidden md:block" /> <span className="cosmic-outline">at scale.</span>
        </h1>

        <p
          className="rise mt-8 max-w-[38rem] text-body-lg text-mist"
          style={{ '--rise-delay': '700ms' } as CSSProperties}
        >
          KALEOS is a premium AI implementation practice. Agents do the work. A person you trust approves every consequential step. Everything is logged.
        </p>

        <div className="rise mt-10 flex flex-wrap items-center justify-center gap-4" style={{ '--rise-delay': '860ms' } as CSSProperties}>
          <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="btn btn-star btn-lg">{CTA}</a>
          <a href="#method" className="btn btn-ghost btn-lg">How it works</a>
        </div>
      </div>
    </section>
  )
}
