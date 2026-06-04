import { useQuery } from '@tanstack/react-query'
import { useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { itemQueryOptions } from '#/lib/hn'
import { timeAgo } from '#/lib/format'

export function Comment({ id }: { id: number }) {
  const { data: comment, isPending } = useQuery(itemQueryOptions(id))
  const [collapsed, setCollapsed] = useState(false)
  const commentRef = useRef<HTMLLIElement>(null)

  useGSAP(
    () => {
      if (!comment) return
      gsap.from(commentRef.current, {
        opacity: 0,
        x: -8,
        duration: 0.3,
        ease: 'power2.out',
      })
    },
    { dependencies: [Boolean(comment)], scope: commentRef },
  )

  if (isPending) {
    return <li className="h-12 animate-pulse rounded bg-muted/60" />
  }

  if (!comment || comment.deleted || comment.dead) return null

  const kidCount = comment.kids?.length ?? 0

  return (
    <li ref={commentRef} className="text-sm">
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <button
          type="button"
          onClick={() => setCollapsed((v) => !v)}
          className="rounded px-1 hover:bg-muted hover:text-foreground"
          aria-expanded={!collapsed}
        >
          {collapsed ? `[+${kidCount + 1}]` : '[–]'}
        </button>
        {comment.by && (
          <a
            href={`https://news.ycombinator.com/user?id=${comment.by}`}
            target="_blank"
            rel="noreferrer"
            className="font-medium hover:underline"
          >
            {comment.by}
          </a>
        )}
        {comment.time && <span>{timeAgo(comment.time)}</span>}
      </div>

      {!collapsed && (
        <>
          <div
            className="mt-1 leading-relaxed wrap-break-word [&_a]:text-primary [&_a]:underline [&_p]:my-2 [&_pre]:overflow-x-auto [&_pre]:rounded [&_pre]:bg-muted [&_pre]:p-2 [&_pre]:text-xs"
            dangerouslySetInnerHTML={{ __html: comment.text ?? '' }}
          />
          {kidCount > 0 && (
            <ul className="mt-2 space-y-3 border-l border-border pl-3">
              {comment.kids!.map((kid) => (
                <Comment key={kid} id={kid} />
              ))}
            </ul>
          )}
        </>
      )}
    </li>
  )
}
