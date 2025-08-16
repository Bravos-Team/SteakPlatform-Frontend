import { getUserStateOauthToken, verifyOauthUser } from '@/apis/user/authUser'
import { VERIFY_USER_OAUTH } from '@/types/auth/AuthType'
import { generateDeviceId } from '@/utils/fingerprint'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { USER_PROFILE_QUERY_KEY } from '@/hooks/constants/user/userProfile-key'
import { WISH_LIST_QUERY_KEYS } from '@/hooks/constants/store/wishlist-key'
import { CART_STORE_QUERY_KEYS } from '@/hooks/constants/store/cart-key'

export const useQueryUserStateOauthToken = () => {
  return useQuery({
    queryKey: ['user', 'state', 'oauth-token'],
    queryFn: async ({ signal }) => {
      const deviceId = await generateDeviceId()
      return await getUserStateOauthToken(deviceId, signal)
    },
    enabled: false,
  })
}

export const useMutateVerifyOauthUser = () => {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (payload: VERIFY_USER_OAUTH) => await verifyOauthUser(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: USER_PROFILE_QUERY_KEY.PROFILE,
      })
      await queryClient.invalidateQueries({
        queryKey: CART_STORE_QUERY_KEYS.USER,
      })
      await queryClient.invalidateQueries({
        queryKey: WISH_LIST_QUERY_KEYS.USER,
      })
    },
  })
  return { mutateAsync, isPending }
}
