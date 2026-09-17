import type { NextConfig } from "next";

// Content Security Policy built from what the site actually loads: its own
// scripts, styles, fonts (next/font self-hosts them), and images; Vercel
// Analytics (same origin) and the Vercel preview toolbar (vercel.live).
// Calendly is a plain link, and the chat calls OpenAI from the server, so
// neither needs an allowance. Next.js hydration and the animation library set
// inline scripts and styles, hence 'unsafe-inline'. Dev needs eval for HMR.
const isDev = process.env.NODE_ENV !== 'production'
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''} https://vercel.live https://va.vercel-scripts.com`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://vercel.live https://vercel.com",
  "font-src 'self' data:",
  "connect-src 'self' https://vercel.live https://vitals.vercel-insights.com wss://ws-us3.pusher.com",
  "frame-src https://vercel.live",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join('; ')

const securityHeaders = [
  { key: 'Content-Security-Policy', value: csp },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=()' },
]

const nextConfig: NextConfig = {
  reactCompiler: true,
  async headers() {
    return [{ source: '/(.*)', headers: securityHeaders }]
  },
};

export default nextConfig;
