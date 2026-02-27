import type { Metadata } from 'next'
import Link from 'next/link'
import { NavBar } from '@/components/NavBar'
import { Footer } from '@/components/Footer'
import { AnimateIn } from '@/components/AnimateIn'
import { getAllPosts } from '@/lib/blog'

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Practical insights on AI automation, business operations, and getting more done with less busywork.',
  alternates: {
    canonical: 'https://kaleoshq.com/blog',
  },
  openGraph: {
    title: 'Blog | Kaleos',
    description:
      'Practical insights on AI automation, business operations, and getting more done with less busywork.',
    url: 'https://kaleoshq.com/blog',
  },
}

const HERO_BG =
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=2070&q=80'

export default function BlogPage() {
  const posts = getAllPosts()

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
              className="text-4xl sm:text-5xl font-semibold tracking-tight text-white drop-shadow-lg"
              style={{ textShadow: '0 2px 40px rgba(0,0,0,0.15)' }}
            >
              Blog
            </h1>
          </AnimateIn>
        </div>
      </section>

      {/* Posts listing */}
      <section className="relative py-24 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${HERO_BG}')` }}
        />
        <div className="absolute inset-0 bg-white/70 backdrop-blur-sm" />

        <div className="relative z-10 max-w-3xl mx-auto px-4">
          {posts.length === 0 && (
            <p className="text-slate-500 text-center">No posts yet. Check back soon.</p>
          )}

          {posts.map((post, i) => (
            <div key={post.slug}>
              {i > 0 && <div className="section-divider my-12" />}
              <AnimateIn delay={i * 100}>
                <article>
                  <p className="text-sm text-slate-400 tracking-wide mb-2">
                    {new Date(post.date + 'T00:00:00').toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                  <Link href={`/blog/${post.slug}`}>
                    <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-navy hover:text-accent transition-colors">
                      {post.title}
                    </h2>
                  </Link>
                  <p className="mt-3 text-slate-600 leading-relaxed">
                    {post.description}
                  </p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-block mt-4 text-accent font-medium text-sm hover:underline"
                  >
                    Read more &rarr;
                  </Link>
                </article>
              </AnimateIn>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  )
}
