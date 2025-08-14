<template>
  <div class="sticky z-10 -top-[2px] h-full w-full">
    <div
      class="gap-x-3 flex flex-col px-8 laptop:px-3 laptop:flex-row bg-[#101014] py-3 gap-y-2 items-center justify-between min-w-full h-full">
      <!-- SEARCH BAR + DISCOVER/BROWSE -->
      <div class="flex justify-center items-center w-full px-1 gap-3 laptop:gap-5">
        <input type="text" placeholder="Search..." class="sr-only shrink-0" />
        <div
          class="bg-[#202024] relative hover:bg-[#404044] rounded-full w-full outline-none h-[40px] text-gray-400 px-10 ">
          <img src="https://ccdn.steak.io.vn/assets-search-white-w-opacity.svg" class="absolute w-5 top-2.5 left-3"
            alt="Search Ico" />
          <input type="text" :placeholder="$t('component.search')"
            class="bg-transparent placeholder:text-[#fff]/70 text-white w-full h-full focus:outline-none" />
        </div>

      </div>
      <!-- END SEARCH BAR + DISCOVER/BROWSE -->
      <div
        class="flex-wrap gap-y-2 w-full mobile:py-3 text-[#fff]/70 tablet:h-[100px] flex flex-row tablet:w-full tablet:items-center justify-between  tablet:gap-5 laptop:items-center items-center">
        <router-link :to="{ name: 'DiscoverGamesStore' }"
          class="bg-white/10 hover:bg-white/20 rounded-full px-4 py-1 text-white/60 hover:text-white font-medium">
          Discover
        </router-link>
        <div class="flex flex-wrap gap-x-3">

          <router-link :to="{ name: 'WishlistManagementPage' }"
            :class="{ '!text-white !font-bold': isActiveWishlistRouter }"
            class="relative hover:text-[#fff] transition-all duration-200 group flex gap-x-1 flex-row-reverse hover:bg-white/10 px-2 py-1 rounded-lg">
            {{ $t('title.store.wishlist') }}
          </router-link>
          <div v-if="isFetchingCart">
            <LoaderCircle class="animate-spin" />
          </div>
          <router-link v-else :to="{ name: 'CartManagementPage' }"
            :class="{ '!text-white !font-bold  ': isActiveCartRouter }"
            class="relative hover:text-[#fff] transition-all duration-200 group flex gap-x-1 flex-row-reverse hover:bg-white/10 px-2 py-1 rounded-lg">
            <div v-if="cartItems.length > 0"
              class="absolute -top-3 -right-3 rounded-full bg-blue-500/50 group-hover:bg-blue-500 transition-colors duration-300 size-6 text-xs flex items-center justify-center">
              {{ cartItems.length }}
            </div>
            <ShoppingBag class="fill-white/30" /> {{ $t('title.store.cart') }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ShoppingBag, LoaderCircle } from 'lucide-vue-next'
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()

const isActiveWishlistRouter = computed(() => {
  return route.name === 'WishlistManagementPage'
})
const isActiveCartRouter = computed(() => {
  return route.name === 'CartManagementPage'
})
const props = defineProps({
  cartItems: {
    type: Array,
    default: () => [],
    require: false,
  },
  isFetchingCart: {
    type: Boolean,
    default: false,
    require: false,
  },
})
</script>
