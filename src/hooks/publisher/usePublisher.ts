import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { loginEmail, loginUserName, register } from '@/apis/publisher/auth/authPublisher'
import { PublisherLoginRequest, type PublisherRegisterRequest } from '@/types/publisher/AuthType'
import { PUBLISHER_PERSONAL_PROJECT_QUERY_KEYS } from '@/hooks/constants/publisher/project/publisherPersonalProjectConstant'

export const usePublisherRegister = () => {
  const { isPending, mutateAsync, reset } = useMutation({
    mutationFn: async (data: PublisherRegisterRequest) => {
      return await register(data)
    },
    onSuccess: () => {
      reset()
    },
  })

  return {
    isPending,
    mutateAsync,
  }
}

export const usePublisherLoginUserName = () => {
  const queryClient = useQueryClient()
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (data: PublisherLoginRequest) => {
      return await loginUserName(data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PUBLISHER_PERSONAL_PROJECT_QUERY_KEYS.ALL })
    },
  })
  return {
    isPending,
    mutateAsync,
  }
}

export const usePublisherLoginEmail = () => {
  const queryClient = useQueryClient()
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (data: PublisherLoginRequest) => {
      return await loginEmail(data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PUBLISHER_PERSONAL_PROJECT_QUERY_KEYS.ALL })
    },
  })
  return {
    isPending,
    mutateAsync,
  }
}
