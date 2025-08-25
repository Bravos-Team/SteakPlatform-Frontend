<template>
  <div class="flex px-4 tablet:px-3 desktop-xl:px-[15rem] h-16 tablet:h-25">
    <div class="flex w-full h-full items-center justify-between">
      <!-- Logo Section -->
      <router-link :to="{ name: 'store-home' }" class="flex items-center gap-2 flex-shrink-0">
        <img src="https://ccdn.steak.io.vn/logo_steak.svg" alt="Steak Logo" class="h-8 w-auto" />
        <span class="font-black text-lg tablet:text-xl capitalize hidden mobile:block">
          Steak {{ $t('navigation.help') }}
        </span>
      </router-link>

      <!-- Desktop Navigation -->
      <div class="gap-x-6 hidden laptop:flex">
        <div class="relative group">
          <router-link :to="{ name: 'HomePage' }" class="font-medium text-lg">{{
            $t('steakStore')
          }}</router-link>
          <div
            class="w-full group-hover:h-1 h-0 bg-white absolute bottom-0 left-0 transition-all duration-100"
          ></div>
        </div>

        <div class="relative group">
          <router-link :to="{ name: 'PublisherHome' }" class="font-medium text-lg">{{
            $t('developmentWorkspace')
          }}</router-link>
          <div
            class="w-full group-hover:h-1 h-0 bg-white absolute bottom-0 left-0 transition-all duration-100"
          ></div>
        </div>

        <div class="relative hidden group">
          <router-link :to="{ name: 'PublisherHome' }" class="font-medium text-lg ease-in-out">{{
            $t('navigation.community')
          }}</router-link>
          <div
            class="w-full group-hover:h-1 h-0 bg-white absolute bottom-0 left-0 ease-in-out transition-all duration-100"
          ></div>
        </div>

        <div class="relative group">
          <router-link :to="{ name: 'HomePage' }" class="font-medium text-lg ease-in-out">
            {{ $t('clientApp') }}
          </router-link>
          <div
            class="w-full group-hover:h-1 h-0 bg-white absolute bottom-0 left-0 transition-all ease-in-out duration-100"
          ></div>
        </div>
      </div>

      <!-- Right Section -->
      <div class="flex gap-x-2 laptop:gap-x-6 items-center">
        <!-- Desktop External Link -->
        <router-link :to="{ name: 'HomePage' }" class="laptop:flex gap-2 hidden">
          <span class="font-black text-lg">steak.io.vn</span>
          <square-arrow-out-up-right class="size-6" />
        </router-link>

        <!-- Create Tickets Button - Desktop -->
        <router-link
          :to="{ name: 'TicketsRequest' }"
          class="hidden laptop:block px-4 hover:bg-[#7f5af0] hover:border-[#010101]/50 transition-colors duration-200 cursor-pointer font-black py-2 bg-transparent border-white/50 rounded-sm border-2"
        >
          Create Tickets
        </router-link>

        <!-- Mobile Create Tickets Button -->
        <router-link
          :to="{ name: 'TicketsRequest' }"
          class="laptop:hidden px-3 py-2 hover:bg-[#7f5af0] hover:border-[#010101]/50 transition-colors duration-200 cursor-pointer font-bold text-sm bg-transparent border-white/50 rounded-sm border-2"
        >
          {{ $t('tickets') }}
        </router-link>

        <!-- Mobile Menu Button -->
        <button
          @click="toggleMobileMenu"
          class="cursor-pointer laptop:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors duration-200"
          aria-label="Toggle mobile menu"
        >
          <svg
            class="w-6 h-6 transition-transform duration-200"
            :class="{ 'rotate-90': isMobileMenuOpen }"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              v-if="!isMobileMenuOpen"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
            <path
              v-else
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Menu Overlay -->
    <div
      v-if="isMobileMenuOpen"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 laptop:hidden"
      @click="closeMobileMenu"
    ></div>

    <!-- Mobile Menu Sidebar -->
    <div
      class="fixed top-0 right-0 h-full w-80 bg-gray-900 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out laptop:hidden"
      :class="isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'"
    >
      <!-- Mobile Menu Header -->
      <div class="flex items-center justify-between p-4 border-b border-gray-800">
        <div class="flex items-center gap-2">
          <img src="https://ccdn.steak.io.vn/logo_steak.svg" alt="Steak Logo" class="h-6 w-auto" />
          <span class="font-black text-lg text-white">Steak</span>
        </div>
        <button
          @click="closeMobileMenu"
          class="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors duration-200"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <!-- Mobile Menu Content -->
      <div class="flex flex-col p-4 space-y-4">
        <!-- Navigation Links -->
        <div class="space-y-3">
          <router-link
            :to="{ name: 'HomePage' }"
            @click="closeMobileMenu"
            class="block py-3 px-4 text-white font-medium text-lg hover:bg-gray-800 rounded-lg transition-colors duration-200"
          >
            {{ $t('steakStore') }}
          </router-link>

          <router-link
            :to="{ name: 'PublisherHome' }"
            @click="closeMobileMenu"
            class="block py-3 px-4 text-white font-medium text-lg hover:bg-gray-800 rounded-lg transition-colors duration-200"
          >
            {{ $t('developmentWorkspace') }}
          </router-link>

          <router-link
            :to="{ name: 'PublisherHome' }"
            @click="closeMobileMenu"
            class="hidden py-3 px-4 text-white font-medium text-lg hover:bg-gray-800 rounded-lg transition-colors duration-200"
          >
            {{ $t('navigation.community') }}
          </router-link>

          <router-link
            :to="{ name: 'HomePage' }"
            @click="closeMobileMenu"
            class="block py-3 px-4 text-white font-medium text-lg hover:bg-gray-800 rounded-lg transition-colors duration-200"
          >
            {{ $t('clientApp') }}
          </router-link>
        </div>

        <!-- Divider -->
        <div class="border-t border-gray-800 my-4"></div>

        <!-- External Link -->
        <router-link
          :to="{ name: 'HomePage' }"
          @click="closeMobileMenu"
          class="flex items-center gap-2 py-3 px-4 text-white font-black hover:bg-gray-800 rounded-lg transition-colors duration-200"
        >
          <span>steak.io.vn</span>
          <square-arrow-out-up-right class="size-5" />
        </router-link>

        <!-- Action Button -->
        <router-link
          :to="{ name: 'TicketsRequest' }"
          @click="closeMobileMenu"
          class="block text-center py-3 px-4 mt-4 bg-transparent border-2 border-white/50 text-white font-black rounded-sm hover:bg-[#7f5af0] hover:border-[#010101]/50 transition-colors duration-200"
        >
          {{ $t('createTickets') }}
        </router-link>
      </div>

      <!-- Mobile Menu Footer -->
      <div class="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800">
        <p class="text-gray-400 text-sm text-center">© 2025 Steak Platform</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { SquareArrowOutUpRight } from 'lucide-vue-next'

const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

// Close mobile menu on route change
const handleRouteChange = () => {
  closeMobileMenu()
}

// Close mobile menu on escape key
const handleEscapeKey = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    closeMobileMenu()
  }
}

// Prevent body scroll when mobile menu is open
const handleBodyScroll = () => {
  if (isMobileMenuOpen.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleEscapeKey)
  // Watch for menu state changes
  watch(isMobileMenuOpen, handleBodyScroll)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscapeKey)
  document.body.style.overflow = ''
})
</script>

<style scoped>
/* Ensure smooth transitions */
.transition-transform {
  transition-property: transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Mobile menu backdrop */
@media (max-width: 768px) {
  .backdrop-blur-sm {
    backdrop-filter: blur(4px);
  }
}

/* Active route styling */
.router-link-active {
  position: relative;
}

.router-link-active::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  right: 0;
  height: 2px;
  background-color: white;
}

/* Mobile menu active link */
.mobile-menu .router-link-active {
  background-color: rgba(55, 65, 81, 0.5);
}

.mobile-menu .router-link-active::after {
  display: none;
}
</style>
