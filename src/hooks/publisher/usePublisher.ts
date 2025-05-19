import { useMutation } from '@tanstack/vue-query'
import { register } from '@/apis/publisher/auth/authPublisher'
import { type PublisherRegisterRequest } from '@/types/publisher/AuthType'

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
