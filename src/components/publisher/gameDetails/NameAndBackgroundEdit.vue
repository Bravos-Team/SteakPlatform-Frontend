<template>
  <card
    class="max-h-[20rem] relative overflow-hidden flex flex-col-reverse justify-between basis-7/12 py-1"
  >
    <img
      :class="{
        'blur-sm':
          isUpdateDraftProjectInformations ||
          isGetPresignedImageURLPending ||
          isPostIntoPresignedURLPending,
        'blur-[3px]': !gameDetails.thumbnail,
      }"
      :src="
        gameDetails.thumbnail ? gameDetails.thumbnail : 'https://ccdn.steak.io.vn/assets-desert.png'
      "
      class="w-full h-full object-cover absolute inset-0"
      alt=""
    />
    <LoaderCircle
      v-if="
        isGetPresignedImageURLPending ||
        isPostIntoPresignedURLPending ||
        isUpdateDraftProjectInformations
      "
      class="absolute top-1/2 scale-120 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white animate-spin"
    />

    <div class="w-full bg-white-50 z-10 px-3 justify-end flex backdrop:blur-[8px]">
      <div class="flex gap-x-2 justify-center items-center flex-wrap">
        <span
          class="gap-y-10 h-full xl:text-2xl backdrop-blur-sm gap-x-3 font-bold px-3 py-2 bg-gray-600/10 rounded-sm text-wrap flex items-center"
        >
          <span> {{ gameDetails.name }}</span>
          <name-edited-button :game-name="gameDetails.name" :game-id="gameDetails.id" />
        </span>
      </div>
    </div>

    <!-- Upload Button -->
    <div class="w-full z-50 flex justify-end px-3">
      <label
        v-if="
          isUpdateDraftProjectInformations ||
          isGetPresignedImageURLPending ||
          isPostIntoPresignedURLPending
        "
        class="cursor-not-allowed flex gap-x-2 items-center rounded-sm bg-black/10 backdrop-blur-[8px] hover:bg-black/30 transition-colors duration-300 px-5 py-2"
      >
        <Download class="w-5 h-5" />
        <span class="font-medium text-md">
          {{
            gameDetails.thumbnail
              ? $t('title.pages.game_details.uploading')
              : $t('title.pages.game_details.uploading')
          }}
        </span>

        <input class="hidden" />
      </label>
      <label
        v-else
        for="file-upload"
        class="flex gap-x-2 items-center cursor-pointer rounded-sm bg-black/10 backdrop-blur-[8px] hover:bg-black/30 transition-colors duration-300 px-5 py-2"
      >
        <Download class="w-5 h-5" />
        <span class="font-medium text-md">
          {{
            gameDetails.thumbnail
              ? $t('title.pages.game_details.update_image')
              : $t('title.pages.game_details.upload_image')
          }}
        </span>

        <input
          id="file-upload"
          type="file"
          class="hidden"
          @change="handleFileUpload"
          accept="image/*"
        />
      </label>
    </div>
  </card>
</template>

<script setup lang="ts">
import { Card } from '@/components/ui/card'
import { Download, LoaderCircle } from 'lucide-vue-next'

import NameEditedButton from '@/components/publisher/gameDetails/NameEditedButton.vue'
import { GameType } from '@/types/game/gameDetails/GameDetailsType'
import {
  useGetPresignedImageUrl,
  usePostIntoPresignedUrl,
} from '@/hooks/common/cdn/useCDNAssetsManager'
import { usePublisherCreateDraftProjectInformations } from '@/hooks/publisher/project/usePublisherPersonalProjects'
import { useImageCompressor } from '@/composables/image/useImageCompression'
import { toastErrorNotificationPopup } from '@/composables/toast/toastNotificationPopup'

const imageComporessorHandler = useImageCompressor()
const { isPending: isGetPresignedImageURLPending, mutateAsync: mutateAsyncGetPresignedURL } =
  useGetPresignedImageUrl()
const { isPending: isPostIntoPresignedURLPending, mutateAsync: mutateAsyncIntoPresignedURL } =
  usePostIntoPresignedUrl()
const {
  isPending: isUpdateDraftProjectInformations,
  mutateAsync: mutateUpdateDraftProjectInformations,
} = usePublisherCreateDraftProjectInformations()

const props = defineProps<{
  gameDetails: GameType
}>()

const handleFileUpload = async (event: Event) => {
  const files = (event.target as HTMLInputElement).files
  if (files && files.length) {
    if (files[0].type.startsWith('video/') || !files[0].type.startsWith('image/')) {
      toastErrorNotificationPopup(
        'Cannot upload this file as cover image',
        'Try again with an image file.',
      )
    } else {
      try {
        const image_compressed = await imageComporessorHandler.compressImage(files[0])
        if (image_compressed) {
          const response = await mutateAsyncGetPresignedURL({
            fileName: image_compressed.name,
            fileSize: image_compressed.size,
          })
          await mutateAsyncIntoPresignedURL({
            url: response.signedUrl,
            file: image_compressed,
          })

          const dataUpdated = {
            id: props.gameDetails.id,
            thumbnail: 'https://ccdn.steak.io.vn/' + response.cdnFileName,
          }

          await mutateUpdateDraftProjectInformations(dataUpdated)
        }
      } catch (error: any) {
        toastErrorNotificationPopup(
          'Error uploading image',
          error.message || 'An unexpected error occurred.',
        )
      }
    }
  }
}
</script>
