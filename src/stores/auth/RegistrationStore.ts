import { defineStore } from 'pinia'
import { RegisterRequest, RegisterRequestSchema } from '@/types/auth/AuthType'
import axios from 'axios'
import { ref } from 'vue'
import { z } from 'zod'
import { useRouter } from 'vue-router'
import { setCookie, removeCookie } from '@/utils/cookies/cookie-utils'

const registerSchema = z.function().args(RegisterRequestSchema).returns(z.void())

export const registrationStore = defineStore(
  'registrationStore',
  () => {
    const isLoading = ref<boolean>(false)
    const registryError = ref<string | null>(null)
    const registryMessage = ref<string | null>(null)
    const registryResult = ref<string | null>(null)
    const router = useRouter()

    const register = async (registerRequest: RegisterRequest): Promise<void> => {
      try {
        isLoading.value = true
        const response = await axios.post(
          import.meta.env.VITE_BASE_API_URL + '/api/v1/user/auth/register',
          registerRequest,
          {
            timeout: 5000,
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )

        if (response.status !== 200) {
          registryError.value = 'Đăng ký không thành công'
        }
        registryMessage.value = 'Đăng ký thành công'
        removeCookie('emailUserRegister')
        setCookie('emailUserRegister', registerRequest.email)

        await router.push('verify-email')
      } catch (error) {
        if (error instanceof Error && error.message.startsWith('Invalid register parameters')) {
          registryError.value = error.message
        } else {
          registryError.value = 'Đăng ký không thành công'
        }
        console.log('register error: ', error)
      } finally {
        isLoading.value = false
      }
    }

    return {
      isLoading,
      registryError,
      registryMessage,
      registryResult,
      register,
    }
  },
  {
    persist: true,
  },
)
