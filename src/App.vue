<template>
  <toaster
    :toast-options="{
      // unstyled: true,
      classes: {
        toast: 'bg-blue-400',
        title: 'text-red-400',
        description: 'text-red-400',
        actionButton: 'bg-red-500',
        cancelButton: 'bg-orange-400',
        closeButton: 'bg-lime-400',
      },
    }"
  />
  <Suspense>
    <template #default>
      <router-view></router-view>
    </template>
    <template #fallback>
      <div>Loading...</div>
    </template>
  </Suspense>
  <vue-query-devtools />
</template>

<script setup>
// import { onMounted, onUnmounted, ref } from 'vue'
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
import { Toaster } from '@/components/ui/sonner'
import 'vue-sonner/style.css'
// import { Suspense } from 'vue'
</script>
