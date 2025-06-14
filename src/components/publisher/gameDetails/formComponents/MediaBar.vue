<template>
  <div class="flex flex-col gap-y-1">
    <div class="font-bold text-lg text-gray-200/80">Media and Images</div>
    <div
      class="border-1 p-3 rounded-sm bg-linear-120 from-blue-200/5 to-emerald-200/5 flex flex-col gap-y-3"
    >
      <div v-if="!media_files.length">Non media created</div>
      <div v-else class="grid grid-cols-1 gap-y-2">
        <div class="flex flex-col gap-y-1" v-for="(media, index) in media_files" :key="index">
          <span class="flex gap-x-1 items-center">
            <span> Media Input {{ index + 1 }}</span>
            <cloud-upload :size="20" />
          </span>
          <div class="w-full relative">
            <input
              type="file"
              class="w-full border-2 focus:border-white/50 focus:outline-none rounded-sm bg-white/5 px-2 py-1 font-medium relative"
              placeholder="image url..."
            />
            <div
              class="absolute -top-2 -right-2 bg-gray-700 border-1 border-white/20 cursor-pointer p-1 rounded-full"
              @click="handleDeleteMediaInput(index)"
            >
              <X class="size-3" />
            </div>
          </div>
        </div>
      </div>

      <div class="flex justify-end gap-x-2">
        <button
          class="border-2 border-gray-300/20 px-2 rounded-sm py-1 bg-white/10 flex gap-x-1 cursor-pointer hover:bg-white/20 transition-colors duration-300"
          @click="handleClearAll"
        >
          Clear All
          <shredder :size="20" />
        </button>
        <button
          class="border-2 border-gray-300/20 px-2 rounded-sm py-1 bg-white/10 flex gap-x-1 cursor-pointer hover:bg-white/20 transition-colors duration-300"
          @click="handleCreateMediaInput"
        >
          Add media
          <DiamondPlus :size="20" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { X, Shredder, CloudUpload, DiamondPlus } from 'lucide-vue-next'

import { ref, h } from 'vue'
type MediaType = {
  type: string
  url: string
}
const media_files = ref<MediaType[]>([
  {
    type: '',
    url: '',
  },
])

const handleCreateMediaInput = () => {
  media_files.value.push({
    type: '',
    url: '',
  })
}

const handleDeleteMediaInput = (index: number) => {
  media_files.value.splice(index, 1)
}

const handleClearAll = () => {
  media_files.value = []
}
</script>
