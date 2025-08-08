import {
  useGetGameListStore,
  useGetGameDetails,
  getGameComingSoon,
} from '@/apis/store/game/useGameStore'
import { GAME_STORE_LIST_QUERY_KEYS } from '@/hooks/constants/store/game-key'
import { GAME_FILTERED_PARAMS, PageAndSize } from '@/types/game/store/Game'
import { useInfiniteQuery, useQuery } from '@tanstack/vue-query'

export const useGameStoreInfiniteQueryList = (filters?: GAME_FILTERED_PARAMS) => {
  return useInfiniteQuery({
    queryKey: GAME_STORE_LIST_QUERY_KEYS.LIST(filters),
    queryFn: async ({ signal }) => await useGetGameListStore({}, signal),
    initialPageParam: 9074997337759744,
    getNextPageParam: (lastPage) => {
      return lastPage.hasNextCursor ? lastPage.maxCursor : undefined
    },
    staleTime: 1000 * 60 * 5,
  })
}

export const useGameStoreDetailsQuery = (gameId: bigint) => {
  return useQuery({
    queryKey: GAME_STORE_LIST_QUERY_KEYS.DETAILS(gameId.toString()),
    queryFn: async ({ signal }) => await useGetGameDetails(gameId.toString(), signal),
    retry: 3,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    staleTime: 1000 * 60 * 5,
  })
}

export const useGameCommingSoonQuery = (filters?: PageAndSize) => {
  return useQuery({
    queryKey: GAME_STORE_LIST_QUERY_KEYS.COMING_SOON(filters),
    queryFn: async ({ signal }) => await getGameComingSoon(signal, filters),
  })
}
