<template>
  <div class="group relative">
    <div
      class="w-[211px] h-[281px] peer-hover/category-img:contrast-100 overflow-hidden group-hover:contrast-[.80] transition-all duration-250 relative"
    >
      <div class="relative rounded-md shrink-0 overflow-hidden">
        <img class="h-full w-full object-cover" :src="game.img" alt="" />
        <div v-if="game.type == 1" class="h-[23px] absolute backdrop-blur-md w-full bottom-0">
          <div class="w-full flex justify-center items-center h-full">
            <img src="https://ccdn.steak.io.vn/assets-ea-ico.svg" class="w-10" alt="" />
          </div>
        </div>
      </div>
    </div>
    <img
      src="https://ccdn.steak.io.vn/assets-ico-plus-white.svg"
      class="peer/category-img absolute group-hover:opacity-100 opacity-0 transition-all duration-300 top-[10px] right-[10px]"
      alt=""
    />
  </div>

  <div class="flex flex-col">
    <div class="flex flex-row justify-between items-center my-[5px]">
      <span class="text-gray-400 text-[12px] mb-[5px] leading-[18px]">
        {{ game.category.name }}</span
      >
      <span
        v-if="game.salePercent != 0"
        class="text-black bg-[#26bbff] w-[48px] h-[20px] rounded-full flex justify-center items-center font-medium align-center text-[12px]"
        >-{{ game.salePercent }}%</span
      >
    </div>

    <p
      class="text-white mb-[15px] capitalize font-bold text-[16.1px] leading-[20px] tracking-[0.32px] mb-"
    >
      {{ game.name }}
    </p>
    <div>
      <div class="-mt-[5px] mb-[10px]" v-show="game.recommend != 0">
        <button
          v-if="game.recommend == 1"
          class="w-[92px] h-[24px] text-[12px] flex flex-row rounded-[4px] py-[3px] px-[8px] gap-x-[5px] text-white bg-[#343338]"
        >
          <img class="w-[12px]" src="https://ccdn.steak.io.vn/assets-wang-nian-golden.svg" alt="" />
          <p class="text-[12px]">First Run</p>
        </button>
        <button
          v-if="game.recommend == 2"
          class="w-[92px] h-[24px] text-[12px] rounded-[4px] p-y-[3px] p-x[8px text-white bg-[#343338]"
        >
          Now On Epic
        </button>
      </div>
    </div>
  </div>
  <div class="flex flex-row flex-nowrap">
    <div v-if="game.salePercent == 0">
      <p v-if="game.status == 1" class="text-white leading-[18px]">
        {{ CurrencyUtils.formatCurrency(game.price, '₫') }}
      </p>
    </div>

    <p v-if="game.status == 0" class="text-white leading-[18px]">Free</p>
    <div v-else-if="game.salePercent != 0">
      <div class="flex flex-row justify-center items-center gap-x-[5px]">
        <del class="text-[#ffffffa6]">
          {{ CurrencyUtils.formatCurrency(game.price, '₫') }}
        </del>
        <p class="text-white leading-[18px]">
          {{
            CurrencyUtils.formatCurrency(
              CurrencyUtils.calculatPriceAfterSale(game.price, game.salePercent),
              '₫',
            )
          }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import CurrencyUtils from '@/services/common/CurrencyUtils'
const props = defineProps({
  game: {
    type: Object,
  },
})
</script>
