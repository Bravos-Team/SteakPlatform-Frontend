import { useGetGameListStore } from '@/apis/store/game/useGameStore'
import { GAME_STORE_LIST_QUERY_KEYS } from '@/hooks/constants/store/game-key'
import { GAME_FILTERED_PARAMS, GAME_LIST_RESPONSE } from '@/types/game/store/Game'
import { useInfiniteQuery } from '@tanstack/vue-query'

export const useGameStoreInfiniteQueryList = (filters: GAME_FILTERED_PARAMS) => {
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
    queryFn: async ({ pageParam, signal }) =>
      await useGetGameListStore({ cursor: pageParam, ...filters }, signal),
    initialPageParam: 9074997337759744,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? null,
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
