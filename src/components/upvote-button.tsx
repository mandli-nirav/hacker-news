import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { ArrowBigUp } from 'lucide-react'
import { itemQueryOptions } from '#/lib/hn'

/**
 * Optimistic, client-only upvote. Bumps the item's cached score instantly via
 * setQueryData. The HN API is read-only, so this does not persist — the score
 * resets on the next background refetch of the item.
 */
export function UpvoteButton({
  id,
  score,
  className,
}: {
  id: number
  score: number
  className?: string
}) {
  const queryClient = useQueryClient()
  const [voted, setVoted] = useState(false)

  function upvote() {
    if (voted) return
    setVoted(true)
    queryClient.setQueryData(itemQueryOptions(id).queryKey, (old) =>
      old ? { ...old, score: (old.score ?? 0) + 1 } : old,
    )
  }

  return (
    <button
      type="button"
      onClick={upvote}
      disabled={voted}
      aria-label="Upvote"
      aria-pressed={voted}
      className={
        'inline-flex items-center gap-0.5 font-medium text-primary transition-transform hover:scale-105 disabled:hover:scale-100 ' +
        (className ?? '')
      }
    >
      <ArrowBigUp className={`size-3.5 ${voted ? 'fill-primary' : ''}`} />
      {score}
    </button>
  )
}
