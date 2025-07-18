import SteakApi from '@/apis/index'
import { AdminLoginRequest } from '@/types/admin/AuthType'

export const loginUserName = (data: AdminLoginRequest) => {
  return SteakApi.post('/admin/auth/username-login', data)
}

export const loginEmail = (data: AdminLoginRequest) => {
  return SteakApi.post('/admin/auth/email-login', data)
}
