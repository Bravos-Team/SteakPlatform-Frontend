<template>
  <div
    class="border-2 border-dashed rounded-sm px-2 flex items-center gap-x-1 border-white/20 cursor-pointer bg-black/30 text-gray-100/80 font-medium"
  >
    {{ updateAt ? updateAt : 'Not updated yet' }}
  </div>
</template>

<script setup lang="ts">
const updateAt = null
</script>
