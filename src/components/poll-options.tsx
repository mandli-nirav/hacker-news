import { useQueries } from '@tanstack/react-query'
import { itemQueryOptions } from '#/lib/hn'

/** Renders a poll's options (`pollopt` items) with relative vote bars. */
export function PollOptions({ partIds }: { partIds: Array<number> }) {
  const results = useQueries({
    queries: partIds.map((id) => itemQueryOptions(id)),
  })

  const options = results
    .map((r) => r.data)
    .filter((o): o is NonNullable<typeof o> => Boolean(o))
  const maxScore = Math.max(1, ...options.map((o) => o.score ?? 0))

  if (results.some((r) => r.isPending)) {
    return (
      <ul className="mt-4 space-y-2">
        {partIds.map((id) => (
          <li key={id} className="h-9 animate-pulse rounded bg-muted/60" />
        ))}
      </ul>
    )
  }

  return (
    <ul className="mt-4 space-y-2">
      {options.map((opt) => {
        const score = opt.score ?? 0
        return (
          <li
            key={opt.id}
            className="relative overflow-hidden rounded-md border border-border px-3 py-2"
          >
            <div
              className="absolute inset-y-0 left-0 bg-primary/10"
              style={{ width: `${(score / maxScore) * 100}%` }}
              aria-hidden
            />
            <div className="relative flex items-center justify-between gap-3 text-sm">
              <span className="wrap-break-word">{opt.text}</span>
              <span className="shrink-0 font-medium text-primary">{score}</span>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
