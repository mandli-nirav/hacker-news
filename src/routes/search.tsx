import { createFileRoute } from '@tanstack/react-router'
import { useInfiniteQuery } from '@tanstack/react-query'
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
  const query = useInfiniteQuery(searchQueryOptions(q))
  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
    query

  const hits = data?.pages.flatMap((page) => page.hits) ?? []
  const total = data?.pages[0]?.nbHits ?? 0

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-1 text-2xl font-bold tracking-tight">Search</h1>
      {q ? (
        <p className="mb-6 text-sm text-muted-foreground">
          {isLoading ? 'Searching' : `${total} results`} for “{q}”
        </p>
      ) : (
        <p className="mb-6 text-sm text-muted-foreground">
          Type a query in the search box above.
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
