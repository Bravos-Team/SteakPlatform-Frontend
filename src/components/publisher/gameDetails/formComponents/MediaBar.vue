<template>
  <div class="flex flex-col gap-y-1">
    <div class="font-bold text-lg text-gray-200/80">
      {{ $t('title.pages.game_details.form.media_and_images.title') }}
    </div>
    <div class="border-1 p-3 rounded-sm bg-linear-120 from-blue-200/5 to-emerald-200/5 flex flex-col gap-y-3">
      <div v-if="!media_files.length && !mediaData">
        {{ $t('title.pages.game_details.form.media_and_images.non_file_created') }}
      </div>
      <div v-else class="grid grid-cols-1 gap-y-2">
        <!-- MEDIA DATA DRAFT -->
        <div v-if="mediaData" class="flex flex-col gap-y-1 relative" v-for="(media, index) in mediaData" :key="index">
          <Tooltip>
            <tooltip-trigger>
              <span class="flex gap-x-1 items-center">
                <span>
                  {{ $t('title.pages.game_details.form.media_and_images.media_uploaded') }}</span>
                <cloud-upload :size="20" class="text-green-400" />
              </span>
              <div
                class="w-full relative flex rounded-md overflow-hidden desktop:flex-row flex-col focus:border-white/50 focus:outline-none">
                <div
                  class="h-full items-center relative border-4 border-double rounded-xs overflow-hidden flex desktop:flex-row justify-center bg-white/10">
                  <!-- VIDEO AND IMAGE -->
                  <img v-if="media.url && media.type === 'image'" :src="media.url"
                    class="object-cover w-full h-20 tablet:h-40" alt="" />
                  <video muted v-if="media.url && media.type === 'video'" :src="media.url"
                    class="object-contain w-full h-full tablet:h-40"></video>
                  <!-- END VIDEO AND IMAGES -->
                </div>
                <!-- <VideoCompressor /> -->
                <div class="w-full h-100%">
                  <div class="w-full min-h-full rounded-none bg-white/5 px-2 py-1 font-medium relative">
                    <div class="h-full flex items-center w-full">
                      {{ media.url.split('images/')[1] }}
                    </div>
                  </div>

                  <button @click="handleDeleteMediaUploaded(index, media.url)"
                    class="absolute top-1 right-1 z-10 bg-gray-700 border-1 border-white/20 cursor-pointer p-1 rounded-full">
                    <X class="size-3" />
                  </button>
                  <!-- <div
                    class="absolute top-1 right-1 z-10 bg-gray-700 border-1 border-white/20 cursor-pointer p-1 rounded-full"
                    @click="handleDeleteMediaUploaded(index)"
                  >
                    <X class="size-3" />
                  </div> -->
                </div>
              </div>
            </tooltip-trigger>
            <tooltip-content :color="1">
              {{ $t('title.pages.game_details.form.media_and_images.tooltip.title') }}
            </tooltip-content>
          </Tooltip>
        </div>
        <!-- END MEDIA DATA DRAFT -->

        <!-- MEDIA INPUTS -->
        <div class="flex flex-col gap-y-1" v-for="(media, index) in media_files" :key="index">
          <span class="flex gap-x-1 items-center">
            <span>
              {{ $t('title.pages.game_details.form.media_and_images.title_input') }}
              {{ index + 1 }}</span>
            <cloud-upload :size="20" />
          </span>
          <div class="w-full relative flex desktop:flex-row flex-col focus:border-white/50 focus:outline-none">
            <div class="h-full flex desktop:flex-row justify-center bg-white/10 border-2">
              <!-- VIDEO AND IMAGE -->
              <img v-if="media.imagePreview && media.type === 'image'" :src="media.imagePreview"
                class="object-contain w-full h-20 tablet:h-40" alt="" />
              <video v-if="media.imagePreview && media.type === 'video'" :src="media.imagePreview"
                class="object-contain w-full h-full tablet:h-40"></video>
              <!-- END VIDEO AND IMAGES -->
            </div>
            <div class="w-full h-full">
              <input type="file" class="w-full h-full rounded-none bg-white/5 px-2 py-1 font-medium relative"
                placeholder="image url..." accept="image/*,video/*" @change="handleSelectFile(index, $event)" />
              <div class="absolute -top-2 -right-2 bg-gray-700 border-1 border-white/20 cursor-pointer p-1 rounded-full"
                @click="handleDeleteMediaInput(index)">
                <X class="size-3" />
              </div>
            </div>
          </div>
        </div>
        <!-- END MEDIA INPUTS -->
      </div>

      <div class="flex flex-wrap gap-y-3 justify-end gap-x-2">
        <button
          class="border-2 border-gray-300/20 px-2 rounded-sm py-1 bg-white/10 flex gap-x-1 cursor-pointer hover:bg-white/20 transition-colors duration-300"
          @click="handleClearAll">
          {{ $t('title.pages.game_details.form.media_and_images.clear_all') }}
          <shredder :size="20" />
        </button>
        <button
          class="border-2 border-gray-300/20 px-2 rounded-sm py-1 bg-white/10 flex gap-x-1 cursor-pointer hover:bg-white/20 transition-colors duration-300"
          @click="handleCreateMediaInput">
          {{ $t('title.pages.game_details.form.media_and_images.add_media') }}
          <DiamondPlus :size="20" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { X, Shredder, CloudUpload, DiamondPlus, LoaderCircle } from 'lucide-vue-next'
import { onMounted, ref, watch } from 'vue'
import { useImageStored } from '@/stores/image/useImageStored'
import { type MediaType } from '@/types/image/MediaAndImage'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { toastErrorNotificationPopup } from '@/composables/toast/toastNotificationPopup'
import VideoCompressor from '@/components/common/video/VideoCompressor.vue'
const useImageStore = useImageStored()

const props = defineProps<{
  mediaData:
  | {
    type: 'image' | 'video'
    url: string
  }[]
  | null
  isAssignedMediaFiles: boolean
}>()

const emit = defineEmits<{
  (e: 'media-deleted-update', index: number): void
}>()

const media_files = ref<MediaType[]>([
  {
    type: '',
    imagePreview: null,
    url: '',
    file_instance: new File(['content'], 'example-thumbnail.webp', { type: 'image/webp' }),
  },
])

const handleCreateMediaInput = () => {
  media_files.value.push({
    type: '',
    imagePreview: null,
    url: '',
  })
}

const handleDeleteMediaInput = (index: number) => {
  media_files.value.splice(index, 1)
  useImageStore.media_files_stored.splice(index, 1)
}
const handleDeleteMediaUploaded = async (index: number, url: string) => {
  emit('media-deleted-update', index)
}

const handleSelectFile = (index: number, event: Event) => {
  const files = (event.target as HTMLInputElement).files
  if (files && files.length > 0) {
    if (files[0].type.startsWith('image/') || files[0].type.startsWith('video/')) {
      if (files[0].type.startsWith('image')) {
        media_files.value[index].type = 'image'
      } else if (files[0].type.startsWith('video')) {
        media_files.value[index].type = 'video'
      }
      const previewUrl = URL.createObjectURL(files[0])
      media_files.value[index].imagePreview = previewUrl
      media_files.value[index].file_instance = files[0]
      useImageStore.media_files_stored.push({ ...media_files.value[index] })
    } else {
      toastErrorNotificationPopup('Invalid file type', 'Only image and video files are allowed.')
    }
  }
}
const handleClearAll = () => {
  media_files.value = []
  useImageStore.media_files_stored = []
}

onMounted(() => {
  if (useImageStore.media_files_stored.length > 0) {
    media_files.value = useImageStore.media_files_stored
  }
})

watch(
  () => props.isAssignedMediaFiles,
  (val) => {
    if (val) {
      media_files.value = []
    }
  },
  { immediate: true },
)
</script>
