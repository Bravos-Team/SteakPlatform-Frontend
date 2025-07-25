<template>
  <div
    class="text-black dark:text-white flex flex-col items-center justify-center px-4 min-h-screen"
  >
    <div class="flex flex-col items-center mb-10">
      <img src="https://ccdn.steak.io.vn/logo_steak.svg" alt="Logo Image" class="h-22" />
      <p class="text-2xl font-extrabold mt-2">{{ $t('auth.login') }}</p>
    </div>

    <form @submit.prevent="handleSubmission" novalidate class="w-full max-w-md mx-auto space-y-4">
      <div>
        <p class="text-sm font-bold text-gray-500 dark:text-gray-400 mb-0.5">
          {{ $t('auth.informations.username_and_password') }}
        </p>
        <input
          type="text"
          required
          v-model="form.usernameOrEmail"
          autocomplete="username"
          :placeholder="$t('auth.informations.username_and_password_placeholder')"
          class="xl:w-full peer invalid:focus:border-red-500 h-12 px-4 rounded-lg bg-white dark:bg-[#1a1a1a] border border-black dark:border-gray-600 dark:text-white invalid:focus:ring-2 invalid:focus:ring-red-500 focus:outline-none valid:focus:ring-2 valid:focus:ring-[#0af] transition w-full"
        />
        <label v-if="errors.usernameOrEmail" class="peer-invalid:block text-red-500">
          {{ errors.usernameOrEmail }}
        </label>
      </div>

      <div>
        <p class="text-sm font-bold text-gray-500 dark:text-gray-400 mb-1">
          {{ $t('auth.informations.password') }}
        </p>
        <div class="relative">
          <input
            :type="isPassword ? 'password' : 'text'"
            id="password"
            v-model="form.password"
            autocomplete="current-password"
            required
            :placeholder="$t('auth.informations.password_placeholder')"
            class="peer xl:w-full h-12 px-4 pr-12 rounded-lg bg-white dark:bg-[#1a1a1a] border border-black dark:border-gray-600 dark:text-white invalid:focus:border-red-500 invalid:focus:ring-2 invalid:focus:ring-red-500 focus:outline-none valid:focus:ring-2 valid:focus:ring-[#0af] transition w-full"
          />
          <img
            :src="'https://ccdn.steak.io.vn/logo-on.svg'"
            class="absolute right-3 top-3 w-6 h-6 cursor-pointer"
            alt="Toggle Password"
            @click="isPassword = !isPassword"
          />
        </div>
        <label v-if="errors.password" class="peer-invalid:block text-red-500">
          {{ errors.password }}
        </label>
      </div>

      <div class="text-right flex justify-between items-center">
        <router-link :to="{ name: 'store' }" class="text-sm text-[#0af] underline">
          {{ $t('navigation.steak_store') }}
        </router-link>
        <a href="#" class="text-sm text-[#0af] underline">
          {{ $t('auth.informations.forgot_password') }}
        </a>
      </div>

      <div v-if="isLoginByEmailPending || isLoginByUsernamePending">
        <div
          class="h-12 hover:ring-3 hover:bg-blue-400 overflow-hidden hover:text-black cursor-not-allowed hover:ring-blue-300 transition-all duration-300 bg-[#A9A9A9] rounded-[5px] w-full"
        >
          <div class="flex space-x-2 animate-pulse justify-center items-center bg-blue-400 h-full">
            <span class="sr-only"> {{ $t('auth.informations.isLogin') }}</span>
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
          type="submit"
          class="w-full h-12 bg-white dark:bg-gray-500 dark:text-white border border-black dark:border-none font-medium rounded-lg cursor-pointer hover:bg-[#464646] hover:text-white hover:ring-2 hover:ring-gray-800 hover:dark:ring-3 hover:dark:bg-blue-300 hover:dark:text-black hover:dark:ring-blue-400 transition duration-300"
        >
          {{ $t('auth.login') }}
        </button>
      </div>

      <div class="flex items-center text-sm font-bold text-black dark:text-white">
        <hr class="flex-1 border-gray-600" />
        <span class="px-4"> {{ $t('auth.or_login_with') }}</span>
        <hr class="flex-1 border-gray-600" />
      </div>

      <div class="flex flex-col space-y-4">
        <button
          class="flex items-center justify-center h-12 w-full border border-black dark:border-none bg-white rounded-lg"
        >
          <img :src="'https://ccdn.steak.io.vn/google-ico.svg'" class="h-6" />
        </button>
        <button
          class="flex items-center justify-center h-12 border border-black w-full bg-[#65a8ff] dark:bg-[#1877f2] rounded-lg"
        >
          <img :src="'https://ccdn.steak.io.vn/assets-facebook-ico.svg'" class="h-6" alt="logo" />
        </button>
        <div class="flex items-center justify-center">
          <router-link :to="{ name: 'PublisherAuthLogin' }" class="underline text-sky-400">{{
            $t('auth.login_as_publisher')
          }}</router-link>
        </div>
      </div>
    </form>

    <footer class="mt-10 mb-10 flex flex-col items-center space-y-3">
      <p class="text-sm text-gray-500 dark:text-gray-400 flex gap-x-1">
        {{ $t('auth.dont_have_an_account') }}?
        <router-link to="/register" class="text-[#0af] underline">
          {{ $t('auth.register') }}</router-link
        >
      </p>
      <p class="text-sm text-gray-500 dark:text-gray-400 flex gap-x-1">
        {{ $t('auth.by_logging_in') }}
        <a href="#" class="text-[#0af] underline"> {{ $t('auth.terms_of_services') }}</a>
        {{ $t('auth.and') }}
        <a href="#" class="text-[#0af] underline"> {{ $t('auth.policy') }}</a
        >.
      </p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'

import { generateDeviceId, generateDeviceInfo } from '@/utils/fingerprint'
import { COMMON_DATA, loginByEmailSchema, loginByUserNameSchema } from '@/types/auth/AuthType'
import {
  toastErrorNotificationPopup,
  toastSuccessNotificationPopup,
} from '@/composables/toast/toastNotificationPopup'

import { extractErrors } from '@/utils/zod/HanldeZodErrors'
import { isEmail } from '@/utils/type/typeChecking'
import {
  useLoginByEmailMutation,
  useLoginByUsernameMutation,
} from '@/hooks/store/auth/useAuthentications'
import { useRouter } from 'vue-router'
const router = useRouter()
const {
  isPending: isLoginByEmailPending,
  isSuccess: isLoginByEmailSuccess,
  mutateAsync: mutateLoginByEmail,
  data: loginByEmailData,
} = useLoginByEmailMutation()
const {
  isPending: isLoginByUsernamePending,
  isSuccess: isLoginByUsernameSuccess,
  data: loginByUsernameData,
  mutateAsync: mutateLoginByUsername,
} = useLoginByUsernameMutation()

const form = reactive({
  usernameOrEmail: '',
  password: '',
  deviceId: '',
  deviceInfo: '',
})
const isPassword = ref(true)

onMounted(async () => {
  try {
    form.deviceInfo = await generateDeviceInfo()
    form.deviceId = await generateDeviceId()
  } catch (err) {
    console.error('Lỗi khi lấy deviceId:', err)
  }
})

const errors = ref<Record<string, string>>({})

const handleSubmission = async () => {
  const commonData: COMMON_DATA = {
    password: form.password,
    deviceId: form.deviceId,
    deviceInfo: form.deviceInfo,
  }
  if (isEmail(form.usernameOrEmail)) {
    commonData.email = form.usernameOrEmail
    delete commonData.username
    const { success, error } = loginByEmailSchema.safeParse(commonData)
    if (!success) {
      errors.value = extractErrors(error)
      errors.value.usernameOrEmail = errors.value.email
      delete errors.value.email
      return
    } else {
      errors.value = {}
      try {
        await mutateLoginByEmail({ ...commonData, email: form.usernameOrEmail })
        if (isLoginByEmailSuccess)
          toastSuccessNotificationPopup(
            'Login successful',
            `Welcome back! ${loginByEmailData.value.data.displayName}`,
          )
        else toastErrorNotificationPopup('Login failed', 'Please check your email or password.')
      } catch (error: any) {
        toastErrorNotificationPopup('Login failed', `Error: ${error.response.data.detail}`)
      }
    }
  } else {
    commonData.username = form.usernameOrEmail
    delete commonData.email
    const { success, error } = loginByUserNameSchema.safeParse(commonData)
    if (!success) {
      errors.value = extractErrors(error)
      errors.value.usernameOrEmail = errors.value.username
      delete errors.value.username
      return
    } else {
      errors.value = {}
      try {
        const response = await mutateLoginByUsername({
          ...commonData,
          username: form.usernameOrEmail,
        })
        if (response.status === 200) {
          ;(window as any).api?.login(response.data)
          toastSuccessNotificationPopup(
            'Login successful',
            `Welcome back! ${loginByUsernameData.value.data.displayName}`,
          )
        } else
          toastErrorNotificationPopup('Login failed', 'Please check your username or password.')
        await router.push({ name: 'store-home' })
      } catch (error: any) {
        toastErrorNotificationPopup('Login failed', `Error: ${error?.response?.data?.detail}`)
      }
    }
  }
}
const privateUrl = 'aHR0cHM6Ly95b3V0dS5iZS94dkZaam81UGdHMD9zaT1JV3lFNTZlX3hYN3k0dXJu'
const decodePrivateUrl = (url: string): string => {
  return decodeURIComponent(atob(url))
}
</script>
