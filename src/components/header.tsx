import { Link, useNavigate, useSearch } from '@tanstack/react-router'
import { useState } from 'react'
import { Newspaper, Search } from 'lucide-react'
import { FEEDS } from '#/lib/hn'
import { ThemeToggle } from './theme-toggle'

export function Header() {
  // Read the feed loosely — the header renders on every route, not just '/'.
  const search = useSearch({ strict: false })
  const activeFeed = search.feed ?? 'topstories'
  const navigate = useNavigate()
  const [query, setQuery] = useState('')

  function onSearch(e: React.FormEvent) {
    e.preventDefault()
    const q = query.trim()
    if (q) void navigate({ to: '/search', search: { q } })
  }

  const tabClass = 'shrink-0 rounded-md px-2.5 py-1 text-sm transition-colors '
  const activeClass = 'bg-primary/10 font-medium text-primary'
  const inactiveClass =
    'text-muted-foreground hover:bg-muted hover:text-foreground'

  const tabs = (
    <>
      {FEEDS.map((feed) => (
        <Link
          key={feed.value}
          to="/"
          search={{ feed: feed.value }}
          className={tabClass + (feed.value === activeFeed ? activeClass : inactiveClass)}
        >
          {feed.label}
        </Link>
      ))}
      <Link
        to="/live"
        className={tabClass}
        activeProps={{ className: activeClass }}
        inactiveProps={{ className: inactiveClass }}
      >
        Live
      </Link>
    </>
  )

  return (
    <header className="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto max-w-3xl px-4 py-2">
        <div className="flex items-center gap-2">
          <Link
            to="/"
            search={{ feed: 'topstories' }}
            className="inline-flex shrink-0 items-center gap-1.5 font-bold tracking-tight"
          >
            <Newspaper className="size-5 text-primary" />
            HN
          </Link>

          {/* Desktop: tabs inline. */}
          <nav className="no-scrollbar hidden flex-1 items-center gap-1 overflow-x-auto sm:flex">
            {tabs}
          </nav>

          {/* Mobile: push actions to the right. */}
          <div className="flex-1 sm:hidden" />

          <form onSubmit={onSearch} className="relative hidden sm:block">
            <Search className="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search…"
              aria-label="Search stories"
              className="w-32 rounded-md border border-border bg-transparent py-1 pr-2 pl-8 text-sm outline-none transition-[width,color] focus:w-48 focus:border-ring"
            />
          </form>

          {/* Mobile: search icon links to the search page. */}
          <Link
            to="/search"
            search={{ q: '' }}
            aria-label="Search"
            className="inline-flex size-9 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground sm:hidden"
          >
            <Search className="size-4" />
          </Link>

          <ThemeToggle />
        </div>

        {/* Mobile: full-width scrollable tab strip. */}
        <nav className="no-scrollbar -mx-1 mt-2 flex items-center gap-1 overflow-x-auto px-1 sm:hidden">
          {tabs}
        </nav>
      </div>
    </header>
  )
}
