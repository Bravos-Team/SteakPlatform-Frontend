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
    filters,
  ]) as QUERY_KEY_TYPE<PageAndSize>,
  DETAILS: (gameId: string) => ['store', 'games', 'details', gameId] as const,
}
