import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { checkout } from '@/apis/payment/payment'
import { CART_STORE_QUERY_KEYS } from '@/hooks/constants/store/cart-key'
import { GAME_STORE_LIST_QUERY_KEYS } from '@/hooks/constants/store/game-key'

export const useMutateCheckout = () => {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (gameIds: string[]) => await checkout(gameIds),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: CART_STORE_QUERY_KEYS.USER,
      })
      queryClient.invalidateQueries({
        queryKey: GAME_STORE_LIST_QUERY_KEYS.DETAILS(variables.toString()),
      })
    },
  })
  return { mutateAsync, isPending }
}
