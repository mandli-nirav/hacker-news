/** Strip protocol/`www.` and return the bare host, or the original string on failure. */
export function hostname(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return url
  }
}

/** Favicon URL for a story; falls back to the HN favicon for text posts (no url). */
export function faviconUrl(url?: string): string {
  const domain = url ? hostname(url) : 'news.ycombinator.com'
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`
}

/** True when the user has requested reduced motion (client-only). */
export function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

/** Human-friendly relative time from a Unix-seconds timestamp. */
export function timeAgo(unixSeconds: number): string {
  const seconds = Math.max(0, Date.now() / 1000 - unixSeconds)
  const units: Array<[label: string, secs: number]> = [
    ['year', 31536000],
    ['month', 2592000],
    ['day', 86400],
    ['hour', 3600],
    ['minute', 60],
  ]
  for (const [label, secs] of units) {
    const value = Math.floor(seconds / secs)
    if (value >= 1) return `${value} ${label}${value > 1 ? 's' : ''} ago`
  }
  return 'just now'
}
