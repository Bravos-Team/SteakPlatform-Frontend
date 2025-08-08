<template>
  <div class="min-h-screen flex items-center justify-center bg-[#101014] px-4">
    <div
      class="max-w-md text-center bg-white/80 backdrop-blur-2xl will-change-transform shadow-xl rounded-2xl p-8 border border-red-100"
    >
      <svg
        class="mx-auto mb-6 h-16 w-16 text-red-500"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
      <h1 class="text-2xl font-bold text-red-600 mb-2 text-wrap">
        {{ $t('title.pages.payment_message.error.title') }} !
      </h1>
      <p class="text-gray-600 mb-6">
        {{ route.params.message ?? $t('title.pages.payment_message.error.description') }}
      </p>
      <router-link
        :to="{ name: 'store' }"
        class="inline-block bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full transition"
      >
        Quay lại trang chủ
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
const route = useRoute()
</script>
