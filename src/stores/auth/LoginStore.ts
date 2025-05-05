import { defineStore } from 'pinia'
import { loginApiEmail, loginApiUserName } from '@/services/auth/authService'

import { parseApiError } from '@/types/auth/parseApiError'
import LoginRequest from '@/types/auth/AuthType'
import { ref } from 'vue'

export const useAuthStore = defineStore('loginStore', () => {
  const isLoading = ref<boolean>(false)
  const loginError = ref<string | null>(null)
  const loginMessage = ref<string | null>(null)
  const loginResult = ref<string | null>(null)

  const loginUserName = async function (loginRequest: LoginRequest) {
    try {
      isLoading.value = true
      loginResult.value = await loginApiUserName(loginRequest)
      loginMessage.value = 'Dang nhap thanh cong'
    } catch (error: any) {
      loginError.value = parseApiError(error).message
    } finally {
      isLoading.value = false
    }
  }

  const loginEmail = async function loginEmail(loginRequest: LoginRequest) {
    try {
      isLoading.value = true
      loginResult.value = await loginApiEmail(loginRequest)
      loginMessage.value = 'Dang nhap thanh cong'
    } catch (error: any) {
      loginError.value = parseApiError(error).message
    } finally {
      isLoading.value = false
    }
  }

  return {
    loginUserName,
    loginEmail,
    loginError,
    loginMessage,
    loginResult,
    isLoading,
  }
})
