import { useGetGameListStore, useGetGameDetails } from '@/apis/store/game/useGameStore'
import { GAME_STORE_LIST_QUERY_KEYS } from '@/hooks/constants/store/game-key'
import { GAME_FILTERED_PARAMS } from '@/types/game/store/Game'
import { useInfiniteQuery, useQuery } from '@tanstack/vue-query'

export const useGameStoreInfiniteQueryList = (filters?: GAME_FILTERED_PARAMS) => {
  const {
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    isFetchingNextPage,
    isFetchingPreviousPage,
    ...result
  } = useInfiniteQuery({
    queryKey: GAME_STORE_LIST_QUERY_KEYS.LIST(filters),
    queryFn: async ({ signal }) => await useGetGameListStore({}, signal),
    initialPageParam: 9074997337759744,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? null,
    staleTime: 1000 * 60 * 5,
  })

  return {
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    isFetchingNextPage,
    isFetchingPreviousPage,
    ...result,
  }
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
