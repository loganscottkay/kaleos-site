import { Reveal } from '@/components/Reveal'

/* Honest and fast. Who this is for, and who it is not for. */
export function WhoFor() {
  return (
    <section className="border-t border-line-dark" aria-labelledby="who-heading">
      <div className="mx-auto grid max-w-[88rem] gap-12 px-5 py-24 md:grid-cols-12 md:px-8 md:py-36">
        <div className="md:col-span-5">
          <Reveal>
            <p className="eyebrow text-mist">Who this is for</p>
            <h2 id="who-heading" className="mt-5 max-w-[14ch] text-h2 font-light">
              Operators with real complexity and no AI team.
            </h2>
          </Reveal>
        </div>
        <div className="md:col-span-6 md:col-start-7">
          <Reveal delay={100}>
            <dl className="divide-y divide-line-dark border-y border-line-dark">
              <div className="grid gap-2 py-6 md:grid-cols-3">
                <dt className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-mist">A fit</dt>
                <dd className="text-body text-star md:col-span-2">
                  Founders and executives running companies between $2M and $100M in revenue, with workflows that eat senior time, and no one in-house to build.
                </dd>
              </div>
              <div className="grid gap-2 py-6 md:grid-cols-3">
                <dt className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-mist">Also a fit</dt>
                <dd className="text-body text-star md:col-span-2">
                  Professional services, agencies, coaching businesses, and firms where a client relationship depends on what goes out the door.
                </dd>
              </div>
              <div className="grid gap-2 py-6 md:grid-cols-3">
                <dt className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-mist">Not a fit</dt>
                <dd className="text-body text-mist md:col-span-2">
                  If you want a chatbot on your website, we are the wrong firm. If you want an AI that acts without anyone checking, we will not build it.
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
