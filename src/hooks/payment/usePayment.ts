import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { checkout } from '@/apis/payment/payment'
import { CART_STORE_QUERY_KEYS } from '@/hooks/constants/store/cart-key'

export const useMutateCheckout = () => {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (gameIds: string[]) => await checkout(gameIds),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: CART_STORE_QUERY_KEYS.USER,
      })
    },
  })
  return { mutateAsync, isPending }
}
