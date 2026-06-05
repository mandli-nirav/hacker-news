import { Link, createFileRoute } from '@tanstack/react-router'
import { useSuspenseQuery, useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { MessageSquare } from 'lucide-react'
import { itemQueryOptions, maxItemQueryOptions } from '#/lib/hn'
import { stripHtml } from '#/lib/format'
import { RelativeTime } from '#/components/relative-time'
import { CommentContext } from '#/components/comment-context'

const INITIAL = 30
const MAX_KEPT = 120

export const Route = createFileRoute('/live')({
  component: Live,
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(maxItemQueryOptions()),
})

function Live() {
  // `maxId` advances in the background (refetchInterval).
  const { data: maxId } = useSuspenseQuery(maxItemQueryOptions())
  const [ids, setIds] = useState<Array<number>>(() =>
    Array.from({ length: INITIAL }, (_, i) => maxId - i),
  )

  // Prepend newly-created items as the max id climbs.
  useEffect(() => {
    setIds((prev) => {
      const top = prev[0] ?? 0
      if (maxId <= top) return prev
      const fresh: Array<number> = []
      for (let i = maxId; i > top && fresh.length < MAX_KEPT; i--) {
        fresh.push(i)
      }
      return [...fresh, ...prev].slice(0, MAX_KEPT)
    })
  }, [maxId])

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-1 text-2xl font-bold tracking-tight">Live</h1>
      <p className="mb-6 text-sm text-muted-foreground">
        The newest items site-wide — stories and comments — as they're posted.
      </p>
      <ul className="space-y-2">
        {ids.map((id) => (
          <LiveItemRow key={id} id={id} />
        ))}
      </ul>
    </main>
  )
}

function LiveItemRow({ id }: { id: number }) {
  const { data: item, isPending } = useQuery(itemQueryOptions(id))

  if (isPending) {
    return <li className="h-12 animate-pulse rounded bg-muted/60" />
  }
  if (!item || item.deleted || item.dead) return null

  const isStory = Boolean(item.title)

  return (
    <li className="rounded-md border border-border px-3 py-2">
      <div className="mb-1 flex items-center gap-2 text-xs text-muted-foreground">
        <span className="rounded bg-muted px-1.5 py-0.5 font-medium text-foreground">
          {item.type}
        </span>
        {item.by && (
          <Link
            to="/user/$id"
            params={{ id: item.by }}
            className="hover:text-foreground hover:underline"
          >
            {item.by}
          </Link>
        )}
        {item.time && <RelativeTime seconds={item.time} />}
      </div>

      {isStory ? (
        <div className="flex items-center justify-between gap-3 text-sm">
          <Link
            to="/story/$id"
            params={{ id: String(item.id) }}
            className="font-medium hover:text-primary hover:underline"
          >
            {item.title}
          </Link>
          <span className="inline-flex shrink-0 items-center gap-0.5 text-xs text-muted-foreground">
            <MessageSquare className="size-3.5" />
            {item.descendants ?? 0}
          </span>
        </div>
      ) : (
        <>
          <p className="line-clamp-3 text-sm wrap-break-word">
            {stripHtml(item.text ?? '')}
          </p>
          <div className="mt-1 text-xs text-muted-foreground">
            <CommentContext commentId={item.id} />
          </div>
        </>
      )}
    </li>
  )
}
