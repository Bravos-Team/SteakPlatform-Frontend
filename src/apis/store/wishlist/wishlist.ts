import SteakApi from '@/apis'

export const getMyWishlist = (signal?: AbortSignal) => {
  return SteakApi.get('/store/private/wishlist/me', { signal: signal })
}

export const addToWishlist = (gameId: bigint) => {
  return SteakApi.post(`/store/private/wishlist/add/${gameId}`)
}

export const removeFromWishlist = (gameId: bigint) => {
  return SteakApi.post(`/store/private/wishlist/remove/${gameId}`)
}

export const clearWishlist = () => {
  return SteakApi.post('/store/private/wishlist/clear')
}

export const moveToCart = (gameId: bigint) => {
  return SteakApi.post(`/store/private/wishlist/move-to-cart/${gameId}`)
}
