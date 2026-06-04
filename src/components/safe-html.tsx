import { useEffect, useState } from 'react'

/**
 * Renders HN-provided HTML (comment/story bodies). HN sanitizes this server-side
 * and only allows a small tag set, so it's rendered as-is on the server; on the
 * client we additionally run it through DOMPurify as defense-in-depth.
 *
 * DOMPurify is dynamically imported client-side only — it needs a DOM and would
 * not run in the Cloudflare Workers SSR environment.
 */
export function SafeHtml({
  html,
  className,
}: {
  html: string
  className?: string
}) {
  const [clean, setClean] = useState(html)

  useEffect(() => {
    let active = true
    void import('dompurify').then(({ default: DOMPurify }) => {
      if (active) setClean(DOMPurify.sanitize(html))
    })
    return () => {
      active = false
    }
  }, [html])

  return (
    <div
      className={className}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: clean }}
    />
  )
}
