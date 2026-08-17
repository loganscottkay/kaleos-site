import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { NavBar } from '@/components/NavBar'
import { Footer } from '@/components/Footer'
import { AnimateIn } from '@/components/AnimateIn'
import { getAllPosts, getPostBySlug } from '@/lib/blog'

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return {}

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `https://www.kaleoshq.com/blog/${post.slug}`,
    },
    openGraph: {
      title: `${post.title} | Kaleos HQ`,
      description: post.description,
      url: `https://www.kaleoshq.com/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.date,
      tags: post.tags,
    },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()

  const formattedDate = new Date(post.date + 'T00:00:00').toLocaleDateString(
    'en-US',
    { year: 'numeric', month: 'long', day: 'numeric' },
  )

  return (
    <main className="min-h-screen">
      <NavBar />

      {/* Hero */}
      <section className="relative pt-24 md:pt-32 pb-12 md:pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-navy" />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at center, color-mix(in srgb, var(--teal) 8%, transparent) 0%, transparent 70%)',
          }}
        />

        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <AnimateIn>
            <Link
              href="/blog"
              className="inline-flex items-center text-white/60 text-body hover:text-teal-bright transition-colors mb-8"
            >
              &larr; Back to Thinking
            </Link>
          </AnimateIn>
          <AnimateIn distance={24} delay={50}>
            <h1 className="text-h1 font-semibold text-white">
              {post.title}
            </h1>
          </AnimateIn>
          <AnimateIn delay={150}>
            <div className="mt-6 flex items-center justify-center gap-3 text-body text-white/60">
              {post.category && (
                <>
                  <span className="px-3 py-1 text-caption font-semibold rounded-control bg-accent/15 text-teal-bright">
                    {post.category}
                  </span>
                  <span className="text-white/60">·</span>
                </>
              )}
              <span>{formattedDate}</span>
              <span className="text-white/60">·</span>
              <span>{post.readTime}</span>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* Article content */}
      <section className="atmos py-16 md:py-24 bg-navy">
        <div className="atmos-layer atmos-grid parallax-slow" aria-hidden="true" />
        <div className="atmos-layer atmos-grain" aria-hidden="true" />


        <div className="relative z-10 max-w-180 mx-auto px-4">
          <AnimateIn>
            <div className="card-dark relative bg-white/5 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-white/[0.05] via-transparent to-transparent pointer-events-none" />
              <div className="relative p-8 sm:p-12">
                <article
                  className="prose prose-invert"
                  dangerouslySetInnerHTML={{ __html: post.contentHtml }}
                />
              </div>
            </div>
          </AnimateIn>

          {/* Tags */}
          {post.tags.length > 0 && (
            <AnimateIn delay={100}>
              <div className="mt-8 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-caption font-medium rounded-control bg-accent/10 text-teal-bright"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </AnimateIn>
          )}

          {/* Back link */}
          <AnimateIn delay={200}>
            <Link
              href="/blog"
              className="inline-block mt-12 text-teal-bright font-medium text-body hover:underline"
            >
              &larr; Back to Thinking
            </Link>
          </AnimateIn>
        </div>
      </section>

      <Footer />
    </main>
  )
}
