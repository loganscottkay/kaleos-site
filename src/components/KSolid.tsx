import Image from 'next/image'

/* The mark with depth: the supplied artwork, unoptimized so it stays at
   full resolution, stacked in eight layers a pixel apart and turned in 3D
   by CSS. The front layer is the real image; the ones behind it darken
   toward the back so the side face reads as it turns. */
const LAYERS = 8

export function KSolid({ className = '' }: { className?: string }) {
  return (
    <div className="k-solid" aria-label="Kaleos HQ" role="img">
      {Array.from({ length: LAYERS - 1 }, (_, i) => (
        <Image
          key={i}
          src="/kaleos-k.png"
          alt=""
          width={938}
          height={1020}
          unoptimized
          aria-hidden="true"
          className={`k-layer w-auto select-none ${className}`}
          style={{ '--z': (i + 1) * 1.4, '--b': 0.42 + (i / LAYERS) * 0.3 } as React.CSSProperties}
        />
      ))}
      <Image
        src="/kaleos-k.png"
        alt=""
        width={938}
        height={1020}
        priority
        unoptimized
        className={`relative w-auto select-none ${className}`}
        draggable={false}
      />
    </div>
  )
}
