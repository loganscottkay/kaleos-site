import type { Metadata } from 'next'
import { Inter, Bricolage_Grotesque, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import TalkToLogan from "@/components/TalkToLogan";

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
  axes: ['opsz'],
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
  weight: ['400', '600'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.kaleoshq.com'),
  title: {
    default: 'Kaleos HQ | Agentic AI Implementation',
    template: '%s | Kaleos HQ',
  },
  description:
    "AI doesn't fail because of the technology. It fails because of the implementation. Kaleos HQ is an agentic AI implementation and applied AI consulting practice: agents do the work, humans make the calls, everything is logged.",
  icons: {
    icon: '/icon.svg',
    apple: '/apple-icon',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.kaleoshq.com',
    siteName: 'Kaleos HQ',
    title: 'Kaleos HQ | Agentic AI Implementation',
    description:
      "Agentic AI implementation and applied AI consulting. Agents do the work, humans make the calls, everything is logged.",
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'Kaleos HQ - Agentic AI Implementation',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kaleos HQ | Agentic AI Implementation',
    description:
      "Agentic AI implementation and applied AI consulting. Agents do the work, humans make the calls, everything is logged.",
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
    <html lang="en" className={`${bricolage.variable} ${jetbrainsMono.variable}`}>
      <body
        className={`${inter.className} antialiased bg-paper text-slate-700`}
      >
        {children}
        <TalkToLogan />
        <Analytics />
      </body>
    </html>
  )
}
