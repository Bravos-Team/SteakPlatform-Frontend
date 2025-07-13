<template>
  <div class="sticky z-10 top-0 bottom-0 p-0 lg:px-[189.1px] h-[100px] w-[1135px] lg:w-full">
    <div class="flex flex-row bg-[#101014] items-center justify-between w-full h-full">
      <!-- SEARCH BAR -->
      <div class="flex justify-center items-center">
        <input type="text" placeholder="Search..." class="sr-only shrink-0" />
        <div
          class="bg-[#202024] relative hover:bg-[#404044] rounded-full w-[230px] outline-none h-[40px] text-gray-400 px-10"
        >
          <img
            src="https://ccdn.steak.io.vn/assets-search-white-w-opacity.svg"
            class="absolute w-5 top-2.5 left-3"
            alt="Search Ico"
          />
          <input
            type="text"
            placeholder="Search store"
            class="bg-transparent placeholder:text-[#fff]/70 text-white w-full h-full focus:outline-none"
          />
        </div>
        <!-- SEARCH BAR -->
      </div>

      <div
        class="w-[845px] text-[#fff]/70 h-[100px] flex flex-row justify-end ms-7 gap-5 items-center"
      >
        <router-link
          :to="{ name: 'WishlistManagementPage' }"
          :class="{ '!text-white !font-bold': isActiveWishlistRouter }"
          class="relative hover:text-[#fff] transition-all duration-200 group flex gap-x-1 flex-row-reverse hover:bg-white/10 px-2 py-1 rounded-lg"
        >
          Wishlist</router-link
        >
        <router-link
          :to="{ name: 'CartManagementPage' }"
          :class="{ '!text-white !font-bold  ': isActiveCartRouter }"
          class="relative hover:text-[#fff] transition-all duration-200 group flex gap-x-1 flex-row-reverse hover:bg-white/10 px-2 py-1 rounded-lg"
        >
          <div
            class="absolute -top-3 -right-3 rounded-full bg-blue-500/50 group-hover:bg-blue-500 transition-colors duration-300 size-6 text-xs flex items-center justify-center"
          >
            10
          </div>
          <ShoppingBag class="fill-white/30" /> Cart</router-link
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { ShoppingBag } from 'lucide-vue-next'
import { computed } from 'vue'

import { useRoute } from 'vue-router'
const route = useRoute()

const isActiveWishlistRouter = computed(() => {
  return route.name === 'WishlistManagementPage'
})
const isActiveCartRouter = computed(() => {
  return route.name === 'CartManagementPage'
})
</script>
