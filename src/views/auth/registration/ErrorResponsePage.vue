<template>
  <div class="min-h-screen bg-dark flex flex-col items-center justify-center p-4 invert dark:invert-0">
    <div class="max-w-md w-full bg-gray-900 rounded-xl shadow-2xl overflow-hidden">
      <div class="p-8">
        <div class="flex justify-center mb-6">
          <div class="rounded-full bg-red-900 p-3">
            <XCircleIcon class="h-12 w-12 text-red-400" />
          </div>
        </div>

        <h1 class="text-2xl font-bold text-center text-white mb-2">Xác thực thất bại</h1>
        <p class="text-gray-300 text-center mb-6">
          Rất tiếc, chúng tôi không thể xác thực tài khoản của bạn. Đường dẫn xác thực có thể đã hết hạn hoặc không hợp
          lệ.
        </p>

        <div class="flex flex-col space-y-4">
          <router-link to="/auth/register"
            class="py-3 px-4 bg-indigo-600 text-center hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors duration-300">
            Đăng ký lại
          </router-link>

          <router-link to="#"
            class="py-3 px-4 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg font-medium text-center transition-colors duration-300">
            Liên hệ hỗ trợ
          </router-link>

          <router-link to="/" class="text-gray-400 hover:text-gray-300 text-center py-2 transition-colors duration-300">
            Về trang chủ
          </router-link>
        </div>
      </div>

      <div class="bg-gradient-to-r from-red-500 to-indigo-500 h-2"></div>
    </div>

    <div class="mt-8 text-gray-500 text-sm">
      <p>Nếu bạn tiếp tục gặp vấn đề, vui lòng liên hệ <span
          class="text-indigo-400 hover:text-indigo-300 cursor-pointer">support@example.com</span></p>
    </div>
  </div>
</template>

<script setup>
import { XCircleIcon } from 'lucide-vue-next';

</script>
