import { Link } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { itemQueryOptions } from '#/lib/hn'
import { prefersReducedMotion, timeAgo } from '#/lib/format'
import { SafeHtml } from './safe-html'

export function Comment({ id }: { id: number }) {
  const { data: comment, isPending } = useQuery(itemQueryOptions(id))
  const [collapsed, setCollapsed] = useState(false)
  const commentRef = useRef<HTMLLIElement>(null)

  const visible = Boolean(comment) && !comment?.deleted && !comment?.dead

  useGSAP(
    () => {
      if (!visible || !commentRef.current || prefersReducedMotion()) return
      gsap.from(commentRef.current, {
        opacity: 0,
        x: -8,
        duration: 0.3,
        ease: 'power2.out',
      })
    },
    { dependencies: [visible], scope: commentRef },
  )

  // Keep the <li> (and its ref) mounted in every state so the GSAP scope is
  // always valid; only the inner content changes.
  if (isPending) {
    return (
      <li ref={commentRef} className="h-12 animate-pulse rounded bg-muted/60" />
    )
  }

  if (!comment || !visible) return <li ref={commentRef} className="hidden" />

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
          <Link
            to="/user/$id"
            params={{ id: comment.by }}
            className="font-medium hover:underline"
          >
            {comment.by}
          </Link>
        )}
        {comment.time && <span>{timeAgo(comment.time)}</span>}
      </div>

      {!collapsed && (
        <>
          <SafeHtml
            html={comment.text ?? ''}
            className="mt-1 leading-relaxed wrap-break-word [&_a]:text-primary [&_a]:underline [&_p]:my-2 [&_pre]:overflow-x-auto [&_pre]:rounded [&_pre]:bg-muted [&_pre]:p-2 [&_pre]:text-xs"
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
