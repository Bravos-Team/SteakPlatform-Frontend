import { useMutation } from '@tanstack/vue-query'
import { loginEmail, loginUserName, register } from '@/apis/publisher/auth/authPublisher'
import { PublisherLoginRequest, type PublisherRegisterRequest } from '@/types/publisher/AuthType'

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
  const { isPending, mutateAsync, reset } = useMutation({
    mutationFn: async (data: PublisherLoginRequest) => {
      return await loginUserName(data)
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

export const usePublisherLoginEmail = () => {
  const { isPending, mutateAsync, reset } = useMutation({
    mutationFn: async (data: PublisherLoginRequest) => {
      return await loginEmail(data)
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
