<template>
  <router-link
    :to="{ name: 'game-details', params: { id: game?.id.toString() } }"
    class="flex flex-col gap-y-2 rounded-lg"
  >
    <div class="group relative">
      <div
        class="w-[211px] min-h-full cursor-pointer peer-hover/category-img:cursor-pointer peer-hover/category-img:contrast-100 overflow-hidden hover:contrast-[.80] transition-all duration-250 relative"
      >
        <div class="relative rounded-md overflow-hidden min-h-[240px]">
          <div class="rounded-md overflow-hidden h-full w-full">
            <img class="min-h-full w-full object-cover" :src="game?.thumbnail" alt="" />
          </div>
        </div>
        <img
          src="https://ccdn.steak.io.vn/assets-ico-plus-white.svg"
          class="peer/category-img absolute group-hover:opacity-100 opacity-0 transition-all duration-300 top-[10px] right-[10px]"
          alt=""
        />
      </div>
    </div>
    <div class="flex flex-col cursor-pointer gap-y-1 px-3 py-2">
      <div class="flex flex-col">
        <p
          class="text-white mb-[15px] capitalize font-bold text-[16.1px] leading-[20px] tracking-[0.32px] mb-"
        >
          {{ game?.name }}
        </p>
      </div>
      <div class="flex flex-row flex-nowrap">
        <p class="text-white leading-[18px]">
          {{ CurrencyUtils.formatCurrency(game?.price, '₫') }}
        </p>
      </div>
    </div>
  </router-link>
</template>

<script setup lang="ts">
import CurrencyUtils from '@/services/common/CurrencyUtils'
import { GAME_ITEM } from '@/types/store/game'
import { onMounted, PropType } from 'vue'
const props = defineProps({
  game: {
    type: Object as PropType<GAME_ITEM>,
  },
})
</script>
