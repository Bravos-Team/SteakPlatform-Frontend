import SteakApi from '@/apis/index'
import LoginRequest from '@/types/auth/AuthType'
export async function loginApiUserName(loginData: LoginRequest) {
  const res = await SteakApi.post('/api/v1/user/auth/username-login', loginData)
  return res.data
}

export async function loginApiEmail(loginData: LoginRequest) {
  const res = await SteakApi.post('/api/v1/user/auth/email-login', loginData)
  return res.data
}
