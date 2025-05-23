import { useMutation } from '@tanstack/vue-query'
import { loginEmail, loginUserName, register } from '@/apis/publisher/auth/authPublisher'
import { PublisherLoginRequest, type PublisherRegisterRequest } from '@/types/publisher/AuthType'

export const usePublisherRegister = () => {
  const { isPending, isError, error, isSuccess, mutateAsync, data } = useMutation({
    mutationFn: async (data: PublisherRegisterRequest) => {
      return await register(data)
    },
  })

  return {
    isPending,
    isError,
    error,
    isSuccess,
    mutateAsync,
    data,
  }
}

export const usePublisherLoginUserName = () => {
  const { isPending, isError, error, isSuccess, mutateAsync, data } = useMutation({
    mutationFn: async (data: PublisherLoginRequest) => {
      return await loginUserName(data)
    },
  })
  return {
    isPending,
    isError,
    error,
    isSuccess,
    mutateAsync,
    data,
  }
}

export const usePublisherLoginEmail = () => {
  const { isPending, isError, error, isSuccess, mutateAsync, data } = useMutation({
    mutationFn: async (data: PublisherLoginRequest) => {
      return await loginEmail(data)
    },
  })
  return {
    isPending,
    isError,
    error,
    isSuccess,
    mutateAsync,
    data,
  }
}
