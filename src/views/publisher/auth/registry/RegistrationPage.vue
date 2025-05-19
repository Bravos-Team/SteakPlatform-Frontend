<template>
  <div class="absolute overflow-hidden top-0 h-screen shrink-0">
    <particles-base />
    <!-- <div class="bg-[#050505ec]"></div> -->
  </div>

  <div class="flex justify-center items-center h-screen">
    <div
      class="backdrop-blur-[10px] hover:shadow-gray-400 shadow-[0px_2px_13px_0px_#ffffff40] transition-all duration-400 w-[100vh] p-3 mx-auto rounded-md flex flex-col gap-[10px] border-1 border-gray-500/50"
    >
      <div class="flex flex-col justify-center items-center gap-y-2 text-white">
        <img src="https://ccdn.steak.io.vn/logo_steak.svg" alt="" class="w-15" />
        <span class="font-bold text-3xl">Create An Company Account</span>
      </div>
      <div class="flex justify-between">
        <form
          @submit.prevent="handlePublisherRegister"
          action=""
          class="flex flex-col p-5 w-full gap-5"
        >
          <div class="flex justify-between w-full gap-x-5">
            <div class="flex flex-col gap-y-[20px] w-full">
              <span class="font-bold text-center text-white">Master account</span>
              <div class="flex text-white gap-2 flex-col w-full">
                <span class="font-black">Email</span>
                <input
                  v-model="publisher.masterEmail"
                  type="text"
                  name="email"
                  autocomplete="off"
                  class="input-base"
                  placeholder="Enter your email"
                />
                <label v-if="publisherErrors.masterEmail" for="email" class="text-red-500">
                  {{ publisherErrors.masterEmail }}
                </label>
              </div>

              <div class="flex text-white gap-2 flex-col w-full">
                <span class="font-black">Username</span>
                <input
                  type="text"
                  v-model="publisher.masterUsername"
                  autocomplete="off"
                  name="masterUsername"
                  class="input-base"
                  placeholder="Enter your Username"
                />

                <label
                  v-if="publisherErrors.masterUsername"
                  for="masterUsername"
                  class="text-red-500"
                >
                  {{ publisherErrors.masterUsername }}
                </label>
              </div>

              <div class="flex text-white gap-2 flex-col w-full">
                <span class="font-black">Password</span>
                <div class="relative">
                  <input
                    :type="isPassword ? 'Password' : 'text'"
                    name="masterPassword"
                    v-model="publisher.masterPassword"
                    autocomplete="off"
                    class="input-base"
                    placeholder="Enter your Password"
                  />
                  <eye
                    @click="togglePasswordVisibility"
                    v-if="!isPassword"
                    class="absolute right-2 top-2 cursor-pointer"
                  />
                  <eye-closed
                    @click="togglePasswordVisibility"
                    v-if="isPassword"
                    class="absolute right-2 top-2.5 cursor-pointer"
                  />
                </div>
                <label
                  v-if="publisherErrors.masterPassword"
                  for="masterPassword"
                  class="text-red-500"
                >
                  {{ publisherErrors.masterPassword }}
                </label>
              </div>

              <div class="flex text-white gap-2 flex-col w-full">
                <span class="font-black">Confirm Password</span>
                <input
                  type="password"
                  v-model="publisher.verifyMasterPassword"
                  name="verifyMasterPassword"
                  autocomplete="off"
                  class="input-base"
                  placeholder="Enter Password Again"
                />

                <label
                  v-if="publisherErrors.verifyMasterPassword"
                  for="verifyMasterPassword"
                  class="text-red-500"
                >
                  {{ publisherErrors.verifyMasterPassword }}
                </label>
              </div>
            </div>

            <div class="border-r-1 border-white/50"></div>

            <div class="flex flex-col gap-y-[20px] w-full">
              <span class="font-bold text-center text-white">Company Informations</span>
              <div class="flex text-white gap-2 flex-col w-full">
                <span class="font-black">Company Email</span>
                <input
                  type="text"
                  v-model="publisher.businessEmail"
                  name="businessEmail"
                  autocomplete="off"
                  class="input-base"
                  placeholder="Enter Company Informations"
                />

                <label
                  v-if="publisherErrors.businessEmail"
                  for="businessEmail"
                  class="text-red-500"
                >
                  {{ publisherErrors.businessEmail }}
                </label>
              </div>

              <div class="flex text-white gap-2 flex-col w-full">
                <span class="font-black">Company Name</span>
                <input
                  type="text"
                  name="name"
                  v-model="publisher.name"
                  autocomplete="off"
                  class="input-base"
                  placeholder="Enter Company Name"
                />

                <label
                  v-if="publisherErrors.name"
                  for="name"
                  class="text-red-500 text-ellipsis"
                  :title="publisherErrors.name"
                >
                  {{ publisherErrors.name }}
                </label>
              </div>

              <div class="flex text-white gap-2 flex-col w-full">
                <span class="font-black">Company Phone Number</span>
                <input
                  type="text"
                  name="name"
                  v-model="publisher.phone"
                  autocomplete="off"
                  class="input-base"
                  placeholder="Enter Company Phone Number"
                />

                <label
                  v-if="publisherErrors.phone"
                  for="name"
                  class="text-red-500 text-ellipsis"
                  :title="publisherErrors.phone"
                >
                  {{ publisherErrors.phone }}
                </label>
              </div>
            </div>
          </div>

          <div class="flex flex-col w-6/12 mx-auto items-center">
            <button
              class="rounded-sm text-white py-2 font-bold cursor-pointer hover:-translate-y-[3px] hover:ring-2 duration-300 hover:ring-gray-500 justify-center px-[8px] flex items-center bg-[#ffffff26] transition-all"
            >
              <span v-if="!isPendingPublisherRegister"> create account </span>
              <loader-circle v-if="isPendingPublisherRegister" class="animate-spin ml-2" />
            </button>

            <!-- <label v-if="errorPublisherRegister" class="text-red-500">{{
              errorPublisherRegister
            }}</label> -->
            <label v-if="registerMessage" :class="statusSubmitMessage">{{ registerMessage }}</label>
          </div>
        </form>
      </div>
      <div class="flex flex-col items-center">
        <router-link to="#" class="text-blue-400/80 hover:text-blue-400 transition-all duration-400"
          >Already have an account?</router-link
        >

        <router-link
          :to="{ name: 'Home' }"
          class="text-blue-400/80 hover:text-blue-400 transition-all duration-400"
          >Continue exploring Steak</router-link
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, toRaw } from 'vue'
import { setCookie } from '@/utils/cookies/cookie-utils'
import ParticlesBase from '@/components/common/particles/ParticlesBase.vue'
import { Eye, EyeClosed, LoaderCircle } from 'lucide-vue-next'
import { usePublisherRegister } from '@/hooks/publisher/usePublisher'
import { extractErrors } from '@/utils/zod/HanldeZodErrors'
import { PublisherRegisterRequestSchema } from '@/types/publisher/AuthType'
import { isPassword, togglePasswordVisibility } from '@/utils/auth/auth-utils'
import { useRouter } from 'vue-router'

const { mutateAsync: mutateAsyncPublisherRegister, isPending: isPendingPublisherRegister } =
  usePublisherRegister()

const publisher = ref({
  name: '',
  businessEmail: '',
  masterPassword: '',
  phone: '',
  masterUsername: '',
  masterEmail: '',
  verifyMasterPassword: '',
})

const router = useRouter()
const publisherErrors = ref<Record<string, string>>({})
const registerMessage = ref('')
const statusSubmitMessage = ref('')
const handlePublisherRegister = async () => {
  const { success, error } = PublisherRegisterRequestSchema.safeParse(publisher.value)

  if (!success) publisherErrors.value = extractErrors(error)
  else {
    publisherErrors.value = {}
    try {
      const response = await mutateAsyncPublisherRegister(publisher.value)
      if (response.status === 200) {
        setCookie('masterEmailRegister', publisher.value.masterEmail)
        router.push({ name: 'VerifyEmail' })
      }
    } catch (err: any) {
      statusSubmitMessage.value = 'text-red-500'
      registerMessage.value = err?.response?.data?.detail ?? 'Something went wrong'
    }
  }
}
</script>
