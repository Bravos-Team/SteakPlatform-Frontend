<template>
  <div
    class="text-black dark:text-white flex flex-col items-center justify-center px-4 min-h-screen"
  >
    <div class="flex flex-col items-center mb-10">
      <img src="https://cdn.steak.io.vn/logo_steak.svg" alt="Logo Image" class="h-22" />
      <p class="text-2xl font-extrabold mt-2">Đăng Nhập</p>
    </div>

    <form class="w-full max-w-md mx-auto space-y-4">
      <div>
        <p class="text-sm font-bold text-gray-500 dark:text-gray-400 mb-0.5">
          Email hoặc Tên đăng nhập
        </p>
        <input
          type="email"
          v-model="loginRequest.username"
          autocomplete="username"
          placeholder="Nhập email hoặc tên đăng nhập"
          class="xl:w-full peer invalid:focus:border-red-500 h-12 px-4 rounded-lg bg-white dark:bg-[#1a1a1a] border border-black dark:border-gray-600 dark:text-white invalid:focus:ring-2 invalid:focus:ring-red-500 focus:outline-none valid:focus:ring-2 valid:focus:ring-[#0af] transition w-full"
        />
        <label for="email" class="hidden peer-invalid:block text-red-500">
          Vui lòng nhập email hợp lệ
        </label>
      </div>

      <div>
        <p class="text-sm font-bold text-gray-500 dark:text-gray-400 mb-1">Mật khẩu</p>
        <div class="relative">
          <input
            id="password"
            v-model="loginRequest.password"
            autocomplete="current-password"
            type="password"
            placeholder="Nhập mật khẩu"
            required
            class="peer xl:w-full h-12 px-4 pr-12 rounded-lg bg-white dark:bg-[#1a1a1a] border border-black dark:border-gray-600 dark:text-white invalid:focus:border-red-500 invalid:focus:ring-2 invalid:focus:ring-red-500 focus:outline-none valid:focus:ring-2 valid:focus:ring-[#0af] transition w-full"
          />
          <img
            :src="'https://cdn.steak.io.vn/logo-on.svg'"
            class="absolute right-3 top-3 w-6 h-6 cursor-pointer"
            alt="Toggle Password"
          />
        </div>
      </div>

      <div class="text-right">
        <a href="#" class="text-sm text-[#0af] italic underline">Quên mật khẩu?</a>
      </div>

      <div>
        <button
          type="button"
          class="w-full h-12 bg-white dark:bg-gray-500 dark:text-white border border-black dark:border-none font-medium italic rounded-lg cursor-pointer hover:bg-[#464646] hover:text-white hover:ring-2 hover:ring-gray-800 hover:dark:ring-3 hover:dark:bg-blue-300 hover:dark:text-black hover:dark:ring-blue-400 transition duration-300"
          @click="onSubmit"
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
          <img :src="'https://cdn.steak.io.vn/logo-google.svg'" class="h-6" />
        </button>
        <button
          class="flex items-center justify-center h-12 border border-black w-full bg-[#65a8ff] dark:bg-[#1877f2] rounded-lg"
        >
          <img :src="'https://cdn.steak.io.vn/logos_facebook.svg'" class="h-6" />
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
import { reactive, onMounted } from 'vue'
import { LoginRequest } from '@/types/auth/auth'
import { useAuthStore } from '@/stores/authStore'
import {genderDeviceId} from '@/util/fingerprint'
import { validateLoginRequest } from '../../../validators/auth/LoginValidator'
const {login} =useAuthStore()


const loginRequest = reactive<LoginRequest>({
  username: '',
  password: '',
  deviceId: '',
})

onMounted(async () => {
  try {
    const deviceId = await genderDeviceId()
    console.log('deviceId:', deviceId)
    loginRequest.deviceId = deviceId
  } catch (err) {
    console.error('Lỗi khi lấy deviceId:', err)
  }
})

async function onSubmit() {
  const result = validateLoginRequest(loginRequest);

  if (!result.success){
    console.log('Form lỗi' , result.error.format())
    return;
  }
 const validData = result.data
 const res =await login(validData)
  if (res.error){
    console.log(res.error)
  }
}


</script>
