<template>
  <div
    class="flex hover:-translate-y-1 group hover:bg-[#7f5af0] transition-all bg-[#72757e]/50 hover:border-[#ffffff] duration-250 ease-in-out cursor-pointer flex-col gap-y-6 border-3 border-[#010101]/50 rounded-sm px-10 py-5"
  >
    <div class="flex items-center gap-2">
      <component :is="content.icon" class="size-10 group-hover:text-[#2cb67d]" />
      <span class="flex font-black text-xl">{{ content.name }}</span>
    </div>

    <div class="flex">
      <span class="text-[#c2c2c2] text-wrap">{{ content.descriptions }}</span>
    </div>

    <div>
      <component
        :is="MoveRight"
        class="size-8 group-hover:translate-x-3 transition-transform duration-200 text-[#2cb67d]"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { MoveRight } from 'lucide-vue-next'
import { type SupportCardContentType } from '@/components/help/articles/supportCardContentDatas'

const props = defineProps<{ content: SupportCardContentType }>()
</script>
