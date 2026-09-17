import { Reveal } from '@/components/Reveal'
import { Parallax } from '@/components/home/Parallax'

/* Proof at planetary scale. Each shipped system gets its own frame: a
   number, a line of type the size of a billboard, three plain sentences,
   and one screen. The screens are compositions, not dashboards: they show
   the shape of the system and the one moment that matters, the gate. */

const cases = [
  {
    n: '01',
    client: 'Advisor Solutions OS',
    title: 'A coaching method advisors run every day.',
    lines: [
      'Dan Finley coaches financial advisors. His method lived in a binder.',
      'Kaleos built a platform where advisors log activity and follow a game plan, and coaches see every team on one scoreboard.',
      'Live in production with real advisor teams. Built in about a month.',
    ],
    screen: 'scoreboard',
  },
  {
    n: '02',
    client: 'Bohan Contracting',
    title: 'The whole project, in one place, for the homeowner.',
    lines: [
      'A residential design-build firm in Annapolis. Updates went out by scattered email and phone.',
      'Kaleos built a client portal: where the project is, what happens next, photos, documents.',
      'The Bohan team approves what goes out. Clients stop calling the office.',
    ],
    screen: 'timeline',
  },
  {
    n: '03',
    client: 'Cogniify',
    title: 'Outreach that books meetings and still sounds like the founder.',
    lines: [
      'A behavioral content studio for life sciences. Outreach kept getting put off.',
      'Kaleos built a system that finds the right people, drafts a personal note, and answers replies within minutes with a booking link.',
      'A human approves every send. The goal was booked meetings.',
    ],
    screen: 'outreach',
  },
] as const

function Scoreboard() {
  const rows = [
    ['Team North', 92],
    ['Team Harbor', 78],
    ['Team West', 64],
  ] as const
  return (
    <div className="surface-dark p-6 md:p-8" aria-hidden="true">
      <div className="flex items-center justify-between font-mono text-[0.7rem] uppercase tracking-[0.18em] text-mist">
        <span>Scoreboard</span>
        <span>This week</span>
      </div>
      <div className="mt-6 space-y-5">
        {rows.map(([name, pct]) => (
          <div key={name}>
            <div className="flex justify-between text-caption text-star">
              <span>{name}</span>
              <span className="text-mist">{pct}%</span>
            </div>
            <div className="mt-2 h-px w-full bg-line-dark">
              <div className="h-px bg-star" style={{ width: `${pct}%` }} />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 flex items-center justify-between border-t border-line-dark pt-5 text-caption">
        <span className="text-mist">Weekly summary, drafted by agent</span>
        <span className="inline-flex items-center gap-2 text-amber">
          <span className="h-1.5 w-1.5 rounded-full bg-amber" />
          Awaiting approval
        </span>
      </div>
    </div>
  )
}

function Timeline() {
  const steps = ['Design', 'Permits', 'Demolition', 'Framing', 'Finishes']
  return (
    <div className="surface-dark p-6 md:p-8" aria-hidden="true">
      <div className="flex items-center justify-between font-mono text-[0.7rem] uppercase tracking-[0.18em] text-mist">
        <span>Project journey</span>
        <span>Phase 3 of 5</span>
      </div>
      <ol className="mt-8 flex items-center justify-between">
        {steps.map((s, i) => (
          <li key={s} className="flex flex-1 items-center">
            <div className="flex flex-col items-center gap-3">
              <span
                className={`block h-2.5 w-2.5 rounded-full ${
                  i < 2 ? 'bg-star' : i === 2 ? 'bg-royal-bright ring-4 ring-royal-bright/20' : 'border border-line-dark'
                }`}
              />
              <span className={`text-[0.7rem] ${i <= 2 ? 'text-star' : 'text-mist'}`}>{s}</span>
            </div>
            {i < steps.length - 1 && <span className={`mx-2 mb-6 h-px flex-1 ${i < 2 ? 'bg-star' : 'bg-line-dark'}`} />}
          </li>
        ))}
      </ol>
      <div className="mt-8 border-t border-line-dark pt-5">
        <p className="text-caption text-star">Status update, drafted by agent</p>
        <p className="mt-2 text-caption text-mist">Framing inspection passed this morning. Photos are in your documents folder. Finishes start next week.</p>
        <div className="mt-4 flex items-center justify-between text-caption">
          <span className="text-mist">Nothing reaches the homeowner without a person&apos;s approval.</span>
          <span className="inline-flex items-center gap-2 text-amber">
            <span className="h-1.5 w-1.5 rounded-full bg-amber" />
            Awaiting approval
          </span>
        </div>
      </div>
    </div>
  )
}

function Outreach() {
  return (
    <div className="surface-dark p-6 md:p-8" aria-hidden="true">
      <div className="flex items-center justify-between font-mono text-[0.7rem] uppercase tracking-[0.18em] text-mist">
        <span>Approval queue</span>
        <span>1 waiting</span>
      </div>
      <div className="mt-6 space-y-3">
        {['Reply drafted · CFO, logistics', 'Reply drafted · VP Ops, clinics'].map((r) => (
          <div key={r} className="flex items-center justify-between border-b border-line-dark pb-3 text-caption">
            <span className="text-star">{r}</span>
            <span className="text-mist">Sent</span>
          </div>
        ))}
        <div className="flex items-center justify-between pb-1 text-caption">
          <span className="text-star">Personal note · Founder, med-device</span>
          <span className="inline-flex items-center gap-2 text-amber">
            <span className="h-1.5 w-1.5 rounded-full bg-amber" />
            Awaiting approval
          </span>
        </div>
      </div>
      <div className="mt-6 flex gap-3">
        <span className="btn btn-star !min-h-10 text-caption">Approve and send</span>
        <span className="btn btn-ghost-dark !min-h-10 text-caption">Edit</span>
      </div>
      <p className="mt-6 font-mono text-[0.7rem] text-mist">every action logged</p>
    </div>
  )
}

const screens = { scoreboard: Scoreboard, timeline: Timeline, outreach: Outreach }

export function Cases() {
  return (
    <section id="work" className="border-t border-line-dark" aria-labelledby="work-heading">
      <div className="mx-auto max-w-[88rem] px-5 pt-24 md:px-8 md:pt-36">
        <Reveal>
          <p className="eyebrow text-mist">Systems shipped</p>
          <h2 id="work-heading" className="mt-5 max-w-[18ch] text-h2 font-light">
            Not pilots. Working software real businesses run on every day.
          </h2>
        </Reveal>
      </div>

      {cases.map((c, i) => {
        const Screen = screens[c.screen]
        return (
          <article
            key={c.n}
            className="mx-auto grid max-w-[88rem] gap-12 px-5 py-24 md:grid-cols-12 md:gap-8 md:px-8 md:py-40"
            aria-labelledby={`case-${c.n}`}
          >
            <div className="md:col-span-6">
              <Reveal>
                <div className="flex items-baseline gap-4 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-mist">
                  <span>{c.n}</span>
                  <span>{c.client}</span>
                </div>
                <h3 id={`case-${c.n}`} className="mt-6 max-w-[16ch] text-h1 font-light tracking-tightest">
                  {c.title}
                </h3>
              </Reveal>
              <Reveal delay={120}>
                <div className="mt-10 max-w-md space-y-4 text-body text-mist">
                  {c.lines.map((l) => (
                    <p key={l}>{l}</p>
                  ))}
                </div>
              </Reveal>
            </div>
            <div className={`md:col-span-5 ${i % 2 === 0 ? 'md:col-start-8' : 'md:col-start-7'} md:self-center`}>
              <Parallax amount={i % 2 === 0 ? -40 : 40}>
                <Reveal variant="scale">
                  <Screen />
                </Reveal>
              </Parallax>
            </div>
          </article>
        )
      })}
    </section>
  )
}
