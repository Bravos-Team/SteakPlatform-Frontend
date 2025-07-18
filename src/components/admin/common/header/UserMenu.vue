<template>
  <div class="relative">
    <button @click="isOpen = !isOpen" class="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg">
      <img :src="userData?.data?.avatar" alt="Profile" class="h-8 w-8 rounded-full" />
      <span class="text-gray-400">{{ userData?.data?.name }}</span>
    </button>

    <!-- Dropdown Menu -->
    <div v-if="isOpen" class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-800">
      <div class="py-1">
        <router-link v-for="item in menuItems" :key="item.label" :to="item.route"
          class="flex items-center gap-2 px-4 py-2 text-gray-400 hover:bg-gray-300">
          <component :is="item.icon" class="h-4 w-4" />
          {{ item.label }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { UserIcon, SettingsIcon, LogOutIcon } from 'lucide-vue-next'
import { userData } from '@/components/admin/sidebar/SidebarItem'

const isOpen = ref(false)

const menuItems = [
  { label: 'Profile', icon: UserIcon, route: "#" },
  { label: 'Settings', icon: SettingsIcon, route: "#" },
  { label: 'Logout', icon: LogOutIcon, route: '/admin/login' }
]
</script>
