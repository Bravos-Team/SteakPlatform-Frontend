<template>
  <div v-if="userCartData?.data.items.length > 0" class="min-h-screen bg-[#101014] relative overflow-hidden">
    <!-- Animated Background Elements -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000">
      </div>
      <div
        class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500/5 rounded-full blur-3xl animate-pulse delay-2000">
      </div>
    </div>

    <!-- Grid Pattern Overlay -->
    <div class="absolute inset-0 opacity-5"
      style="background-image: radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0); background-size: 20px 20px;">
    </div>

    <div class="relative z-10 container mx-auto px-4 py-8">
      <!-- Header Section -->
      <div class="text-center mb-12">
        <div
          class="inline-flex items-center gap-4 mb-6 p-4 bg-gradient-to-r from-[#1a1a2e]/80 to-[#16213e]/80 backdrop-blur-xl rounded-2xl border border-cyan-500/20 shadow-2xl">
          <div class="relative">
            <div
              class="w-16 h-16 bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-2xl">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z">
                </path>
              </svg>
            </div>
            <div
              class="absolute -top-1 -right-1 w-6 h-6 bg-green-400 rounded-full flex items-center justify-center animate-bounce">
              <span class="text-xs font-bold text-black">{{ userCartData?.data?.items?.length }}</span>
            </div>
          </div>
          <div class="text-left">
            <h1
              class="text-4xl lg:text-6xl font-black bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-transparent tracking-tight">
              CHECKOUT
            </h1>
            <p class="text-cyan-300 text-sm font-medium tracking-wider uppercase">Gaming Store • Instant Download</p>
          </div>
        </div>

        <div class="flex items-center justify-center gap-8 text-sm text-gray-400">
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>Secure Payment</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <span>Instant Access</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
            <span>Digital Download</span>
          </div>
        </div>
      </div>

      <!-- Main Content Grid -->
      <div class="grid lg:grid-cols-12 gap-8">
        <!-- Cart Items Section -->
        <div class="lg:col-span-8">
          <div
            class="bg-gradient-to-br from-[#1a1a2e]/60 min-h-full to-[#16213e]/60 backdrop-blur-xl rounded-sm border border-cyan-500/10 shadow-2xl p-8">
            <!-- Section Header -->
            <div class="flex items-center justify-between mb-8">
              <div class="flex items-center gap-4">
                <div
                  class="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" stroke-width="2"
                    viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                  </svg>
                </div>
                <div>
                  <h2 class="text-2xl font-bold text-white">Your Games Collection</h2>
                  <p class="text-gray-400 text-sm">Ready for instant download</p>
                </div>
              </div>
              <div class="text-right">
                <div class="text-3xl font-bold text-cyan-400">{{ userCartData?.data?.items?.length }}</div>
                <div class="text-xs text-gray-500 uppercase tracking-wider">Games</div>
              </div>
            </div>

            <!-- Games List -->
            <div class="space-y-6">
              <div v-if="!isUserCartFetching" v-for="(game, index) in userCartData?.data?.items" :key="game.id"
                class="group relative">

                <!-- Game Card -->
                <div
                  class="bg-gradient-to-r from-[#0f0f23]/80 to-[#1a1a2e]/80 border border-gray-800 hover:border-cyan-500/50 rounded-2xl p-6 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/10 hover:scale-[1.02]">
                  <div class="flex items-center gap-6">
                    <!-- Game Image -->
                    <div class="relative group-hover:scale-105 transition-transform duration-300">
                      <div
                        class="w-24 h-24 lg:w-32 lg:h-32 rounded-xl overflow-hidden border-2 border-gray-700 group-hover:border-cyan-400 transition-colors">
                        <img :src="game.thumbnail" class="w-full h-full object-cover" :alt="game.title" />
                      </div>
                      <!-- Rank Badge -->
                      <div
                        class="absolute -top-3 -left-3 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-sm font-bold text-black shadow-lg">
                        {{ index + 1 }}
                      </div>
                      <!-- Status Badge -->
                      <div
                        class="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-[#101014]">
                        <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" stroke-width="3"
                          viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                    </div>

                    <!-- Game Details -->
                    <div class="flex-1 min-w-0">
                      <div class="flex items-start justify-between mb-4">
                        <div>
                          <h3
                            class="text-xl lg:text-2xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors line-clamp-2">
                            {{ game.title }}
                          </h3>
                          <div class="flex items-center gap-3 text-sm text-gray-400">
                            <span class="flex items-center gap-1">
                              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2"
                                viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10">
                                </path>
                              </svg>
                              Digital Download
                            </span>
                            <span class="w-1 h-1 bg-gray-500 rounded-full"></span>
                            <span class="flex items-center gap-1 text-green-400">
                              <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                              Instant Access
                            </span>
                          </div>
                        </div>
                        <div class="text-right">
                          <div
                            class="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                            {{ CurrencyUtils.formatCurrencyVND(game.price) }}
                          </div>
                          <div class="text-xs text-gray-500 uppercase tracking-wider">VND</div>
                        </div>
                      </div>

                      <!-- Progress Bar (Decorative) -->
                      <div class="w-full bg-gray-800 rounded-full h-2 mb-2">
                        <div
                          class="bg-gradient-to-r from-cyan-400 to-purple-500 h-2 rounded-full transition-all duration-1000"
                          :style="{ width: '100%' }"></div>
                      </div>
                      <div class="text-xs text-gray-400">Ready to download</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Order Summary Section -->
        <div class="lg:col-span-4">
          <div class="sticky top-8">
            <div
              class="bg-gradient-to-br from-[#1a1a2e]/80 to-[#16213e]/80 backdrop-blur-xl rounded-sm border border-purple-500/20 shadow-2xl p-8">
              <!-- Summary Header -->
              <div class="flex items-center gap-4 mb-8">
                <div
                  class="w-14 h-14 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-xl">
                  <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" stroke-width="2"
                    viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z">
                    </path>
                  </svg>
                </div>
                <div>
                  <h2 class="text-2xl font-bold text-white">Order Summary</h2>
                  <p class="text-purple-300 text-sm">Review your purchase</p>
                </div>
              </div>

              <!-- Summary Details -->
              <div class="space-y-6 mb-8">
                <!-- Games Count -->
                <div
                  class="bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-2xl p-6 border border-purple-500/20">
                  <div class="flex items-center justify-between mb-4">
                    <span class="text-gray-300 font-medium">Games Selected</span>
                    <span class="text-2xl font-bold text-cyan-400">{{ userCartData?.data?.items?.length }}</span>
                  </div>
                  <div class="w-full bg-gray-800 rounded-full h-2">
                    <div class="bg-gradient-to-r from-cyan-400 to-purple-500 h-2 rounded-full" style="width: 100%">
                    </div>
                  </div>
                </div>

                <!-- Total Price -->
                <div class="bg-gradient-to-r from-gray-900/50 to-gray-800/50 rounded-2xl p-6 border border-gray-700/50">
                  <div class="text-center">
                    <div class="text-sm text-gray-400 uppercase tracking-wider mb-2">Total Amount</div>
                    <div
                      class="text-4xl font-black bg-gradient-to-r from-green-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                      {{ CurrencyUtils.formatCurrencyVND(totalPrice) }}
                    </div>
                    <div class="text-xs text-gray-500">All games included</div>
                  </div>
                </div>

                <!-- Info Alert -->
                <div
                  class="bg-gradient-to-r from-yellow-900/20 to-orange-900/20 border border-yellow-500/30 rounded-2xl p-4">
                  <div class="flex items-start gap-3">
                    <svg class="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor"
                      stroke-width="2" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <div class="text-sm text-yellow-200">
                      <p class="font-bold text-yellow-300 mb-1">⚡ Instant Download</p>
                      <p class="text-wrap">Games will be available immediately after payment confirmation. No waiting
                        time required!</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Purchase Button -->
              <button :disabled="isMutateCheckoutPending" :class="[
                'w-full py-6 px-8 rounded-2xl text-lg font-bold transition-all duration-300 shadow-2xl transform relative overflow-hidden border-2',
                isMutateCheckoutPending
                  ? 'bg-gray-800 text-gray-500 border-gray-700 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 hover:from-purple-500 hover:via-pink-500 hover:to-red-500 text-white cursor-pointer border-purple-400 shadow-purple-500/30 hover:scale-105 hover:shadow-purple-500/50'
              ]" @click="handleCheckout">

                <div v-if="!isMutateCheckoutPending" class="flex items-center justify-center gap-3">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                  <span class="tracking-wider">PURCHASE NOW</span>
                </div>

                <div v-else class="flex items-center justify-center gap-3">
                  <svg class="w-6 h-6 animate-spin" fill="none" stroke="currentColor" stroke-width="2"
                    viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15">
                    </path>
                  </svg>
                  <span class="tracking-wider">PROCESSING...</span>
                </div>
              </button>

              <!-- Security Badges -->
              <div class="flex items-center justify-center gap-8 mt-8 text-xs text-gray-500">
                <div class="flex items-center gap-2">
                  <svg class="w-4 h-4 text-green-400" fill="none" stroke="currentColor" stroke-width="2"
                    viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z">
                    </path>
                  </svg>
                  <span class="uppercase tracking-wider">Secured</span>
                </div>
                <div class="flex items-center gap-2">
                  <svg class="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" stroke-width="2"
                    viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                  <span class="uppercase tracking-wider">Instant</span>
                </div>
                <div class="flex items-center gap-2">
                  <svg class="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" stroke-width="2"
                    viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z">
                    </path>
                  </svg>
                  <span class="uppercase tracking-wider">Trusted</span>
                </div>
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
