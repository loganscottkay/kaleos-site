import { Fragment, type CSSProperties, type ElementType, type ReactNode } from 'react'

/* Splits a heading into words so each one can rise out of its own mask,
   staggered, when the surrounding Reveal enters. Pure CSS after markup. */
export function Words({
  as: Tag = 'span',
  children,
  className = '',
  id,
}: {
  as?: ElementType
  children: string
  className?: string
  id?: string
}): ReactNode {
  const words = children.split(' ')
  return (
    <Tag id={id} className={`words ${className}`}>
      {words.map((w, i) => (
        <Fragment key={i}>
          <span className="w" style={{ '--i': i } as CSSProperties}>
            <span>{w}</span>
          </span>
          {i < words.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </Tag>
  )
}
