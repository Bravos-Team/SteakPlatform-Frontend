<template></template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  games: {
    name: string
  }[]
}>()
</script>
