import SteakApi from '@/apis/index'
import { PublisherLoginRequest, type PublisherRegisterRequest } from '@/types/publisher/AuthType'

export const register = (data: PublisherRegisterRequest) => {
  return SteakApi.post('/dev/auth/register', data)
}

export const loginUserName = (data: PublisherLoginRequest) => {
  return SteakApi.post('/dev/auth/username-login', data)
}

export const loginEmail = (data: PublisherLoginRequest) => {
  return SteakApi.post('/dev/auth/email-login', data)
}

export const logout = () => {
  return SteakApi.get('/dev/auth/logout')
}
