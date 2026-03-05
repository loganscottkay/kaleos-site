'use client'

import { useEffect, useRef, useCallback } from 'react'

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)
  const rafId = useRef<number>(0)

  const update = useCallback(() => {
    const scrollTop = window.scrollY
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
    if (barRef.current) {
      barRef.current.style.width = `${pct}%`
    }
  }, [])

  useEffect(() => {
    const onScroll = () => {
      cancelAnimationFrame(rafId.current)
      rafId.current = requestAnimationFrame(update)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    update()
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafId.current)
    }
  }, [update])

  return (
    <div className="fixed top-0 left-0 right-0 z-[51] h-[3px] pointer-events-none">
      <div
        ref={barRef}
        className="h-full will-change-[width]"
        style={{
          width: '0%',
          background: 'linear-gradient(90deg, #0d9488, #14b8a6)',
        }}
      />
    </div>
  )
}
