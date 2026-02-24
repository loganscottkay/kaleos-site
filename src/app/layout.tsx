import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'

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
    default: 'Kaleos | AI That Does Your Busywork',
    template: '%s | Kaleos',
  },
  description:
    'We build AI systems that automate business operations. Save time, make more money, and stop wasting hours on repetitive tasks.',
  icons: {
    icon: '/icon.svg',
    apple: '/apple-icon',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://kaleoshq.com',
    siteName: 'Kaleos',
    title: 'Kaleos | AI That Does Your Busywork',
    description:
      'We build AI systems that automate business operations. Save time, make more money, and stop wasting hours on repetitive tasks.',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Kaleos - AI That Does Your Busywork',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kaleos | AI That Does Your Busywork',
    description:
      'We build AI systems that automate business operations. Save time, make more money, and stop wasting hours on repetitive tasks.',
    images: ['/opengraph-image'],
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
    'We build AI systems that automate business operations. Save time, make more money, and stop wasting hours on repetitive tasks.',
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
        {children}
      </body>
    </html>
  )
}
