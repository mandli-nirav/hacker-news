import { useEffect } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { updatesQueryOptions } from '#/lib/hn'

/**
 * Subscribes to the HN `/updates` feed and surgically refreshes only the items
 * and profiles that actually changed — but only the ones we already have cached,
 * so we never fetch data the user isn't looking at. This is the precise version
 * of "live data": an edited score, a new reply, or a karma change updates in
 * place without polling whole lists.
 *
 * Renders nothing; mount once near the app root.
 */
export function LiveUpdates() {
  const queryClient = useQueryClient()
  const { data } = useQuery(updatesQueryOptions())

  useEffect(() => {
    if (!data) return

    for (const id of data.items) {
      const key = ['hn', 'item', id]
      if (queryClient.getQueryData(key) !== undefined) {
        void queryClient.invalidateQueries({ queryKey: key })
      }
    }

    for (const username of data.profiles) {
      const key = ['hn', 'user', username]
      if (queryClient.getQueryData(key) !== undefined) {
        void queryClient.invalidateQueries({ queryKey: key })
      }
    }
  }, [data, queryClient])

  return null
}
