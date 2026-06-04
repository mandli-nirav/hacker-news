import axios from 'axios'
import { infiniteQueryOptions } from '@tanstack/react-query'

/** Algolia's Hacker News Search API (the official HN API has no search). */
export const algoliaClient = axios.create({
  baseURL: 'https://hn.algolia.com/api/v1',
})

export interface AlgoliaHit {
  objectID: string
  title: string | null
  url: string | null
  author: string
  points: number | null
  num_comments: number | null
  created_at_i: number
}

export interface AlgoliaResponse {
  hits: Array<AlgoliaHit>
  page: number
  nbPages: number
  nbHits: number
}

const HITS_PER_PAGE = 20

async function search(query: string, page: number): Promise<AlgoliaResponse> {
  const { data } = await algoliaClient.get<AlgoliaResponse>('/search', {
    params: { query, tags: 'story', page, hitsPerPage: HITS_PER_PAGE },
  })
  return data
}

export const searchQueryOptions = (query: string) =>
  infiniteQueryOptions({
    queryKey: ['hn', 'search', query],
    queryFn: ({ pageParam }) => search(query, pageParam),
    initialPageParam: 0,
    getNextPageParam: (last) =>
      last.page + 1 < last.nbPages ? last.page + 1 : undefined,
    enabled: query.trim().length > 0,
  })
