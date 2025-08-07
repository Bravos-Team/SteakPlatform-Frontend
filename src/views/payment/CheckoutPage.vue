<template>
  <div
    v-if="userCartData?.data.items.length > 0"
    class="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black p-4 lg:p-8 relative overflow-hidden gaming-bg"
  >
    <div class="max-w-7xl mx-auto relative z-10">
      <!-- Gaming Header -->
      <div class="text-center mb-8">
        <div class="flex items-center justify-center gap-4 mb-4">
          <div class="w-12 h-12 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/25">
            <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M15 14h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h1 class="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent font-gaming tracking-wider">
            CHECKOUT
          </h1>
        </div>
        <p class="text-gray-300 text-lg font-medium">Level up your gaming experience</p>
        <div class="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto mt-4 rounded-full"></div>
      </div>

      <!-- Main Gaming Content -->
      <div class="grid lg:grid-cols-3 gap-8">
        <!-- Gaming Cart Items -->
        <div class="lg:col-span-2">
          <div class="bg-gray-800/80 backdrop-blur-lg border border-gray-700 rounded-2xl shadow-2xl shadow-purple-500/10 p-6 lg:p-8">
            <div class="flex items-center gap-4 mb-6">
              <div class="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 011-1h1m-1 1v1h1M7 7V5a2 2 0 011-1h1m-1 1v1h1m2-2h2m2 0h2"></path>
                </svg>
              </div>
              <div>
                <h2 class="text-2xl font-bold text-white font-gaming">GAMING INVENTORY</h2>
                <div class="flex items-center gap-2 mt-1">
                  <span class="bg-gradient-to-r from-cyan-400 to-purple-500 text-black text-sm font-bold px-3 py-1 rounded-full">
                    {{ userCartData?.data?.items?.length }} GAMES
                  </span>
                  <div class="flex text-yellow-400">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div class="space-y-4">
              <div
                v-if="!isUserCartFetching"
                v-for="(game, index) in userCartData?.data?.items"
                :key="game.id"
                class="group relative bg-gradient-to-r from-gray-800/60 to-gray-700/60 border border-gray-600 rounded-xl p-4 hover:border-cyan-400 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-400/20 backdrop-blur-sm"
              >
                <div class="flex items-center gap-4">
                  <div class="relative">
                    <img
                      :src="game.thumbnail"
                      class="w-20 h-20 lg:w-28 lg:h-28 object-cover rounded-xl shadow-lg border-2 border-gray-600 group-hover:border-cyan-400 transition-all duration-300 group-hover:scale-105"
                      alt=""
                    />
                    <div class="absolute -top-2 -left-2 w-8 h-8 bg-gradient-to-r from-cyan-400 to-purple-500 text-black rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                      #{{ index + 1 }}
                    </div>
                    <div class="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                  </div>
                  <div class="flex-1 min-w-0">
                    <h3 class="text-lg lg:text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors font-gaming tracking-wide">
                      {{ game.title }}
                    </h3>
                    <div class="flex items-center justify-between">
                      <div class="flex flex-col">
                        <span class="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                          {{ CurrencyUtils.formatCurrencyVND(game.price) }}
                        </span>
                        <span class="text-sm text-gray-400">Digital Download</span>
                      </div>
                      <div class="flex items-center gap-2 text-sm text-green-400">
                        <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        READY TO PLAY
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Gaming Order Summary -->
        <div class="lg:col-span-1">
          <div class="bg-gray-800/80 backdrop-blur-lg border border-gray-700 rounded-2xl shadow-2xl shadow-purple-500/10 p-6 lg:p-8 sticky top-8">
            <div class="flex items-center gap-4 mb-6">
              <div class="w-12 h-12 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-lg flex items-center justify-center shadow-lg">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v6a2 2 0 002 2h2m0 0a2 2 0 00-2 2v2a2 2 0 002 2h2m5-2h2a2 2 0 002-2v-2a2 2 0 00-2-2h-2v-4h2a2 2 0 002-2V7a2 2 0 00-2-2h-2z"></path>
                </svg>
              </div>
              <div>
                <h2 class="text-2xl font-bold text-white font-gaming">POWER UP</h2>
                <p class="text-cyan-400 text-sm">Order Summary</p>
              </div>
            </div>

            <div class="space-y-4 mb-6">
              <div class="bg-gradient-to-r from-purple-900/50 to-blue-900/50 rounded-xl p-4 border border-purple-500/30">
                <div class="flex justify-between items-center mb-3">
                  <span class="text-gray-300 flex items-center gap-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2h4a1 1 0 011 1v14a1 1 0 01-1 1H3a1 1 0 01-1-1V5a1 1 0 011-1h4z"></path>
                    </svg>
                    Games Count:
                  </span>
                  <span class="text-cyan-400 font-bold">{{ userCartData?.data?.items?.length }}</span>
                </div>
                <div class="border-t border-purple-500/30 pt-3">
                  <div class="flex justify-between items-center">
                    <span class="text-lg font-bold text-white">TOTAL XP:</span>
                    <span class="text-3xl font-bold bg-gradient-to-r from-green-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                      {{ CurrencyUtils.formatCurrencyVND(totalPrice) }}
                    </span>
                  </div>
                </div>
              </div>

              <div class="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 border border-yellow-500/30 rounded-xl p-4">
                <div class="flex items-start gap-3">
                  <svg class="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                  </svg>
                  <div class="text-sm text-yellow-200 flex-1 min-w-0">
                    <p class="font-bold mb-1 text-yellow-300">⚡ INSTANT ACCESS:</p>
                    <p class="break-normal whitespace-normal">You can download immediately after successful payment. No waiting time!</p>
                  </div>
                </div>
              </div>

            </div>

            <button
              :disabled="isMutateCheckoutPending"
              :class="[
                'w-full py-4 px-6 rounded-xl text-lg font-bold transition-all duration-300 shadow-lg transform hover:scale-105 relative overflow-hidden border-2',
                isMutateCheckoutPending
                  ? 'bg-gray-600 text-gray-400 border-gray-600 cursor-not-allowed scale-100'
                  : 'bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 hover:from-purple-500 hover:via-pink-500 hover:to-red-500 text-white cursor-pointer border-purple-400 shadow-purple-500/25 font-gaming tracking-wider'
              ]"
              @click="handleCheckout"
            >
              <span v-if="!isMutateCheckoutPending" class="flex items-center justify-center gap-3">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
                PURCHASE NOW
              </span>
              <span v-else class="flex items-center justify-center gap-3">
                <svg class="w-6 h-6 animate-spin" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                </svg>
                PROCESSING...
              </span>
            </button>

            <div class="mt-6 flex items-center justify-center gap-6 text-sm text-gray-400">
              <div class="flex items-center gap-2">
                <svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
                <span class="font-gaming">SECURE</span>
              </div>
              <div class="flex items-center gap-2">
                <svg class="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
                <span class="font-gaming">INSTANT</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CurrencyUtils from '@/services/common/CurrencyUtils'
import { useMutateCheckout } from '@/hooks/payment/usePayment'
import { computed, ref } from 'vue'
import { useUserCartList } from '@/hooks/store/cart/useUserCart'
import { useDebounceFn } from '@vueuse/core'
const { isPending: isMutateCheckoutPending, mutateAsync: mutateAsyncCheckout } = useMutateCheckout()
const { data: userCartData, isFetching: isUserCartFetching } = useUserCartList()

const isCheckout = ref(false)

const gameIdsList = computed(() => {
  return userCartData.value?.data.items.map((game: any) => game.id)
})

const totalPrice = computed(() => {
  return userCartData.value?.data.items.reduce((total: number, game: any) => {
    return total + game.price
  }, 0)
})

const handleCheckout = useDebounceFn(async () => {
  try {
    if (isCheckout.value) return
    isCheckout.value = true
    const response = await mutateAsyncCheckout(gameIdsList.value)
    if (response.status === 200) {
      window.location.href = response?.data?.paymentUrl
    }
  } catch (error) {
    console.error('Checkout error:', error)
  } finally {
    isCheckout.value = false
  }
}, 1000)
</script>

<style scoped>
.font-gaming {
  font-family: 'Orbitron', 'Rajdhani', 'Exo 2', monospace;
  letter-spacing: 0.05em;
}

.gaming-bg::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.03) 2px, transparent 2px),
    radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.03) 2px, transparent 2px);
  background-size: 60px 60px;
  background-position: 0 0, 30px 30px;
  pointer-events: none;
}
</style>
