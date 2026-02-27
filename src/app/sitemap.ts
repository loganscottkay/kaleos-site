import type { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/blog'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: 'https://www.kaleoshq.com',
      lastModified: new Date(),
    },
    {
      url: 'https://www.kaleoshq.com/audit',
      lastModified: new Date(),
    },
    {
      url: 'https://www.kaleoshq.com/blog',
      lastModified: new Date(),
    },
    {
      url: 'https://www.kaleoshq.com/about',
      lastModified: new Date(),
    },
  ]

  const blogPosts: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `https://www.kaleoshq.com/blog/${post.slug}`,
    lastModified: new Date(post.date),
  }))

  return [...staticPages, ...blogPosts]
}
