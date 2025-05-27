<script setup lang="ts">
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar'
import BaseBreadcrumb from '@/components/common/breadcrumb/BaseBreadcrumb.vue'
import PublisherSidebar from '@/components/publisher/common/sidebar/PublisherSidebar.vue'
import { getCookie, setCookie } from '@/utils/cookies/cookie-utils'
const defaultOpen = getCookie('sidebar_state') === 'true'
const toggleNav = () => {
  setCookie('sidebar_state', (!defaultOpen).toString().trim())
}
</script>

<template>
  <sidebar-provider class="no-scrollbar" :defaultOpen="defaultOpen">
    <publisher-sidebar />
    <sidebar-inset>
      <header
        class="flex h-16 px-2 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12"
      >
        <sidebar-trigger @click="toggleNav" class="flex items-center gap-2 p-1" />
        <base-breadcrumb />
      </header>
      <router-view />
    </sidebar-inset>
  </sidebar-provider>
</template>
