import { getUserProfile, updateUserProfile } from '@/apis/user/userProfile'
import { useQuery, useMutation, QueryClient } from '@tanstack/vue-query'
import type { USER_PROFILE_REQUEST_TYPE } from '@/types/user/UserProfileType'
import { USER_PROFILE_QUERY_KEY } from '@/hooks/constants/user/userProfile-key'

export const useQueryUserProfile = () => {
  return useQuery({
    queryKey: USER_PROFILE_QUERY_KEY.PROFILE,
    queryFn: async () => await getUserProfile(),
    staleTime: 1000 * 60 * 60,
  })
}

export const useMutateUpdateUserProfile = () => {
  const queryClient = new QueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (payload: USER_PROFILE_REQUEST_TYPE) => await updateUserProfile(payload),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: USER_PROFILE_QUERY_KEY.PROFILE,
      }),
  })
  return { mutateAsync, isPending }
}
