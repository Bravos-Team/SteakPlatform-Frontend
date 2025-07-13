<template></template>
<script setup lang="ts">
import SteakApi from '@/apis'

import { onBeforeMount } from 'vue'

const getItems = async () =>
  SteakApi.get('/api/v1/user/library/my-games', {
    withCredentials: true,
  })

onBeforeMount(async () => {
  await getItems()
})
</script>
