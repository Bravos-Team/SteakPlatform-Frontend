<template>
  <div
    class="text-black dark:text-white flex flex-col items-center justify-center px-4 min-h-screen"
  >
    <div class="flex flex-col items-center mb-10">
      <img src="https://ccdn.steak.io.vn/logo_steak.svg" alt="Logo Image" class="h-22" />
      <p class="text-2xl font-extrabold mt-2">Đăng Nhập</p>
    </div>

    <form @submit.prevent="onSubmit" novalidate class="w-full max-w-md mx-auto space-y-4">
      <div>
        <p class="text-sm font-bold text-gray-500 dark:text-gray-400 mb-0.5">
          Email hoặc Tên đăng nhập
        </p>
        <input
          type="text"
          required
          v-model="form.usernameOrEmail"
          autocomplete="username"
          placeholder="Nhập email hoặc tên đăng nhập"
          class="xl:w-full peer invalid:focus:border-red-500 h-12 px-4 rounded-lg bg-white dark:bg-[#1a1a1a] border border-black dark:border-gray-600 dark:text-white invalid:focus:ring-2 invalid:focus:ring-red-500 focus:outline-none valid:focus:ring-2 valid:focus:ring-[#0af] transition w-full"
        />
        <label v-if="errors.usernameOrEmail" class="peer-invalid:block text-red-500">
          {{ errors.usernameOrEmail }}
        </label>
      </div>

      <div>
        <p class="text-sm font-bold text-gray-500 dark:text-gray-400 mb-1">Mật khẩu</p>
        <div class="relative">
          <input
            :type="isPassword ? 'password' : 'text'"
            id="password"
            v-model="form.password"
            autocomplete="current-password"
            required
            placeholder="Nhập mật khẩu"
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

      <div class="text-right">
        <a href="#" class="text-sm text-[#0af] italic underline">Quên mật khẩu?</a>
      </div>

      <div v-if="loginStore.isLoading">
        <div
          class="h-12 hover:ring-3 hover:bg-blue-400 overflow-hidden hover:text-black cursor-not-allowed hover:ring-blue-300 transition-all duration-300 bg-[#A9A9A9] rounded-[5px] w-full"
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
          type="submit"
          class="w-full h-12 bg-white dark:bg-gray-500 dark:text-white border border-black dark:border-none font-medium italic rounded-lg cursor-pointer hover:bg-[#464646] hover:text-white hover:ring-2 hover:ring-gray-800 hover:dark:ring-3 hover:dark:bg-blue-300 hover:dark:text-black hover:dark:ring-blue-400 transition duration-300"
        >
          Đăng nhập
        </button>
      </div>

      <div class="flex items-center text-sm font-bold text-black dark:text-white">
        <hr class="flex-1 border-gray-600" />
        <span class="px-4">hoặc bằng cách khác</span>
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
          <img :src="'https://ccdn.steak.io.vn/assets-facebook-ico.svg'" class="h-6" />
        </button>
      </div>
    </form>

    <footer class="mt-10 mb-10 flex flex-col items-center space-y-3">
      <a href="/register" class="text-[#0af] italic underline">Tạo tài khoản</a>
      <a href="#" class="text-[#0af] italic underline">Chính sách Bảo mật</a>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'

import { useAuthStore } from '@/stores/auth/LoginStore'
import { generateDeviceId, generateDeviceInfo } from '@/utils/fingerprint'
import { isEmail, loginByEmailSchema, loginByUserNameSchema } from '@/types/auth/AuthType'

import { useNotificationStore } from '@/stores/notificationStore'
import { validationForm } from '../../../validators/auth/parseZodError'

const loginStore = useAuthStore()
import { ZodSchema } from 'zod'
import { extractErrors } from '@/utils/zod/HanldeZodErrors'

const notificationStore = useNotificationStore()
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

function validationForms(schema: ZodSchema, data: unknown) {
  const { valid, errors: validationErrors } = validationForm(schema, data)
  if (!valid) {
    return typeof validationErrors === 'object' ? validationErrors : {}
  }
  return {}
}

async function onSubmit() {
  function getSchemaAndPayLoad(formData: typeof form) {
    const commonData = {
      password: formData.password,
      deviceId: formData.deviceId,
      deviceInfo: formData.deviceInfo,
    }
    if (isEmail(formData.usernameOrEmail)) {
      return {
        schema: loginByEmailSchema,
        payload: {
          ...commonData,
          email: formData.usernameOrEmail,
        },
        type: 'email',
      }
    } else {
      return {
        schema: loginByUserNameSchema,
        payload: {
          ...commonData,
          username: formData.usernameOrEmail,
        },
        type: 'username',
      }
    }
  }

  loginStore.resetLoginState()

  const { schema, payload, type } = getSchemaAndPayLoad(form)
  errors.value = validationForms(schema, payload)

  const { success, error } = schema.safeParse(payload)
  if (!success) {
    errors.value = extractErrors(error)
    if (type === 'email' && errors.value.email) {
      errors.value.usernameOrEmail = errors.value.email
    }
    if (type === 'username' && errors.value.username) {
      errors.value.usernameOrEmail = errors.value.username
    }
    return
  }

  errors.value = {}

  await (type === 'email'
    ? loginStore.loginEmail(payload)
    : loginStore.loginUserName(payload))

  if (!loginStore.loginError) {
    notificationStore.showSuccess(loginStore.loginMessage || 'Đăng nhập thành công')
  } else {
    notificationStore.showError(loginStore.loginError || 'Đăng nhập không thành công')
  }

  setTimeout(notificationStore.hide, 5000)
}
</script>
