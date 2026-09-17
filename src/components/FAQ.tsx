/* Native disclosure elements: keyboard and screen-reader behavior for free,
   no state, no animation to guard. */

const faqs = [
  {
    q: 'How is this different from hiring an AI freelancer?',
    a: 'Freelancers build what you ask for. We work out what you should be asking for, then build that.',
  },
  {
    q: "What if AI can't handle my workflows?",
    a: 'We map every workflow before we build anything. If AI is not the right answer, we say so and stop there.',
  },
  {
    q: 'How long before I see results?',
    a: 'The assessment is delivered within two weeks. The first system is in production within 30 days.',
  },
  {
    q: 'Is my data safe?',
    a: 'Every system runs in your infrastructure under your security rules. We do not store your data.',
  },
  {
    q: 'What industries do you work with?',
    a: 'Any business with real operational complexity. The method is the same; the workflows differ.',
  },
  {
    q: 'How does pricing work?',
    a: 'Every engagement is scoped to your business, so pricing happens on a call once we understand the work. You get a real number, not a rate card.',
  },
  {
    q: 'Do I need to be technical?',
    a: 'No. We handle architecture through deployment. You need to know your business.',
  },
  {
    q: 'What does human-in-the-loop actually mean here?',
    a: 'Nothing the system generates goes out without your explicit approval. Every output is reviewed by a person before it touches a client.',
  },
]

export function FAQ() {
  return (
    <div className="divide-y divide-line-light border-y border-line-light">
      {faqs.map((f) => (
        <details key={f.q} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-body-lg font-light text-ink [&::-webkit-details-marker]:hidden">
            <span>{f.q}</span>
            <span
              aria-hidden="true"
              className="relative block h-4 w-4 shrink-0 before:absolute before:left-0 before:top-1/2 before:h-px before:w-4 before:-translate-y-1/2 before:bg-ink after:absolute after:left-1/2 after:top-0 after:h-4 after:w-px after:-translate-x-1/2 after:bg-ink after:transition-transform group-open:after:scale-y-0"
            />
          </summary>
          <p className="max-w-2xl pb-6 text-body text-slate">{f.a}</p>
        </details>
      ))}
    </div>
  )
}
