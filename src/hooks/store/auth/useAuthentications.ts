import { useMutation } from '@tanstack/vue-query'
import { setCookie } from '@/utils/cookies/cookie-utils'
import { LoginRequest, RegisterRequest } from '@/types/auth/AuthType'

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
  const { isPending, mutateAsync, data, isSuccess } = useMutation<any, unknown, LoginRequest>({
    mutationKey: ['user', 'auth', 'login', 'email'],
    onSuccess: (response) => {
      setCookie('userAccessRights', response.data?.username, {
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
  const { isPending, data, mutateAsync, isSuccess } = useMutation<any, unknown, LoginRequest>({
    mutationKey: ['user', 'auth', 'login', 'username'],
    onSuccess: (response) => {
      setCookie('userAccessRights', response.data?.username, {
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
