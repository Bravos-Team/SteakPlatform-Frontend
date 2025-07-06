<template>
  <div class="flex flex-col justify-between gap-y-[15px]">
    <div class="rounded-md shrink-0 overflow-hidden">
      <div class="group relative">
        <div
          class="peer-hover/category-img:contrast-100 overflow-hidden group-hover:contrast-[.80] transition-all duration-250"
        >
          <img class="rounded-xl" :src="game.img" alt="" />
        </div>
        <img
          src="https://ccdn.steak.io.vn/assets-ico-plus-white.svg"
          class="peer/category-img absolute group-hover:opacity-100 opacity-0 transition-all duration-300 top-[10px] right-[10px]"
          alt=""
        />
      </div>
    </div>
    <div :class="`flex flex-col shrink-0 justify-between gap-y-[${gapY}]`">
      <div class="text-[20px] font-bold tracking-[0.5px] leading-[25px] font-stretch-[700px]">
        {{ game.name }}
      </div>
      <div :class="game.descriptions != '' ? 'min-h-[90px]' : ''" class="text-[#ffffffa6]">
        {{ game.descriptions }}
      </div>
      <div v-if="game.type == 0">
        <button
          class="py-[8px] flex flex-row px-[16px] bg-[#ffffff59]/50 hover:bg-[#ffffff59] rounded-[8px] align-center justify-center items-center gap-x-[5px]"
        >
          <p class="text-[16px]">See In Shop</p>
          <img
            class="w-[20px]"
            src="https://ccdn.steak.io.vn/assets-shared-ico-collaborators-list.svg"
            alt=""
          />
        </button>
      </div>
      <div v-else>
        <div v-if="game.salePercent == 0">
          <p>{{ CurrencyUtils.formatCurrency(game.price, '₫') }}</p>
        </div>
        <div v-else-if="game.salePercent != 0">
          <div class="flex flex-row gap-x-[7px]">
            <div
              class="rounded-full bg-[#26bbff] w-[48px] h-[20px] flex flex-row justify-center items-center text-[12px] font-medium text-black"
            >
              -{{ game.salePercent }}%
            </div>
            <del class="text-[#ffffffa6]">{{ CurrencyUtils.formatCurrency(game.price, '₫') }}</del>
            <p>
              {{
                CurrencyUtils.formatCurrency(
                  CurrencyUtils.calculatPriceAfterSale(game.price, game.salePercent),
                  '₫'
                )
              }}
            </p>
          </div>
        </div>
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
  gapY: {
    type: String,
    default: '0px',
  },
})
</script>
