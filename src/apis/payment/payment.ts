import SteakApi from '@/apis/index'

export const checkout = async (gameIds: string[]) =>
  await SteakApi.post('/store/private/order/create', { gameIds: gameIds })
