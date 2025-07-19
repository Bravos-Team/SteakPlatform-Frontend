import SteakApi from '@/apis'

export const getMyCart = (signal?: AbortSignal) => {
  return SteakApi.get('/store/public/cart/me', { signal: signal })
}

export const addToCart = (gameId: bigint) => {
  return SteakApi.post(`/store/public/cart/add/${gameId}`)
}

export const removeFromCart = (gameId: bigint) => {
  return SteakApi.post(`/store/public/cart/remove/${gameId}`)
}

export const clearCart = () => {
  return SteakApi.post('/store/public/cart/clear')
}

export const moveToWishlist = (gameId: bigint) => {
  return SteakApi.post(`/store/public/cart/move-to-wishlist/${gameId}`)
}
