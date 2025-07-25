<template>
  <div
    class="overflow-hidden bg-linear-to-r from-[#2cb67d]/90 to-[#7f5af0]/30 w-full h-full tablet:h-[25rem] py-5 tablet:py-20 justify-center flex flex-col relative"
  >
    <div class="absolute top-0 left-0 flex gap-x-10 w-[200%] h-full">
      <!-- block 1 -->
      <div class="w-full laptop:w-1/2 h-full animate-loop-scroll">
        <div
          class="grid grid-cols-5 grid-rows-5 gap-x-[24rem] gap-y-[6rem] laptop:gap-10 skew-y-1 opacity-10 w-full h-full"
        >
          <template v-for="i in 25" :key="'grid1-' + i">
            <span
              class="text-[120px] skew-3 font-extrabold text-gray-800 flex items-center justify-center select-none"
            >
              STEAK
            </span>
          </template>
        </div>
      </div>

      <!-- block 2 -->
      <div class="w-1/2 hidden laptop:block h-full animate-loop-scroll">
        <div class="grid grid-cols-5 grid-rows-5 gap-10 skew-y-1 opacity-10 w-full h-full">
          <template v-for="i in 25" :key="'grid2-' + i">
            <span
              class="text-[120px] skew-3 font-extrabold text-gray-800 flex items-center justify-center select-none"
            >
              STEAK
            </span>
          </template>
        </div>
      </div>
    </div>

    <div class="flex z-1 flex-col gap-y-5 tablet:gap-y-15 px-3 py-1 items-center text-white">
      <div class="flex gap-y-3 flex-col items-center">
        <span class="font-medium text-xl tablet:text-3xl">Welcome to the help center</span>
        <span class="font-black text-4xl laptop:text-7xl after:content-['__?'] after:text-[#2cb67d]"
          >HOW CAN WE HELP</span
        >
      </div>

      <div class="flex z-1 flex-col gap-y-3 px-10">
        <div
          class="flex z-1 ring-2 rounded-full transition-all duration-300 ring-[#010101]"
          :class="{ 'ring-3': isForcused }"
        >
          <div
            class="flex py-3 z-1 px-3 bg-[#7f5af0]/20 will-change-transform backdrop-blur-sm cursor-pointer rounded-l-full w-full laptop:w-200 border-r-1"
          >
            <label for="search" class="w-full flex items-center gap-x-2 z-1">
              <search class="size-6" />
              <input
                type="text"
                autocomplete="off"
                id="search"
                @focus="isForcused = true"
                @blur="isForcused = false"
                class="w-full z-1 bg-transparent border-none outline-none text-white placeholder:text-white/50"
                placeholder="Search for help articles..."
              />
            </label>
          </div>
          <button
            class="font-black rounded-r-full px-3 bg-[#2cb67d]/80 h-full border-l-0 cursor-pointer"
          >
            Search
          </button>
        </div>

        <div class="flex flex-col tablet:flex-row gap-x-3 px-10">
          <span class="font-bold text-nowrap">Popular Searches:</span>
          <div class="w-full flex flex-col tablet:flex-row text-pretty gap-x-2">
            <a :href="link" class="underline text-white/70 font-medium">How to play?</a>
            <a :href="link" class="underline text-white/70 font-medium">Can I upload my game?</a>
            <a :href="link" class="underline text-white/70 font-medium"
              >How Can I Receive Payment</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Search } from 'lucide-vue-next'
import { computed, ref } from 'vue'

const isForcused = ref(false)

const link = computed(() => {
  return atob('aHR0cHM6Ly95b3V0dS5iZS94dkZaam81UGdHMD9zaT1OMDg1UUJnVk80TVFJQkNq')
})
</script>
