import { CART_STORE_QUERY_KEYS } from '@/hooks/constants/store/cart-key'
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import {
  getMyCart,
  addToCart,
  clearCart,
  moveToWishlist,
  removeFromCart,
} from '@/apis/store/cart/cart'

export const useUserCartList = () => {
  return useQuery({
    queryKey: CART_STORE_QUERY_KEYS.USER,
    queryFn: async ({ signal }) => await getMyCart(signal),
  })
}

export const useMutateAddToCart = () => {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (gameId: bigint) => await addToCart(gameId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: CART_STORE_QUERY_KEYS.USER,
      })
    },
  })
  return { mutateAsync, isPending }
}

export const useMutateClearCart = () => {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async () => await clearCart(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: CART_STORE_QUERY_KEYS.USER,
      })
    },
  })
  return { mutateAsync, isPending }
}

export const useMoveToWishList = () => {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (gameId: bigint) => await moveToWishlist(gameId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: CART_STORE_QUERY_KEYS.USER,
      })
    },
  })
  return { mutateAsync, isPending }
}

export const useMutateRemoveFromCart = () => {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (gameId: bigint) => await removeFromCart(gameId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: CART_STORE_QUERY_KEYS.USER,
      })
    },
  })
  return { mutateAsync, isPending }
}
