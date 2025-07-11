<template>
  <sidebar
    id="publisher-main-sidebar"
    variant="sidebar"
    side="left"
    collapsible="icon"
    class="bg-transparent/20"
  >
    <spark
      :colorChanges="'#64403b'"
      class="!left-10 hidden tablet:block"
      :bottom="'-200'"
      :colorFirst="'#422277'"
      :idSpark="'sidebar-spark'"
    />

    <div
      class="absolute shrink-0 -bottom-[10px] !left-10 z-0 w-full h-full flex items-center justify-center mobile:hidden"
    >
      <div class="bg-[#422277] !left-10 w-[55rem] h-[35rem] rounded-full blur-[10rem]"></div>
    </div>
    <sidebar-header class="bg-[#101014]/50 backdrop-blur-2xl">
      <user-profile-nav :user="userData?.data" />
    </sidebar-header>
    <sidebar-content class="bg-[#101014]/50 backdrop-blur-2xl no-scrollbar">
      <publisher-navmain :items="navItemsData" />
    </sidebar-content>
    <sidebar-footer class="bg-[#101014]/50 backdrop-blur-2xl" />
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
import Spark from '@/components/common/sparks/Spark.vue'
import PublisherNavmain from '@/components/publisher/common/sidebar/PublisherNavmain.vue'
import { userData, navItemsData } from '@/components/publisher/common/sidebar/SidebarItems'
import UserProfileNav from '@/components/common/user/UserProfileNav.vue'
import { getCookie } from '@/utils/cookies/cookie-utils'

const isOpen: boolean = getCookie('sidebar-open') === 'true'
</script>
