<template>
  <card
    class="h-[15rem] xl:h-[20rem] xl:col-span-5 lg:col-span-2 p-0 grid grid-rows-2 relative @container overflow-hidden"
  >
    <div
      id="background"
      class="bg-[url('https://ccdn.steak.io.vn/assets-desert.png')] bg-cover w-full h-full absolute"
    ></div>
    <div class="absolute bottom-0 w-full h-[6vh] lg:h-[10vh] bg-white-50 backdrop-blur-[8px] p-5">
      <div class="w-full h-full flex items-center">
        <div class="flex gap-x-2 justify-center items-center">
          <span class="xl:text-2xl font-bold">
            {{ gameDetails.name }}
          </span>
          <name-edited-button />
        </div>
      </div>
    </div>

    <!-- Upload Button -->
    <div class="absolute top-5 right-5 z-50">
      <label
        for="file-upload"
        class="flex gap-x-2 items-center cursor-pointer rounded-sm bg-white/10 backdrop-blur-[8px] hover:bg-white/30 px-5 py-2"
      >
        <Download class="w-5 h-5" />
        <span class="font-medium text-md">Upload image</span>
        <input id="file-upload" type="file" class="hidden" @change="handleFileUpload" />
      </label>
    </div>
  </card>
</template>

<script setup lang="ts">
import { Card } from '@/components/ui/card'
import { Download } from 'lucide-vue-next'

import NameEditedButton from './NameEditedButton.vue'
const props = defineProps<{
  gameDetails: {
    id: string
    name: string
    descriptions: string
  }
}>()

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target?.files?.[0]
}
</script>
