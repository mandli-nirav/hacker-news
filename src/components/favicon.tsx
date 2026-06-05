import { useState } from 'react'
import { Globe } from 'lucide-react'
import { faviconUrl } from '#/lib/format'

/**
 * Domain favicon with a graceful fallback: the favicon service returns 404 for
 * domains it has no icon for, which would render a broken image — so on error
 * we swap in a neutral globe icon instead.
 */
export function Favicon({ url, className }: { url?: string; className?: string }) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return <Globe aria-hidden className={`text-muted-foreground ${className ?? ''}`} />
  }

  return (
    <img
      src={faviconUrl(url)}
      alt=""
      aria-hidden
      loading="lazy"
      onError={() => setFailed(true)}
      className={className}
    />
  )
}
