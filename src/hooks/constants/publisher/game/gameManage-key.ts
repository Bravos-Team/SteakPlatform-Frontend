import { GAME_FILTERED_PARAMS } from '@/types/game/store/Game'
import QUERY_KEY_TYPE from '@/hooks/constants/query-key-type'
import { Ref } from 'vue'

export const GAME_MANAGE_QUERY_KEYS = {
  ALL: ['publisher', 'game'] as const,
  GAME: (id: string) => ['publisher', 'game', 'manage', 'details', id] as const,
  LIST: ((filters: Ref<GAME_FILTERED_PARAMS>) => [
    'publisher',
    'game',
    'manage',
    'list',
    filters,
  ]) as QUERY_KEY_TYPE<GAME_FILTERED_PARAMS>,
}

export const GAME_VERSIONS_QUERY_KEYS = {
  ALL: (id: string) => ['publisher', 'game', 'manage', 'versions', 'list', id] as const,
}
