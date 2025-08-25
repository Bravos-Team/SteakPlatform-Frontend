<template>
  <div class="min-h-screen flex items-center justify-center bg-black/10 px-4">
    <div
      class="relative max-w-lg w-full text-center bg-gray-900/95 backdrop-blur-xl shadow-2xl rounded-md p-10 border border-gray-800 overflow-hidden"
    >
      <div class="absolute inset-0 opacity-5">
        <div
          class="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-green-500/10 to-transparent"
        ></div>
        <div class="absolute -top-4 -right-4 w-24 h-24 bg-green-500/5 rounded-full blur-xl"></div>
        <div class="absolute -bottom-4 -left-4 w-32 h-32 bg-green-500/5 rounded-full blur-xl"></div>
      </div>

      <div class="relative z-10">
        <div class="mb-8">
          <div class="relative inline-flex items-center justify-center">
            <div
              class="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center border border-gray-700"
            >
              <svg
                class="w-10 h-10 text-green-400"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <div class="absolute inset-0 w-20 h-20 bg-green-500/20 rounded-full animate-ping"></div>
          </div>
        </div>

        <h1 class="text-3xl font-bold text-white mb-3 leading-tight">
          {{ $t('paymentSuccess') }}
        </h1>

        <p class="text-gray-400 text-lg mb-8 leading-relaxed text-wrap">
          {{ $t('paymentSuccessDescriptions') }}
        </p>

        <div
          v-if="route.params?.orderId"
          class="bg-gray-800/50 border border-gray-700 rounded-xl p-4 mb-8"
        >
          <div class="flex items-center justify-between">
            <span class="text-gray-400 font-medium">Order ID:</span>
            <div class="flex items-center gap-2">
              <span class="text-white font-mono text-sm bg-gray-700 px-3 py-1 rounded-lg">
                {{ route?.params?.orderId }}
              </span>
              <button
                @click="copyOrderId"
                class="p-1.5 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-gray-700"
                title="Copy Order ID"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div class="space-y-4 flex flex-col">
          <router-link
            :to="{ name: 'store' }"
            class="inline-flex items-center justify-center w-full bg-white text-black font-semibold px-8 py-4 rounded-xl transition-all duration-200 hover:bg-gray-100 hover:scale-[1.02] active:scale-[0.98] shadow-lg"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            {{ $t('backHome') }}
          </router-link>
        </div>
      </div>
    </div>

    <div
      v-if="showCopyToast"
      class="fixed top-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg border border-gray-700 z-50 transition-all duration-300"
      :class="showCopyToast ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'"
    >
      <div class="flex items-center gap-2">
        <svg class="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
        <span class="text-sm">Order ID đã được sao chép!</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const showCopyToast = ref(false)

const copyOrderId = async () => {
  try {
    await navigator.clipboard.writeText(route.params?.orderId as string)
    showCopyToast.value = true
    setTimeout(() => {
      showCopyToast.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy order ID:', err)
  }
}

const viewOrderDetails = () => {
  router.push({ name: 'order-details', params: { orderId: route.params?.orderId } })
}
</script>

<style scoped>
@keyframes pulse-subtle {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
}

.animate-pulse-subtle {
  animation: pulse-subtle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
.transition-hover {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.focus-custom:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

@supports not (backdrop-filter: blur(24px)) {
  .backdrop-blur-xl {
    background-color: rgba(17, 24, 39, 0.95);
  }
}
</style>
