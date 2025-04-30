
import axios from '@/libs/axiosInstance'
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from '@/types/auth/auth'
export async function loginApi(loginData: LoginRequest): Promise<LoginResponse> {
  const res = await axios.post(
    '/api/v1/account/auth/username-login',
    loginData,
  )
  return res.data

}

export async function registerApi(registerData: RegisterRequest): Promise<RegisterResponse> {
  const res = await axios.post('/api/v1/account/auth/register', registerData)
  return res.data
}
