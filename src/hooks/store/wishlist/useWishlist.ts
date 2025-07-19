import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import { WISH_LIST_QUERY_KEYS } from '@/hooks/constants/store/wishlist-key'
import {
  getMyWishlist,
  addToWishlist,
  clearWishlist,
  moveToCart,
  removeFromWishlist,
} from '@/apis/store/wishlist/wishlist'

export const useGetUserWishlist = () => {
  return useQuery({
    queryKey: WISH_LIST_QUERY_KEYS.USER,
    queryFn: async ({ signal }) => await getMyWishlist(signal),
  })
}

export const useMutateAddToWishlist = () => {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (gameId: bigint) => await addToWishlist(gameId),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: WISH_LIST_QUERY_KEYS.USER,
      }),
  })
  return { mutateAsync, isPending }
}

export const useMutateClearWishList = () => {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async () => await clearWishlist(),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: WISH_LIST_QUERY_KEYS.USER,
      }),
  })
  return { mutateAsync, isPending }
}

export const useMutateMoveWishlistItemToCart = () => {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (gameId: bigint) => await moveToCart(gameId),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: WISH_LIST_QUERY_KEYS.USER,
      }),
  })
  return { mutateAsync, isPending }
}

export const useMutateRemoveGameFromWishlist = () => {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (gameId: bigint) => await removeFromWishlist(gameId),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: WISH_LIST_QUERY_KEYS.USER,
      }),
  })
  return { mutateAsync, isPending }
}
