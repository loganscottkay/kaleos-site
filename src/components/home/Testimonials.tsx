import fs from 'fs'
import path from 'path'
import Image from 'next/image'
import { Reveal } from '@/components/Reveal'

/* Reads Logan's proof kit directly so there is one source of truth. Every
   entry is a draft until its quote_status is "confirmed". While the site is
   private, drafts render with an amber "pending confirmation" mark so the
   layout can be judged. Before the PR into main, set SHOW_DRAFTS to false
   and only confirmed entries will render. */
const SHOW_DRAFTS = true

interface Testimonial {
  id: string
  client_name: string
  title: string
  company: string
  project_name: string
  project_url: string
  quote: string
  quote_status: string
  logo: string | null
  published: boolean
}

function load(): Testimonial[] {
  const file = path.join(process.cwd(), 'docs', 'proof-kit', 'testimonials.json')
  if (!fs.existsSync(file)) return []
  const all = JSON.parse(fs.readFileSync(file, 'utf-8')) as Testimonial[]
  return all.filter((t) => t.published && (SHOW_DRAFTS || t.quote_status === 'confirmed'))
}

export function Testimonials() {
  const items = load()
  if (items.length === 0) return null

  return (
    <section id="clients" className="border-t border-line-dark" aria-labelledby="testimonials-heading">
      <div className="mx-auto max-w-[88rem] px-5 py-24 md:px-8 md:py-36">
        <Reveal>
          <p className="eyebrow text-mist">What clients say</p>
          <h2 id="testimonials-heading" className="mt-5 max-w-[20ch] text-h2 font-light">
            Three operators. Three systems in production.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-px bg-line-dark md:mt-24 md:grid-cols-3">
          {items.map((t, i) => {
            const confirmed = t.quote_status === 'confirmed'
            const who = t.client_name
              ? `${t.client_name}, ${t.title}`
              : 'Name pending'
            return (
              <Reveal key={t.id} delay={i * 110} className="bg-void">
                <figure className="flex h-full flex-col justify-between p-8 md:p-10 md:pr-14">
                  <blockquote className="text-[1.2rem] font-light leading-[1.5] tracking-tight text-star md:text-[1.35rem]">
                    {t.quote}
                  </blockquote>
                  <figcaption className="mt-10">
                    <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-4">
                      <div>
                        <div className="text-body text-star">{who}</div>
                        <div className="mt-1 text-caption text-mist">
                          {t.company}
                          {t.project_url && (
                            <>
                              {' · '}
                              <a
                                href={t.project_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="break-all underline decoration-line-dark underline-offset-4 hover:text-star"
                              >
                                {t.project_url.replace(/^https?:\/\//, '')}
                              </a>
                            </>
                          )}
                        </div>
                      </div>
                      {t.logo && (
                        <Image
                          src={t.logo}
                          alt={`${t.company} logo`}
                          width={96}
                          height={40}
                          className="h-7 w-auto max-w-[6rem] object-contain opacity-80 grayscale"
                        />
                      )}
                    </div>
                    {!confirmed && (
                      <div className="mt-6 inline-flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-amber">
                        <span className="h-1.5 w-1.5 rounded-full bg-amber" aria-hidden="true" />
                        Pending confirmation
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
