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
          name="password"
          id="password"
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
        <label class="inline-flex items-center cursor-pointer">
          <input v-model="account.agreeNotification" type="checkbox" class="sr-only peer" />
          <div class="w-6 h-5 bg-[#202024] rounded-[3px]"></div>
          <span class="ml-2 text-gray-400 font-bold"
            >gửi cho tôi tin tức mới mất, khảo sát và ưu đãi đặc biệt từ steak store</span
          >
        </label>
      </div>

      <div>
        <label class="inline-flex items-center cursor-pointer">
          <input v-model="account.termsOfServices" type="checkbox" class="sr-only peer" />
          <div class="w-6 h-5 bg-[#202024] rounded-[3px]"></div>
          <span class="ml-2 text-gray-400 font-bold"
            >Tôi đã đọc và đồng ý với <span class="underline">Điều khoản Dịch vụ</span> và
            <span class="underline">Thỏa thuận Cấp phép Người dùng cuối của Steak Store.</span>
          </span>
        </label>
      </div>

      <div>
        <button class="h-12 bg-[#A9A9A9] rounded-[5px] w-full">Tiếp tục</button>
      </div>
      <span class="flex flex-row justify-center"
        >Đã có tài khoản?
        <a href="#" class="text-[#0af] italic underline">Đăng nhập"</a>
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
