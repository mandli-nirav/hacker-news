import { createFileRoute } from '@tanstack/react-router'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useEffect, useMemo, useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ArrowUp } from 'lucide-react'
import { FEEDS, isStoryList, storyListQueryOptions } from '#/lib/hn'
import type { StoryList } from '#/lib/hn'
import { prefersReducedMotion } from '#/lib/format'
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
  // `ids` updates silently in the background (refetchInterval/on-focus).
  const { data: ids } = useSuspenseQuery(storyListQueryOptions(feed))

  // The ids we're actually rendering. We don't follow `ids` automatically —
  // new stories are held back behind a banner so the list never jumps.
  const [pinned, setPinned] = useState<{ feed: StoryList; ids: Array<number> }>(
    { feed, ids },
  )
  const [count, setCount] = useState(PAGE_SIZE)

  // Reset the pinned list when the feed changes (derived-state reset pattern).
  if (pinned.feed !== feed) {
    setPinned({ feed, ids })
    setCount(PAGE_SIZE)
  }

  const sentinelRef = useRef<HTMLDivElement>(null)
  const bannerRef = useRef<HTMLDivElement>(null)

  // Count brand-new stories at the top of the latest list.
  const newCount = useMemo(() => {
    const shown = new Set(pinned.ids)
    let c = 0
    for (const id of ids) {
      if (shown.has(id)) break
      c++
    }
    return c
  }, [ids, pinned.ids])

  // Infinite scroll over the pinned list.
  useEffect(() => {
    const el = sentinelRef.current
    if (!el) return
    const observer = new IntersectionObserver((entries) => {
      if (entries[0]?.isIntersecting) {
        setCount((c) => Math.min(c + PAGE_SIZE, pinned.ids.length))
      }
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [pinned.ids.length])

  // Animate the banner in when new stories arrive.
  useGSAP(
    () => {
      if (newCount === 0 || prefersReducedMotion() || !bannerRef.current) return
      gsap.from(bannerRef.current, {
        y: -8,
        opacity: 0,
        duration: 0.25,
        ease: 'power2.out',
      })
    },
    { dependencies: [newCount > 0] },
  )

  function reveal() {
    setPinned({ feed, ids })
    setCount((c) => Math.max(c, PAGE_SIZE))
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    })
  }

  const visibleIds = pinned.ids.slice(0, count)
  const feedLabel = FEEDS.find((f) => f.value === feed)?.label ?? 'Top'

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold tracking-tight">
        {feedLabel} Stories
      </h1>

      {newCount > 0 && (
        <div ref={bannerRef} className="mb-4 flex justify-center">
          <button
            type="button"
            onClick={reveal}
            className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground shadow-sm transition-opacity hover:opacity-90"
          >
            <ArrowUp className="size-4" />
            {newCount} new {newCount === 1 ? 'story' : 'stories'}
          </button>
        </div>
      )}

      <ol className="space-y-1">
        {visibleIds.map((id, index) => (
          <StoryRow key={id} id={id} rank={index + 1} />
        ))}
      </ol>

      {count < pinned.ids.length && (
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
