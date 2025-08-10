import {
  useGetGameListStore,
  useGetGameDetails,
  getGameComingSoon,
} from '@/apis/store/game/useGameStore'
import { GAME_STORE_LIST_QUERY_KEYS } from '@/hooks/constants/store/game-key'
import {
  GAME_FILTERED_PARAMS,
  GAME_STORE_LIST_QUERY_PARAMS,
  PageAndSize,
} from '@/types/game/store/Game'
import { useInfiniteQuery, useQuery } from '@tanstack/vue-query'

export const useGameStoreInfiniteQueryList = (filters?: GAME_STORE_LIST_QUERY_PARAMS) => {
  return useInfiniteQuery({
    queryKey: GAME_STORE_LIST_QUERY_KEYS.LIST(filters),
    queryFn: async ({ pageParam, signal }) => {
      const pageValue = await Promise.resolve(pageParam).then((value) => value)
      if (!pageValue) return
      return await useGetGameListStore(Number(pageValue)?.toString(), filters?.size, signal).then(
        (rp) => rp.data,
      )
    },
    retry: 1,
    initialPageParam: 1754656462222,
    getNextPageParam: async (lastPage) => {
      if (!lastPage) return
      const lastItem = lastPage!.items[lastPage!.items.length - 1]!
      if (lastItem) return lastItem.releaseDate
      return
    },
  })
}

export const useGameStoreDetailsQuery = (gameId: bigint) => {
  return useQuery({
    queryKey: GAME_STORE_LIST_QUERY_KEYS.DETAILS(gameId.toString()),
    queryFn: async ({ signal }) => await useGetGameDetails(gameId.toString(), signal),
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  })
}

export const useGameCommingSoonQuery = (filters?: PageAndSize) => {
  return useQuery({
    queryKey: GAME_STORE_LIST_QUERY_KEYS.COMING_SOON(filters),
    queryFn: async ({ signal }) => await getGameComingSoon(signal, filters),
  })
}
