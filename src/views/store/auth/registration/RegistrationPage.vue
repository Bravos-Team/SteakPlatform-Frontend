<template>
  <div class="text-white flex flex-col items-center justify-center px-4 min-h-screen">
    <div class="flex flex-col items-center mb-10">
      <img src="https://ccdn.steak.io.vn/logo_steak.svg" alt="Logo Image" class="h-22" />
      <p class="text-2xl text-black dark:text-white font-extrabold mt-2">Đăng ký</p>
    </div>

    <form @submit.prevent="handleSubmitRegistry" class="w-full max-w-md max-auto space-y-4 mb-10">
      <div>
        <p class="text-sm font-bold text-gray-500 dark:text-gray-400 mb-0.5">Email</p>
        <input
          v-model="account.email"
          type="email"
          name="email"
          id="email"
          placeholder="Nhập email của bạn"
          class="xl:w-full peer invalid:focus:border-red-500 h-12 px-4 rounded-lg bg-white dark:bg-[#1a1a1a] border border-black dark:border-gray-600 text-black dark:text-white invalid:focus:ring-2 invalid:focus:ring-red-500 focus:outline-none valid:focus:ring-2 valid:focus:ring-[#0af] transition w-full"
        />
        <label v-if="accountErrors.email" for="email" class="text-red-500">
          {{ accountErrors.email }}
        </label>
      </div>

      <div>
        <p class="text-sm font-bold text-gray-500 dark:text-gray-400 mb-0 5">Tên đăng nhập</p>
        <input
          type="text"
          v-model="account.username"
          placeholder="Tên đăng nhập"
          class="xl:w-full peer invalid:focus:border-red-500 h-12 px-4 rounded-lg bg-white dark:bg-[#1a1a1a] border border-black dark:border-gray-600 text-black dark:text-white invalid:focus:ring-2 invalid:focus:ring-red-500 focus:outline-none valid:focus:ring-2 valid:focus:ring-[#0af] transition w-full"
        />
        <label v-if="accountErrors.username" class="text-red-500">
          {{ accountErrors.username }}
        </label>
      </div>

      <div class="relative">
        <p class="text-sm font-bold text-gray-500 dark:text-gray-400 mb-0.5">Mật khẩu</p>

        <input
          :type="isPassword ? 'password' : 'text'"
          :placeholder="'Nhập mật khẩu của bạn'"
          name="password"
          id="password"
          v-model="account.password"
          class="xl:w-full peer invalid:focus:border-red-500 h-12 px-4 rounded-lg bg-white dark:bg-[#1a1a1a] border border-black dark:border-gray-600 text-black dark:text-white invalid:focus:ring-2 invalid:focus:ring-red-500 focus:outline-none valid:focus:ring-2 valid:focus:ring-[#0af] transition w-full"
        />
        <img
          @click="togglePasswordVisibility"
          :src="'https://ccdn.steak.io.vn/logo-on.svg'"
          class="absolute right-3 top-8 w-6 h-6 cursor-pointer"
          alt="Toggle Password"
        />
        <label v-if="accountErrors.password" class="text-red-500">
          {{ accountErrors.password }}
        </label>
      </div>

      <div>
        <p class="text-sm font-bold text-gray-500 dark:text-gray-400 mb-0.5">Xác nhận mật khẩu</p>

        <input
          type="password"
          :placeholder="'Xác nhận mật khẩu của bạn'"
          name="verifyPassword"
          id="verifyPassword"
          v-model="account.verifyPassword"
          class="xl:w-full peer invalid:focus:border-red-500 h-12 px-4 rounded-lg bg-white dark:bg-[#1a1a1a] border border-black dark:border-gray-600 text-black dark:text-white invalid:focus:ring-2 invalid:focus:ring-red-500 focus:outline-none valid:focus:ring-2 valid:focus:ring-[#0af] transition w-full"
        />
        <label v-if="accountErrors.verifyPassword" class="text-red-500">
          {{ accountErrors.verifyPassword }}
        </label>
      </div>

      <div>
        <label class="inline-flex items-start cursor-pointer relative">
          <input
            v-model="account.agreeNotification"
            type="checkbox"
            class="sr-only peer/notification"
          />
          <div
            class="min-w-5 min-h-5 border border-black dark:border-none dark:bg-[#202024] rounded-[3px] peer-checked/notification:bg-[#fff] peer-checked/notification:dark:bg-gray-700 transition-all duration-300 peer-checked/notification:ring-1 peer-checked/notification:ring-[#0af] peer"
          ></div>

          <svg
            class="w-5 h-5 text-black dark:text-white absolute left-0 top-0 transition-all duration-300 peer-checked/notification:block hidden"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="3"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <span class="ml-2 text-gray-500 dark:text-gray-400 font-bold"
            >gửi cho tôi tin tức mới mất, khảo sát và ưu đãi đặc biệt từ steak store</span
          >
        </label>
      </div>

      <div>
        <label class="inline-flex items-start cursor-pointer relative">
          <input
            v-model="account.agreeTermsOfServices"
            type="checkbox"
            class="sr-only peer/terms shrink-0"
          />

          <!-- CHECKBOX -->
          <div
            class="min-w-5 relative min-h-5 border border-black dark:border-none bg-white dark:bg-[#202024] rounded-[3px] peer-checked/terms:bg-[#fff] peer-checked/terms:dark:bg-gray-700 transition-all duration-300 peer-checked/terms:ring-1 peer-checked/terms:ring-[#0af]"
          ></div>
          <svg
            class="w-5 h-5 text-black dark:text-white absolute left-0 top-0 transition-all duration-300 peer-checked/terms:block hidden"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="3"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <!-- TEXT -->
          <span
            class="ml-2 before:text-red-500 before:content-['*'] text-gray-500 dark:text-gray-400 font-bold leading-snug"
          >
            Tôi đã đọc và đồng ý với
            <a :href="decodePrivateUrl(privateUrl)" class="underline text-blue-400"
              >Điều khoản Dịch vụ</a
            >
            và
            <a :href="decodePrivateUrl(privateUrl)" class="underline text-blue-400">
              Thỏa thuận Cấp phép Người dùng cuối của Steak Store.
            </a>
          </span>
        </label>

        <span v-if="accountErrors.agreeTermsOfServices" class="text-red-500">
          {{ accountErrors.agreeTermsOfServices }}
        </span>
      </div>

      <!-- BUTTON SUBMIT -->
      <div v-if="isRegisterPending">
        <div
          class="h-12 hover:ring-3 hover:bg-blue-400 overflow-hidden hover:text-black cursor-pointer hover:ring-blue-300 transition-all duration-300 bg-[#A9A9A9] rounded-[5px] w-full"
        >
          <div class="flex space-x-2 animate-pulse justify-center items-center bg-blue-400 h-full">
            <span class="sr-only">Loading...</span>
            <div
              class="h-2 w-2 bg-black dark:bg-white rounded-full animate-bounce [animation-delay:-0.3s]"
            ></div>
            <div
              class="h-2 w-2 bg-black dark:bg-white rounded-full animate-bounce [animation-delay:-0.15s]"
            ></div>
            <div class="h-2 w-2 bg-black dark:bg-white rounded-full animate-bounce"></div>
          </div>
        </div>
      </div>
      <div v-else>
        <button
          class="h-12 hover:ring-3 hover:bg-blue-400 hover:text-black cursor-pointer hover:ring-blue-300 transition-all duration-300 bg-[#3f3f3f] rounded-[5px] w-full"
        >
          Tiếp tục
        </button>
      </div>
      <!-- END BUTTON SUBMIT -->

      <span class="flex flex-row justify-center">
        <span class="me-1 text-black dark:text-white">Đã có tài khoản?</span>
        <router-link to="/login" class="text-[#0af] italic underline">Đăng nhập"</router-link>
      </span>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { RegisterRequest, RegisterRequestSchema } from '@/types/auth/AuthType'
import { extractErrors } from '@/utils/zod/HanldeZodErrors'
import {
  toastErrorNotificationPopup,
  toastSuccessNotificationPopup,
} from '@/composables/toast/toastNotificationPopup'
import { useRegisterMutation } from '@/hooks/store/auth/useAuthentications'
import { useRouter } from 'vue-router'
import { setCookie, removeCookie } from '@/utils/cookies/cookie-utils'
const router = useRouter()
const {
  isPending: isRegisterPending,
  mutateAsync: registerMutateAsync,
  isSuccess: isRegisterSuccess,
} = useRegisterMutation()

const account = ref<RegisterRequest>({
  username: '',
  email: '',
  password: '',
  verifyPassword: '',
  agreeNotification: false,
  agreeTermsOfServices: false,
})

const accountErrors = ref<Record<string, string>>({})

const handleSubmitRegistry = async () => {
  const { success, error } = RegisterRequestSchema.safeParse(account.value)
  if (!success) {
    accountErrors.value = extractErrors(error)
  } else {
    try {
      await registerMutateAsync(account.value)
      if (isRegisterSuccess) {
        accountErrors.value = {}
        removeCookie('emailUserRegister')
        setCookie('emailUserRegister', account.value.email)
        await router.push({ name: 'VerifyEmail' })
        return toastSuccessNotificationPopup(
          'Steak Game Store Authentication',
          'Registration successful. Please check your email to verify your account.',
        )
      }
    } catch (error: unknown | any) {
      const errResponse = error?.response?.data?.detail || 'An error occurred during registration.'
      accountErrors.value = { general: errResponse }
      return toastErrorNotificationPopup('Steak Game Store Authentication', errResponse)
    }
  }
}

const isPassword = ref(true)
const togglePasswordVisibility = () => {
  isPassword.value = !isPassword.value
}

const privateUrl = 'aHR0cHM6Ly95b3V0dS5iZS94dkZaam81UGdHMD9zaT1JV3lFNTZlX3hYN3k0dXJu'
const decodePrivateUrl = (url: string): string => {
  return decodeURIComponent(atob(url))
}
</script>
