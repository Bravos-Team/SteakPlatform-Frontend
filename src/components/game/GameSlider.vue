<template>
  <!-- CAROUSELS BAR -->
  <div class="flex shrink-0 flex-col overflow-hidden xl:w-[1039px] xl:h-[663px]  lg:h-[499px] gap-y-[20px]">
    <!-- MAIN IMAGES SLIDERS -->
    <div
      class="bg-gray-400 group/img-slider relative flex flex-row rounded-xl overflow-hidden xl:h-[584px] lg:h-[422px] shrink-0"
    >
      <template v-for="(image, index) in game.details.images" :key="index">
        <img :src="image.url" class="w-full shrink-0" />
      </template>
      <button
        class="cursor-pointer absolute opacity-0 group-hover/img-slider:opacity-100 transition-all flex justify-center items-center duration-500 -left-20 group-hover/img-slider:left-0 h-full w-[50px] bg-gradient-to-l from-[#000]/0 to-[#000]/35"
      >
        <img
          class="w-[15px] opacity-0 group-hover/img-slider:opacity-100 transition-all duration-500 rotate-180"
          src="https://ccdn.steak.io.vn/assets-arrow-right-white-ico.svg"
          alt=""
        />
      </button>
      <button
        class="cursor-pointer absolute opacity-0 group-hover/img-slider:opacity-100 transition-all flex justify-center items-center duration-500 -right-20 group-hover/img-slider:right-0 h-full w-[50px] bg-gradient-to-r from-[#000]/0 to-[#000]/35"
      >
        <img
          class="w-[15px] opacity-0 group-hover/img-slider:opacity-100 transition-all duration-500"
          src="https://ccdn.steak.io.vn/assets-arrow-right-white-ico.svg"
          alt=""
        />
      </button>
    </div>
    <!-- END MAIN IMAGES SLIDERS -->
    <div class="flex flex-row justify-center gap-x-[5px] w-full h-[57px]">
      <div class="h-full flex justify-center items-center">
        <button class="rounded-full size-[40px] bg-[#fff]/20 flex justify-center items-center">
          <img
            class="w-[5px] rotate-180"
            src="https://ccdn.steak.io.vn/assets-arrow-right-white-ico.svg"
            alt=""
          />
        </button>
      </div>
      <div class="h-[57px] flex gap-x-[10px] justify-center w-full overflow-x-scroll no-scrollbar">
        <div
          class="border-[1px] border-[#fff]/0 checked:border-[#fff] brightness-[.40] hover:brightness-100 overflow-hidden shrink-0 rounded-sm"
          v-for="(image, index) in game.details.images"
          :key="index"
        >
          <img :src="image.url" alt="" class="h-[57px]" />
        </div>
      </div>
      <div class="h-full items-center justify-center flex">
        <button class="rounded-full size-[40px] bg-[#fff]/20 flex justify-center items-center">
          <img
            class="w-[5px]"
            src="https://ccdn.steak.io.vn/assets-arrow-right-white-ico.svg"
            alt=""
          />
        </button>
      </div>
    </div>
  </div>
  <!-- END CAROUSEL BAR -->
</template>

<script setup>
defineProps({
  game: {
    type: Object,
    required: true,
  },
})
</script>
