<template>
  <div class="flex shrink-0 rounded-[6px] bg-white/5 overflow-hidden">
    <div
      class="flex flex-col gap-y-[16px] py-[16px] border-l-5 border-l-[#35B8EF] pl-[20px] pr-[16px]"
    >
      <div class="flex flex-col gap-y-[4px]">
        <span class="flex items-center font-bold text-[15px]"
          >EXPLORE OTHER GAMES FROM HOODED HORSE</span
        >
        <span class="flex justify-center items-center text-[16px] text-[#ffffffa6]">
          From city building to grand strategy, turn-based tactics to RTS, see more strategy games
          from Hooded Horse.
        </span>
      </div>
      <div class="flex justify-end">
        <router-link
          to="#"
          class="py-[6px] border-1 border-[#ffffffa6]/50 hover:border-[#ffffffa6] text-[16px] rounded-[5px] px-[11px] leading-[19.6px] tracking-[0.28px] flex justify-center items-center bg-[#ffffff26]/10 hover:bg-[#ffffff26]"
        >
          Learn More
        </router-link>
      </div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  game: {
    type: Object,
  },
})
</script>
