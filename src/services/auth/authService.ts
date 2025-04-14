import axios from 'axios'
import { LoginRequest, LoginResponse } from '@/types/auth'

export async function loginApi(loginData: LoginRequest): Promise<LoginResponse> {
  if (!loginData.username || !loginData.password) {
    throw new Error('Username and password are required!')
  }
 const res=  await axios.post<LoginResponse>('http://localhost:8888/api/v1/account/auth/username-login', loginData)

  return res.data;
}
