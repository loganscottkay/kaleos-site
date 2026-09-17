import fs from 'fs'
import path from 'path'
import { Reveal } from '@/components/Reveal'
import { Words } from '@/components/Words'
import { Rim } from '@/components/home/Rim'

/* Client words, cut to what matters. The full drafts live in
   docs/proof-kit/testimonials.json and are the source of truth for who said
   what. The short versions below are paraphrases of those drafts; once a
   client confirms, replace the paraphrase with their approved words. Drafts
   carry no visible marker; before the PR into main, set SHOW_DRAFTS to false
   so only confirmed quotes render. */
const SHOW_DRAFTS = false


type Piece = { t: string; u?: boolean }
const SHORT: Record<string, Piece[]> = {
  'advisor-solutions-os': [{ t: 'My advisors run the method every day, and I see every team on one scoreboard.' }],
  'bohan-contracting': [
    { t: 'Every homeowner’s project in one place: where it is, what’s next, who did what. ' },
    { t: 'It exceeded our expectations.', u: true },
  ],
  cogniify: [{ t: 'It finds the right people, writes like me, and I approve every message before it goes out.' }],
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
  return all.filter((t) => t.published && (SHOW_DRAFTS || t.quote_status === 'confirmed'))
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
            What our clients say
          </Words>
        </Reveal>

        <div className="mt-16 space-y-14 md:mt-24 md:space-y-20">
          {items.map((t, i) => {
            const confirmed = t.quote_status === 'confirmed'
            const pieces: Piece[] = confirmed ? [{ t: t.quote }] : SHORT[t.id] ?? [{ t: t.quote }]
            const who = t.client_name ? `${t.client_name}, ${t.title}` : t.company
            return (
              <Reveal key={t.id} delay={60} variant={i % 2 === 0 ? 'left' : 'right'}>
                <figure className={`grid gap-6 md:grid-cols-12 md:items-end ${i % 2 === 1 ? 'md:[&>blockquote]:col-start-4' : ''}`}>
                  <blockquote className="font-display text-[1.6rem] font-bold leading-[1.18] tracking-tight text-star md:col-span-8 md:text-[2.4rem]">
                    <span aria-hidden="true" className="text-comet">“</span>
                    {pieces.map((p, k) => (
                      <span key={k} className={p.u ? 'underline decoration-comet decoration-2 underline-offset-[0.18em]' : undefined}>
                        {p.t}
                      </span>
                    ))}
                    <span aria-hidden="true" className="text-comet">”</span>
                  </blockquote>
                  <figcaption className={`md:col-span-3 ${i % 2 === 1 ? 'md:col-start-1 md:row-start-1 md:self-end' : 'md:col-start-10'}`}>
                    <div className="text-body text-star">{who}</div>
                    <div className="mt-1 text-caption text-mist">
                      {t.client_name ? t.company : null}
                      {t.project_url && (
                        <>
                          {t.client_name ? ' · ' : null}
                          <a href={t.project_url} target="_blank" rel="noopener noreferrer" className="break-all underline decoration-line underline-offset-4 hover:text-star">
                            {t.project_url.replace(/^https?:\/\//, '')}
                          </a>
                        </>
                      )}
                    </div>
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
