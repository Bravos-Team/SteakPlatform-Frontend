
import LoginRequest from '../../../validators/auth/LoginValidator'
import api from '@/libs/axios'
export async function loginApiUserName(loginData: LoginRequest) {
  const res = await api.post(
    '/api/v1/user/auth/username-login',
    loginData,
  )
  return res.data

}

export async function loginApiEmail(loginData: LoginRequest) {
  const res = await api.post(
    '/api/v1/user/auth/email-login',
    loginData,
  )
  return res.data
}
