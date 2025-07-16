import SteakApi from '@/apis/index'
import { PublisherLoginRequest, type PublisherRegisterRequest } from '@/types/publisher/AuthType'

export const register = (data: PublisherRegisterRequest) => {
  return SteakApi.post('/api/v1/dev/auth/register', data)
}

export const loginUserName = (data: PublisherLoginRequest) => {
  return SteakApi.post('/api/v1/dev/auth/username-login', data)
}

export const loginEmail = (data: PublisherLoginRequest) => {
  return SteakApi.post('/api/v1/dev/auth/email-login', data)
}

export const logout = () => {
  return SteakApi.get('/api/v1/dev/auth/logout')
}
