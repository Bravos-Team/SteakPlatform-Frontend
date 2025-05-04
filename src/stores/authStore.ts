import { defineStore } from 'pinia'
import { loginApi } from '@/services/auth/authService'

import type { LoginRequest } from '@/types/auth/auth'

import { parseApiError } from '@/types/auth/parseApiError'

export const useAuthStore = defineStore('authStore', () => {
  async function login(loginRequest: LoginRequest) {
    try {
      const data = await loginApi(loginRequest)
      return { success: true, message: 'Đăng nhập thành công' }
    } catch (error) {
      const parseError = parseApiError(error)
      return { success: false, message: parseError.message }
    }
  }

  return {
    login,
  }
})
