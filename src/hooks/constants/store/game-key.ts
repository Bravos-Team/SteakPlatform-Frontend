import { Ref } from 'vue'
import QUERY_KEY_TYPE from '@/hooks/constants/query-key-type'

import {
  GAME_FILTERED_PARAMS,
  GAME_STORE_LIST_QUERY_PARAMS,
  PageAndSize,
} from '@/types/game/store/Game'

export const GAME_STORE_LIST_QUERY_KEYS = {
  ALL: ['store', 'games', 'list'] as const,
  LIST: ((filters?: Ref<GAME_STORE_LIST_QUERY_PARAMS>) => [
    'store',
    'games',
    'list',
    'filtered',
    filters?.value.cursor,
    filters?.value.size,
  ]) as QUERY_KEY_TYPE<GAME_STORE_LIST_QUERY_PARAMS>,
  COMING_SOON: ((filters: Ref<PageAndSize>) => [
    'store',
    'games',
    'list',
    'coming-soon',
    filters?.value.page,
    filters?.value.size,
  ]) as QUERY_KEY_TYPE<PageAndSize>,
  NEWEST_RELEASES: ((filters: Ref<PageAndSize>) => [
    'store',
    'games',
    'list',
    'newest-releases',
    filters?.value.page,
    filters?.value.size,
  ]) as QUERY_KEY_TYPE<PageAndSize>,
  TOP_PLAYED_GAMES: ((filters: Ref<PageAndSize>) => [
    'store',
    'games',
    'list',
    'top-played',
    filters?.value.page,
    filters?.value.size,
  ]) as QUERY_KEY_TYPE<PageAndSize>,
  GENRES: () => ['store', 'games', 'genres'] as const,
  TAGS: () => ['store', 'games', 'tags'] as const,
  DETAILS: (gameId: string) => ['store', 'games', 'details', gameId] as const,
}
