import SteakApi from '@/apis'
import { GAME_LIST_RESPONSE } from '@/types/game/store/Game'

export const useGetGameListStore = async (
  cursor?: string | null,
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

export const getGameNewestReleases = async (
  params?: { page: number; size: number },
  signal?: AbortSignal,
) => await SteakApi.get('/store/public/games/newest', { params, signal: signal })

export const getTopPlayedGames = async (
  params?: { page: number; size: number },
  signal?: AbortSignal,
) => await SteakApi.get('/store/public/games/top-played', { params, signal: signal })

export const getGameGenres = async (signal?: AbortSignal) =>
  await SteakApi.get('/store/public/games/genres', { signal: signal })

export const getGameTags = async (signal?: AbortSignal) =>
  await SteakApi.get('/store/public/games/tags', { signal: signal })
