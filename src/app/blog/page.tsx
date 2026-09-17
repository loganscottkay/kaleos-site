import type { Metadata } from 'next'
import Link from 'next/link'
import { NavBar } from '@/components/NavBar'
import { Footer } from '@/components/Footer'
import { Reveal } from '@/components/Reveal'
import { getAllPosts } from '@/lib/blog'

export const metadata: Metadata = {
  title: 'Thinking',
  description: 'Notes on AI implementation that holds up in production.',
  alternates: { canonical: 'https://www.kaleoshq.com/blog' },
  openGraph: {
    title: 'Thinking | Kaleos HQ',
    description: 'Notes on AI implementation that holds up in production.',
    url: 'https://www.kaleoshq.com/blog',
  },
}

function formatDate(dateStr: string) {
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <main className="min-h-screen bg-paper text-ink">
      <NavBar theme="light" />

      <section className="mx-auto max-w-[88rem] px-5 pb-16 pt-36 md:px-8 md:pb-20 md:pt-48">
        <p className="eyebrow text-slate">Thinking</p>
        <h1 className="mt-6 max-w-[14ch] text-h1 font-light tracking-tightest">
          Notes on AI implementation that holds up in production.
        </h1>
      </section>

      <section className="border-t border-line-light">
        <div className="mx-auto max-w-[88rem] px-5 md:px-8">
          {posts.length === 0 && (
            <p className="py-16 text-body text-slate">No posts yet.</p>
          )}
          <ol>
            {posts.map((post, i) => (
              <li key={post.slug} className="border-b border-line-light">
                <Reveal delay={Math.min(i, 4) * 60}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group grid gap-3 py-8 md:grid-cols-12 md:items-baseline md:py-10"
                  >
                    <span className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-slate md:col-span-3">
                      {formatDate(post.date)}
                      {post.category ? ` · ${post.category}` : ''}
                    </span>
                    <span className="md:col-span-7">
                      <span className="block text-h3 font-light text-ink transition-colors group-hover:text-royal">
                        {post.title}
                      </span>
                      <span className="mt-2 block max-w-xl text-body text-slate">{post.description}</span>
                    </span>
                    <span className="font-mono text-[0.72rem] tracking-[0.18em] text-slate md:col-span-2 md:text-right">
                      {post.readTime}
                    </span>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Footer theme="light" />
    </main>
  )
}
