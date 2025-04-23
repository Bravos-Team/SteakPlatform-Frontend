import { defineStore } from 'pinia'
import { loginApi, registerApi } from '@/services/auth/authService'

import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse
} from '@/types/auth/auth'
import { ApiResult } from '@/types/apiResult'

enum StatusCode {
  SUCCESS = 200,
}


export const useAuthStore = defineStore('authStore', () => {
  async function login(loginRequest: LoginRequest): Promise<ApiResult<LoginResponse>> {
    return handleApiCall(() => loginApi(loginRequest))
  }

  async function register(registerRequest: RegisterRequest): Promise<ApiResult<RegisterResponse>> {
    return handleApiCall(() => registerApi(registerRequest))
  }

  return {
    login,
    register,
  }
})

async function handleApiCall<T>(apiFn: () => Promise<ApiResult<T>>): Promise<ApiResult<T>> {
  const res =await apiFn()

  if (res.status === StatusCode.SUCCESS && res.data)
    return { status: res.status, data: res.data }

  return {
    status: res.status ?? 500,
    error: res.error ?? undefined
  }
}
