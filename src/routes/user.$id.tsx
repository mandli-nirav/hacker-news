import { Link, createFileRoute } from '@tanstack/react-router'
import { useSuspenseQuery, useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { itemQueryOptions, userQueryOptions } from '#/lib/hn'
import { timeAgo } from '#/lib/format'
import { SafeHtml } from '#/components/safe-html'

const SUBMISSION_PAGE = 30

export const Route = createFileRoute('/user/$id')({
  component: UserProfile,
  loader: ({ context, params }) =>
    context.queryClient.ensureQueryData(userQueryOptions(params.id)),
  head: ({ params }) => ({
    meta: [
      { title: `${params.id} | Hacker News` },
      {
        name: 'description',
        content: `Profile, karma, and submissions for ${params.id} on Hacker News.`,
      },
      { property: 'og:title', content: `${params.id} | Hacker News` },
    ],
  }),
})

function UserProfile() {
  const id = Route.useParams().id
  const { data: user } = useSuspenseQuery(userQueryOptions(id))
  const [count, setCount] = useState(SUBMISSION_PAGE)

  if (!user) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-8">
        <p className="text-muted-foreground">User “{id}” not found.</p>
      </main>
    )
  }

  const submitted = user.submitted ?? []
  const visible = submitted.slice(0, count)

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <header>
        <h1 className="text-2xl font-bold tracking-tight">{user.id}</h1>
        <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
          <span>
            <span className="font-medium text-primary">{user.karma}</span> karma
          </span>
          <span>joined {timeAgo(user.created)}</span>
          <span>{submitted.length} submissions</span>
        </div>
        {user.about && (
          <SafeHtml
            html={user.about}
            className="mt-3 text-sm leading-relaxed wrap-break-word [&_a]:text-primary [&_a]:underline [&_p]:my-2"
          />
        )}
      </header>

      <section className="mt-8">
        <h2 className="mb-3 text-sm font-semibold text-muted-foreground">
          Recent activity
        </h2>
        {visible.length ? (
          <ul className="space-y-1">
            {visible.map((itemId) => (
              <SubmissionRow key={itemId} id={itemId} />
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground">No submissions.</p>
        )}
        {count < submitted.length && (
          <button
            type="button"
            onClick={() => setCount((c) => c + SUBMISSION_PAGE)}
            className="mt-4 rounded-md border border-border px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            Show more
          </button>
        )}
      </section>
    </main>
  )
}

function SubmissionRow({ id }: { id: number }) {
  const { data: item, isPending } = useQuery(itemQueryOptions(id))

  if (isPending) {
    return <li className="h-8 animate-pulse rounded bg-muted/60" />
  }
  if (!item || item.deleted || item.dead) return null

  // Stories / jobs / polls have a title; comments don't.
  if (item.title) {
    return (
      <li className="text-sm">
        <Link
          to="/story/$id"
          params={{ id: String(item.id) }}
          className="font-medium hover:text-primary hover:underline"
        >
          {item.title}
        </Link>
        <span className="ml-2 text-xs text-muted-foreground">
          {item.score ?? 0} points · {item.descendants ?? 0} comments ·{' '}
          {item.time ? timeAgo(item.time) : ''}
        </span>
      </li>
    )
  }

  // Comment: link to its thread on HN.
  return (
    <li className="text-sm text-muted-foreground">
      <a
        href={`https://news.ycombinator.com/item?id=${item.id}`}
        target="_blank"
        rel="noreferrer"
        className="hover:text-foreground hover:underline"
      >
        comment {item.time ? `· ${timeAgo(item.time)}` : ''}
      </a>
    </li>
  )
}
