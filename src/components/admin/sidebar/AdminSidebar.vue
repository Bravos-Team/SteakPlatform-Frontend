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
      class="!left-10 hidden laptop:block"
      :bottom="'-200'"
      :colorFirst="'#422277'"
      :idSpark="'sidebar-spark'"
    />

    <div
      class="absolute shrink-0 -bottom-[10px] !left-10 z-0 w-full h-full flex items-center justify-center mobile:hidden"
    >
      <div class="bg-[#422277] !left-10 w-[55rem] h-[35rem] rounded-full blur-[10rem]"></div>
    </div>

    <!-- Navigation -->
    <nav class="p-2">
      <div v-for="item in navItemsData" :key="item.name" class="mb-1">
        <router-link :to="item.route"
          class="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white"
          :class="{ 'justify-center': isCollapsed }">
          <component :is="item.icon" class="h-5 w-5" />
          <span :class="[isCollapsed && 'hidden']">{{ item.title }}</span>
        </router-link>
      </div>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import { navItemsData } from './SidebarItem'

defineProps<{
  isCollapsed: boolean
}>()
</script>
