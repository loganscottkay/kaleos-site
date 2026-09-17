import type { Metadata } from 'next'
import { Manrope, Instrument_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import TalkToLogan from '@/components/TalkToLogan'
import { SmoothScroll } from '@/components/SmoothScroll'
import { ScrollProgress } from '@/components/ScrollProgress'
import { Cursor } from '@/components/Cursor'
import { ScrollFx } from '@/components/ScrollFx'
import { JsonLd, organization, service } from '@/components/JsonLd'

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

const DESCRIPTION =
  'AI that answers to you. Kaleos HQ is a premium AI implementation practice that designs and ships custom AI systems where agents handle the work and a person you trust signs off before anything goes out.'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.kaleoshq.com'),
  title: {
    default: 'Kaleos HQ | AI systems that do the work. You make the calls.',
    template: '%s | Kaleos HQ',
  },
  description: DESCRIPTION,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.kaleoshq.com',
    siteName: 'Kaleos HQ',
    title: 'Kaleos HQ | AI systems that do the work. You make the calls.',
    description: DESCRIPTION,
    images: [{ url: '/og-kaleos-hq.png', width: 1200, height: 630, alt: 'Kaleos HQ. AI that answers to you.' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kaleos HQ | AI systems that do the work. You make the calls.',
    description: DESCRIPTION,
    images: ['/og-kaleos-hq.png'],
  },
  alternates: { canonical: 'https://www.kaleoshq.com' },
  verification: { google: 'u9TYfcPGp3i-VQfEiGwIpZQjFveJoI0uijF9d0rev4U' },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${manrope.variable} ${instrument.variable}`}>
      <body className="font-sans antialiased bg-void text-star">
        <JsonLd data={organization} />
        <JsonLd data={service} />
        <SmoothScroll />
        <ScrollProgress />
        <Cursor />
        <ScrollFx />
        {children}
        <TalkToLogan />
        <Analytics />
      </body>
    </html>
  )
}
