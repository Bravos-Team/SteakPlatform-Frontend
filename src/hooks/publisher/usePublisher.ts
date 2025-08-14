import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { removeCookie, setCookie } from '@/utils/cookies/cookie-utils'
import {
  loginEmail,
  loginUserName,
  logout,
  register,
  renewPublisherRefreshToken,
} from '@/apis/publisher/auth/authPublisher'
import { PublisherLoginRequest, type PublisherRegisterRequest } from '@/types/publisher/AuthType'
import { PUBLISHER_PERSONAL_PROJECT_QUERY_KEYS } from '@/hooks/constants/publisher/project/publisherPersonalProjectConstant'
import { useQuery } from '@tanstack/vue-query'
import { GAME_MANAGE_QUERY_KEYS } from '../constants/publisher/game/gameManage-key'

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
    onSuccess: (response, variables) => {
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

export const useMutatePublisherLogout = () => {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async () => await logout(),
    onSuccess: () => {
      queryClient.clear()
      removeCookie('publisherAccessRights')
    },
  })
  return {
    mutateAsync,
    isPending,
  }
}

export const usePublisherRenewRefreshToken = () => {
  const queryClient = useQueryClient()
  const { isPending } = useMutation({
    mutationFn: async () => await renewPublisherRefreshToken(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PUBLISHER_PERSONAL_PROJECT_QUERY_KEYS.ALL })
    },
  })
  return {
    isPending,
  }
}
