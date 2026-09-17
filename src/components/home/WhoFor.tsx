import { Reveal } from '@/components/Reveal'

export function WhoFor() {
  return (
    <section id="who" className="border-t border-line" aria-labelledby="who-heading">
      <div className="mx-auto grid max-w-[88rem] gap-12 px-5 py-24 md:grid-cols-12 md:px-8 md:py-36">
        <div className="md:col-span-5">
          <Reveal>
            <p className="eyebrow text-ash">Who this is for</p>
            <h2 id="who-heading" className="mt-5 max-w-[12ch] text-h2">
              A premium service for <span className="cosmic-outline">operators.</span>
            </h2>
          </Reveal>
        </div>
        <div className="md:col-span-6 md:col-start-7">
          <Reveal delay={100}>
            <div className="space-y-8 text-body-lg text-mist">
              <p>
                <span className="text-star">Founders and executives</span> running companies between $2M and $100M, with workflows that eat senior time and nobody in-house to build. Professional services, agencies, coaching businesses, firms where the client relationship depends on what goes out the door.
              </p>
              <p>
                If you want a chatbot on your website, we are the wrong firm. If you want an AI that acts with nobody checking, we will not build it. <span className="text-star">If you want a system you can stand behind, talk with us.</span>
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
