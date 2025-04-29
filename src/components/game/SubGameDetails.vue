<template>
  <div class="h-[884px] w-[320px] sticky top-0 bottom-0 right-0 flex flex-col gap-y-[15px]">
    <div class="flex justify-center items-center p-[20px]">
      <div class="flex justify-center items-center">
        <img :src="game.signatureImage" alt="" />
      </div>
    </div>
    <div
      class="flex p-[15px] gap-x-[15px] justify-between rounded-[10px] items-center border-[#fff]/20 border hover:border-[#fff]"
    >
      <div class="flex justify-center items-center">
        <img
          :src="'https://cdn1.epicgames.com/gameRating/gameRating/Generic_12_192_192x192-01e962f26c693e725097658fa7e4e29d'"
          alt=""
          class="w-16"
        />
      </div>
      <div class="flex flex-col w-full items-start" v-if="game.suitableAges == 12">
        <span class="font-bold">{{ game.suitableAges }}+</span>
        <span class="text-[#ffffffa6] text-[12px]">Moderate Violence</span>
      </div>
    </div>
    <div class="flex justify-start w-full">
      <button
        class="rounded-[4px] py-[1px] justify-center px-[8px] flex items-center bg-[#ffffff26]"
      >
        {{ game.category.name }}
      </button>
    </div>
    <div class="flex justify-start w-full font-bold text-[18px]">
      {{ CurrencyUtils.formatCurrency(game.price, '₫') }}
    </div>

    <div class="flex flex-col gap-y-[10px]">
      <router-link
        to="#"
        class="py-[12px] px-[20px] align-middle bg-[#26bbff] hover:bg-[#61cdff] text-black rounded-[10px] flex justify-center items-center"
        >Buy Now</router-link
      >
      <button
        class="py-[12px] px-[20px] align-middle bg-[#ffffff59]/50 hover:bg-[#ffffff59] text-white rounded-[10px] flex justify-center items-center"
      >
        Add To Cart
      </button>
      <button
        class="py-[12px] px-[20px] align-middle bg-[#ffffff59]/50 hover:bg-[#ffffff59] text-white rounded-[10px] flex justify-center items-center"
      >
        Add To Wishlist
      </button>
    </div>

    <div class="flex flex-col text-[15px]">
      <div class="flex border-b-[0.5px] border-b-[#ffffff37] justify-between py-[10px] px-[0px]">
        <span class="text-[#ffffffa6]">Steak Rewards</span>
        <span class="text-white flex gap-x-[10px]"
          >{{ game.rewards.name }}
          <img
            class="w-5"
            src="https://ccdn.steak.io.vn/assets-5-percent-rewards-blue.svg"
            alt=""
          />
        </span>
      </div>
      <div class="flex border-b-[0.5px] border-b-[#ffffff37] justify-between py-[10px] px-[0px]">
        <span class="text-[#ffffffa6]">Refund Type</span>
        <span class="text-white">{{ game.refundType.name }}</span>
      </div>
      <div class="flex justify-between py-[10px] px-[0px] border-b-[0.5px] border-b-[#ffffff37]">
        <span class="text-[#ffffffa6]">Developer</span>
        <span class="text-white">{{ game.developer.name }}</span>
      </div>
      <div class="flex justify-between py-[10px] px-[0px] border-b-[0.5px] border-b-[#ffffff37]">
        <span class="text-[#ffffffa6]">Publisher</span>
        <span class="text-white">{{ game.publisher.name }}</span>
      </div>
      <div class="flex justify-between py-[10px] px-[0px] border-b-[0.5px] border-b-[#ffffff37]">
        <span class="text-[#ffffffa6]">Release Date</span>
        <span class="text-white">{{ game.releaseDate }}</span>
      </div>
      <div class="flex justify-between py-[10px] px-[0px] border-b-[0.5px] border-b-[#ffffff37]">
        <span class="text-[#ffffffa6]">Platform</span>
        <template v-for="platform in game.platforms" :key="platform.id">
          <img
            src="https://ccdn.steak.io.vn/assets-window-ico-white.svg"
            v-if="platform.id == 1"
            class="w-6"
            alt=""
          />
        </template>
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
