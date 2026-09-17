import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { NavBar } from '@/components/NavBar'
import { Footer } from '@/components/Footer'
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
    alternates: { canonical: `https://www.kaleoshq.com/blog/${post.slug}` },
    openGraph: {
      title: `${post.title} | KALEOS`,
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

  const formattedDate = new Date(post.date + 'T00:00:00').toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <main className="min-h-screen bg-void text-star">
      <NavBar />

      <article className="mx-auto max-w-[88rem] px-5 pb-24 pt-36 md:px-8 md:pb-32 md:pt-48">
        <header className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-3">
            <Link href="/blog" className="eyebrow text-mist hover:text-star">
              Thinking
            </Link>
            <p className="mt-6 eyebrow text-mist">
              {formattedDate}
              <br />
              {post.readTime}
              {post.category ? (
                <>
                  <br />
                  {post.category}
                </>
              ) : null}
            </p>
          </div>
          <div className="md:col-span-8 md:col-start-5">
            <h1 className="max-w-[16ch] text-h1">{post.title}</h1>
            <p className="mt-6 max-w-2xl text-body-lg text-mist">{post.description}</p>
          </div>
        </header>

        <div className="mt-16 grid gap-8 md:mt-24 md:grid-cols-12">
          <div className="md:col-span-7 md:col-start-5">
            <div className="prose" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
            {post.tags.length > 0 && (
              <ul className="mt-12 flex flex-wrap gap-2" aria-label="Tags">
                {post.tags.map((tag) => (
                  <li key={tag} className="rounded-full border border-line px-3 py-1 font-mono text-[0.7rem] tracking-wide text-mist">
                    {tag}
                  </li>
                ))}
              </ul>
            )}
            <Link href="/blog" className="mt-14 inline-block text-body text-star underline decoration-line underline-offset-4 hover:decoration-star">
              All notes
            </Link>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  )
}
