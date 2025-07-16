import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { setCookie } from '@/utils/cookies/cookie-utils'
import { loginEmail, loginUserName, logout, register } from '@/apis/publisher/auth/authPublisher'
import { PublisherLoginRequest, type PublisherRegisterRequest } from '@/types/publisher/AuthType'
import { PUBLISHER_PERSONAL_PROJECT_QUERY_KEYS } from '@/hooks/constants/publisher/project/publisherPersonalProjectConstant'
import { useQuery } from '@tanstack/vue-query'

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
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: PUBLISHER_PERSONAL_PROJECT_QUERY_KEYS.ALL })
      setCookie('publisherAccessRights', response.data?.username, {
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      })
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
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: PUBLISHER_PERSONAL_PROJECT_QUERY_KEYS.ALL })
      setCookie('publisherAccessRights', response.data?.username, {
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      })
    },
  })
  return {
    isPending,
    mutateAsync,
  }
}

export const usePublisherLogout = () => {
  const queryClient = useQueryClient()
  return useQuery({
    queryKey: PUBLISHER_PERSONAL_PROJECT_QUERY_KEYS.LOGOUT(),
    queryFn: async () => {
      queryClient.clear()
      return await logout()
    },
  })
}
