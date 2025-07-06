import { useMutation } from '@tanstack/vue-query'

import { LoginRequest, RegisterRequest } from '@/types/auth/AuthType'

export const useRegisterMutatetion = () => {
  const { isPending, mutateAsync, isSuccess } = useMutation<any, unknown, RegisterRequest>({
    mutationKey: ['user', 'auth', 'register'],
  })

  return {
    isPending,
    isSuccess,
    mutateAsync,
  }
}

export const useLoginByEmailMutatetion = () => {
  const { isPending, mutateAsync, data, isSuccess } = useMutation<any, unknown, LoginRequest>({
    mutationKey: ['user', 'auth', 'login', 'email'],
  })

  return {
    isPending,
    isSuccess,
    data,
    mutateAsync,
  }
}

export const useLoginByUsernameMutatetion = () => {
  const { isPending, data, mutateAsync, isSuccess } = useMutation<any, unknown, LoginRequest>({
    mutationKey: ['user', 'auth', 'login', 'username'],
  })

  return {
    isPending,
    data,
    isSuccess,
    mutateAsync,
  }
}
