import { createFileRoute } from '@tanstack/react-router'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useEffect, useRef, useState } from 'react'
import { FEEDS, isStoryList, storyListQueryOptions } from '#/lib/hn'
import type { StoryList } from '#/lib/hn'
import { StoryRow } from '#/components/story-row'

const PAGE_SIZE = 30

export const Route = createFileRoute('/')({
  component: Home,
  validateSearch: (search: Record<string, unknown>): { feed: StoryList } => ({
    feed: isStoryList(search.feed) ? search.feed : 'topstories',
  }),
  loaderDeps: ({ search }) => ({ feed: search.feed }),
  loader: ({ context, deps }) =>
    context.queryClient.ensureQueryData(storyListQueryOptions(deps.feed)),
})

function Home() {
  const { feed } = Route.useSearch()
  const { data: ids } = useSuspenseQuery(storyListQueryOptions(feed))

  const [count, setCount] = useState(PAGE_SIZE)
  const sentinelRef = useRef<HTMLDivElement>(null)

  // Reset paging whenever the feed changes.
  useEffect(() => setCount(PAGE_SIZE), [feed])

  // Load the next page when the sentinel scrolls into view.
  useEffect(() => {
    const el = sentinelRef.current
    if (!el) return
    const observer = new IntersectionObserver((entries) => {
      if (entries[0]?.isIntersecting) {
        setCount((c) => Math.min(c + PAGE_SIZE, ids.length))
      }
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [ids.length])

  const visibleIds = ids.slice(0, count)
  const feedLabel = FEEDS.find((f) => f.value === feed)?.label ?? 'Top'

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold tracking-tight">
        {feedLabel} Stories
      </h1>
      <ol className="space-y-1">
        {visibleIds.map((id, index) => (
          <StoryRow key={id} id={id} rank={index + 1} />
        ))}
      </ol>
      {count < ids.length && (
        <div
          ref={sentinelRef}
          className="py-8 text-center text-sm text-muted-foreground"
        >
          Loading more…
        </div>
      )}
    </main>
  )
}
