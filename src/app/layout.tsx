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
  title: 'Kaleos | AI That Does Your Busywork',
  description:
    'We build AI systems that handle the repetitive work so you can focus on what matters.',
  icons: {
    icon: '/icon.svg',
    apple: '/apple-icon',
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
        {children}
      </body>
    </html>
  )
}
