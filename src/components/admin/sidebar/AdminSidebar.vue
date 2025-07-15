<template>
  <aside :class="[
    'transition-all duration-300 ease-in-out bg-[#1a1a1a] border-r border-gray-800',
    isCollapsed ? 'w-16' : 'w-64'
  ]">
    <!-- Logo -->
    <div class="h-16 flex items-center px-4 border-b border-gray-800">
      <img src="https://ccdn.steak.io.vn/logo_steak.svg" alt="Logo" class="h-8 w-8" />
      <span :class="['ml-3 font-semibold text-white', isCollapsed && 'hidden']">
        Steak
      </span>
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
