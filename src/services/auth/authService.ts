import axios from 'axios'
import { LoginRequest } from '@/types/auth'
import { ApiResult } from '@/types/apiResult'

export async function loginApi(loginData: LoginRequest): Promise<ApiResult<null>> {
  if (!loginData.username || !loginData.password) {
    throw new Error('Username and password are required!')
  }
 const res=  await axios.post('http://localhost:8888/api/v1/account/auth/username-login', loginData)
  return { status : res.status };
}
