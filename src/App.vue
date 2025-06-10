<template>
  <toaster />
  <Suspense>
    <template #default>
      <router-view></router-view>
    </template>
    <template #fallback>
      <div>Loading...</div>
    </template>
  </Suspense>
</template>

<script setup>
// import { onMounted, onUnmounted, ref } from 'vue'
import { Toaster } from '@/components/ui/sonner'
import 'vue-sonner/style.css'
// import { Suspense } from 'vue'
</script>
