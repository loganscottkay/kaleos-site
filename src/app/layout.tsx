import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import TalkToLogan from '@/components/TalkToLogan'
import { SmoothScroll } from '@/components/SmoothScroll'

const geist = Geist({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
  weight: ['400', '500'],
})

const DESCRIPTION =
  'Kaleos HQ designs and ships AI systems for operators. Agents do the work, a human approves every consequential step, and everything is logged.'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.kaleoshq.com'),
  title: {
    default: 'Kaleos HQ | AI systems with a human at the gate',
    template: '%s | Kaleos HQ',
  },
  description: DESCRIPTION,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.kaleoshq.com',
    siteName: 'Kaleos HQ',
    title: 'Kaleos HQ | AI systems with a human at the gate',
    description: DESCRIPTION,
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'Kaleos HQ. Agents do the work. You make the calls.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kaleos HQ | AI systems with a human at the gate',
    description: DESCRIPTION,
    images: ['/opengraph-image.png'],
  },
  alternates: {
    canonical: 'https://www.kaleoshq.com',
  },
  verification: {
    google: 'u9TYfcPGp3i-VQfEiGwIpZQjFveJoI0uijF9d0rev4U',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased bg-void text-star">
        <SmoothScroll />
        {children}
        <TalkToLogan />
        <Analytics />
      </body>
    </html>
  )
}
