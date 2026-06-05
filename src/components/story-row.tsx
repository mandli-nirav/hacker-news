import { Link } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ChevronDown, ChevronRight, MessageSquare } from 'lucide-react'
import { itemQueryOptions } from '#/lib/hn'
import { hostname, prefersReducedMotion } from '#/lib/format'
import { Comment } from './comment'
import { UpvoteButton } from './upvote-button'
import { RelativeTime } from './relative-time'
import { Favicon } from './favicon'

export function StoryRow({ id }: { id: number }) {
  const { data: story, isPending } = useQuery(itemQueryOptions(id))
  const [showComments, setShowComments] = useState(false)
  const rowRef = useRef<HTMLLIElement>(null)

  const visible = Boolean(story) && !story?.deleted && !story?.dead

  useGSAP(
    () => {
      if (!visible || prefersReducedMotion()) return
      gsap.from('[data-story-content]', {
        opacity: 0,
        y: 8,
        duration: 0.35,
        ease: 'power2.out',
      })
    },
    { dependencies: [visible], scope: rowRef },
  )

  useGSAP(
    () => {
      if (!showComments || prefersReducedMotion()) return
      gsap.from('[data-comments]', {
        opacity: 0,
        y: -4,
        duration: 0.25,
        ease: 'power2.out',
      })
    },
    { dependencies: [showComments], scope: rowRef },
  )

  // Keep the <li> (and its ref) mounted in every state so the GSAP scope is
  // always valid; only the inner content changes.
  if (isPending) {
    return (
      <li ref={rowRef} className="rounded-md px-2 py-2.5">
        <div className="h-9 w-full animate-pulse rounded bg-muted" />
      </li>
    )
  }

  if (!story || !visible) return <li ref={rowRef} className="hidden" />

  const target =
    story.url ?? `https://news.ycombinator.com/item?id=${story.id}`
  const domain = story.url ? hostname(story.url) : null
  const commentCount = story.descendants ?? 0

  return (
    <li
      ref={rowRef}
      className="rounded-md px-2 py-2.5 transition-colors hover:bg-muted/40"
    >
      <div data-story-content className="min-w-0">
        <div>
          <div className="flex items-start gap-2">
            <Favicon
              url={story.url}
              className="mt-0.5 size-4 shrink-0 rounded-sm"
            />
            <div className="flex flex-wrap items-baseline gap-x-2">
              <a
                href={target}
                target="_blank"
                rel="noreferrer"
                className="font-medium leading-snug hover:text-primary hover:underline"
              >
                {story.title}
              </a>
              {domain && (
                <span className="text-xs text-muted-foreground">({domain})</span>
              )}
            </div>
          </div>
          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
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
            <button
              type="button"
              onClick={() => setShowComments((v) => !v)}
              className="inline-flex items-center gap-0.5 hover:text-foreground"
              aria-expanded={showComments}
              aria-label={showComments ? 'Hide comments' : 'Preview comments'}
            >
              {showComments ? (
                <ChevronDown className="size-3.5" />
              ) : (
                <ChevronRight className="size-3.5" />
              )}
            </button>
            <Link
              to="/story/$id"
              params={{ id: String(story.id) }}
              className="inline-flex items-center gap-0.5 hover:text-foreground hover:underline"
            >
              <MessageSquare className="size-3.5" />
              {commentCount}
            </Link>
          </div>
        </div>
      </div>

      {showComments && (
        <div data-comments className="mt-3 ml-6">
          {story.kids?.length ? (
            <ul className="space-y-3">
              {story.kids.map((kid) => (
                <Comment key={kid} id={kid} />
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">No comments yet.</p>
          )}
        </div>
      )}
    </li>
  )
}
