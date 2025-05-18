<template>
  <div class="absolute overflow-hidden top-0 h-screen shrink-0">
    <img
      src="../../../../assets/images/auth/desert-doom-sand.webp"
      class="relative shrink-0"
      alt=""
    />
    <div class="absolute inset-0 bg-black/65 shrink-0"></div>
  </div>

  <div class="flex justify-center items-center h-screen">
    <div
      class="backdrop-blur-[4px] hover:shadow-gray-400 shadow-[0px_2px_13px_0px_#ffffff40] transition-all duration-400 w-[75vh] p-5 mx-auto rounded-md flex flex-col gap-[20px] border-1 border-gray-500/50"
    >
      <div class="flex flex-col justify-center items-center gap-y-3 text-white">
        <img src="https://ccdn.steak.io.vn/logo_steak.svg" alt="" class="w-15" />
        <span class="font-bold text-3xl">Sign In</span>
      </div>
      <div class="flex justify-center">
        <form action="" class="flex border-0 p-5 w-6/12">
          <div class="flex flex-col gap-y-[20px] w-full">
            <div class="flex text-white gap-2 flex-col w-full">
              <span class="font-black">Email</span>
              <input
                type="text"
                v-model="publisher.companyInformation.email"
                autocomplete="off"
                class="form-input border-gray-500/50 focus:ring-1 bg-white/10 placeholder-white/80 focus:ring-white outline-0 backdrop-blur-xl border-1 w-full rounded-md p-2"
                placeholder="Enter Your Email"
              />
            </div>

            <div class="flex text-white gap-2 flex-col w-full">
              <span class="font-black">Password</span>
              <input
                type="text"
                v-model="publisher.companyInformation.name"
                autocomplete="off"
                class="form-input border-gray-500/50 focus:ring-1 bg-white/10 placeholder-white/80 focus:ring-white outline-0 backdrop-blur-xl border-1 w-full rounded-md p-2"
                placeholder="Enter Your Password"
              />
            </div>
            <div class="flex justify-end">
              <a href="" class="underline italic text-blue-400 hover:text-blue-500 text-[12px]"
                >Forgot Password ?</a
              >
            </div>
          </div>
        </form>
      </div>
      <div class="flex justify-center">
        <button
          class="w-6/12 rounded-sm text-white py-2 font-bold cursor-pointer hover:-translate-y-[3px] hover:ring-2 duration-300 hover:ring-gray-500 justify-center px-[8px] m-2 flex items-center bg-[#ffffff26] transition-all"
        >
          Login
        </button>
      </div>

      <div class="flex justify-center">
        <div class="flex flex-col gap-y-2 w-full">
          <router-link
            to="register"
            class="text-blue-400/80 hover:text-blue-400 transition-all duration-400 text-center text-[14px] underline"
            >Create Account ?
          </router-link>
          <router-link
            to="#"
            class="text-blue-400/80 hover:text-blue-400 transition-all duration-400 text-center text-[14px] underline"
            >Privacy Policy
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const publisher = ref({
  username: '',
  email: '',
  password: '',
  verifyPassword: '',
  companyInformation: {
    email: '',
    name: '',
  },
})
</script>
