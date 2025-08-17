import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { removeCookie, setCookie } from '@/utils/cookies/cookie-utils'
import { LoginRequest, RegisterRequest } from '@/types/auth/AuthType'
import { renewUserRefreshToken, userLogout } from '@/apis/user/authUser'
import { CART_STORE_QUERY_KEYS } from '@/hooks/constants/store/cart-key'
import { mergingCartFormAnotherDevice } from '@/apis/store/cart/cart'
import { USER_AUTH_QUERY_KEY, USER_PROFILE_QUERY_KEY } from '@/hooks/constants/user/userProfile-key'
import { useUserProfilesStores } from '@/stores/user/useUserProfiles'

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
    onSuccess: async (response) => {
      useUserProfilesStores().setAccessRight(response.data?.displayName)
      useUserProfilesStores().setProfile(response.data)
      await queryClient.invalidateQueries({
        queryKey: USER_AUTH_QUERY_KEY.EMAIL,
      })
      await queryClient.invalidateQueries({
        queryKey: USER_AUTH_QUERY_KEY.USERNAME,
      })
      await queryClient.invalidateQueries({
        queryKey: CART_STORE_QUERY_KEYS.USER,
      })
      await queryClient.invalidateQueries({
        queryKey: USER_PROFILE_QUERY_KEY.PROFILE,
      })
      await mergingCartFormAnotherDevice()
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
      useUserProfilesStores().removeAccessRight()
      await queryClient.invalidateQueries({})
    },
    onSuccess: async (response) => {
      useUserProfilesStores().setAccessRight(response.data?.displayName)
      await queryClient.invalidateQueries({
        queryKey: USER_AUTH_QUERY_KEY.EMAIL,
      })
      await queryClient.invalidateQueries({
        queryKey: USER_AUTH_QUERY_KEY.USERNAME,
      })
      await queryClient.invalidateQueries({
        queryKey: CART_STORE_QUERY_KEYS.USER,
      })
      await queryClient.invalidateQueries({
        queryKey: USER_PROFILE_QUERY_KEY.PROFILE,
      })
      await mergingCartFormAnotherDevice()
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

export const useMutateUserLogout = () => {
  const queryClient = useQueryClient()
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async () => await userLogout(),
    onSuccess: () => {
      queryClient.removeQueries({
        queryKey: USER_AUTH_QUERY_KEY.EMAIL,
      })
      queryClient.removeQueries({
        queryKey: USER_AUTH_QUERY_KEY.USERNAME,
      })
      queryClient.removeQueries({
        queryKey: USER_AUTH_QUERY_KEY.RENEW_REFRESH_TOKEN,
      })
      queryClient.removeQueries({
        queryKey: CART_STORE_QUERY_KEYS.USER,
      })
      queryClient.removeQueries({
        queryKey: USER_PROFILE_QUERY_KEY.PROFILE,
      })
    },
  })
  return {
    isPending,
    mutateAsync,
  }
}
