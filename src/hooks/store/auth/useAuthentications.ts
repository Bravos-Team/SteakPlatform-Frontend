import { useMutation, useQueryClient, QueryClient } from '@tanstack/vue-query'
import { removeCookie, setCookie } from '@/utils/cookies/cookie-utils'
import { LoginRequest, RegisterRequest } from '@/types/auth/AuthType'
import { renewUserRefreshToken } from '@/apis/user/authUser'
import { CART_STORE_QUERY_KEYS } from '@/hooks/constants/store/cart-key'
export const useRegisterMutation = () => {
  const { isPending, mutateAsync, isSuccess } = useMutation<any, unknown, RegisterRequest>({
    mutationKey: ['user', 'auth', 'register'],
  })

  return {
    isPending,
    isSuccess,
    mutateAsync,
  }
}

export const useLoginByEmailMutation = () => {
  const queryClient = useQueryClient()
  const { isPending, mutateAsync, data, isSuccess } = useMutation<any, unknown, LoginRequest>({
    mutationKey: ['user', 'auth', 'login', 'email'],
    onMutate: async () => {
      queryClient.clear()
    },
    onSuccess: (response) => {
      setCookie('userAccessRights', response.data?.displayName, {
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      })
    },
  })

  return {
    isPending,
    isSuccess,
    data,
    mutateAsync,
  }
}

export const useLoginByUsernameMutation = () => {
  const queryClient = useQueryClient()
  const { isPending, data, mutateAsync, isSuccess } = useMutation<any, unknown, LoginRequest>({
    mutationKey: ['user', 'auth', 'login', 'username'],
    onMutate: async () => {
      removeCookie('userAccessRights')
      queryClient.invalidateQueries({})
    },
    onSuccess: (response) => {
      setCookie('userAccessRights', response.data?.displayName, {
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      })
    },
  })

  return {
    isPending,
    data,
    isSuccess,
    mutateAsync,
  }
}

export const useMutateRenewRefreshToken = () => {
  const queryClient = useQueryClient()
  const { isPending, mutateAsync } = useMutation<any, unknown>({
    mutationFn: async () => await renewUserRefreshToken(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CART_STORE_QUERY_KEYS.USER })
    },
  })

  return {
    isPending,
    mutateAsync,
  }
}
