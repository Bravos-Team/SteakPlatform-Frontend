import { CART_STORE_QUERY_KEYS } from '@/hooks/constants/store/cart-key'
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import {
  getMyCart,
  addToCart,
  clearCart,
  moveToWishlist,
  removeFromCart,
  mergingCartFormAnotherDevice,
} from '@/apis/store/cart/cart'
import { QueryDefaults } from '@/types/common/query/queryDefault'

export const cartQueryDefaults: QueryDefaults = {
  key: CART_STORE_QUERY_KEYS.USER,
  fn: async ({ signal }) => {
    await mergingCartFormAnotherDevice()
    return await getMyCart(signal)
  },
}
