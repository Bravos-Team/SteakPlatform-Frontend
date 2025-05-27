<template>
  <sidebar id="publisher-main-sidebar" variant="sidebar" side="left" collapsible="icon">
    <sidebar-header>
      <user-profile-nav :user="userData?.data" />
    </sidebar-header>
    <sidebar-content class="no-scrollbar">
      <publisher-navmain :items="navItemsData" />
    </sidebar-content>
    <sidebar-footer />
    <sidebar-rail />
  </sidebar>
</template>

<script setup lang="ts">
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar'
import PublisherNavmain from '@/components/publisher/common/sidebar/PublisherNavmain.vue'
import { userData, navItemsData } from '@/components/publisher/common/sidebar/SidebarItems'
import UserProfileNav from '@/components/common/user/UserProfileNav.vue'
import { getCookie } from '@/utils/cookies/cookie-utils'
const isOpen: boolean = getCookie('sidebar-open') === 'true'
</script>
