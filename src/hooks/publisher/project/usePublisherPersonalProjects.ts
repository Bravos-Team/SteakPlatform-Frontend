import { useMutation, useQuery, useQueryClient, keepPreviousData } from '@tanstack/vue-query'
import { PUBLISHER_PERSONAL_PROJECT_TYPE_FILTERS } from '@/types/publisher/project/PublisherPersonalProjectType'
import { PUBLISHER_PERSONAL_PROJECT_QUERY_KEYS } from '@/hooks/constants/publisher/project/publisherPersonalProjectConstant'
import {
  publisherGetPersonalProjectListApi,
  publisherCreateDraftProjectInformationsApi,
  publisherCreatePersonalProjectApi,
} from '@/apis/publisher/project/publisherPersonalProjects'
import { Ref } from 'vue'
import { GameType } from '@/types/game/gameDetails/GameDetailsType'

export const usePublisherGetPersonalProjects = (
  filters: Ref<PUBLISHER_PERSONAL_PROJECT_TYPE_FILTERS>,
) => {
  return useQuery({
    queryKey: PUBLISHER_PERSONAL_PROJECT_QUERY_KEYS.LIST(filters),
    queryFn: async ({ signal }) => await publisherGetPersonalProjectListApi(filters.value, signal),
    placeholderData: keepPreviousData,
  })
}

export const usePublisherCreateDraftProjectInformations = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: async (payload: GameType) =>
      await publisherCreateDraftProjectInformationsApi(payload),
  })
  return {
    mutate,
    isPending,
  }
}

export const usePublisherCreatePersonalProject = () => {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending, data } = useMutation({
    mutationFn: async (name: string) => await publisherCreatePersonalProjectApi(name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PUBLISHER_PERSONAL_PROJECT_QUERY_KEYS.LIST() })
    },
  })
  return {
    mutateAsync,
    isPending,
    data,
  }
}
