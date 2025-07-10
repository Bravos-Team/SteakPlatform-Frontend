import { MediaType } from '@/types/image/MediaAndImage'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useImageStored = defineStore('imageStored', () => {
  const coverImage_stored = ref<HTMLInputElement | null | File>(null)
  const media_files_stored = ref<MediaType[]>([])

  return {
    coverImage_stored,
    media_files_stored,
  }
})
