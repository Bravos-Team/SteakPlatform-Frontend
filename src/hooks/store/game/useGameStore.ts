import {
  useGetGameListStore,
  useGetGameDetails,
  getGameComingSoon,
  getGameGenres,
  getGameNewestReleases,
  getGameTags,
  getTopPlayedGames,
  postToGetGameFiltered,
  getGamesTrendingByDay,
  getGamesTrendingByWeek,
  getGamesTrendingByMonth,
} from '@/apis/store/game/useGameStore'
import { GAME_STORE_LIST_QUERY_KEYS } from '@/hooks/constants/store/game-key'
import {
  DISCOVER_GAME_FILTERS,
  GAME_FILTERED_PARAMS,
  GAME_STORE_LIST_QUERY_PARAMS,
  PageAndSize,
} from '@/types/game/store/Game'
import {
  getMillisecondsUntilNextDay,
  getMillisecondsUntilNextMonday,
  getMillisecondsUntilNextMonth,
} from '@/utils/time/getTimeDataUtil'
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
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

export const useGameCommingSoonQuery = (filters?: Ref<PageAndSize>, isEnable?: boolean) => {
  return useQuery({
    queryKey: GAME_STORE_LIST_QUERY_KEYS.COMING_SOON(filters),
    queryFn: async ({ signal }) => await getGameComingSoon(signal, filters?.value),
    enabled: isEnable ?? true,
    retry: 2,
  })
}

export const useGameNewestReleasesQuery = (filters?: Ref<PageAndSize>, isEnable?: boolean) => {
  return useQuery({
    queryKey: GAME_STORE_LIST_QUERY_KEYS.NEWEST_RELEASES(filters),
    queryFn: async ({ signal }) => await getGameNewestReleases(filters?.value, signal),
    enabled: isEnable ?? true,
    retry: 2,
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

export const useMutateToGetDiscoverGameFiltered = () => {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending, data } = useMutation({
    mutationFn: async (filters: Ref<DISCOVER_GAME_FILTERS>) =>
      (await postToGetGameFiltered(filters.value)).data,
    onSuccess: async (data, variables) => {
      await queryClient.invalidateQueries({
        queryKey: GAME_STORE_LIST_QUERY_KEYS.DISCOVER_GAMES(variables),
      })
      await queryClient.setQueryData(GAME_STORE_LIST_QUERY_KEYS.DISCOVER_GAMES(variables), data)
    },
  })
  return {
    mutateAsync,
    isPending,
    data,
  }
}

export const useQueryGamesByDays = () => {
  return useQuery({
    queryKey: GAME_STORE_LIST_QUERY_KEYS.TRENDING_DAYS,
    queryFn: async ({ signal }) => await getGamesTrendingByDay(signal),
    staleTime: getMillisecondsUntilNextDay(),
  })
}

export const useQueryGamesByWeeks = (isEnabled: boolean) => {
  return useQuery({
    queryKey: GAME_STORE_LIST_QUERY_KEYS.TRENDING_WEEKS,
    queryFn: async ({ signal }) => await getGamesTrendingByWeek(signal),
    staleTime: getMillisecondsUntilNextMonday(),
    enabled: isEnabled ?? true,
  })
}

export const useQueryGamesByMonths = () => {
  return useQuery({
    queryKey: GAME_STORE_LIST_QUERY_KEYS.TRENDING_MONTHS,
    queryFn: async ({ signal }) => await getGamesTrendingByMonth(signal),
    staleTime: getMillisecondsUntilNextMonth(),
  })
}
