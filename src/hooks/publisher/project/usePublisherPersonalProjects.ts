import { useMutation, useQuery, useQueryClient, keepPreviousData } from '@tanstack/vue-query'
import { PUBLISHER_PERSONAL_PROJECT_TYPE_FILTERS } from '@/types/publisher/project/PublisherPersonalProjectType'
import { PUBLISHER_PERSONAL_PROJECT_QUERY_KEYS } from '@/hooks/constants/publisher/project/publisherPersonalProjectConstant'
import {
  publisherGetPersonalProjectListApi,
  publisherCreateDraftProjectInformationsApi,
  publisherCreatePersonalProjectApi,
  publisherGetPersonalProjectByIdApi,
  publisherUpdateGameNameApi,
  publisherPostVerifyGameRequest,
  publisherDeleteImageUploaded,
  publisherResubmitProject,
  publisherUpateProjectDetails,
} from '@/apis/publisher/project/publisherPersonalProjects'
import { Ref } from 'vue'
import { GameResubmitRequestType, PartialGameType } from '@/types/game/gameDetails/GameDetailsType'
// import { QueryClient } from '@tanstack/vue-query'

export const usePublisherGetPersonalProjects = (
  filters: Ref<PUBLISHER_PERSONAL_PROJECT_TYPE_FILTERS>,
) => {
  return useQuery({
    queryKey: PUBLISHER_PERSONAL_PROJECT_QUERY_KEYS.LIST(filters),
    queryFn: async ({ signal }) => await publisherGetPersonalProjectListApi(filters.value, signal),
    // placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
  })
}

export const usePublisherGetPersonalProjectById = (id: bigint) => {
  return useQuery({
    queryKey: PUBLISHER_PERSONAL_PROJECT_QUERY_KEYS.PROJECT(id.toString()),
    queryFn: async ({ signal }) => await publisherGetPersonalProjectByIdApi(id, signal),
    retry: 3,
  })
}

export const usePublisherCreateDraftProjectInformations = () => {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (payload: PartialGameType) =>
      await publisherCreateDraftProjectInformationsApi(payload),
    onSuccess: (_data, variables: PartialGameType) => {
      queryClient.invalidateQueries({
        queryKey: PUBLISHER_PERSONAL_PROJECT_QUERY_KEYS.PROJECT(variables?.id.toString()),
      })
    },
  })
  return {
    mutateAsync,
    isPending,
  }
}

export const usePublisherUpdateProjectName = () => {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (payload: { id: bigint; name: string }) =>
      await publisherUpdateGameNameApi(payload),
    onSuccess: (data, variables: { id: bigint; name: string }) => {
      if (data.status === 200) {
        queryClient.invalidateQueries({
          queryKey: PUBLISHER_PERSONAL_PROJECT_QUERY_KEYS.PROJECT(variables.id.toString()),
        })
      }
    },
  })

  return {
    mutateAsync,
    isPending,
  }
}

export const usePublisherCreatePersonalProject = () => {
  const { mutateAsync, isPending, data } = useMutation({
    mutationFn: async (name: string) => await publisherCreatePersonalProjectApi(name),
  })
  return {
    mutateAsync,
    isPending,
    data,
  }
}

export const usePublisherPostVerifyPersonalProject = () => {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (id: bigint) => await publisherPostVerifyGameRequest(id),
    onSuccess: (_data, variables: bigint) => {
      queryClient.invalidateQueries({
        queryKey: PUBLISHER_PERSONAL_PROJECT_QUERY_KEYS.PROJECT(variables.toString()),
      })
    },
  })
  return {
    mutateAsync,
    isPending,
  }
}

export const usePublisherDeleteImageUploaded = () => {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (payload: { id: bigint; url: string }) =>
      await publisherDeleteImageUploaded(payload.url),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: PUBLISHER_PERSONAL_PROJECT_QUERY_KEYS.PROJECT(variables?.id.toString()),
      })
    },
  })
  return {
    mutateAsync,
    isPending,
  }
}

export const usePublisherResubmitProject = () => {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (request: GameResubmitRequestType) => await publisherResubmitProject(request),
    onSuccess: (_data, variables) =>
      queryClient.invalidateQueries({
        queryKey: PUBLISHER_PERSONAL_PROJECT_QUERY_KEYS.PROJECT(variables.submissionId.toString()),
      }),
  })
  return {
    mutateAsync,
    isPending,
  }
}

export const usePublisherUpdateProjectDetails = () => {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (payload: PartialGameType) => await publisherUpateProjectDetails(payload),
    onSuccess: (_data, variables: PartialGameType) => {
      if (variables.id)
        queryClient.invalidateQueries({
          queryKey: PUBLISHER_PERSONAL_PROJECT_QUERY_KEYS.PROJECT(variables?.id.toString()),
        })
    },
  })
  return {
    mutateAsync,
    isPending,
  }
}
