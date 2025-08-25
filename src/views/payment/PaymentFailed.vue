<template>
  <div class="min-h-screen flex items-center justify-center bg-black px-4">
    <!-- Main Error Card -->
    <div
      class="relative max-w-lg w-full text-center bg-gray-900/95 backdrop-blur-xl shadow-2xl rounded-3xl p-10 border border-gray-800 overflow-hidden"
    >
      <!-- Subtle Background Pattern -->
      <div class="absolute inset-0 opacity-5">
        <div
          class="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-red-500/10 to-transparent"
        ></div>
        <div class="absolute -top-4 -right-4 w-24 h-24 bg-red-500/5 rounded-full blur-xl"></div>
        <div class="absolute -bottom-4 -left-4 w-32 h-32 bg-red-500/5 rounded-full blur-xl"></div>
      </div>

      <!-- Content -->
      <div class="relative z-10">
        <!-- Error Icon -->
        <div class="mb-8">
          <div class="relative inline-flex items-center justify-center">
            <!-- Icon Background Circle -->
            <div
              class="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center border border-gray-700"
            >
              <svg
                class="w-10 h-10 text-red-400"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <!-- Pulse Animation -->
            <div class="absolute inset-0 w-20 h-20 bg-red-500/20 rounded-full animate-ping"></div>
          </div>
        </div>

        <!-- Title -->
        <h1 class="text-3xl font-bold text-white mb-3 leading-tight">
          {{ $t('title.pages.payment_message.error.title') }}!
        </h1>

        <!-- Error Message -->
        <div class="mb-8">
          <p class="text-gray-400 text-lg leading-relaxed">
            {{ route.params.message ?? $t('title.pages.payment_message.error.description') }}
          </p>
        </div>

        <!-- Error Details Section -->
        <div class="bg-gray-800/50 border border-gray-700 rounded-xl p-4 mb-8">
          <div class="space-y-3">
            <!-- Error Code if available -->
            <div v-if="route.params?.errorCode" class="flex items-center justify-between">
              <span class="text-gray-400 font-medium">Error Code:</span>
              <span class="text-red-400 font-mono text-sm bg-gray-700 px-3 py-1 rounded-lg">
                {{ route.params.errorCode }}
              </span>
            </div>

            <!-- Transaction ID if available -->
            <div v-if="route.params?.transactionId" class="flex items-center justify-between">
              <span class="text-gray-400 font-medium">Transaction ID:</span>
              <div class="flex items-center gap-2">
                <span class="text-white font-mono text-sm bg-gray-700 px-3 py-1 rounded-lg">
                  {{ route.params.transactionId }}
                </span>
                <button
                  @click="copyTransactionId"
                  class="p-1.5 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-gray-700"
                  title="Copy Transaction ID"
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

            <!-- Timestamp -->
            <div class="flex items-center justify-between">
              <span class="text-gray-400 font-medium">{{ $t('time') }}:</span>
              <span class="text-gray-300 text-sm">
                {{ currentDateTime }}
              </span>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="space-y-4">
          <!-- Primary Action -->
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

          <!-- Secondary Actions -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              @click="retryPayment"
              class="inline-flex items-center justify-center text-gray-300 font-medium px-6 py-3 rounded-xl border border-gray-700 transition-all duration-200 hover:bg-gray-800 hover:text-white hover:border-gray-600"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Thử lại
            </button>

            <button
              @click="contactSupport"
              class="inline-flex items-center justify-center text-gray-300 font-medium px-6 py-3 rounded-xl border border-gray-700 transition-all duration-200 hover:bg-gray-800 hover:text-white hover:border-gray-600"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Hỗ trợ
            </button>
          </div>
        </div>

        <!-- Additional Info -->
        <div class="mt-8 pt-6 border-t border-gray-800">
          <div class="space-y-2">
            <p class="text-gray-500 text-sm">
              Nếu vấn đề vẫn tiếp tục, vui lòng liên hệ bộ phận hỗ trợ.
            </p>
            <p class="text-gray-600 text-xs">
              Mọi thông tin giao dịch đều được bảo mật và an toàn.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Toast notification for copy -->
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
        <span class="text-sm">Transaction ID đã được sao chép!</span>
      </div>
    </div>

    <!-- Support Modal -->
    <div
      v-if="showSupportModal"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4"
      @click="showSupportModal = false"
    >
      <div class="bg-gray-900 rounded-2xl p-6 max-w-md w-full border border-gray-800" @click.stop>
        <div class="text-center mb-6">
          <h3 class="text-xl font-bold text-white mb-2">{{ $t('contactSupport') }}</h3>
          <p class="text-gray-400">{{ $t('chooseValidMethod') }}</p>
        </div>

        <div class="space-y-3">
          <a
            href="mailto:support@yourstore.com"
            class="flex items-center gap-3 p-4 bg-gray-800 rounded-xl hover:bg-gray-700 transition-colors"
          >
            <svg
              class="w-5 h-5 text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <div class="text-left">
              <div class="text-white font-medium">Email</div>
              <div class="text-gray-400 text-sm">doanchanphong0610@gmail.com</div>
            </div>
          </a>

          <a
            href="tel:+84123456789"
            class="flex items-center gap-3 p-4 bg-gray-800 rounded-xl hover:bg-gray-700 transition-colors"
          >
            <svg
              class="w-5 h-5 text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            <div class="text-left">
              <div class="text-white font-medium">{{ $t('hotline') }}</div>
              <div class="text-gray-400 text-sm">+84 999 999 99</div>
            </div>
          </a>
        </div>

        <button
          @click="showSupportModal = false"
          class="w-full mt-4 px-4 py-2 text-gray-400 hover:text-white transition-colors"
        >
          {{ $t('close') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const showCopyToast = ref(false)
const showSupportModal = ref(false)

const currentDateTime = computed(() => {
  return new Date().toLocaleString('vi-VN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
})

const copyTransactionId = async () => {
  try {
    await navigator.clipboard.writeText(route.params?.transactionId as string)
    showCopyToast.value = true
    setTimeout(() => {
      showCopyToast.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy transaction ID:', err)
  }
}

const retryPayment = () => {
  // Navigate back to payment page or cart
  router.push({ name: 'checkout' })
}

const contactSupport = () => {
  showSupportModal.value = true
}
</script>

<style scoped>
/* Custom animations */
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

/* Smooth hover transitions */
.transition-hover {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Custom focus styles */
.focus-custom:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

/* Backdrop blur fallback */
@supports not (backdrop-filter: blur(24px)) {
  .backdrop-blur-xl {
    background-color: rgba(17, 24, 39, 0.95);
  }
}

/* Modal animations */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
