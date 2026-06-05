import { Link, createFileRoute, notFound } from '@tanstack/react-router'
import { useSuspenseQuery } from '@tanstack/react-query'
import { ArrowLeft, MessageSquare } from 'lucide-react'
import { itemQueryOptions } from '#/lib/hn'
import { hostname } from '#/lib/format'
import { Comment } from '#/components/comment'
import { SafeHtml } from '#/components/safe-html'
import { PollOptions } from '#/components/poll-options'
import { UpvoteButton } from '#/components/upvote-button'
import { RelativeTime } from '#/components/relative-time'
import { NotFound } from '#/components/route-states'

export const Route = createFileRoute('/story/$id')({
  component: StoryDetail,
  notFoundComponent: () => <NotFound message="That story doesn't exist." />,
  loader: async ({ context, params }) => {
    const id = Number(params.id)
    if (!Number.isInteger(id)) throw notFound()
    const item = await context.queryClient.ensureQueryData(itemQueryOptions(id))
    if (!item) throw notFound()
    return item
  },
  head: ({ loaderData }) => {
    const title = loaderData?.title ?? 'Story'
    const description = loaderData?.by
      ? `${title} — ${loaderData.score ?? 0} points by ${loaderData.by} · ${loaderData.descendants ?? 0} comments on Hacker News`
      : title
    return {
      meta: [
        { title: `${title} | Hacker News` },
        { name: 'description', content: description },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { name: 'twitter:title', content: title },
        { name: 'twitter:description', content: description },
      ],
    }
  },
})

function StoryDetail() {
  const id = Number(Route.useParams().id)
  const { data: story } = useSuspenseQuery(itemQueryOptions(id))

  if (!story) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-8">
        <p className="text-muted-foreground">Story not found.</p>
      </main>
    )
  }

  const target =
    story.url ?? `https://news.ycombinator.com/item?id=${story.id}`
  const domain = story.url ? hostname(story.url) : null

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <Link
        to="/"
        search={{ feed: 'topstories' }}
        className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Back
      </Link>

      <article>
        <h1 className="text-xl font-bold leading-tight">
          <a
            href={target}
            target="_blank"
            rel="noreferrer"
            className="hover:text-primary hover:underline"
          >
            {story.title}
          </a>
          {domain && (
            <span className="ml-2 text-sm font-normal text-muted-foreground">
              ({domain})
            </span>
          )}
        </h1>

        <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          <UpvoteButton id={story.id} score={story.score ?? 0} />
          {story.by && (
            <Link
              to="/user/$id"
              params={{ id: story.by }}
              className="hover:text-foreground hover:underline"
            >
              by {story.by}
            </Link>
          )}
          {story.time && <RelativeTime seconds={story.time} />}
          <span className="inline-flex items-center gap-0.5">
            <MessageSquare className="size-3.5" />
            {story.descendants ?? 0}
          </span>
        </div>

        {story.text && (
          <SafeHtml
            html={story.text}
            className="mt-4 text-sm leading-relaxed wrap-break-word [&_a]:text-primary [&_a]:underline [&_p]:my-2"
          />
        )}

        {story.parts && story.parts.length > 0 && (
          <PollOptions partIds={story.parts} />
        )}
      </article>

      <section className="mt-8">
        <h2 className="mb-3 text-sm font-semibold text-muted-foreground">
          {story.descendants ?? 0} Comments
        </h2>
        {story.kids?.length ? (
          <ul className="space-y-4">
            {story.kids.map((kid) => (
              <Comment key={kid} id={kid} />
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground">No comments yet.</p>
        )}
      </section>
    </main>
  )
}
