<template>
  <div class="flex justify-between border-b-1 pb-1">
    <div class="flex gap-x-4">
      <button
        class="flex gap-x-2 focus:bg-[#2F2F2F] hover:bg-[#2F2F2F] rounded-full h-full px-2 py-0 items-center"
      >
        <Sparkles class="size-5 text-white/60" />
        Newest
      </button>

      <button
        class="flex gap-x-2 focus:bg-[#2F2F2F] hover:bg-[#2F2F2F] rounded-full h-full px-2 py-0 items-center"
      >
        <ClockArrowDown class="size-5 text-white/60" />
        Oldest
      </button>
      <button
        class="flex gap-x-2 hover:bg-[#2F2F2F] focus:bg-[#2F2F2F] rounded-full h-full px-2 py-0 items-center"
      >
        <CalendarRange class="size-5 text-white/60" />
        This Week
      </button>
      <button
        class="flex gap-x-2 hover:bg-[#2F2F2F] rounded-full h-full focus:bg-[#2F2F2F] px-2 py-0 items-center"
      >
        <Check class="size-5 text-white/60" />
        Done
      </button>

      <button
        class="flex gap-x-2 hover:bg-[#2F2F2F] rounded-full h-full px-2 py-0 items-center focus:bg-[#2F2F2F]"
      >
        <MessageSquareMore class="size-5 text-white/60" />
        Not Yet Responded
      </button>

      <button
        class="flex gap-x-2 hover:bg-[#2F2F2F] rounded-full h-full px-2 py-1 focus:bg-[#2F2F2F]"
      >
        <MessageSquareReply class="size-5 text-white/60" />
        Recently Responded
      </button>
    </div>

    <div class="flex items-center gap-x-2">
      <list-filter class="size-4 text-white/60" />
      <arrow-down-up class="size-4 text-white/60" />
      <search class="size-4 text-white/60" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  ArrowDownUp,
  CalendarRange,
  Check,
  ClockArrowDown,
  ListFilter,
  MessageSquareMore,
  MessageSquareReply,
  Search,
  Sparkles,
} from 'lucide-vue-next'
</script>
