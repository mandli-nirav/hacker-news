import { useSyncExternalStore } from 'react'
import { timeAgo } from '#/lib/format'

// A single shared ticker drives every <RelativeTime> on the page, so we run one
// interval total instead of one per timestamp.
const listeners = new Set<() => void>()
let intervalId: ReturnType<typeof setInterval> | null = null
let currentNow = Date.now()

function subscribe(onChange: () => void) {
  listeners.add(onChange)
  if (intervalId === null) {
    intervalId = setInterval(() => {
      currentNow = Date.now()
      listeners.forEach((l) => l())
    }, 30_000)
  }
  return () => {
    listeners.delete(onChange)
    if (listeners.size === 0 && intervalId !== null) {
      clearInterval(intervalId)
      intervalId = null
    }
  }
}

const getSnapshot = () => currentNow
const getServerSnapshot = () => 0

/** Live-updating relative time (e.g. "5 minutes ago") for a Unix-seconds value. */
export function RelativeTime({ seconds }: { seconds: number }) {
  // Subscribe to the shared ticker so this re-renders as time passes.
  useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  return (
    <time
      dateTime={new Date(seconds * 1000).toISOString()}
      title={new Date(seconds * 1000).toLocaleString()}
      suppressHydrationWarning
    >
      {timeAgo(seconds)}
    </time>
  )
}
