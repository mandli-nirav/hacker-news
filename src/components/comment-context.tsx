import { Link } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { rootStoryQueryOptions } from '#/lib/hn'

/**
 * Resolves a comment's `parent` chain to its root story and links to it
 * internally, e.g. "in reply to <story title>".
 */
export function CommentContext({
  commentId,
  className,
}: {
  commentId: number
  className?: string
}) {
  const { data: root } = useQuery(rootStoryQueryOptions(commentId))

  if (!root || !root.title) return null

  return (
    <Link
      to="/story/$id"
      params={{ id: String(root.id) }}
      className={className ?? 'hover:text-foreground hover:underline'}
    >
      in reply to {root.title}
    </Link>
  )
}
