// Signature element: a thin track passing through a checkpoint chip.
// Static divider variant; the hero's animated moment lives in GateFlow.
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
