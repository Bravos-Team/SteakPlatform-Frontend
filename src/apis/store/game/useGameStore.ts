import SteakApi from '@/apis'
import { GAME_FILTERED_PARAMS, GAME_LIST_RESPONSE } from '@/types/game/store/Game'

export const useGetGameListStore = async (
  filters: GAME_FILTERED_PARAMS,
  signal?: AbortSignal,
): Promise<GAME_LIST_RESPONSE> => {
  return SteakApi.get('/store/public/games', { params: filters, signal: signal })
}
