import { Ref } from 'vue'
import QUERY_KEY_TYPE from '@/hooks/constants/query-key-type'

import { GAME_FILTERED_PARAMS, PageAndSize } from '@/types/game/store/Game'

export const GAME_STORE_LIST_QUERY_KEYS = {
  ALL: ['store', 'games', 'list'] as const,
  LIST: ((filters?: Ref<GAME_FILTERED_PARAMS>) => [
    'store',
    'games',
    'list',
    'filtered',
    filters?.value.status,
    filters?.value.pageSize,
    filters?.value.cursor,
    filters?.value.maxPrice,
    filters?.value.minPrice,
    filters?.value.genre,
    filters?.value.platform,
    filters?.value.search,
    filters?.value.sortBy,
    filters?.value.sortOrder,
  ]) as QUERY_KEY_TYPE<GAME_FILTERED_PARAMS>,
  COMING_SOON: ((filters: Ref<PageAndSize>) => [
    'store',
    'games',
    'list',
    'coming-soon',
    filters,
  ]) as QUERY_KEY_TYPE<PageAndSize>,
  DETAILS: (gameId: string) => ['store', 'games', 'details', gameId] as const,
}
