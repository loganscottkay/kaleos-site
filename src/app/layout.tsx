import type { Metadata } from 'next'
import { Syne, Instrument_Sans, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import TalkToLogan from '@/components/TalkToLogan'
import { SmoothScroll } from '@/components/SmoothScroll'

const syne = Syne({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-syne',
  weight: ['500', '600', '700', '800'],
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
  'KALEOS is a premium AI implementation practice. We design and ship systems where agents do the work and a person you trust approves every consequential step. Everything is logged.'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.kaleoshq.com'),
  title: {
    default: 'KALEOS | Your judgment, at scale',
    template: '%s | KALEOS',
  },
  description: DESCRIPTION,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.kaleoshq.com',
    siteName: 'KALEOS',
    title: 'KALEOS | Your judgment, at scale',
    description: DESCRIPTION,
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: 'KALEOS. Your judgment, at scale.' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KALEOS | Your judgment, at scale',
    description: DESCRIPTION,
    images: ['/opengraph-image.png'],
  },
  alternates: { canonical: 'https://www.kaleoshq.com' },
  verification: { google: 'u9TYfcPGp3i-VQfEiGwIpZQjFveJoI0uijF9d0rev4U' },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${syne.variable} ${instrument.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased bg-void text-star">
        <SmoothScroll />
        {children}
        <TalkToLogan />
        <Analytics />
      </body>
    </html>
  )
}
