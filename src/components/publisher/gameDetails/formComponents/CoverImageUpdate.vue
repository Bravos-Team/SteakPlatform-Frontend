<template>
  <div class="flex flex-col gap-y-2 w-full">
    <span class="text-lg font-bold text-gray-400">Cover Image</span>
    <!-- DEFAULT IMAGE -->
    <div
      :class="{ hidden: unShowImageUploaded }"
      class="w-full lg:h-40 border-4 border-double rounded-md flex lg:flex-row flex-col overflow-hidden"
    >
      <div class="h-full flex justify-center p-5 bg-[#29292D]">
        <img
          src="https://ccdn.steak.io.vn/assets-guts-profile-pic.png"
          ref="gameImage"
          class="object-contain w-full md:h-50 lg:h-full"
          alt=""
        />
      </div>
      <div class="w-full bg-[#202024] h-full flex justify-between p-4">
        <span class="text-white/80 font-mono text-md">guts.jpg</span>
        <div>
          <button
            @click="unShowImageUploaded = !unShowImageUploaded"
            class="bg-[#343438] hover:bg-[#48484c] transition-colors duration-250 cursor-pointer px-6 py-2 rounded-sm"
          >
            <trash2 />
          </button>
        </div>
      </div>
    </div>
    <!-- END DEFAULT IMAGE -->
    <div
      class="w-full gap-y-1 flex-col h-40 group hover:bg-sky-50/10 duration-300 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center text-gray-500 cursor-pointer hover:border-sky-400 transition-all"
      @dragover.prevent="isDragging = true"
      @dragleave.prevent="isDragging = false"
      @drop.prevent="handleDrop"
      @click="fileInput?.click()"
      :class="{ 'border-sky-500 bg-sky-50 text-sky-700': isDragging, hidden: !unShowImageUploaded }"
    >
      <Upload class="group-hover:text-white transition-all duration-250 group-hover:scale-110" />
      <span class="group-hover:text-gray-400 transition-colors duration-250"
        >Kéo thả file vào đây hoặc click để chọn</span
      >
      <input type="file" class="hidden" ref="fileInput" @change="handleFileChange" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  useGetPresignedImageUrl,
  usePostIntoPresignedUrl,
} from '@/hooks/common/cdn/useCDNAssetsManager'
import { Upload, Trash2 } from 'lucide-vue-next'

const { isPending: isGettingPresignedUrl, mutateAsync: mutateGetPresignedImageUrl } =
  useGetPresignedImageUrl()
const { isPending: isPosttingIntoPresignedUrl, mutateAsync: mutatePostIntoPresignedUrl } =
  usePostIntoPresignedUrl()

const fileInput = ref<HTMLInputElement | null>(null)
const gameImage = ref<HTMLInputElement | null>(null)
const unShowImageUploaded = ref(false)

const isDragging = ref(false)
const handleDrop = (e: DragEvent) => {
  isDragging.value = false
  const files = e.dataTransfer?.files
  if (files && files.length) {
    unShowImageUploaded.value = false
    gameImage.value?.setAttribute('src', URL.createObjectURL(files[0]))
  }
}

const handleFileChange = async (e: Event) => {
  const files = (e.target as HTMLInputElement).files
  if (files && files.length) {
    unShowImageUploaded.value = false
    gameImage.value?.setAttribute('src', URL.createObjectURL(files[0]))

    const response = await mutateGetPresignedImageUrl({
      fileName: files[0].name,
      fileSize: files[0].size,
    })

    await mutatePostIntoPresignedUrl({
      url: response.signedUrl,
      file: files[0],
    })
  }
}
</script>
