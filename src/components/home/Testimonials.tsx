import fs from 'fs'
import path from 'path'
import Image from 'next/image'
import { Reveal } from '@/components/Reveal'
import { Words } from '@/components/Words'
import { Rim } from '@/components/home/Rim'

/* Each client's shipped system, shown rather than described. The media
   sits in the mark's light-edge frame with a soft glow behind it; the
   attribution comes from docs/proof-kit/testimonials.json. */
const MEDIA: Record<string, { video?: string; image: string; label: string }> = {
  'advisor-solutions-os': { video: '/testimonials/advisor-solutions-os.mp4', image: '/testimonials/advisor-solutions-os.jpg', label: 'Coaching operating system' },
  'bohan-contracting': { video: '/testimonials/bohan-contracting.mp4', image: '/testimonials/bohan-contracting.jpg', label: 'Client journey portal' },
  cogniify: { image: '/testimonials/cogniify.jpg', label: 'Outreach and reply system' },
}

interface Testimonial {
  id: string
  client_name: string
  title: string
  company: string
  project_url: string
  quote: string
  quote_status: string
  published: boolean
}

function load(): Testimonial[] {
  const file = path.join(process.cwd(), 'docs', 'proof-kit', 'testimonials.json')
  if (!fs.existsSync(file)) return []
  const all = JSON.parse(fs.readFileSync(file, 'utf-8')) as Testimonial[]
  return all.filter((t) => t.published && MEDIA[t.id])
}

export function Testimonials() {
  const items = load()
  if (items.length === 0) return null

  return (
    <section id="clients" className="relative overflow-hidden" aria-labelledby="testimonials-heading">
      <Rim />
      <div className="relative mx-auto max-w-[88rem] px-5 py-28 md:px-8 md:py-40">
        <Reveal>
          <Words as="h2" id="testimonials-heading" className="block max-w-[14ch] text-h2">
            What we built for our clients
          </Words>
        </Reveal>

        <div className="mt-16 space-y-14 md:mt-24 md:space-y-20">
          {items.map((t, i) => {
            const m = MEDIA[t.id]
            return (
              <Reveal key={t.id} delay={60} variant={i % 2 === 0 ? 'left' : 'right'}>
                <figure className={`grid gap-6 md:grid-cols-12 md:items-end ${i % 2 === 1 ? 'md:[&>div]:col-start-4' : ''}`}>
                  <div className="relative md:col-span-8">
                    <div aria-hidden="true" className="pointer-events-none absolute -inset-4 rounded-[24px] bg-[radial-gradient(60%_60%_at_50%_50%,rgb(99_217_230/0.18),rgb(255_95_162/0.1)_50%,transparent_75%)] blur-2xl md:-inset-8" />
                    <div className="surface-nova relative aspect-video overflow-hidden rounded-[14px] bg-void-2 shadow-[0_24px_60px_-24px_rgb(0_0_0/0.8)] [&::before]:z-10">
                      {m.video ? (
                        <video
                          src={m.video}
                          poster={m.image}
                          autoPlay
                          muted
                          loop
                          playsInline
                          preload="metadata"
                          aria-label={`${t.company}: ${m.label}`}
                          className="absolute inset-0 h-full w-full rounded-[14px] object-cover"
                        />
                      ) : (
                        <Image
                          src={m.image}
                          alt={`${t.company}: ${m.label}`}
                          fill
                          sizes="(min-width: 768px) 60vw, 100vw"
                          className="rounded-[14px] object-cover"
                        />
                      )}
                    </div>
                  </div>
                  <figcaption className={`md:col-span-3 ${i % 2 === 1 ? 'md:col-start-1 md:row-start-1 md:self-end' : 'md:col-start-10'}`}>
                    <div className="eyebrow text-ash">{m.label}</div>
                    <div className="mt-3 text-body text-star">{t.company}</div>
                    {t.project_url && (
                      <div className="mt-1 text-caption text-mist">
                        <a href={t.project_url} target="_blank" rel="noopener noreferrer" className="break-all underline decoration-line underline-offset-4 hover:text-star">
                          {t.project_url.replace(/^https?:\/\//, '')}
                        </a>
                      </div>
                    )}
                  </figcaption>
                </figure>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
