import {
  useGetGameListStore,
  useGetGameDetails,
  getGameComingSoon,
  getGameGenres,
  getGameNewestReleases,
  getGameTags,
  getTopPlayedGames,
} from '@/apis/store/game/useGameStore'
import { GAME_STORE_LIST_QUERY_KEYS } from '@/hooks/constants/store/game-key'
import {
  GAME_FILTERED_PARAMS,
  GAME_STORE_LIST_QUERY_PARAMS,
  PageAndSize,
} from '@/types/game/store/Game'
import { useInfiniteQuery, useQuery } from '@tanstack/vue-query'
import { Ref } from 'vue'

export const useGameStoreInfiniteQueryList = (filters?: Ref<GAME_STORE_LIST_QUERY_PARAMS>) => {
  return useInfiniteQuery({
    queryKey: GAME_STORE_LIST_QUERY_KEYS.LIST(filters),
    queryFn: async ({ pageParam, signal }) => {
      const pageValue = await Promise.resolve(pageParam).then((value) => value)
      if (pageValue === -1)
        return await useGetGameListStore(null, filters?.value.size, signal).then((rp) => rp.data)
      else if (!pageValue) return undefined
      else
        return await useGetGameListStore(
          Number(pageValue)?.toString(),
          filters?.value.size,
          signal,
        ).then((rp) => rp.data)
    },
    retry: 1,
    placeholderData: () => ({
      pages: [
        {
          items: Array.from({ length: filters?.value?.size || 10 }, (_, index) => ({
            id: `skeleton-${index}`,
            title: '',
            price: 0,
            image: '',
            isLoading: true,
          })),
          hasNextCursor: false,
        },
      ],
      pageParams: [-1],
    }),
    initialPageParam: -1,
    getNextPageParam: (lastPage) => {
      if (!lastPage) return undefined
      else if (lastPage.hasNextCursor) {
        const lastItem = lastPage!.items[lastPage!.items.length - 1]!
        return lastItem.id
      }
      return undefined
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

export const useGameCommingSoonQuery = (filters?: Ref<PageAndSize>) => {
  return useQuery({
    queryKey: GAME_STORE_LIST_QUERY_KEYS.COMING_SOON(filters),
    queryFn: async ({ signal }) => await getGameComingSoon(signal, filters?.value),
  })
}

export const useGameNewestReleasesQuery = (filters?: Ref<PageAndSize>) => {
  return useQuery({
    queryKey: GAME_STORE_LIST_QUERY_KEYS.NEWEST_RELEASES(filters),
    queryFn: async ({ signal }) => await getGameNewestReleases(filters?.value, signal),
  })
}

export const useGameGenresQuery = () => {
  return useQuery({
    queryKey: GAME_STORE_LIST_QUERY_KEYS.GENRES(),
    queryFn: async ({ signal }) => await getGameGenres(signal),
    retry: 1,
  })
}

export const useGameTagsQuery = () => {
  return useQuery({
    queryKey: GAME_STORE_LIST_QUERY_KEYS.TAGS(),
    queryFn: async ({ signal }) => await getGameTags(signal),
    retry: 1,
  })
}

export const useTopPlayedGamesQuery = (filters?: Ref<PageAndSize>) => {
  return useQuery({
    queryKey: GAME_STORE_LIST_QUERY_KEYS.TOP_PLAYED_GAMES(filters),
    queryFn: async ({ signal }) => await getTopPlayedGames(filters?.value, signal),
    retry: 1,
  })
}
