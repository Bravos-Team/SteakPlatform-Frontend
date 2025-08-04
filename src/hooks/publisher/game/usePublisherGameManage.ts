import { useMutation, useQuery, useQueryClient, keepPreviousData } from '@tanstack/vue-query'
import { PUBLISHER_PERSONAL_PROJECT_QUERY_KEYS } from '@/hooks/constants/publisher/project/publisherPersonalProjectConstant'
import { PartialGameType } from '@/types/game/gameDetails/GameDetailsType'
import { Ref } from 'vue'
import {
  getGamesList,
  publisherUpdateGameDetails,
  getAllGameDetailsVersions,
  publisherUpdateGamePrice,
  publisherUpdateGameStatus,
  createNewGameVersion,
  publisherUpdateDraftGameVersion,
  publisherDeleteDraftGameVersion,
  getGameDetails,
} from '@/apis/publisher/game/publisherGame'
import {
  DELETE_GAME_DRAFT_VERSION_TYPE,
  GAME_MANAGE_FILTERS_TYPE,
  GAME_NEW_VERSION_PAYLOAD_TYPE,
  GAME_PRICE_REQUEST_TYPE,
  GAME_STATUS_REQUEST_TYPE,
} from '@/types/publisher/game/GameManage'
import {
  GAME_MANAGE_QUERY_KEYS,
  GAME_VERSIONS_QUERY_KEYS,
} from '@/hooks/constants/publisher/game/gameManage-key'

export const usePublisherGameList = (filters: Ref<GAME_MANAGE_FILTERS_TYPE>) => {
  return useQuery({
    queryKey: GAME_MANAGE_QUERY_KEYS.LIST(filters),
    queryFn: async ({ signal }) => await getGamesList(filters.value, signal),
  })
}

export const mutatePublisherUpdateGameDetails = () => {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (payload: PartialGameType) => await publisherUpdateGameDetails(payload),
    onSuccess: (_data, variables: PartialGameType) => {
      if (variables.id)
        queryClient.invalidateQueries({
          queryKey: GAME_MANAGE_QUERY_KEYS.GAME(variables?.id.toString()),
        })
    },
  })
  return {
    mutateAsync,
    isPending,
  }
}

export const mutatePublisherUpdateGameStatus = () => {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (payload: GAME_STATUS_REQUEST_TYPE) =>
      await publisherUpdateGameStatus(payload),
    onSuccess: (_data, variables: GAME_STATUS_REQUEST_TYPE) => {
      queryClient.invalidateQueries({
        queryKey: GAME_MANAGE_QUERY_KEYS.GAME(variables.gameId.toString()),
      })
    },
  })
  return {
    mutateAsync,
    isPending,
  }
}

export const mutatePublisherUpdateGamePrice = () => {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (payload: GAME_PRICE_REQUEST_TYPE) => await publisherUpdateGamePrice(payload),
    onSuccess: (_data, variables: GAME_PRICE_REQUEST_TYPE) => {
      queryClient.invalidateQueries({
        queryKey: GAME_MANAGE_QUERY_KEYS.GAME(variables.gameId.toString()),
      })
    },
  })

  return { mutateAsync, isPending }
}

export const usePublisherGameVersionsList = (gameId: string) => {
  return useQuery({
    queryKey: GAME_VERSIONS_QUERY_KEYS.ALL(gameId),
    queryFn: async ({ signal }) => await getAllGameDetailsVersions(gameId, signal),
  })
}

export const mutateCreateNewGameVersion = () => {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (payload: GAME_NEW_VERSION_PAYLOAD_TYPE) =>
      await createNewGameVersion(payload),
    onSuccess: (_data, variables: GAME_NEW_VERSION_PAYLOAD_TYPE) => {
      queryClient.invalidateQueries({
        queryKey: GAME_VERSIONS_QUERY_KEYS.ALL(variables.gameId.toString()),
      })
    },
  })
  return {
    mutateAsync,
    isPending,
  }
}

export const mutateUpdateDraftGameVersion = () => {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (payload: GAME_NEW_VERSION_PAYLOAD_TYPE) =>
      await publisherUpdateDraftGameVersion(payload),
    onSuccess: (_data, variables: GAME_NEW_VERSION_PAYLOAD_TYPE) => {
      queryClient.invalidateQueries({
        queryKey: GAME_VERSIONS_QUERY_KEYS.ALL(variables.gameId.toString()),
      })
    },
  })
  return {
    mutateAsync,
    isPending,
  }
}

export const mutateDeleteDraftGameVersion = () => {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (params: DELETE_GAME_DRAFT_VERSION_TYPE) =>
      await publisherDeleteDraftGameVersion(params),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: GAME_VERSIONS_QUERY_KEYS.ALL(variables.gameId.toString()),
      })
      queryClient.invalidateQueries({
        queryKey: PUBLISHER_PERSONAL_PROJECT_QUERY_KEYS.ALL,
      })
    },
  })
  return {
    mutateAsync,
    isPending,
  }
}

export const usePublisherGameDetails = (gameId: bigint) => {
  return useQuery({
    queryKey: GAME_MANAGE_QUERY_KEYS.GAME(gameId.toString()),
    queryFn: async ({ signal }) => await getGameDetails(gameId.toString(), signal),
  })
}
