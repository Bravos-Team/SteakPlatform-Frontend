<script setup lang="ts">
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar'
import Spark from '@/components/common/sparks/Spark.vue'
import BaseBreadcrumb from '@/components/common/breadcrumb/BaseBreadcrumb.vue'
import PublisherSidebar from '@/components/publisher/common/sidebar/PublisherSidebar.vue'
import { getCookie, setCookie } from '@/utils/cookies/cookie-utils'
import { ContextMenu, ContextMenuTrigger } from '@/components/ui/context-menu'
import PublisherContextMenu from '@/components/publisher/contextMenuBar/PublisherContextMenu.vue'
import LanguagesOption from '@/components/common/LanguagesOption.vue'
import { usePublisherRenewRefreshToken } from '@/hooks/publisher/usePublisher'
const { isPending: isPublisherFetching } = usePublisherRenewRefreshToken()
const defaultOpen = getCookie('sidebar_state') === 'true'
const toggleNav = () => {
  setCookie('sidebar_state', (!defaultOpen).toString().trim())
}
</script>

<template>
  <sidebar-provider v-if="!isPublisherFetching" class="no-scrollbar">
    <publisher-sidebar />
    <context-menu>
      <context-menu-trigger class="w-full">
        <sidebar-inset class="relative overflow-hidden w-full h-full">
          <spark
            :colorChanges="'#64403b'"
            :top="'-450'"
            :left="'-150'"
            :colorFirst="'#422277'"
            class="z-0"
            :idSpark="'content'"
          />
          <spark
            :colorChanges="'#422277'"
            :top="'-450'"
            :left="'290'"
            :colorFirst="'#64403b'"
            :idSpark="'content2'"
            class="z-0"
          />
          <header
            class="backdrop-blur-3xl will-change-transform justify-between w-full bg-[#101014]/10 border-b-1 border-b-gray-100/10 z-10 lg:border-b-0 flex h-16 px-2 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12"
          >
            <div class="flex items-center justify-center">
              <sidebar-trigger @click="toggleNav" class="flex items-center gap-2 p-1" />
              <base-breadcrumb />
            </div>
            <LanguagesOption />
          </header>
          <router-view />

          <spark
            :colorChanges="'#64403b'"
            :top="'850'"
            :left="'290'"
            :colorFirst="'#ac3973'"
            :idSpark="'contentbottom'"
            class="z-0"
          />
        </sidebar-inset>
      </context-menu-trigger>
      <publisher-context-menu />
    </context-menu>
  </sidebar-provider>
</template>
