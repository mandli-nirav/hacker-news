import { Link, useSearch } from '@tanstack/react-router'
import { Newspaper } from 'lucide-react'
import { FEEDS } from '#/lib/hn'
import { ThemeToggle } from './theme-toggle'

export function Header() {
  // Read the feed loosely — the header renders on every route, not just '/'.
  const search = useSearch({ strict: false })
  const activeFeed = search.feed ?? 'topstories'

  return (
    <header className="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-3xl items-center gap-2 px-4 py-2">
        <Link
          to="/"
          search={{ feed: 'topstories' }}
          className="mr-1 inline-flex items-center gap-1.5 font-bold tracking-tight"
        >
          <Newspaper className="size-5 text-primary" />
          HN
        </Link>

        <nav className="flex flex-1 items-center gap-1 overflow-x-auto">
          {FEEDS.map((feed) => {
            const isActive = feed.value === activeFeed
            return (
              <Link
                key={feed.value}
                to="/"
                search={{ feed: feed.value }}
                className={
                  'rounded-md px-2.5 py-1 text-sm transition-colors ' +
                  (isActive
                    ? 'bg-primary/10 font-medium text-primary'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground')
                }
              >
                {feed.label}
              </Link>
            )
          })}
        </nav>

        <ThemeToggle />
      </div>
    </header>
  )
}
