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
    images: ['/opengraph-image.png'],
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
    <main className="min-h-screen bg-void text-star">
      <NavBar />

      <section className="mx-auto max-w-[88rem] px-5 pb-16 pt-36 md:px-8 md:pb-20 md:pt-48">
        <p className="eyebrow text-mist">Thinking</p>
        <h1 className="mt-6 max-w-[14ch] text-h1">
          Notes on AI implementation that holds up in production.
        </h1>
      </section>

      <section className="horizon">
        <div className="mx-auto max-w-[88rem] px-5 md:px-8">
          {posts.length === 0 && (
            <p className="py-16 text-body text-mist">No posts yet.</p>
          )}
          <ol>
            {posts.map((post, i) => (
              <li key={post.slug} className="border-b border-line">
                <Reveal delay={Math.min(i, 4) * 60}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group grid gap-3 py-8 md:grid-cols-12 md:items-baseline md:py-10"
                  >
                    <span className="eyebrow text-mist md:col-span-3">
                      {formatDate(post.date)}
                      {post.category ? ` · ${post.category}` : ''}
                    </span>
                    <span className="md:col-span-7">
                      <span className="block text-h3 text-star transition-colors group-hover:text-comet">
                        {post.title}
                      </span>
                      <span className="mt-2 block max-w-xl text-body text-mist">{post.description}</span>
                    </span>
                    <span className="font-mono text-[0.72rem] tracking-[0.18em] text-mist md:col-span-2 md:text-right">
                      {post.readTime}
                    </span>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Footer />
    </main>
  )
}
