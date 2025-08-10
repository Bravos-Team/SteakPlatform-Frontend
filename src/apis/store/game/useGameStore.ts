import SteakApi from '@/apis'
import {
  GAME_FILTERED_PARAMS,
  GAME_LIST_RESPONSE,
  GAME_STORE_LIST_QUERY_PARAMS,
} from '@/types/game/store/Game'

export const useGetGameListStore = async (
  cursor?: string,
  size?: number,
  signal?: AbortSignal,
): Promise<GAME_LIST_RESPONSE> =>
  await SteakApi.get('/store/public/games/list', { params: { cursor, size }, signal: signal })

export const useGetGameDetails = async (gameId: string, signal?: AbortSignal) =>
  await SteakApi.get(`/store/public/games/details?gameId=${gameId}`, { signal: signal })

export const getGameComingSoon = async (
  signal?: AbortSignal,
  paginate?: { page: number; size: number },
) => {
  return await SteakApi.get('/store/public/games/coming-soon', {
    params: { ...paginate },
    signal: signal,
  })
}
