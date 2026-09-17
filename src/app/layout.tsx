import type { Metadata } from 'next'
import { Manrope, Instrument_Sans, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import TalkToLogan from '@/components/TalkToLogan'
import { SmoothScroll } from '@/components/SmoothScroll'
import { ScrollProgress } from '@/components/ScrollProgress'

const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-manrope',
  weight: ['600', '700', '800'],
})

const instrument = Instrument_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-instrument',
  weight: ['400', '500', '600'],
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-geist-mono',
  weight: ['400', '500'],
})

const DESCRIPTION =
  'KALEOS is a premium AI implementation practice. We design and ship systems where agents handle the work and a person you trust signs off before anything goes out.'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.kaleoshq.com'),
  title: {
    default: 'KALEOS | AI systems for the modern company',
    template: '%s | KALEOS',
  },
  description: DESCRIPTION,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.kaleoshq.com',
    siteName: 'KALEOS',
    title: 'KALEOS | AI systems for the modern company',
    description: DESCRIPTION,
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: 'KALEOS. AI systems for the modern company.' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KALEOS | AI systems for the modern company',
    description: DESCRIPTION,
    images: ['/opengraph-image.png'],
  },
  alternates: { canonical: 'https://www.kaleoshq.com' },
  verification: { google: 'u9TYfcPGp3i-VQfEiGwIpZQjFveJoI0uijF9d0rev4U' },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${manrope.variable} ${instrument.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased bg-void text-star">
        <SmoothScroll />
        <ScrollProgress />
        {children}
        <TalkToLogan />
        <Analytics />
      </body>
    </html>
  )
}
