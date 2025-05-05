import { defineStore } from 'pinia'
import { loginApiEmail, loginApiUserName } from '@/services/auth/authService'

import { parseApiError } from '@/types/auth/parseApiError'
import LoginRequest from '../../validators/auth/LoginValidator'

export const useAuthStore = defineStore('authStore', () => {
  async function loginUserName(loginRequest: LoginRequest) {
    try {
      const data = await loginApiUserName(loginRequest)
      return { success: true, data: data }
    } catch (error) {
      const parseError = parseApiError(error)
      return { success: false, message: parseError.message }
    }
  }

  async function loginEmail(loginRequest: LoginRequest) {
    try {
      const data = await loginApiEmail(loginRequest)
      return { success: true, data: data }
    } catch (error) {
      const parseError = parseApiError(error)

      return { success: false, message: parseError.message }
    }
  }
  return {
    loginUserName,
    loginEmail,
  }
})
