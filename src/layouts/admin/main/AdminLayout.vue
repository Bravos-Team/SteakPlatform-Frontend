<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Sidebar -->
    <AdminSidebar :isCollapsed="isSidebarCollapsed" />

    <div class="flex-1 flex flex-col min-h-screen overflow-hidden">
      <!-- Header -->
      <header class="h-16 bg-white border-b border-gray-200 shadow-sm">
        <div class="flex items-center justify-between h-full px-4">
          <div class="flex items-center gap-4">
            <button @click="toggleSidebar" class="p-2 hover:bg-gray-150 rounded-lg">
              <MenuIcon class="h-5 w-5 text-gray-600" />
            </button>
            <BaseBreadcrumb />
          </div>

          <div class="flex items-center gap-4">
            <UserMenu class="" />
          </div>
        </div>
      </header>

      <!-- Main Content Area -->
      <main class="flex-1 overflow-auto p-6 bg-gray-150 text-black">
        <router-view />
      </main>

      <!-- Footer -->
      <footer class="bg-white border-t border-gray-200 p-4 text-center text-gray-600 shadow-sm">
        <AdminFooter />
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { MenuIcon, BellIcon } from 'lucide-vue-next'
import AdminSidebar from '@/components/admin/sidebar/AdminSidebar.vue'
import BaseBreadcrumb from '@/components/common/breadcrumb/BaseBreadcrumb.vue'
import UserMenu from '@/components/admin/common/header/UserMenu.vue'
import AdminFooter from '@/components/admin/common/header/footer/AdminFooter.vue'

const isSidebarCollapsed = ref(false)

const toggleSidebar = () => {
  isSidebarCollapsed.value = !isSidebarCollapsed.value
}
</script>
