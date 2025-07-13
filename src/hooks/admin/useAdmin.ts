import { loginUserName, loginEmail } from '@/apis/admin/auth/authAdmin'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { AdminLoginRequest } from '@/types/admin/AuthType'
import { ADMIN_AUTH_QUERY_KEYS } from '../constants/admin/adminKey'

export const useAdminLoginUserName = () => {
  const queryClient = useQueryClient()
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (data: AdminLoginRequest) => {
      return await loginUserName(data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADMIN_AUTH_QUERY_KEYS.ALL })
    },
    onError: (error: any) => {
      console.error('Login failed with username:', error)
    },
  })
  return {
    isPending,
    mutateAsync,
  }
}

export const useAdminLoginEmail = () => {
  const queryClient = useQueryClient()
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (data: AdminLoginRequest) => {
      return await loginEmail(data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADMIN_AUTH_QUERY_KEYS.ALL })
    },
    onError: (error: any) => {
      console.error('Login failed with email:', error)
    },
  })
  return {
    isPending,
    mutateAsync,
  }
}
