import { getUserProfile, updateUserProfile } from '@/apis/user/userProfile'
import { useQuery, useMutation, QueryClient, useQueryClient } from '@tanstack/vue-query'
import type { USER_PROFILE_REQUEST_TYPE } from '@/types/user/UserProfileType'
import { USER_PROFILE_QUERY_KEY } from '@/hooks/constants/user/userProfile-key'
import { setCookie } from '@/utils/cookies/cookie-utils'

export const useQueryUserProfile = () => {
  return useQuery({
    queryKey: USER_PROFILE_QUERY_KEY.PROFILE,
    queryFn: async () =>
      await getUserProfile().then((rp) => {
        console.log(rp)
        setCookie('userAccessRights', rp.data.displayName)
        return rp
      }),
    staleTime: 1000 * 60 * 60,
    retry: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  })
}

export const useMutateUpdateUserProfile = () => {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (payload: USER_PROFILE_REQUEST_TYPE) => await updateUserProfile(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: USER_PROFILE_QUERY_KEY.PROFILE,
      }),
        await queryClient.refetchQueries({
          queryKey: USER_PROFILE_QUERY_KEY.PROFILE,
        })
    },
  })
  return { mutateAsync, isPending }
}
