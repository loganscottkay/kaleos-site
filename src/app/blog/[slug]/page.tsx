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

  return (
    <main className="min-h-screen">
      <NavBar />

      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden hero-vignette">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${HERO_BG}')` }}
        />
        <div className="absolute inset-0 bg-white/30" />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(255,255,255,0.15) 0%, transparent 70%)',
          }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
          <AnimateIn distance={20}>
            <h1
              className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white drop-shadow-lg"
              style={{ textShadow: '0 2px 40px rgba(0,0,0,0.15)' }}
            >
              {post.title}
            </h1>
          </AnimateIn>
          <AnimateIn delay={100}>
            <p className="mt-4 text-white/80 text-sm tracking-wide">
              {new Date(post.date + 'T00:00:00').toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
              {' · '}
              {post.author}
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* Article content */}
      <section className="relative py-24 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${HERO_BG}')` }}
        />
        <div className="absolute inset-0 bg-white/70 backdrop-blur-sm" />

        <div className="relative z-10 max-w-[700px] mx-auto px-4">
          <AnimateIn>
            <article
              className="prose"
              dangerouslySetInnerHTML={{ __html: post.contentHtml }}
            />
          </AnimateIn>

          {/* Tags */}
          {post.tags.length > 0 && (
            <AnimateIn delay={100}>
              <div className="mt-12 flex flex-wrap gap-2">
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
              className="inline-block mt-12 text-accent font-medium text-sm hover:underline"
            >
              &larr; Back to all posts
            </Link>
          </AnimateIn>
        </div>
      </section>

      <Footer />
    </main>
  )
}
