<template>
  <div class="flex px-4 tablet:px-3 desktop-xl:px-[5rem] h-16 tablet:h-25">
    <div class="flex w-full h-full items-center justify-between">
      <!-- Logo Section -->
      <router-link to="#" class="flex items-center gap-2 flex-shrink-0">
        <img src="https://ccdn.steak.io.vn/logo_steak.svg" alt="Steak Logo" class="h-8 w-auto" />
        <span class="font-black text-lg tablet:text-xl capitalize hidden mobile:block">
          Steak help center
        </span>
        <!-- Mobile short title -->
        <span class="font-black text-lg capitalize mobile:hidden"> Help </span>
      </router-link>

      <!-- Desktop Navigation -->
      <div class="flex gap-x-6 hidden tablet:flex">
        <div class="relative group">
          <router-link :to="{ name: 'HomePage' }" class="font-medium text-lg">Steak</router-link>
          <div
            class="w-full group-hover:h-1 h-0 bg-white absolute bottom-0 left-0 transition-all duration-100"
          ></div>
        </div>

        <div class="relative group">
          <router-link :to="{ name: 'SupportCenter' }" class="font-medium text-lg ease-in-out">
            Support Center
          </router-link>
          <div
            class="w-full group-hover:h-1 h-0 bg-white absolute bottom-0 left-0 transition-all ease-in-out duration-100"
          ></div>
        </div>

        <div class="relative group">
          <router-link :to="{ name: 'Login' }" class="font-medium text-lg">Accounts</router-link>
          <div
            class="w-full group-hover:h-1 h-0 bg-white absolute bottom-0 left-0 transition-all duration-100"
          ></div>
        </div>
      </div>

      <!-- Mobile Navigation -->
      <div class="flex items-center gap-3 tablet:hidden">
        <!-- Mobile Account Button -->
        <router-link
          :to="{ name: 'Login' }"
          class="p-2 text-white hover:bg-white/10 rounded-lg transition-colors duration-200"
          title="Account"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </router-link>

        <!-- Mobile Menu Button -->
        <button
          @click="toggleMobileMenu"
          class="p-2 text-white hover:bg-white/10 rounded-lg transition-colors duration-200"
          aria-label="Toggle mobile menu"
        >
          <svg
            class="w-5 h-5 transition-transform duration-200"
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
      class="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 tablet:hidden"
      @click="closeMobileMenu"
    ></div>

    <!-- Mobile Menu Dropdown -->
    <div
      class="fixed top-16 left-4 right-4 bg-gray-900/95 backdrop-blur-xl shadow-2xl z-50 rounded-2xl border border-gray-800 transform transition-all duration-300 ease-out tablet:hidden"
      :class="
        isMobileMenuOpen
          ? 'opacity-100 translate-y-0 scale-100'
          : 'opacity-0 -translate-y-4 scale-95 pointer-events-none'
      "
    >
      <!-- Mobile Menu Content -->
      <div class="p-4">
        <!-- Header -->
        <div class="flex items-center justify-between mb-4 pb-3 border-b border-gray-800">
          <div class="flex items-center gap-2">
            <img
              src="https://ccdn.steak.io.vn/logo_steak.svg"
              alt="Steak Logo"
              class="h-6 w-auto"
            />
            <span class="font-black text-white">Navigation</span>
          </div>
          <button
            @click="closeMobileMenu"
            class="p-1.5 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors duration-200"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <!-- Navigation Links -->
        <div class="space-y-2">
          <router-link
            :to="{ name: 'HomePage' }"
            @click="closeMobileMenu"
            class="flex items-center gap-3 py-3 px-4 text-white font-medium hover:bg-gray-800 rounded-xl transition-colors duration-200 group"
          >
            <div
              class="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center group-hover:bg-gray-700 transition-colors duration-200"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
            </div>
            <div>
              <div class="font-medium">Steak</div>
              <div class="text-gray-400 text-sm">Main platform</div>
            </div>
          </router-link>

          <router-link
            :to="{ name: 'SupportCenter' }"
            @click="closeMobileMenu"
            class="flex items-center gap-3 py-3 px-4 text-white font-medium hover:bg-gray-800 rounded-xl transition-colors duration-200 group"
          >
            <div
              class="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center group-hover:bg-gray-700 transition-colors duration-200"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <div class="font-medium">Support Center</div>
              <div class="text-gray-400 text-sm">Get help & support</div>
            </div>
          </router-link>

          <router-link
            :to="{ name: 'Login' }"
            @click="closeMobileMenu"
            class="flex items-center gap-3 py-3 px-4 text-white font-medium hover:bg-gray-800 rounded-xl transition-colors duration-200 group"
          >
            <div
              class="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center group-hover:bg-gray-700 transition-colors duration-200"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <div>
              <div class="font-medium">Accounts</div>
              <div class="text-gray-400 text-sm">Login or register</div>
            </div>
          </router-link>
        </div>

        <!-- Footer -->
        <div class="mt-4 pt-3 border-t border-gray-800">
          <p class="text-gray-500 text-xs text-center">Steak Help Center © 2025</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'

const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
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

// Close menu on route change
const handleRouteChange = () => {
  closeMobileMenu()
}

onMounted(() => {
  document.addEventListener('keydown', handleEscapeKey)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscapeKey)
  document.body.style.overflow = ''
})

// Watch for menu state changes
watch(isMobileMenuOpen, handleBodyScroll)
</script>

<style scoped>
/* Smooth transitions for mobile menu */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Mobile backdrop blur */
@media (max-width: 768px) {
  .backdrop-blur-sm {
    backdrop-filter: blur(4px);
  }

  .backdrop-blur-xl {
    backdrop-filter: blur(24px);
  }
}

/* Active route styling for desktop */
.router-link-active .group div:last-child {
  height: 4px;
}

/* Mobile menu active styling */
.mobile-menu .router-link-active {
  background-color: rgba(55, 65, 81, 0.7);
}

/* Responsive breakpoints */
@media (min-width: 640px) {
  .mobile\:block {
    display: block;
  }

  .mobile\:hidden {
    display: none;
  }
}
</style>
