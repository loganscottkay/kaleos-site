import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import TalkToLogan from "@/components/TalkToLogan";
import { ScrollProgress } from '@/components/ScrollProgress';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://kaleoshq.com'),
  title: {
    default: 'Kaleos | Strategic AI Implementation',
    template: '%s | Kaleos',
  },
  description:
    "AI doesn't fail because of the technology. It fails because of the implementation. Kaleos deploys AI systems designed around how your business actually operates.",
  icons: {
    icon: '/icon.svg',
    apple: '/apple-icon',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://kaleoshq.com',
    siteName: 'Kaleos',
    title: 'Kaleos | Strategic AI Implementation',
    description:
      "AI doesn't fail because of the technology. It fails because of the implementation.",
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'Kaleos - Strategic AI Implementation',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kaleos | Strategic AI Implementation',
    description:
      "AI doesn't fail because of the technology. It fails because of the implementation.",
    images: ['/opengraph-image.png'],
  },
  alternates: {
    canonical: 'https://kaleoshq.com',
  },
  verification: {
    google: 'u9TYfcPGp3i-VQfEiGwIpZQjFveJoI0uijF9d0rev4U',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Kaleos',
  url: 'https://kaleoshq.com',
  description:
    "AI doesn't fail because of the technology. It fails because of the implementation. Kaleos deploys AI systems designed around how your business actually operates.",
  founder: {
    '@type': 'Person',
    name: 'Logan Kay',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={playfair.variable}>
      <body
        className={`${inter.className} antialiased bg-white text-slate-700`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ScrollProgress />
        {children}
        <TalkToLogan />
      </body>
    </html>
  )
}
