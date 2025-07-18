<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { Menu, Bell, Search, Moon, Sun, ChevronRight } from 'lucide-vue-next'

const props = defineProps<{
  isSidebarOpen: boolean
}>();

const emit = defineEmits<{
  (e: 'toggleSidebar'): void
}>();

const route = useRoute();
const isDarkMode = ref(false);
const showProfileMenu = ref(false);
const showNotifications = ref(false);
const unreadNotifications = ref(3);

// Toggle dark/light mode
const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};

// Get current page title based on route
const getPageTitle = () => {
  const path = route.path;

  if (path.includes('/dashboard')) return 'Dashboard';
  if (path.includes('/users')) return 'Users Management';
  if (path.includes('/publishers')) return 'Publishers Management';
  if (path.includes('/products')) return 'Products';
  if (path.includes('/reports')) return 'Reports & Analytics';
  if (path.includes('/notifications')) return 'Notifications';
  if (path.includes('/settings')) return 'Settings';

  return 'Admin Dashboard';
};
</script>

<template>
  <header class="z-10 py-4 bg-white shadow-sm">
    <div class="container px-6 mx-auto flex items-center justify-between">
      <div class="flex items-center gap-4">
        <!-- Toggle sidebar button -->
        <button @click="emit('toggleSidebar')"
          class="p-1 text-gray-500 rounded-md hover:text-gray-900 focus:outline-none dark:text-gray-400 dark:hover:text-white">
          <Menu class="h-6 w-6" />
        </button>

        <!-- Breadcrumb/Title -->
        <div class="hidden md:flex items-center">
          <span class="text-gray-400 dark:text-gray-500">Admin</span>
          <ChevronRight class="h-4 w-4 mx-1 text-gray-400 dark:text-gray-500" />
          <h1 class="text-lg font-semibold text-gray-800 dark:text-white">{{ getPageTitle() }}</h1>
        </div>
      </div>

      <div class="flex items-center gap-3">
        <!-- Search -->
        <div class="relative mr-2">
          <input type="text" placeholder="Search..."
            class="w-32 sm:w-64 pl-10 pr-4 py-1 rounded-md text-sm border border-gray-200 focus:outline-none focus:border-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search class="h-4 w-4 text-gray-400" />
          </div>
        </div>

        <!-- Theme toggle -->
        <button @click="toggleDarkMode"
          class="p-2 rounded-full text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700">
          <Sun v-if="isDarkMode" class="h-5 w-5" />
          <Moon v-else class="h-5 w-5" />
        </button>

        <!-- Profile dropdown -->
        <div class="relative">
          <button @click="showProfileMenu = !showProfileMenu" class="flex text-sm rounded-full focus:outline-none">
            <img class="w-8 h-8 rounded-full object-cover border border-gray-200 dark:border-gray-700"
              src="https://i.pravatar.cc/150?img=12" alt="Admin profile" />
          </button>

          <!-- Profile dropdown menu -->
          <div v-if="showProfileMenu"
            class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg dark:bg-gray-800 z-50">
            <div class="py-1 border-b dark:border-gray-700">
              <p class="px-4 py-2 text-sm font-semibold text-gray-900 dark:text-white">Admin User</p>
              <p class="px-4 py-1 text-xs text-gray-500">admin@steak.io</p>
            </div>
            <div class="py-1">
              <router-link to="/admin/profile"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700">
                Your Profile
              </router-link>
              <router-link to="/admin/settings"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700">
                Settings
              </router-link>
            </div>
            <div class="py-1 border-t dark:border-gray-700">
              <button
                class="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
