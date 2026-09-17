# Copy audit (humanizer pass), v3

2026-09-17. Every rendered string on the site was checked against the Wikipedia "Signs of AI writing" list via Ryan's humanizer skill. Rewrites are in the code; this is the record.

## Patterns found and removed

- Headings split by punctuation into fragments ("One orbit. One gate.", "Five things, in writing.", "Two weeks. Every workflow mapped. One clear first move.", "Built on one rule.", "Ready when you are."). All headings are now one plain phrase with no terminal punctuation.
- Rule of three: "If you want a chatbot... If you want an AI... If you want a system..." collapsed to two sentences. "Agents do the work. You make the calls. Everything is logged." in the footer became one sentence.
- Tailing negations: "No deck, no pitch", "A real number, not a rate card", "Scoped to how your business runs, not to a demo" rewritten as full clauses.
- Negative parallelism: "Not because the technology fails, but because..." rewritten as two plain sentences.
- Subjectless fragments in the method steps and the About prose ("Map the workflows first. Design one system...") given subjects and verbs.
- Semicolon in an FAQ answer replaced.
- "Everything is logged." as a standalone tag line dropped from the hero and the metadata description.

## Checked and clean

- Em dashes: zero in src.
- AI vocabulary list (leverage, seamless, unlock, empower, journey, robust, delve, crucial, pivotal, landscape, testament, showcase, vibrant, foster, enhance, streamline, holistic, tailored, world class): zero hits outside the API route we do not touch.
- Title case headings: none. Emojis: none. Curly quotes: only around the testimonials, where they are typographic quotation marks.
- Promotional language: "premium" appears three times by Ryan's instruction (hero, audience section, footer) and nowhere else.
- Claims: nothing on the site that is not in the repo docs, the proof kit, or Logan's own notes. Testimonials remain paraphrases marked pending.

## Strings that stay as written, on purpose

- Client testimonial paraphrases keep first person and specifics. They are the clients' voice, not ours.
- "Incoming, Anthropic" and "AI at Harvard Business School" are credential labels, not prose.
- The chat greeting speaks as Logan in first person, which matches how the assistant is framed.
