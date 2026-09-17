import Image from 'next/image'

/* The mark, from the supplied artwork (public/kaleos-k.png, white on
   transparent). Never redrawn. Sized by height through className. */
export function KLogo({
  className = '',
  priority = false,
  alt = '',
}: {
  className?: string
  priority?: boolean
  alt?: string
}) {
  return (
    <Image
      src="/kaleos-k.png"
      alt={alt}
      width={938}
      height={1020}
      priority={priority}
      className={`w-auto select-none ${className}`}
      draggable={false}
    />
  )
}
