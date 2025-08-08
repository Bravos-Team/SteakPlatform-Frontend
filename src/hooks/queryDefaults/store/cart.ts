import { CART_STORE_QUERY_KEYS } from '@/hooks/constants/store/cart-key'
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
    return await getMyCart(signal)
  },
}
