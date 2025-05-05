<template>
  <Notification
    :message="notificationStore.messages"
    :type="notificationStore.type"
    :visible="notificationStore.visible"
  />

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
import { Suspense } from 'vue'
import Notification from '@/components/notification/Notification.vue'
import { useNotificationStore } from '@/stores/notificationStore.js'

const notificationStore = useNotificationStore()

</script>
