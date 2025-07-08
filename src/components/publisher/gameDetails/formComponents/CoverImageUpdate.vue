<template>
  <div class="flex flex-col gap-y-2 w-full">
    <span class="text-lg font-bold text-gray-400">Cover Image</span>
    <!-- DEFAULT IMAGE -->
    <div
      :class="{ hidden: unShowImageUploaded }"
      class="w-full lg:h-40 border-4 border-double rounded-md flex lg:flex-row flex-col overflow-hidden relative"
    >
      <div
        class="h-full flex justify-center p-5 bg-[#29292D]"
        :class="{
          'blur-xs min-h-50 animate-pulse': isGettingPresignedUrl || isPosttingIntoPresignedUrl,
        }"
      >
        <img
          :class="{ hidden: isGettingPresignedUrl || isPosttingIntoPresignedUrl }"
          :src="thumbnailUrl"
          ref="gameImage"
          class="object-contain w-full md:h-50 lg:h-full"
          alt=""
        />
      </div>

      <LoaderCircle
        :class="{
          visible: isGettingPresignedUrl || isPosttingIntoPresignedUrl,
          hidden: !isGettingPresignedUrl && !isPosttingIntoPresignedUrl,
        }"
        class="absolute left-[48%] top-[28%] text-gray-500 scale-110 size-10 animate-spin z-2"
      />
      <div class="w-full bg-[#202024] h-full flex justify-between p-4">
        <span
          v-if="isGettingPresignedUrl || isPosttingIntoPresignedUrl"
          class="animate-pulse min-h-3 max-h-8 rounded-sm bg-white/10 min-w-50"
        ></span>
        <span v-else class="text-white/80 font-mono text-md">{{ fileName }}</span>
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
import { Upload, Trash2, LoaderCircle } from 'lucide-vue-next'

const { isPending: isGettingPresignedUrl, mutateAsync: mutateGetPresignedImageUrl } =
  useGetPresignedImageUrl()

const { isPending: isPosttingIntoPresignedUrl, mutateAsync: mutatePostIntoPresignedUrl } =
  usePostIntoPresignedUrl()

const fileInput = ref<HTMLInputElement | null>(null)
const fileName = ref<string>('example-cover-thumbnail.jpg')
const gameImage = ref<HTMLInputElement | null>(null)
const unShowImageUploaded = ref(false)
const thumbnailUrl = defineModel<string>('thumbnailUrl', {
  default: '',
})

const isDragging = ref(false)
const handleDrop = (e: DragEvent) => {
  isDragging.value = false
  const files = e.dataTransfer?.files
  if (files && files.length) {
    unShowImageUploaded.value = false
    gameImage.value?.setAttribute('src', URL.createObjectURL(files[0]))
    fileName.value = files[0].name
  }
}

const localPreviewUrl = ref<string>('')

const handleFileChange = async (e: Event) => {
  const files = (e.target as HTMLInputElement).files
  if (files && files.length) {
    unShowImageUploaded.value = false
    fileName.value = files[0].name
    gameImage.value?.setAttribute('src', URL.createObjectURL(files[0]))

    const response = await mutateGetPresignedImageUrl({
      fileName: files[0].name,
      fileSize: files[0].size,
    })

    if (response) {
      thumbnailUrl.value = response.cdnFileName
    }

    await mutatePostIntoPresignedUrl({
      url: response.signedUrl,
      file: files[0],
    })
  }
}
</script>
