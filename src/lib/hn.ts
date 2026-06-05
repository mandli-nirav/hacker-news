import axios from 'axios'
import { queryOptions } from '@tanstack/react-query'

/** Axios instance for the official Hacker News API. */
export const hnClient = axios.create({
  baseURL: 'https://hacker-news.firebaseio.com/v0',
})

export type ItemType = 'job' | 'story' | 'comment' | 'poll' | 'pollopt'

export interface Item {
  id: number
  type: ItemType
  by?: string
  time?: number
  text?: string
  url?: string
  title?: string
  score?: number
  descendants?: number
  kids?: Array<number>
  parent?: number
  parts?: Array<number>
  deleted?: boolean
  dead?: boolean
}

export interface User {
  id: string
  created: number
  karma: number
  about?: string
  submitted?: Array<number>
}

export type StoryList =
  | 'topstories'
  | 'newstories'
  | 'beststories'
  | 'askstories'
  | 'showstories'
  | 'jobstories'

export const FEEDS = [
  { value: 'topstories', label: 'Top' },
  { value: 'newstories', label: 'New' },
  { value: 'beststories', label: 'Best' },
  { value: 'askstories', label: 'Ask' },
  { value: 'showstories', label: 'Show' },
  { value: 'jobstories', label: 'Jobs' },
] as const satisfies ReadonlyArray<{ value: StoryList; label: string }>

const FEED_VALUES = new Set<string>(FEEDS.map((f) => f.value))

export function isStoryList(value: unknown): value is StoryList {
  return typeof value === 'string' && FEED_VALUES.has(value)
}

async function fetchItem(id: number): Promise<Item | null> {
  const { data } = await hnClient.get<Item | null>(`/item/${id}.json`)
  return data
}

async function fetchUser(id: string): Promise<User | null> {
  const { data } = await hnClient.get<User | null>(`/user/${id}.json`)
  return data
}

async function fetchStoryIds(list: StoryList): Promise<Array<number>> {
  const { data } = await hnClient.get<Array<number>>(`/${list}.json`)
  return data
}

export const itemQueryOptions = (id: number) =>
  queryOptions({
    queryKey: ['hn', 'item', id],
    queryFn: () => fetchItem(id),
  })

export const userQueryOptions = (id: string) =>
  queryOptions({
    queryKey: ['hn', 'user', id],
    queryFn: () => fetchUser(id),
  })

export const storyListQueryOptions = (list: StoryList) =>
  queryOptions({
    queryKey: ['hn', 'list', list],
    queryFn: () => fetchStoryIds(list),
    // Keep the feed live: silently refetch in the background and on focus.
    refetchInterval: 30_000,
    refetchOnWindowFocus: true,
  })

/** Recently changed item ids and usernames (the API's live-data endpoint). */
export interface Updates {
  items: Array<number>
  profiles: Array<string>
}

async function fetchUpdates(): Promise<Updates> {
  const { data } = await hnClient.get<Updates>('/updates.json')
  return data
}

export const updatesQueryOptions = () =>
  queryOptions({
    queryKey: ['hn', 'updates'],
    queryFn: fetchUpdates,
    refetchInterval: 30_000,
    refetchOnWindowFocus: true,
  })

async function fetchMaxItem(): Promise<number> {
  const { data } = await hnClient.get<number>('/maxitem.json')
  return data
}

export const maxItemQueryOptions = () =>
  queryOptions({
    queryKey: ['hn', 'maxitem'],
    queryFn: fetchMaxItem,
    refetchInterval: 15_000,
    refetchOnWindowFocus: true,
  })

/** Walk a comment's `parent` chain up to its root story/job/poll. */
async function fetchRootStory(itemId: number): Promise<Item | null> {
  let current = await fetchItem(itemId)
  let guard = 0
  while (current?.parent && guard < 20) {
    current = await fetchItem(current.parent)
    guard++
  }
  return current
}

export const rootStoryQueryOptions = (itemId: number) =>
  queryOptions({
    queryKey: ['hn', 'root', itemId],
    queryFn: () => fetchRootStory(itemId),
    staleTime: Infinity, // a comment's ancestry never changes
  })
