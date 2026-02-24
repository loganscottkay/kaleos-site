import { ImageResponse } from 'next/og'

export const alt = 'Kaleos - AI That Does Your Busywork'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#1B2A4A',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Georgia, serif',
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: 'white',
            marginBottom: 24,
            letterSpacing: '-0.02em',
          }}
        >
          Kaleos
        </div>
        <div
          style={{
            fontSize: 32,
            color: 'rgba(255,255,255,0.7)',
            maxWidth: 700,
            textAlign: 'center',
            lineHeight: 1.4,
          }}
        >
          AI that does your busywork.
        </div>
        <div
          style={{
            fontSize: 20,
            color: '#0d9488',
            marginTop: 32,
            letterSpacing: '0.05em',
          }}
        >
          kaleoshq.com
        </div>
      </div>
    ),
    { ...size }
  )
}
