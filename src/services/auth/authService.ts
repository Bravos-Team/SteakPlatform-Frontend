import axios from 'axios'
import type { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from '@/types/auth/auth'
import { ApiResult } from '@/types/apiResult'

export async function loginApi(loginData: LoginRequest): Promise<ApiResult<LoginResponse>> {
  try {
    const res=  await axios.post('http://localhost:8888/api/v1/account/auth/username-login', loginData)
    return {
      status : res.status,
      data:res.data as LoginResponse
    };
  }catch (error :any){
   return extractError(error)
  }

}
export async function registerApi(registerData :RegisterRequest) : Promise<ApiResult<RegisterResponse>>{
    try {
      const res = await  axios.post('http://localhost:8888/api/v1/account/auth/register',registerData)
      return {
        status:res.status,
        data:res.data as RegisterResponse,
      }
    }catch (error :any){
     return extractError(error)
    }
}
function extractError(error :any) : ApiResult<any>{
  if (axios.isAxiosError(error)){
    if (error.response){
      return {
        status : error.response.status,
        error: error.response.data
      }
    }else {
      return {
        status :503,
        error: {
          detail:'Không thể kết nối đến máy chủ. Vui lòng thử lại sau.',
        },
      }
    }
  }

  return {
    status :500,
    error :{
      detail: 'Lỗi không xác định',
    }
  }
}
