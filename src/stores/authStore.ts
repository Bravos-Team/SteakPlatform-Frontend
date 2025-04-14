import { defineStore } from 'pinia'
import { loginApi } from '@/services/auth/authService'
import type { LoginRequest } from '@/types/auth'

export const useAuthStore = defineStore('authStore', () => {
  async function login(loginRequest: LoginRequest): Promise<string> {
    try {
      const apiResult = await loginApi(loginRequest)
      const statusMessageMap: Record<number, string> = {
        200: 'Đăng nhập thành công',
        400: 'Lỗi cú pháp',
        401: 'Sai tài khoản hoặc mật khẩu',
        403: 'Tài khoản đã bị khoá',
      }

      return statusMessageMap[apiResult.status] || 'Lỗi server'
    } catch (error) {
      console.error('Lỗi trong login:', error)
      throw error
    }
  }

  return {
    login,
  }
})
