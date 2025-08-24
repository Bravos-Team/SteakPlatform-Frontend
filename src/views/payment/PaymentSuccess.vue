<template>
  <div class="min-h-screen flex items-center justify-center bg-[#101014] px-4">
    <div
      class="max-w-md text-center bg-white/90 backdrop-blur-3xl will-change-transform shadow-xl rounded-2xl p-8 border border-green-100"
    >
      <svg
        class="mx-auto mb-6 h-16 w-16 text-green-500"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
      </svg>
      <h1 class="text-2xl font-bold text-green-600 mb-2 text-wrap">
        {{ $t('title.pages.payment_message.success.title') }} !
      </h1>
      <p class="text-gray-600 text-wrap mb-6">
        {{ $t('title.pages.payment_message.success.description') }}
      </p>
      <div class="flex items-center justify-between text-black mb-6" v-if="route.params?.orderId">
        <span>Order Id: </span>
        <span>{{ route?.params?.orderId }}</span>
      </div>
      <router-link
        :to="{ name: 'store' }"
        class="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full transition"
      >
        Quay lại trang chủ
      </router-link>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'
const route = useRoute()
</script>
