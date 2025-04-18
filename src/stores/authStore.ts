import { defineStore } from 'pinia'
import { loginApi } from '@/services/auth/authService'
import type { LoginRequest } from '@/types/auth'

enum StatusCode {
  SUCCESS = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
}

export const useAuthStore = defineStore('authStore', () => {
  const statusMessageMap: Record<number, string> = {
    [StatusCode.SUCCESS]: 'Đăng nhập thành công',
    [StatusCode.BAD_REQUEST]: 'Lỗi cú pháp',
    [StatusCode.UNAUTHORIZED]: 'Sai tài khoản hoặc mật khẩu',
    [StatusCode.FORBIDDEN]: 'Tài khoản đã bị khoá',
  }

  async function login(loginRequest: LoginRequest): Promise<{ success: boolean; message: string }> {
    try {
      const apiResult = await loginApi(loginRequest)
      const message = statusMessageMap[apiResult.status] || 'Lỗi server'
      const isSuccess = apiResult.status === StatusCode.SUCCESS
      return {
        success: isSuccess,
        message,
      }
    } catch (error: any) {
      console.error('Lỗi trong login:', error)
      let message = 'Có lỗi Xảy ra khi đăng nhập'
      if (error?.response) {
        const status = error.response.status
        message = statusMessageMap[status] || `Lỗi server: ${status}`
      }
      return {
        success: false,
        message: message,
      }
    }
  }

  return {
    login,
  }
})
