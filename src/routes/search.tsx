import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { Search as SearchIcon } from 'lucide-react'
import { searchQueryOptions } from '#/lib/algolia'
import { StoryRow } from '#/components/story-row'

export const Route = createFileRoute('/search')({
  component: Search,
  validateSearch: (search: Record<string, unknown>): { q: string } => ({
    q: typeof search.q === 'string' ? search.q : '',
  }),
})

function Search() {
  const { q } = Route.useSearch()
  const navigate = useNavigate()
  const [input, setInput] = useState(q)

  // Keep the box in sync if q changes via the URL (e.g. header search).
  useEffect(() => setInput(q), [q])

  const query = useInfiniteQuery(searchQueryOptions(q))
  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
    query

  const hits = data?.pages.flatMap((page) => page.hits) ?? []
  const total = data?.pages[0]?.nbHits ?? 0

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    void navigate({ to: '/search', search: { q: input.trim() } })
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-4 text-2xl font-bold tracking-tight">Search</h1>

      <form onSubmit={onSubmit} className="relative mb-6">
        <SearchIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search Hacker News…"
          aria-label="Search stories"
          autoFocus
          className="w-full rounded-md border border-border bg-transparent py-2 pr-3 pl-9 text-sm outline-none focus:border-ring"
        />
      </form>

      {q && (
        <p className="mb-4 text-sm text-muted-foreground">
          {isLoading ? 'Searching' : `${total} results`} for “{q}”
        </p>
      )}

      {q && !isLoading && hits.length === 0 && (
        <p className="text-sm text-muted-foreground">No stories found.</p>
      )}

      <ol className="space-y-1">
        {hits.map((hit) => (
          <StoryRow key={hit.objectID} id={Number(hit.objectID)} />
        ))}
      </ol>

      {hasNextPage && (
        <div className="py-6 text-center">
          <button
            type="button"
            onClick={() => void fetchNextPage()}
            disabled={isFetchingNextPage}
            className="rounded-md border border-border px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:opacity-50"
          >
            {isFetchingNextPage ? 'Loading…' : 'Load more'}
          </button>
        </div>
      )}
    </main>
  )
}
