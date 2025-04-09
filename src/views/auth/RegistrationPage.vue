<template>
  <div class="text-white flex flex-col items-center justify-center px-4 min-h-screen">
    <div class="flex flex-col items-center mb-10">
      <img src="@/assets/images/auth/logo_steak.svg" class="h-22" alt="" />
      <p class="text-2xl font-extrabold mt-2">Đăng ký</p>
    </div>

    <form action="" class="w-full max-w-md max-auto space-y-4 mb-10">
      <div>
        <p class="text-sm font-bold text-gray-400 mb-0.5">Email</p>
        <input
          v-model="account.email"
          type="email"
          name="email"
          id="email"
          placeholder="Nhập email của bạn"
          class="xl:w-full peer invalid:focus:border-red-500 h-12 px-4 rounded-lg bg-[#1a1a1a] border border-gray-600 text-white invalid:focus:ring-2 invalid:focus:ring-red-500 focus:outline-none valid:focus:ring-2 valid:focus:ring-[#0af] transition w-full"
        />
        <label for="email" class="hidden peer-invalid:block text-red-500">
          Vui lòng nhập email hợp lệ
        </label>
      </div>

      <div>
        <p class="text-sm font-bold text-gray-400 mb-0 5">Tên đăng nhập</p>
        <input
          type="text"
          required
          v-model="account.username"
          placeholder="Tên đăng nhập"
          class="xl:w-full peer invalid:focus:border-red-500 h-12 px-4 rounded-lg bg-[#1a1a1a] border border-gray-600 text-white invalid:focus:ring-2 invalid:focus:ring-red-500 focus:outline-none valid:focus:ring-2 valid:focus:ring-[#0af] transition w-full"
        />
        <label
          v-if="accountErrors.username"
          for="username"
          class="invisible peer-placeholder-shown:invisible text-red-500"
        >
          {{ accountErrors.username }}
        </label>
      </div>

      <div>
        <p class="text-sm font-bold text-gray-400 mb-0.5">Mật khẩu</p>

        <input
          type="text"
          :placeholder="'Nhập mật khẩu của bạn'"
          required
          name="password"
          id="password"
          v-model="account.password"
          class="xl:w-full peer invalid:focus:border-red-500 h-12 px-4 rounded-lg bg-[#1a1a1a] border border-gray-600 text-white invalid:focus:ring-2 invalid:focus:ring-red-500 focus:outline-none valid:focus:ring-2 valid:focus:ring-[#0af] transition w-full"
        />
        <label
          v-if="accountErrors.password"
          for="username"
          class="invisible peer-placeholder-shown:invisible text-red-500"
        >
          {{ accountErrors.password }}
        </label>
      </div>

      <div>
        <p class="text-sm font-bold text-gray-400 mb-0.5">Xác nhận mật khẩu</p>

        <input
          type="text"
          :placeholder="'Xác nhận mật khẩu của bạn'"
          required
          name="verifyPassword"
          id="verifyPassword"
          v-model="account.verifyPassword"
          class="xl:w-full peer invalid:focus:border-red-500 h-12 px-4 rounded-lg bg-[#1a1a1a] border border-gray-600 text-white invalid:focus:ring-2 invalid:focus:ring-red-500 focus:outline-none valid:focus:ring-2 valid:focus:ring-[#0af] transition w-full"
        />
        <label
          v-if="accountErrors.verifyPassword"
          for="username"
          class="invisible peer-placeholder-shown:invisible text-red-500"
        >
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
            class="min-w-5 min-h-5 bg-[#202024] rounded-[3px] peer-checked/notification:bg-gray-700 transition-all duration-300 peer-checked/notification:ring-1 peer-checked/notification:ring-[#0af] peer"
          ></div>

          <svg
            class="w-5 h-5 text-white absolute left-0 top-0 transition-all duration-300 peer-checked/notification:block hidden"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="3"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <span class="ml-2 text-gray-400 font-bold"
            >gửi cho tôi tin tức mới mất, khảo sát và ưu đãi đặc biệt từ steak store</span
          >
        </label>
      </div>

      <div>
        <label class="inline-flex items-start cursor-pointer relative">
          <input
            v-model="account.termsOfServices"
            type="checkbox"
            class="sr-only peer/terms shrink-0"
          />

          <!-- CHECKBOX -->
          <div
            class="min-w-5 relative min-h-5 bg-[#202024] rounded-[3px] peer-checked/terms:bg-gray-700 transition-all duration-300 peer-checked/terms:ring-1 peer-checked/terms:ring-[#0af]"
          ></div>
          <svg
            class="w-5 h-5 text-white absolute left-0 top-0 transition-all duration-300 peer-checked/terms:block hidden"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="3"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <!-- TEXT -->
          <span class="ml-2 text-gray-400 font-bold leading-snug">
            Tôi đã đọc và đồng ý với
            <span class="underline">Điều khoản Dịch vụ</span> và
            <span class="underline"> Thỏa thuận Cấp phép Người dùng cuối của Steak Store. </span>
          </span>
        </label>
      </div>

      <div>
        <button class="h-12 bg-[#A9A9A9] rounded-[5px] w-full">Tiếp tục</button>
      </div>
      <span class="flex flex-row justify-center">
        <span class="me-1">Đã có tài khoản?</span>
        <a href="/login" class="text-[#0af] italic underline">Đăng nhập"</a>
      </span>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const account = ref({
  email: '',
  username: '',
  password: '',
  verifyPassword: '',
  agreeNotification: false,
  termsOfServices: false,
})

const accountErrors = ref({
  email: '',
  username: '',
  password: '',
  verifyPassword: '',
  agreeNotification: '',
  termsOfServices: '',
})
</script>
