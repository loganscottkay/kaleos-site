/* The lit edge of a planet: a wide arc with an atmosphere glow. The light
   along the rim travels with the scroll (ScrollFx). Decorative only. */
export function Rim() {
  return (
    <div aria-hidden="true" data-fx="rim" className="pointer-events-none absolute inset-x-0 top-0 overflow-hidden">
      <svg className="rim" viewBox="0 0 1600 260" preserveAspectRatio="none">
        <defs>
          <linearGradient id="rim-light" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#63d9e6" stopOpacity="0" />
            <stop offset="0.5" stopColor="#f7f7f4" stopOpacity="1" />
            <stop offset="1" stopColor="#ff5fa2" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="rim-atmo" cx="0.5" cy="1" r="0.75">
            <stop offset="0" stopColor="#63d9e6" stopOpacity="0.16" />
            <stop offset="0.45" stopColor="#8b7cf8" stopOpacity="0.06" />
            <stop offset="1" stopColor="#8b7cf8" stopOpacity="0" />
          </radialGradient>
        </defs>
        <path className="rim-glow" d="M-200 260 Q 800 -140 1800 260 Z" />
        <path className="rim-arc" d="M-200 260 Q 800 -140 1800 260" />
      </svg>
    </div>
  )
}
