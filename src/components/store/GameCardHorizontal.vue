<template>
  <div
    class="flex nth-[2]:border nth-[2]:border-r-0 nth-[2]:border-l-0 laptop:nth-[2]:border laptop:nth-[2]:border-t-0 laptop:nth-[2]:border-b-0 laptop:nth-[2]:border-r-[#ffffff26] px-[6px] nth-[2]:border-l-[#ffffff26] lg:w-[540px] flex-col text-white justify-between"
  >
    <router-link to="#" class="flex flex-row group/category">
      <span class="capitalize text-start font-bold text-[20px] tracking-[0.4px] leading-[25px]">{{
        title
      }}</span>
      <img
        class="w-[8px] ms-2 mt-1 group-hover/category:translate-x-[7px] transition-all"
        src="https://ccdn.steak.io.vn/assets-arrow-right-white-ico.svg"
        alt=""
      />
    </router-link>

    <div class="flex flex-col justify-center p-[5px]">
      <div
        v-for="game in data"
        :key="game.id"
        class="h-[100px] flex flex-col p-[10px] justify-center rounded-md shrink-0 hover:bg-[#fff]/5"
      >
        <router-link to="#" class="flex flex-row justify-start gap-x-[20px] h-[80px]">
          <div>
            <img :src="game.img" class="object-cover w-[60px]" alt="" />
          </div>
          <div class="flex flex-col py-[10px]">
            <span class="font-bold text-lg line-clamp-1">{{ game.name }}</span>
            <span>{{ CurrencyUtils.formatCurrency(game.price, '₫') }}</span>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import CurrencyUtils from '@/services/common/CurrencyUtils'
const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
  title: {
    type: String,
    default: '',
  },
})
</script>
