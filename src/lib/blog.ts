import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog')

export interface PostMeta {
  title: string
  date: string
  description: string
  author: string
  tags: string[]
  slug: string
}

export interface Post extends PostMeta {
  contentHtml: string
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return []

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.md'))

  const posts = files.map((filename) => {
    const filePath = path.join(BLOG_DIR, filename)
    const raw = fs.readFileSync(filePath, 'utf-8')
    const { data } = matter(raw)

    return {
      title: data.title,
      date: data.date,
      description: data.description,
      author: data.author ?? 'Kaleos',
      tags: data.tags ?? [],
      slug: data.slug ?? filename.replace(/\.md$/, ''),
    } as PostMeta
  })

  return posts.sort((a, b) => (a.date > b.date ? -1 : 1))
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const posts = getAllPosts()
  const meta = posts.find((p) => p.slug === slug)
  if (!meta) return null

  const filePath = path.join(BLOG_DIR, `${slug}.md`)
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, 'utf-8')
  const { content } = matter(raw)

  const result = await remark().use(html).process(content)

  return {
    ...meta,
    contentHtml: result.toString(),
  }
}
