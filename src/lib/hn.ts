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

async function fetchUser(id: string): Promise<User> {
  const { data } = await hnClient.get<User>(`/user/${id}.json`)
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
  })
