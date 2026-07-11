import type { Metadata } from 'next'
import { Inter, Fraunces, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import TalkToLogan from "@/components/TalkToLogan";

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

const fraunces = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-fraunces',
  axes: ['opsz'],
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
  weight: ['400', '600'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://kaleoshq.com'),
  title: {
    default: 'Kaleos | Agentic AI Implementation',
    template: '%s | Kaleos',
  },
  description:
    "AI doesn't fail because of the technology. It fails because of the implementation. Kaleos is an agentic AI implementation and applied AI consulting practice: agents do the work, humans make the calls, everything is logged.",
  icons: {
    icon: '/icon.svg',
    apple: '/apple-icon',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://kaleoshq.com',
    siteName: 'Kaleos',
    title: 'Kaleos | Agentic AI Implementation',
    description:
      "Agentic AI implementation and applied AI consulting. Agents do the work, humans make the calls, everything is logged.",
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'Kaleos - Agentic AI Implementation',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kaleos | Agentic AI Implementation',
    description:
      "Agentic AI implementation and applied AI consulting. Agents do the work, humans make the calls, everything is logged.",
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
    "Agentic AI implementation and applied AI consulting. Kaleos deploys AI systems designed around how your business actually operates.",
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
    <html lang="en" className={`${fraunces.variable} ${jetbrainsMono.variable}`}>
      <body
        className={`${inter.className} antialiased bg-paper text-slate-700`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <TalkToLogan />
      </body>
    </html>
  )
}
