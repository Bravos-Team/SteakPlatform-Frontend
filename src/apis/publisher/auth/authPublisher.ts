import SteakApi from '@/apis/index'
import { type PublisherRegisterRequest } from '@/types/publisher/AuthType'

export const register = (data: PublisherRegisterRequest) => {
  return SteakApi.post('/api/v1/dev/auth/register', data)
}
