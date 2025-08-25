<template>
  <div class="min-h-screen flex justify-center items-center bg-black/20">
    <Card
      class="w-full max-w-3xl p-8 rounded-xl shadow-2xl bg-zinc-900 border border-zinc-700 flex flex-col items-center"
    >
      <User class="size-10" />
      <h1 class="text-2xl font-bold text-zinc-100 mb-2 tracking-wide">
        {{ $t('isVerifyLoginWithGoogle') }}
      </h1>
      <div class="w-full flex justify-around">
        <div class="flex items-center text-sm">
          <div
            class="flex items-center justify-center w-5 h-5 rounded-full bg-white text-black mr-3 flex-shrink-0"
          >
            <Check class="size-3" />
          </div>
          <span class="text-white">{{ $t('connectWithGoogle') }}</span>
        </div>

        <div class="flex items-center text-sm">
          <div
            :class="{ '!bg-white': isResolvingLogin }"
            class="flex items-center justify-center w-5 h-5 rounded-full border-2 border-white mr-3 flex-shrink-0"
          >
            <div
              v-if="isResolvingLogin && !isDoneVerify"
              class="w-2 h-2 bg-white rounded-full animate-pulse"
            ></div>

            <Check v-else-if="isDoneVerify" class="size-3 text-black" />
          </div>
          <span :class="{ '!text-white': isDoneVerify }" class="text-gray-400">{{
            $t('verifyLoginWithGoogle')
          }}</span>
        </div>

        <div class="flex items-center text-sm">
          <div
            :class="{ '!bg-white': isDoneLogin }"
            class="flex items-center justify-center w-5 h-5 rounded-full border-2 border-gray-600 mr-3 flex-shrink-0"
          >
            <div
              v-if="!isDoneLogin && isResolvingLogin"
              class="w-2 h-2 bg-gray-600 rounded-full"
            ></div>

            <Check v-else-if="isDoneLogin" class="size-3 text-black" />
          </div>
          <span :class="{ '!text-white': isDoneLogin }" class="text-gray-500">{{
            $t('loginDone')
          }}</span>
        </div>
      </div>

      <p class="text-zinc-400 text-center mb-4">{{ $t('pleaseWaitASeconds') }}</p>
      <span class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-zinc-600"></span>
    </Card>
  </div>
</template>

<script setup lang="ts">
import Card from '@/components/ui/card/Card.vue'
import { Check, User } from 'lucide-vue-next'
import { useRoute, useRouter } from 'vue-router'
import { useMutateVerifyOauthUser } from '@/hooks/user/useUserAuth'
import { onBeforeMount, onMounted, ref } from 'vue'
import { generateDeviceId, generateDeviceInfo } from '@/utils/fingerprint'
import {
  toastErrorNotificationPopup,
  toastSuccessNotificationPopup,
} from '@/composables/toast/toastNotificationPopup'

const { mutateAsync: verifyOauthUser } = useMutateVerifyOauthUser()

const route = useRoute()
const router = useRouter()

const isResolvingLogin = ref(false)
const isDoneVerify = ref(false)
const isDoneLogin = ref(false)
// onBeforeMount(async () => {
//   isResolvingLogin.value = true
//   const code = route.query.code as string
//   const deviceId = await generateDeviceId()
//   const deviceInfo = await generateDeviceInfo()
//   const state = route.query.state as string
//   if (!state) router.push({ name: 'Login' })
//   await Promise.resolve([deviceId, deviceInfo])
//   await new Promise((resolve) => setTimeout(resolve, 1000))
//   isDoneVerify.value = true
//   try {
//     const response = await verifyOauthUser({
//       state,
//       code,
//       deviceId,
//       deviceInfo,
//       provider: 'google',
//     })
//     if (response.status === 200) {
//       toastSuccessNotificationPopup(
//         'Login successful',
//         `Welcome back! ${response.data.displayName}`,
//       )
//       isDoneLogin.value = true
//       ;(window as any).api?.login(response.data)
//       await router.push({ name: 'store-home' })
//       return
//     } else {
//       toastErrorNotificationPopup('Login failed', 'Please check your username or password.')
//       await router.push({ name: 'Login' })
//     }
//   } catch (err: any) {
//     console.log('Oauth Error: ', err)
//     toastErrorNotificationPopup('Login failed', err.response?.data?.detail)
//     await router.push({ name: 'Login' })
//   } finally {
//     isResolvingLogin.value = false
//     isDoneVerify.value = false
//     isDoneLogin.value = false
//   }
// })
</script>

<style scoped>
body {
  background: #111;
}
</style>
