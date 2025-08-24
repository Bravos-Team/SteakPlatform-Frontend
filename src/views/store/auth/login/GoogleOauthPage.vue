<template>
  <div class="min-h-screen flex justify-center items-center bg-black/20">
    <Card
      class="w-full max-w-3xl p-8 rounded-xl shadow-2xl bg-zinc-900 border border-zinc-700 flex flex-col items-center"
    >
      <User class="size-10" />
      <h1 class="text-2xl font-bold text-zinc-100 mb-2 tracking-wide">
        Đang xử lý đăng nhập Google...
      </h1>
      <p class="text-zinc-400 text-center mb-4">Vui lòng chờ trong giây lát.</p>
      <span class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-zinc-600"></span>
    </Card>
  </div>
</template>

<script setup lang="ts">
import Card from '@/components/ui/card/Card.vue'
import { User } from 'lucide-vue-next'
import { useRoute, useRouter } from 'vue-router'
import { useMutateVerifyOauthUser } from '@/hooks/user/useUserAuth'
import { onBeforeMount, onMounted } from 'vue'
import { generateDeviceId, generateDeviceInfo } from '@/utils/fingerprint'
import {
  toastErrorNotificationPopup,
  toastSuccessNotificationPopup,
} from '@/composables/toast/toastNotificationPopup'

const { mutateAsync: verifyOauthUser } = useMutateVerifyOauthUser()

const route = useRoute()
const router = useRouter()

onBeforeMount(async () => {
  const code = route.query.code as string
  const deviceId = await generateDeviceId()
  const deviceInfo = await generateDeviceInfo()
  const state = route.query.state as string
  if (!state) router.push({ name: 'Login' })
  try {
    const response = await verifyOauthUser({
      state,
      code,
      deviceId,
      deviceInfo,
      provider: 'google',
    })
    if (response.status === 200) {
      toastSuccessNotificationPopup(
        'Login successful',
        `Welcome back! ${response.data.displayName}`,
      )
      ;(window as any).api?.login(response.data)
      await router.push({ name: 'store-home' })
      return
    }
    toastErrorNotificationPopup('Login failed', 'Please check your username or password.')
    await router.push({ name: 'Login' })
  } catch (err: any) {
    console.log('Oauth Error: ', err)
    toastErrorNotificationPopup(
      'Login failed',
      'An error occurred during the login process. Please try again later.',
    )
    await router.push({ name: 'Login' })
  }
})
</script>

<style scoped>
body {
  background: #111;
}
</style>
