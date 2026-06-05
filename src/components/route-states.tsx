import { Link, useRouter } from '@tanstack/react-router'
import type { ErrorComponentProps } from '@tanstack/react-router'
import { AlertTriangle, Home, RotateCw, SearchX } from 'lucide-react'

/** Shown when a route loader or render throws. */
export function ErrorState({ error, reset }: ErrorComponentProps) {
  const router = useRouter()

  return (
    <main className="mx-auto flex max-w-3xl flex-col items-center gap-3 px-4 py-20 text-center">
      <AlertTriangle className="size-8 text-destructive" />
      <h1 className="text-lg font-semibold">Something went wrong</h1>
      <p className="max-w-md text-sm text-muted-foreground">
        {error.message || 'An unexpected error occurred while loading this page.'}
      </p>
      <button
        type="button"
        onClick={() => {
          reset()
          void router.invalidate()
        }}
        className="mt-2 inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
      >
        <RotateCw className="size-4" />
        Try again
      </button>
    </main>
  )
}

/** Shown when a route calls `notFound()` or a path doesn't match. */
export function NotFound({ message }: { message?: string }) {
  return (
    <main className="mx-auto flex max-w-3xl flex-col items-center gap-3 px-4 py-20 text-center">
      <SearchX className="size-8 text-muted-foreground" />
      <h1 className="text-lg font-semibold">Not found</h1>
      <p className="max-w-md text-sm text-muted-foreground">
        {message ?? "The page you're looking for doesn't exist."}
      </p>
      <Link
        to="/"
        search={{ feed: 'topstories' }}
        className="mt-2 inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-sm transition-colors hover:bg-muted"
      >
        <Home className="size-4" />
        Back to stories
      </Link>
    </main>
  )
}

/** Shown while a route's loader is running during navigation. */
export function PendingSkeleton() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <div className="mb-6 h-7 w-40 animate-pulse rounded bg-muted" />
      <ul className="space-y-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <li key={i} className="flex gap-3">
            <div className="h-9 w-6 shrink-0 animate-pulse rounded bg-muted" />
            <div className="h-9 w-full animate-pulse rounded bg-muted" />
          </li>
        ))}
      </ul>
    </main>
  )
}
