<template>
  <div class="absolute overflow-hidden top-0 h-screen shrink-0">
    <img
      src="../../../../assets/images/auth/pexels-andrew-3178786.jpg"
      class="relative shrink-0"
      alt=""
    />
    <div class="absolute inset-0 bg-black/60 shrink-0"></div>
  </div>

  <div class="flex justify-center items-center h-screen">
    <div
      class="backdrop-blur-[4px] hover:shadow-gray-400 shadow-[0px_2px_13px_0px_#ffffff40] transition-all duration-400 w-[75vh] p-3 mx-auto rounded-md flex flex-col gap-[20px] border-1 border-gray-500/50"
    >
      <div class="flex flex-col justify-center items-center gap-y-2 text-white">
        <img src="https://ccdn.steak.io.vn/logo_steak.svg" alt="" class="w-15" />
        <span class="font-bold text-3xl">Create An Company Account</span>
      </div>
      <div class="flex justify-between">
        <form action="" class="flex border-r-1 border-white/50 p-5 w-6/12">
          <div class="flex flex-col gap-y-[20px] w-full">
            <span class="font-bold text-center text-white">Master account</span>
            <div class="flex text-white gap-2 flex-col w-full">
              <span class="font-black">Email</span>
              <input
                v-model="publisher.email"
                type="text"
                autocomplete="off"
                class="bg-white/10 placeholder-white/80 outline-0 focus:ring-1 focus:ring-white backdrop-blur-xl border-1 border-gray-500/50 w-full rounded-md p-2"
                placeholder="Enter your email"
              />
            </div>

            <div class="flex text-white gap-2 flex-col w-full">
              <span class="font-black">Username</span>
              <input
                type="text"
                v-model="publisher.username"
                autocomplete="off"
                class="bg-white/10 placeholder-white/80 outline-0 focus:ring-1 focus:ring-white backdrop-blur-xl border-1 border-gray-500/50 w-full rounded-md p-2"
                placeholder="Enter your Username"
              />
            </div>

            <div class="flex text-white gap-2 flex-col w-full">
              <span class="font-black">Password</span>
              <input
                type="text"
                v-model="publisher.password"
                autocomplete="off"
                class="bg-white/10 placeholder-white/80 outline-0 focus:ring-1 focus:ring-white backdrop-blur-xl border-1 border-gray-500/50 w-full rounded-md p-2"
                placeholder="Enter your Password"
              />
            </div>

            <div class="flex text-white gap-2 flex-col w-full">
              <span class="font-black">Confirm Password</span>
              <input
                type="text"
                v-model="publisher.verifyPassword"
                autocomplete="off"
                class="form-input border-gray-500/50 focus:ring-1 bg-white/10 placeholder-white/80 focus:ring-white outline-0 backdrop-blur-xl border-1 w-full rounded-md p-2"
                placeholder="Enter Password Again"
              />
            </div>
          </div>
        </form>
        <form action="" class="flex border-0 p-5 w-6/12">
          <div class="flex flex-col gap-y-[20px] w-full">
            <span class="font-bold text-center text-white">Company Informations</span>
            <div class="flex text-white gap-2 flex-col w-full">
              <span class="font-black">Company Email</span>
              <input
                type="text"
                v-model="publisher.companyInformation.email"
                autocomplete="off"
                class="form-input border-gray-500/50 focus:ring-1 bg-white/10 placeholder-white/80 focus:ring-white outline-0 backdrop-blur-xl border-1 w-full rounded-md p-2"
                placeholder="Enter Company Informations"
              />
            </div>

            <div class="flex text-white gap-2 flex-col w-full">
              <span class="font-black">Company Name</span>
              <input
                type="text"
                v-model="publisher.companyInformation.name"
                autocomplete="off"
                class="form-input border-gray-500/50 focus:ring-1 bg-white/10 placeholder-white/80 focus:ring-white outline-0 backdrop-blur-xl border-1 w-full rounded-md p-2"
                placeholder="Enter Company Name"
              />
            </div>
          </div>
        </form>
      </div>
      <div class="flex justify-center">
        <button
          class="rounded-sm text-white py-2 font-bold cursor-pointer hover:-translate-y-[3px] hover:ring-2 duration-300 hover:ring-gray-500 justify-center px-[8px] flex items-center bg-[#ffffff26] transition-all"
        >
          create account
        </button>
      </div>

      <div class="flex justify-center">
        <router-link to="#" class="text-blue-400/80 hover:text-blue-400 transition-all duration-400"
          >Already have an account?</router-link
        >
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
