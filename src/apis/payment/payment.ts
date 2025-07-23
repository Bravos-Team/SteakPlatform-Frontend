import SteakApi from '@/apis/index'

export const checkout = async (gameIds: string[]) => {
  return await SteakApi.post('/store/private/order/create', { gameIds: gameIds })
}
