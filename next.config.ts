import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  async rewrites() {
    return [
      // Standalone client roadmap: served straight from public/, no app layout.
      { source: '/bohan/roadmap', destination: '/bohan/roadmap.html' },
    ]
  },
  async headers() {
    return [
      {
        source: '/bohan/:path*',
        headers: [
          { key: 'X-Robots-Tag', value: 'noindex, nofollow' },
        ],
      },
    ]
  },
};

export default nextConfig;
