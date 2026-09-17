import type { CSSProperties } from 'react'

/* The K. Three pieces: the stem and two arms. The arms meet the stem at a
   pinch, the one point on the mark where everything crosses. That point is
   the brand's idea of the approval gate, so the assembly animation lets the
   pieces arrive separately and lock there. Traced from Ryan's supplied
   artwork; swap the paths for the real vector when it lands. */

interface KMarkProps {
  className?: string
  /** Play the two-piece assembly on mount. Resolves instantly under reduced motion. */
  assemble?: boolean
  style?: CSSProperties
  title?: string
}

export function KMark({ className = '', assemble = false, style, title }: KMarkProps) {
  return (
    <svg
      viewBox="440 430 825 910"
      fill="currentColor"
      className={[assemble ? 'k-assemble' : '', className].filter(Boolean).join(' ')}
      style={style}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <path
        className="k-stem"
        d="M440 430H650V720C650 800 600 860 490 860C600 860 650 920 650 1000V1340H440Z"
      />
      <path
        className="k-arm k-arm-upper"
        d="M960 430H1210L840 860C760 860 690 830 660 780Z"
      />
      <path
        className="k-arm k-arm-lower"
        d="M840 860L1265 1340H975L660 960C690 900 760 860 840 860Z"
      />
    </svg>
  )
}
