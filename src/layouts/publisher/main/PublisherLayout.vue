<script setup lang="ts">
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar'
import PublisherSidebar from '@/components/publisher/common/sidebar/PublisherSidebar.vue'
</script>

<template>
  <sidebar-provider class="no-scrollbar">
    <publisher-sidebar />
    <sidebar-inset>
      <sidebar-trigger />
      <router-view />
    </sidebar-inset>
  </sidebar-provider>
</template>
