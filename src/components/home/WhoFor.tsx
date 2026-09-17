import { Reveal } from '@/components/Reveal'
import { Words } from '@/components/Words'

export function WhoFor() {
  return (
    <section id="who" className="border-t border-line" aria-labelledby="who-heading">
      <div className="mx-auto grid max-w-[88rem] gap-12 px-5 py-24 md:grid-cols-12 md:px-8 md:py-36">
        <div className="md:col-span-5">
          <Reveal>
            <p className="eyebrow text-ash">Who this is for</p>
            <Words as="h2" id="who-heading" className="mt-5 block max-w-[12ch] text-h2">
              Who we work with
            </Words>
          </Reveal>
        </div>
        <div className="md:col-span-6 md:col-start-7">
          <Reveal delay={100}>
            <div className="space-y-8 text-body-lg text-mist">
              <p>
                KALEOS is a premium service for <span className="text-star">founders and executives</span> running companies between $2M and $100M, with workflows that eat senior time and nobody in house to build. Most of our clients are professional services firms, agencies, and coaching businesses, where the client relationship depends on what goes out the door.
              </p>
              <p>
                We are the wrong firm for a chatbot on a website, and we will not build an AI that acts with nobody checking. <span className="text-star">If you want a system you can stand behind, we should talk.</span>
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
