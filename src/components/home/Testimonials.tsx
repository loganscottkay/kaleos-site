import fs from 'fs'
import path from 'path'
import { Reveal } from '@/components/Reveal'

/* Client words, cut to what matters. The full drafts live in
   docs/proof-kit/testimonials.json and are the source of truth for who
   said what. The short versions below are paraphrases of those drafts;
   once a client confirms, replace the paraphrase with their approved words.
   Before the PR into main, set SHOW_DRAFTS to false. */
const SHOW_DRAFTS = true

const SHORT: Record<string, string> = {
  'advisor-solutions-os': 'My advisors run the method every day, and I see every team on one scoreboard. Built in about a month.',
  'bohan-contracting': 'Every homeowner’s project in one place: where it is, what’s next, who did what. It exceeded our expectations.',
  cogniify: 'It finds the right people, writes like me, and I approve every message before it goes out. It books meetings.',
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
    <section id="clients" className="border-t border-line" aria-labelledby="testimonials-heading">
      <div className="mx-auto max-w-[88rem] px-5 py-24 md:px-8 md:py-36">
        <Reveal>
          <p className="eyebrow text-ash">In production</p>
          <h2 id="testimonials-heading" className="mt-5 max-w-[16ch] text-h2">
            Operators who <span className="cosmic-outline">already run on it.</span>
          </h2>
        </Reveal>

        <div className="mt-16 divide-y divide-line border-y border-line md:mt-24">
          {items.map((t, i) => {
            const confirmed = t.quote_status === 'confirmed'
            const quote = confirmed ? t.quote : SHORT[t.id] ?? t.quote
            const who = t.client_name ? `${t.client_name}, ${t.title}` : t.company
            return (
              <Reveal key={t.id} delay={i * 90}>
                <figure className="grid gap-6 py-10 md:grid-cols-12 md:items-start md:py-14">
                  <blockquote className="font-display text-[1.6rem] font-semibold leading-[1.2] tracking-tight text-star md:col-span-8 md:text-[2.25rem]">
                    “{quote}”
                  </blockquote>
                  <figcaption className="md:col-span-3 md:col-start-10 md:pt-2">
                    <div className="text-body text-star">{who}</div>
                    <div className="mt-1 text-caption text-mist">
                      {t.client_name ? t.company : 'Name pending'}
                      {t.project_url && (
                        <>
                          {' · '}
                          <a href={t.project_url} target="_blank" rel="noopener noreferrer" className="break-all underline decoration-line underline-offset-4 hover:text-star">
                            {t.project_url.replace(/^https?:\/\//, '')}
                          </a>
                        </>
                      )}
                    </div>
                    {!confirmed && (
                      <div className="mt-4 inline-flex items-center gap-2 eyebrow text-amber">
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
