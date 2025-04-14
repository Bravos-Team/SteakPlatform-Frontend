import { defineStore } from 'pinia'
import { loginApi } from '@/services/auth/authService'
import type { LoginRequest, LoginResponse } from '@/types/auth'

import FingerprintJS from '@fingerprintjs/fingerprintjs';



 export const useAuthStore = defineStore('authStore', () => {


    async function login(loginRequest: LoginRequest): Promise<LoginResponse> {
      try {
        return  loginApi(loginRequest)
      } catch (error) {

        throw error
      }
    }

     async function genderDeviceId() {
      try {
        console.log("Đang load fingerprint...");
        const fp = await FingerprintJS.load();
        console.log("FingerprintJS load xong rồi!");
        const result = await fp.get();
        return result.visitorId
      } catch (error) {
        console.error('Lỗi khi tạo device ID:', error)
        return ''
      }
    }
    return {
      login,
      genderDeviceId,
    }
  }
)

