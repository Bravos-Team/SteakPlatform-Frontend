<template>
  <div class="absolute overflow-hidden top-0 h-screen shrink-0">
    <img src="https://ccdn.steak.io.vn/assets-desert.png" alt="" />
    <particles-base class="absolute opacity-80" />
    <div class="bg-black absolute inset-0 opacity-35"></div>
  </div>

  <div class="flex justify-center items-center h-screen px-5">
    <div
      class="backdrop-blur-[6px] hover:shadow-gray-400 shadow-[0px_2px_13px_0px_#ffffff40] transition-all duration-400 w-[75vh] p-5 mx-auto rounded-md flex flex-col gap-[20px] border-1 border-gray-500/50"
    >
      <div class="flex flex-col justify-center items-center gap-y-3 text-white">
        <img src="https://ccdn.steak.io.vn/logo_steak.svg" alt="" class="w-15" />
        <span class="font-bold text-3xl">Sign In</span>
      </div>
      <div class="flex w-full">
        <form
          @submit.prevent="handlePublisherLogin"
          action=""
          class="flex flex-col gap-y-[10px] border-0 p-5 w-full items-center"
        >
          <div class="flex flex-col gap-y-[20px] w-full lg:w-8/12">
            <div class="flex text-white gap-2 flex-col w-full">
              <span class="font-black">Email</span>
              <input
                type="text"
                v-model="form.usernameOrEmail"
                name="emailOrUsername"
                autocomplete="off"
                class="form-input border-gray-500/50 focus:ring-1 bg-white/10 placeholder-white/80 focus:ring-white outline-0 backdrop-blur-xl border-1 w-full rounded-md p-2"
                placeholder="Enter Your Email"
              />
              <label
                v-if="publisherErrors.email || publisherErrors.username"
                for="emailOrUsername"
                class="text-red-500"
              >
                {{ publisherErrors.username || publisherErrors.email }}
              </label>
            </div>

            <div class="flex text-white gap-2 flex-col w-full">
              <span class="font-black">Password</span>
              <div class="relative">
                <input
                  :type="isPassword ? 'password' : 'text'"
                  v-model="form.password"
                  name="password"
                  autocomplete="off"
                  class="form-input border-gray-500/50 focus:ring-1 bg-white/10 placeholder-white/80 focus:ring-white outline-0 backdrop-blur-xl border-1 w-full rounded-md p-2"
                  placeholder="Enter Your Password"
                />
                <label v-if="publisherErrors.password" for="password" class="text-red-500">
                  {{ publisherErrors.password }}
                </label>
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
            </div>
            <div class="flex justify-center">
              <a href="" class="underline italic text-blue-400 hover:text-blue-500 text-[12px]"
                >Forgot Password ?</a
              >
            </div>
          </div>

          <div class="flex justify-center w-8/12 lg:w-4/12">
            <button
              type="submit"
              class="w-full rounded-sm text-white py-2 font-bold cursor-pointer hover:-translate-y-[3px] hover:ring-2 duration-300 hover:ring-gray-500 justify-center px-[8px] m-2 flex items-center bg-[#ffffff26] transition-all"
            >
              <span v-if="!isPendingPublisherLoginEmail || !isPendingPublisherLoginUserName">
                Login
              </span>
              <loader-circle
                v-if="isPendingPublisherLoginEmail || isPendingPublisherLoginUserName"
                class="animate-spin ml-2"
              />
            </button>
            <span class="text-danger">{{ loginMessage }}</span>
          </div>
        </form>
      </div>
      <div class="flex justify-center">
        <div class="flex flex-col gap-y-2 w-full">
          <div class="flex gap-x-3 text-white justify-center">
            <router-link
              :to="{ name: 'PublisherAuthRegister' }"
              class="text-blue-400 hover:text-blue-500 transition-all duration-400 text-center text-[14px] underline"
              >Create Account ?
            </router-link>
            or
            <router-link
              :to="{ name: 'Login' }"
              class="text-blue-400 hover:text-blue-500 transition-all duration-400 text-center text-[14px] underline"
              >Login as User Account
            </router-link>
            <!-- <span>or</span>
            <router-link
              :to="{ name: 'Home' }"
              class="text-blue-400 hover:text-blue-500 transition-all duration-400 text-center text-[14px] underline"
              >Countinue exploring Steak?
            </router-link> -->
          </div>
          <router-link
            to="#"
            class="text-blue-400 hover:text-blue-500 transition-all duration-400 text-center text-[14px] underline"
            >Privacy Policy
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import { generateDeviceId, generateDeviceInfo } from '@/utils/fingerprint.js'
import { extractErrors } from '@/utils/zod/HanldeZodErrors.js'
import { LoginByEmailSchema, LoginByUserNameSchema } from '@/types/publisher/AuthType.js'
import { isEmail } from '@/services/common/CurrencyUtils.js'
import { usePublisherLoginEmail, usePublisherLoginUserName } from '@/hooks/publisher/usePublisher'
import { Eye, EyeClosed, LoaderCircle } from 'lucide-vue-next'
import { isPassword, togglePasswordVisibility } from '@/utils/auth/auth-utils'
import ParticlesBase from '@/components/common/particles/ParticlesBase.vue'

import {
  toastErrorNotificationPopup,
  toastSuccessNotificationPopup,
} from '@/composables/toast/toastNotificationPopup'
const { mutateAsync: mutateAsyncPublisherLoginEmail, isPending: isPendingPublisherLoginEmail } =
  usePublisherLoginEmail()
const {
  mutateAsync: mutateAsyncPublisherLoginUserName,
  isPending: isPendingPublisherLoginUserName,
} = usePublisherLoginUserName()
const publisherErrors = ref<Record<string, string>>({})
const form = reactive({
  usernameOrEmail: '',
  password: '',
  deviceId: '',
  deviceInfo: '',
})
const loginMessage = ref('')
onMounted(async () => {
  try {
    form.deviceInfo = await generateDeviceInfo()
    form.deviceId = await generateDeviceId()
  } catch (err) {
    console.log(err)
  }
})

function getPayload(formData: typeof form) {
  const commonData = {
    password: formData.password,
    deviceId: formData.deviceId,
    deviceInfo: formData.deviceInfo,
  }
  if (isEmail(formData.usernameOrEmail)) {
    return {
      schema: LoginByEmailSchema,
      payload: {
        ...commonData,
        email: formData.usernameOrEmail,
      },
      type: 'email',
    }
  } else {
    return {
      schema: LoginByUserNameSchema,
      payload: {
        ...commonData,
        username: formData.usernameOrEmail,
      },
      type: 'username',
    }
  }
}

const handlePublisherLogin = async () => {
  const { schema, payload, type } = getPayload(form)
  const { success, error } = schema.safeParse(payload)
  if (!success) publisherErrors.value = extractErrors(error)
  else {
    publisherErrors.value = {}
    try {
      const res = await (type === 'email'
        ? mutateAsyncPublisherLoginEmail(payload)
        : mutateAsyncPublisherLoginUserName(payload))
      if (res.status === 200) {
        toastSuccessNotificationPopup('Login successfully', `Welcome ${res.data.username}`)
      }
    } catch (err: any) {
      console.error('Login failed:', err)
      toastErrorNotificationPopup(
        'Login failed',
        err?.response?.data?.detail || 'An error occurred',
      )
      loginMessage.value = err?.response?.data?.detail
      console.log('loginMessage: ', loginMessage.value)
    }
  }
}
</script>
