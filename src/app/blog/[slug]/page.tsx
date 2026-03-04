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
      canonical: `https://kaleoshq.com/blog/${post.slug}`,
    },
    openGraph: {
      title: `${post.title} | Kaleos`,
      description: post.description,
      url: `https://kaleoshq.com/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.date,
      tags: post.tags,
    },
  }
}

const HERO_BG =
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=2070&q=80'

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
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-navy" />
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.08]"
          style={{ backgroundImage: `url('${HERO_BG}')` }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(13,148,136,0.08) 0%, transparent 70%)',
          }}
        />

        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <AnimateIn>
            <Link
              href="/blog"
              className="inline-flex items-center text-white/40 text-sm hover:text-accent transition-colors mb-8"
            >
              &larr; Back to Thinking
            </Link>
          </AnimateIn>
          <AnimateIn distance={20} delay={50}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white">
              {post.title}
            </h1>
          </AnimateIn>
          <AnimateIn delay={150}>
            <div className="mt-5 flex items-center justify-center gap-3 text-sm text-white/40">
              {post.category && (
                <>
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-accent/15 text-accent">
                    {post.category}
                  </span>
                  <span className="text-white/20">·</span>
                </>
              )}
              <span>{formattedDate}</span>
              <span className="text-white/20">·</span>
              <span>{post.readTime}</span>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* Article content */}
      <section className="relative py-20 bg-navy dot-grid-dark">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.04]"
          style={{ backgroundImage: `url('${HERO_BG}')` }}
        />

        <div className="relative z-10 max-w-[720px] mx-auto px-4">
          <AnimateIn>
            <div
              className="relative rounded-2xl backdrop-blur-2xl border border-white/[0.12] overflow-hidden"
              style={{
                backgroundColor: 'rgba(255,255,255,0.05)',
                boxShadow:
                  '0 0 40px rgba(13,148,136,0.06), inset 0 1px 0 rgba(255,255,255,0.07)',
              }}
            >
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
                    className="px-3 py-1 text-xs font-medium rounded-full bg-accent/10 text-accent"
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
              className="inline-block mt-10 text-accent font-medium text-sm hover:underline"
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
