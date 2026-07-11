// Signature element: a thin track passing through a checkpoint chip.
// Static divider variant; the hero's animated moment lives in GateFlow.
export function GateRule({ onDark = false }: { onDark?: boolean }) {
  return (
    <div
      className={`gate-rule ${onDark ? 'on-dark' : ''}`}
      aria-hidden="true"
    />
  )
}
