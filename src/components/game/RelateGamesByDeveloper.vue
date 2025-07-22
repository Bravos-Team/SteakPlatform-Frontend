<template>
  <div class="flex shrink-0 rounded-[6px] bg-white/5 overflow-hidden">
    <div
      class="flex flex-col gap-y-[12px] py-[16px] border-l-5 border-l-[#35B8EF] pl-[20px] pr-[16px] w-full"
    >
      <!-- Header -->
      <div class="flex flex-col gap-y-[4px]">
        <span class="font-bold text-[15px]">DEVELOPED BY</span>
        <span class="text-[16px] text-[#ffffffa6]">
          Check out these amazing development teams behind this game.
        </span>
      </div>

      <!-- Teams Horizontal Scroll Bar -->
      <div class="flex gap-x-[8px] overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-white/30">
        <span
          v-for="(team, idx) in developTeams"
          :key="idx"
          class="whitespace-nowrap font-medium border border-white/20 text-white/80 text-sm px-3 py-1 rounded-[4px] bg-white/10 hover:bg-white/15 transition-colors duration-150"
        >
          {{ team }}
        </span>
      </div>

      <!-- Action Button -->
      <div class="flex justify-end">
        <router-link
          to="#"
          class="py-[6px] border border-[#ffffffa6]/50 hover:border-[#ffffffa6] text-[16px] rounded-[5px] px-[11px] leading-[19.6px] tracking-[0.28px] flex justify-center items-center bg-[#ffffff26]/10 hover:bg-[#ffffff26] transition-colors"
        >
          Learn More
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue'

const props = defineProps({
  developTeams: {
    type: Array as PropType<Array<string>>,
    required: true,
  },
})
</script>
