import SteakApi from '@/apis'

export const getMyWishlist = (signal?: AbortSignal) => {
  return SteakApi.get('/store/private/wishlist/me', { signal: signal })
}

export const addToWishlist = (gameId: string) => {
  return SteakApi.post(`/store/private/wishlist/add?gameId=${gameId}`)
}

export const removeFromWishlist = (gameId: bigint) => {
  return SteakApi.delete(`/store/private/wishlist/remove?gameId=${gameId}`)
}

export const clearWishlist = () => {
  return SteakApi.delete('/store/private/wishlist/clear')
}

export const moveToCart = (gameId: bigint) => {
  return SteakApi.post(`/store/private/wishlist/move-to-cart?gameId=${gameId}`)
}
