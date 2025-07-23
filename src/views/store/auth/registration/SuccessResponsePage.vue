<template>
  <div class="min-h-screen bg-dark flex flex-col items-center justify-center invert dark:invert-0">
    <div
      class="max-w-md w-full bg-gray-900/40 rounded-xl shadow-2xl overflow-hidden border-1 border-white dark:border-0"
    >
      <div class="p-8">
        <div class="flex justify-center mb-6">
          <div class="rounded-full bg-emerald-900 p-3">
            <CheckCircleIcon class="h-12 w-12 text-emerald-600" />
          </div>
        </div>

        <h1 class="text-2xl font-bold text-center text-white mb-2">Xác thực thành công!</h1>
        <p class="text-gray-300 text-center mb-6">
          Tài khoản của bạn đã được xác thực thành công. Bây giờ bạn có thể sử dụng đầy đủ các chức
          năng của hệ thống.
        </p>

        <div class="flex flex-col space-y-4">
          <router-link
            :to="{ name: 'Login' }"
            class="py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium text-center transition-colors duration-300"
          >
            Đăng nhập ngay
          </router-link>

          <router-link
            to="/"
            class="py-3 px-4 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg font-medium text-center transition-colors duration-300"
          >
            Về trang chủ
          </router-link>
        </div>
      </div>

      <div class="bg-gradient-to-r from-dark-500 to-teal-500 h-2"></div>
    </div>

    <div class="mt-8 text-gray-500 text-sm text-center">
      <p>
        Nếu bạn cần hỗ trợ, vui lòng liên hệ
        <span class="cursor-pointer text-emerald-400 hover:text-emerald-300"
          >steak@support.com</span
        >
      </p>
    </div>
  </div>
</template>

<script setup>
import { CheckCircleIcon } from 'lucide-vue-next'
</script>
