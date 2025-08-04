import SteakApi from '@/apis'
import { GAME_FILTERED_PARAMS, GAME_LIST_RESPONSE } from '@/types/game/store/Game'

export const useGetGameListStore = async (
  filters?: GAME_FILTERED_PARAMS,
  signal?: AbortSignal,
): Promise<GAME_LIST_RESPONSE> =>
  SteakApi.get('/store/public/games/list', { params: filters, signal: signal })

export const useGetGameDetails = async (gameId: string, signal?: AbortSignal) =>
  SteakApi.get(`/store/public/games/details?gameId=${gameId}`, { signal: signal })
