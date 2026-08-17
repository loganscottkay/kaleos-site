// Signature element: a thin track passing through a checkpoint chip.
// Static section divider; the animated expression of the same idea is
// the hero's ApprovalQueue.
export function GateRule({
  onDark = false,
  align = 'center',
}: {
  onDark?: boolean
  align?: 'center' | 'start'
}) {
  return (
    <div
      className={`gate-rule ${onDark ? 'on-dark' : ''} ${
        align === 'start' ? 'align-start' : ''
      }`}
      aria-hidden="true"
    />
  )
}
