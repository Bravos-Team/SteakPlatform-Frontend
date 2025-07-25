import SteakApi from '@/apis'

export const getMyCart = (signal?: AbortSignal) => {
  return SteakApi.get('/store/public/cart/me', { signal: signal })
}

export const addToCart = (gameId: string) => {
  return SteakApi.post(`/store/public/cart/add?gameId=${gameId}`)
}

export const removeFromCart = (gameId: string) => {
  return SteakApi.delete(`/store/public/cart/remove?gameId=${gameId}`)
}

export const clearCart = () => {
  return SteakApi.delete('/store/public/cart/clear')
}

export const moveToWishlist = (gameId: string) => {
  return SteakApi.post(`/store/public/cart/move-to-wishlist?gameId=${gameId}`)
}

export const mergingCartFormAnotherDevice = () => {
  return SteakApi.post('/store/public/cart/merge')
}
