import { Ref } from 'vue'
import QUERY_KEY_TYPE from '@/hooks/constants/query-key-type'

import { GAME_FILTERED_PARAMS } from '@/types/game/store/Game'

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
}
