<template>
  <div class="flex flex-col gap-y-[20px]">
    <span class="font-bold text-[20px]">ABOUT THIS GAME</span>

    <div class="transition-all flex flex-col gap-y-[20px] duration-500 ease-in-out overflow-hidden text-pretty">
      <div v-html="DOMpurify.sanitize(longDescriptions)"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import DOMpurify from 'dompurify'
const props = defineProps({
  longDescriptions: {
    type: String,
    required: true,
  },
})
</script>
