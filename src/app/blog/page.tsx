import type { Metadata } from 'next'
import Link from 'next/link'
import { NavBar } from '@/components/NavBar'
import { Footer } from '@/components/Footer'
import { GlassCard } from '@/components/GlassCard'
import { AnimateIn } from '@/components/AnimateIn'
import { getAllPosts } from '@/lib/blog'

export const metadata: Metadata = {
  title: 'Thinking',
  description:
    'Frameworks, lessons, and perspectives on AI implementation that actually works.',
  alternates: {
    canonical: 'https://kaleoshq.com/blog',
  },
  openGraph: {
    title: 'Thinking | Kaleos',
    description:
      'Frameworks, lessons, and perspectives on AI implementation that actually works.',
    url: 'https://kaleoshq.com/blog',
  },
}

const HERO_BG =
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=2070&q=80'

function formatDate(dateStr: string) {
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function BlogPage() {
  const posts = getAllPosts()
  const featured = posts[0]
  const rest = posts.slice(1)

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

        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
          <AnimateIn distance={20}>
            <h1
              className="text-4xl sm:text-5xl font-semibold tracking-tight text-white drop-shadow-lg"
              style={{ textShadow: '0 2px 40px rgba(0,0,0,0.15)' }}
            >
              Thinking
            </h1>
          </AnimateIn>
          <AnimateIn delay={100}>
            <p className="mt-4 text-white/50 text-lg max-w-xl mx-auto leading-relaxed text-center">
              Frameworks, lessons, and perspectives on AI implementation that
              actually works.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* Posts */}
      <section className="relative py-24 bg-navy dot-grid-dark">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.04]"
          style={{ backgroundImage: `url('${HERO_BG}')` }}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-4">
          {posts.length === 0 && (
            <p className="text-white/50 text-center">
              No posts yet. Check back soon.
            </p>
          )}

          {/* Featured post */}
          {featured && (
            <AnimateIn distance={30}>
              <Link href={`/blog/${featured.slug}`} className="block group">
                <div className="relative">
                  <div
                    className="absolute -inset-px rounded-2xl transition-all duration-500 group-hover:opacity-100 opacity-60"
                    style={{
                      background:
                        'linear-gradient(145deg, rgba(13,148,136,0.4), transparent 40%, transparent 60%, rgba(13,148,136,0.3))',
                    }}
                  />
                  <div
                    className="relative rounded-2xl backdrop-blur-2xl border border-white/[0.12] overflow-hidden transition-all duration-500 group-hover:border-white/[0.2] group-hover:shadow-[0_0_40px_rgba(13,148,136,0.15)]"
                    style={{
                      backgroundColor: 'rgba(255,255,255,0.06)',
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-b from-white/[0.07] via-transparent to-transparent pointer-events-none" />
                    <div className="relative p-8 sm:p-10">
                      <div className="flex items-center gap-3 mb-5">
                        {featured.category && (
                          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-accent/15 text-accent tracking-wide">
                            {featured.category}
                          </span>
                        )}
                        <span className="text-xs text-white/40 tracking-wide">
                          {formatDate(featured.date)}
                        </span>
                        <span className="text-xs text-white/30">·</span>
                        <span className="text-xs text-white/40 tracking-wide">
                          {featured.readTime}
                        </span>
                      </div>
                      <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-white mb-4 group-hover:text-accent transition-colors duration-300">
                        {featured.title}
                      </h2>
                      <p className="text-white/60 leading-relaxed max-w-2xl line-clamp-2">
                        {featured.description}
                      </p>
                      <span className="inline-block mt-6 text-accent text-sm font-medium group-hover:underline">
                        Read post &rarr;
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </AnimateIn>
          )}

          {/* Post grid */}
          {rest.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
              {rest.map((post, i) => (
                <AnimateIn key={post.slug} delay={100 + i * 80}>
                  <Link href={`/blog/${post.slug}`} className="block group h-full">
                    <GlassCard hover className="p-7 h-full flex flex-col">
                      <div className="flex items-center gap-3 mb-4">
                        {post.category && (
                          <span className="px-2.5 py-0.5 text-[10px] font-semibold rounded-full bg-accent/15 text-accent tracking-wide uppercase">
                            {post.category}
                          </span>
                        )}
                        <span className="text-[11px] text-white/35 tracking-wide">
                          {formatDate(post.date)}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold tracking-tight text-white mb-2 group-hover:text-accent transition-colors duration-300">
                        {post.title}
                      </h3>
                      <p className="text-white/50 text-sm leading-relaxed line-clamp-1 flex-1">
                        {post.description}
                      </p>
                      <div className="mt-4 pt-4 border-t border-white/[0.08] flex items-center justify-between">
                        <span className="text-[11px] text-white/30">
                          {post.readTime}
                        </span>
                        <span className="text-xs text-accent font-medium group-hover:underline">
                          Read &rarr;
                        </span>
                      </div>
                    </GlassCard>
                  </Link>
                </AnimateIn>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
