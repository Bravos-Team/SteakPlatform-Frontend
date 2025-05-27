<template>
  <div class="absolute overflow-hidden top-0 h-screen shrink-0">
    <img src="https://ccdn.steak.io.vn/assets-desert.png" alt="" />
    <particles-base class="absolute opacity-80" />
    <div class="bg-black absolute inset-0 opacity-35"></div>
  </div>

  <div class="flex justify-center items-center py-25 px-5">
    <!-- FORM BOXED -->
    <div
      class="backdrop-blur-[7px] hover:shadow-gray-400 shadow-[0px_2px_13px_0px_#ffffff40] transition-all duration-400 w-[100vh] p-3 mx-auto rounded-md flex flex-col gap-[10px] border-1 border-gray-500/50"
    >
      <!-- LOGO AND FORM TITLE -->
      <div class="flex flex-col justify-center items-center gap-y-2 text-white">
        <img src="https://ccdn.steak.io.vn/logo_steak.svg" alt="" class="w-15" />
        <span class="font-bold text-xl lg:text-3xl">Create An Company Account</span>
      </div>
      <!-- END LOGO END FORM TITLE -->

      <!-- FORM -->
      <div class="flex flex-col lg:flex-row lg:justify-between">
        <!-- FORM INPUTS -->
        <form
          @submit.prevent="handlePublisherRegister"
          action=""
          class="flex flex-col p-5 w-full gap-5"
        >
          <!-- MASTER INPUTS  -->
          <div class="flex flex-col lg:flex-row justify-between w-full gap-x-5 gap-y-5">
            <div
              class="flex flex-col lg:border-none gap-y-[5px] border-b-1 border-b-gray-500 border-t-1 border-t-gray-500 py-3 lg:gap-y-[20px] w-full"
            >
              <span class="font-bold text-center text-white">Master account</span>
              <div class="flex text-white gap-2 flex-col w-full">
                <span class="font-black">Email</span>
                <input
                  v-model="publisher.masterEmail"
                  type="text"
                  name="email"
                  autocomplete="off"
                  class="form-input border-gray-500/50 focus:ring-1 bg-white/10 placeholder-white/80 focus:ring-white outline-0 backdrop-blur-xl border-1 w-full rounded-md p-2"
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
                  class="form-input border-gray-500/50 focus:ring-1 bg-white/10 placeholder-white/80 focus:ring-white outline-0 backdrop-blur-xl border-1 w-full rounded-md p-2"
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
                    class="form-input border-gray-500/50 focus:ring-1 bg-white/10 placeholder-white/80 focus:ring-white outline-0 backdrop-blur-xl border-1 w-full rounded-md p-2"
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
                  class="form-input border-gray-500/50 focus:ring-1 bg-white/10 placeholder-white/80 focus:ring-white outline-0 backdrop-blur-xl border-1 w-full rounded-md p-2"
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

            <div class="border-r-1 hidden lg:block border-white/50"></div>

            <div
              class="flex flex-col gap-y-[5px] lg:gap-y-[20px] w-full border-b-1 border-b-gray-500 py-3 lg:border-none"
            >
              <span class="font-bold text-center text-white">Company Informations</span>
              <div class="flex text-white gap-2 flex-col w-full">
                <span class="font-black">Company Email</span>
                <input
                  type="text"
                  v-model="publisher.businessEmail"
                  name="businessEmail"
                  autocomplete="off"
                  class="form-input border-gray-500/50 focus:ring-1 bg-white/10 placeholder-white/80 focus:ring-white outline-0 backdrop-blur-xl border-1 w-full rounded-md p-2"
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
                  class="form-input border-gray-500/50 focus:ring-1 bg-white/10 placeholder-white/80 focus:ring-white outline-0 backdrop-blur-xl border-1 w-full rounded-md p-2"
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
                  class="form-input border-gray-500/50 focus:ring-1 bg-white/10 placeholder-white/80 focus:ring-white outline-0 backdrop-blur-xl border-1 w-full rounded-md p-2"
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
          <!-- END MASTER INPUTS -->

          <!-- COMPANY INPUTS -->
          <div class="flex flex-col w-6/12 mx-auto items-center">
            <button
              class="rounded-sm text-white py-2 font-bold cursor-pointer hover:-translate-y-[3px] hover:ring-2 duration-300 hover:ring-gray-500 justify-center px-[8px] flex items-center bg-[#ffffff26] transition-all"
            >
              <span v-if="!isPendingPublisherRegister" class="capitalize"> create account </span>
              <loader-circle v-if="isPendingPublisherRegister" class="animate-spin ml-2" />
            </button>

            <!-- <label v-if="errorPublisherRegister" class="text-red-500">{{
              errorPublisherRegister
            }}</label> -->
            <label v-if="registerMessage" :class="statusSubmitMessage">{{ registerMessage }}</label>
          </div>
          <!-- END COMPANY INPUTS -->
        </form>
        <!-- END FORM INPUTS -->
      </div>
      <!-- END FORM -->

      <!-- BUTTON AND DIRECTLY LINKS -->
      <div class="flex flex-col items-center">
        <router-link
          :to="{ name: 'PublisherAuthLogin' }"
          class="text-blue-400/80 hover:text-blue-400 transition-all duration-400"
          >Already have an account?</router-link
        >

        <router-link
          :to="{ name: 'Home' }"
          class="text-blue-400/80 hover:text-blue-400 transition-all duration-400"
          >Continue exploring Steak</router-link
        >
      </div>
      <!-- END BUTTON AND DIRECTLY LINKS -->
    </div>
    <!-- END FORM BOXED -->
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

<style scoped></style>
