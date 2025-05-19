<template>
  <div class="@container relative">
    <div class="absolute top-0 h-screen">
      <particles-base />
    </div>
    <div
      class="flex text-black dark:text-white flex-col justify-center items-center px-4 backdrop-blur-sm h-screen"
    >
      <img src="https://ccdn.steak.io.vn/logo_steak.svg" alt="Logo Image" class="h-22" />
      <p class="dark:text-white xl:text-2xl font-extrabold mt-3 tracking-wide mb-10">
        Vui lòng xác thực Master Email
      </p>

      <div class="mb-70">
        <p class="text-sm text-center mb-10 text-gray-600 dark:text-gray-300">
          Để hoàn thành xác thực tài khoản của nhà phát triển, bạn cần xác thực
          <b class="font-bold text-gray-800 dark:text-white text-[18px]"
            >{{ handleShowEmail(getCookie('masterEmailRegister')) }}.</b
          >
          <br />
          Vui lòng kiểm tra tài khoản email của bạn để hoàn thành việc tạo tài khoản
        </p>
        <p class="text-sm text-gray-600 dark:text-gray-300 mb-2">
          Để giúp bảo vệ tài khoản của bạn, chúng tôi sẽ thêm email làm
          <b class="text-gray-800 dark:text-white underline"> phương thức xác thực hai yếu tố.</b>
        </p>
      </div>

      <div class="font-light text-[16px] text-center text-gray-800 dark:text-white italic mb-3">
        <p class="">Không nhận được email? Kiểm tra thư mục spam.</p>
        <span class="block">
          <router-link to="#" class="underline text-blue-400">Gửi lại yêu cầu</router-link>
          hoặc
          <router-link :to="{ name: 'PublisherAuthRegister' }" class="underline text-blue-400"
            >đổi email</router-link
          >
        </span>
        <span class="block">
          Đã có tài khoản?
          <router-link :to="{ name: 'PublisherAuthLogin' }" class="underline text-blue-400 ms-1"
            >Đăng nhập</router-link
          >
        </span>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router'
import ParticlesBase from '@/components/common/particles/ParticlesBase.vue'
import { getCookie } from '@/utils/cookies/cookie-utils'
const router = useRouter()

const handleShowEmail = (email) => {
  const atIndex = email.indexOf('@')
  const domain = email.substring(atIndex)
  const name = email.substring(0, atIndex)
  const maskedName = name.replace(/.(?=.{2})/g, '*')
  return maskedName + domain
}
</script>
