<template>
  <div class="flex space-x-2">
    <router-link
      v-for="tab in tabs"
      :key="tab.name"
      :to="{ name: tab.name }"
      class="px-4 py-2 text-sm font-medium"
      :class="{
        'border-b-2 border-primary text-primary': route.name === tab.name,
        'text-muted-foreground': route.name !== tab.name,
      }"
    >
      {{ tab.nameBase }}
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()

const tabs = [
  // { name: 'PendingGames', nameBase: 'Đang kiểm duyệt' },
  // { name: 'PublishedGames', nameBase: 'Đã phát hành' },
  // { name: 'CreateGame', nameBase: 'Tạo mới' },
  { name: 'PublisherGameManagement', nameBase: 'Quản lý trò chơi' },
]
</script>
