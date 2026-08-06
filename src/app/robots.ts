import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/bohan/',
    },
    sitemap: 'https://www.kaleoshq.com/sitemap.xml',
  }
}
