<template>
  <div class="text-wrap min-h-screen flex justify-center items-center bg-black/10 relative">
    <div
      class="w-full max-w-md bg-gray-900/95 backdrop-blur-xl shadow-2xl rounded-3xl p-8 border border-gray-800 relative overflow-hidden"
    >
      <div class="absolute inset-0 opacity-30">
        <div
          class="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent"
        ></div>
        <div class="absolute -top-4 -right-4 w-24 h-24 bg-white/5 rounded-full blur-xl"></div>
        <div class="absolute -bottom-4 -left-4 w-32 h-32 bg-white/5 rounded-full blur-xl"></div>
      </div>

      <div class="relative z-10 flex flex-col items-center text-center">
        <div class="mb-6">
          <div class="relative inline-flex items-center justify-center">
            <div
              class="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center border border-gray-700"
            >
              <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                />
              </svg>
            </div>
            <div class="absolute inset-0 w-16 h-16 bg-white/10 rounded-full animate-ping"></div>
          </div>
        </div>

        <h1 class="text-2xl font-bold text-white mb-2 tracking-wide">
          {{ $t('isVerifyLoginWithGithub') }}
        </h1>

        <p class="text-gray-400 mb-8 leading-relaxed">
          {{ $t('VerifyLoginWithGithubDescriptions') }}
        </p>

        <div class="mb-8">
          <div class="flex items-center justify-center space-x-2">
            <div class="flex space-x-1">
              <div
                class="w-2 h-2 bg-white rounded-full animate-bounce"
                style="animation-delay: 0ms"
              ></div>
              <div
                class="w-2 h-2 bg-white rounded-full animate-bounce"
                style="animation-delay: 150ms"
              ></div>
              <div
                class="w-2 h-2 bg-white rounded-full animate-bounce"
                style="animation-delay: 300ms"
              ></div>
            </div>
          </div>
        </div>

        <div class="w-full space-y-3 mb-6">
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
              :class="{ '!bg-white': isDoneVerify }"
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

        <div class="w-full bg-gray-800/50 border border-gray-700 rounded-xl p-4">
          <div class="flex items-start gap-3">
            <Lock />
            <div class="text-left">
              <p class="text-gray-300 text-sm font-medium mb-1">{{ $t('secureAndPrivate') }}</p>
              <p class="text-gray-400 text-xs leading-relaxed">
                {{ $t('secureAndPrivateDescriptions') }}
              </p>
            </div>
          </div>
        </div>

        <div class="mt-6">
          <button
            @click="cancelLogin"
            class="cursor-pointer text-gray-400 hover:text-white text-sm font-medium transition-colors duration-200 underline underline-offset-2"
          >
            {{ $t('cancelLogin') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMutateVerifyOauthUser } from '@/hooks/user/useUserAuth'
import { generateDeviceId, generateDeviceInfo } from '@/utils/fingerprint'
import {
  toastErrorNotificationPopup,
  toastSuccessNotificationPopup,
} from '@/composables/toast/toastNotificationPopup'
import { Check, Lock } from 'lucide-vue-next'

const { mutateAsync: verifyOauthUser } = useMutateVerifyOauthUser()
const route = useRoute()
const router = useRouter()

const cancelLogin = () => {
  router.push({ name: 'Login' })
}
const isResolvingLogin = ref(false)
const isDoneVerify = ref(false)
const isDoneLogin = ref(false)
onBeforeMount(async () => {
  isResolvingLogin.value = true
  const code = route.query.code as string
  const deviceId = await generateDeviceId()
  const deviceInfo = await generateDeviceInfo()
  const state = route.query.state as string

  if (!state) {
    router.push({ name: 'Login' })
    return
  }

  await Promise.resolve([deviceId, deviceInfo])
  await new Promise((resolve) => setTimeout(resolve, 1500))
  isDoneVerify.value = true
  try {
    const response = await verifyOauthUser({
      state,
      code,
      deviceId,
      deviceInfo,
      provider: 'github',
    })

    if (response.status === 200) {
      isDoneLogin.value = true
      toastSuccessNotificationPopup(
        'Đăng nhập thành công',
        `Chào mừng trở lại! ${response.data.displayName}`,
      )
      ;(window as any).api?.login(response.data)
      await router.push({ name: 'store-home' })
      return
    } else {
      toastErrorNotificationPopup(
        'Đăng nhập thất bại',
        'Vui lòng kiểm tra lại thông tin đăng nhập.',
      )
      await router.push({ name: 'Login' })
    }
  } catch (err: any) {
    console.log('GitHub OAuth Error: ', err)
    toastErrorNotificationPopup(
      'Đăng nhập thất bại',
      err.response?.data?.detail || 'Có lỗi xảy ra trong quá trình đăng nhập.',
    )
    await router.push({ name: 'Login' })
  } finally {
    isResolvingLogin.value = false
    isDoneVerify.value = false
    isDoneLogin.value = false
  }
})
</script>

<style scoped>
@keyframes bounce-delay {
  0%,
  80%,
  100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
}

.animate-bounce-delay-1 {
  animation: bounce-delay 1.4s infinite ease-in-out both;
  animation-delay: -0.32s;
}

.animate-bounce-delay-2 {
  animation: bounce-delay 1.4s infinite ease-in-out both;
  animation-delay: -0.16s;
}

.transition-all-smooth {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
