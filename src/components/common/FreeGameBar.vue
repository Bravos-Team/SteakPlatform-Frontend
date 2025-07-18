<template>
  <div
    class="bg-[#202024] h-full tablet:h-[589px] rounded-[12px] py-[30px] px-[40px] flex flex-col gap-y-[25px]"
  >
    <!-- HEADER -->
    <div class="flex text-white flex-row justify-between h-[40px]">
      <div class="flex flex-row justify-center items-center gap-x-[15px]">
        <img src="https://ccdn.steak.io.vn/assets-gift-box-white.svg" class="w-[35px]" alt="" />
        <p class="font-bold text-[22px] tracking-[0.4px] leading-[25px] font-hard">
          {{ $t('title.component.free_games') }}
        </p>
      </div>
      <router-link
        to="#"
        class="flex flex-row gap align-middle py-[7px] px-[15px] leading-[19.6px] tracking-[0.28px] justify-center text-[14px] border-[0.8px] border-[#ffffffa6]/50 hover:border-[#ffffffa6] rounded-[8px] transition-all duration-200 bg-[#ffffff26]/10 font-medium hover:bg-[#ffffff26]"
      >
        {{ $t('title.link.view_more') }}
      </router-link>
    </div>
    <!-- END HEADER -->
    <div class="flex flex-col tablet:flex-row text-white h-full tablet:h-[464px] gap-x-[20px]">
      <div v-for="game in freeGameList" :key="game.id" class="flex flex-col gap-y-[20px]">
        <div class="relative rounded-md overflow-hidden">
          <img :src="game.img" class="w-[40rem] tablet:w-full" alt="" />
          <div
            v-if="game.status != 3"
            class="absolute flex justify-center items-center bottom-0 left-0 right-0 bg-[#26bbff] h-[25px]"
          >
            <span
              class="font-bold uppercase text-black font-arial flex justify-center items-center text-[14px]"
            >
              Free Now
            </span>
          </div>
          <div
            v-else
            class="absolute flex justify-center items-center bottom-0 left-0 right-0 bg-black h-[25px]"
          >
            <span
              class="font-bold uppercase text-white font-arial flex justify-center items-center text-[14px]"
            >
              Coming Soon
            </span>
          </div>
        </div>
        <div class="flex flex-col gap-y-[5px] w-full h-[78px]">
          <span class="tracking-[0.32px] leading-[20px] text-md font-bold">{{ game.name }}</span>
          <span class="text-[#ffffffa6] leading-[26.4px] text-[17px]">{{ game.descriptions }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  freeGameList: {
    type: Array,
    default: () => [],
  },
})
</script>
