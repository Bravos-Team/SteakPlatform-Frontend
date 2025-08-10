<template>
  <TooltipProvider>
    <form @submit.prevent class="text-md flex flex-col gap-y-4 flex-wrap w-full">
      <!-- START SELECTED TOP BAR ${data} -->
      <selected-top-bar :is-hide-internet-switching="true" v-model:update-at="updateAtStatus"
        v-model:get-internet-connected-required-data="internetRequiredData" />
      <!-- END SELECTED TOP BAR ${data}-->

      <!-- CONSIDER TERMS OF SERVICE -->
      <consider-terms-of-service />
      <!-- END CONSIDER TERMS OF SERVICE -->

      <!-- COVER IMAGE ${data}-->
      <cover-image-update v-model:thumbnail-url="thumbnailUrlData" />
      <!-- END COVER IAMGE ${data}-->

      <!-- START MEDIAS & IMAGES BAR ${data} -->
      <media-bar :is-assigned-media-files="isAssignedMediaFiles" @media-deleted-update="handleDeleteMedia"
        :media-data="gameToMutate.media" />
      <!-- END MEDIAS & IMAGES BAR -->

      <!-- START DEVELOPER TEAM INPUTS ${data} -->
      <your-developer-teams v-model:develop-teams="developTeamsData" />
      <!-- END DEVELOPER TEAM INPUTS -->

      <!-- START DESCRIPTIONS BAR ${data} -->
      <descriptions-bar v-model:get-short-descriptions="shortDescriptionsData"
        v-model:get-preview-long-descriptions-data="longDescriptionsData" />

      <!-- END DESCRIPTIONS BAR ${data} -->

      <!-- START TAGS SELECTED BAR ${data} -->
      <div class="grid tablet:grid-cols-2 laptop:grid-cols-2 desktop:grid-cols-3 gap-x-3 w-full flex-wrap gap-y-3">
        <!-- START AVAILABLE COUNTRIES PICKER -->
        <div class="flex flex-col desktop:col-span-1 justify-center w-full">
          <span class="flex items-center text-sm">
            {{ $t('title.pages.game_details.form.available_countries.title') }}
          </span>
          <region-tags-picker v-model:get-regions-data="regionsData" />
        </div>
        <!-- END AVAILABLE COUNTRIES PICKER -->

        <!-- START LANGUAGES SUPPORTED PICKER -->
        <div class="flex flex-col justify-center w-full">
          <span class="flex items-center text-sm">
            {{ $t('title.pages.game_details.form.languages_supported.title') }}
          </span>
          <languages-supported-picker v-model:get-languages-supported-data="gameToMutate.languageSupported" />
        </div>
        <!-- END LANGUAGES SUPPORTED PICKER -->

        <!-- START PLATFORMS SUPPORTED PICKER -->

        <div class="flex flex-col tablet:col-span-2 desktop:col-span-1 justify-center w-full">
          <span class="flex items-center text-sm">
            {{ $t('title.pages.game_details.form.platforms.title') }}
          </span>
          <platforms-supported-tags v-model:get-platforms-supported-data="gameToMutate.platforms" />
        </div>
        <!-- END PLATFORMS SUPPORTED PICKER -->
      </div>
      <!-- END TAGS SELECTED BAR ${data} -->

      <!-- START SYSTEM REQUIREMENTS BAR -->
      <system-requirements v-model:is-init-system-requirements="isAddSystemRequirements"
        :minimum-data="gameToMutate.systemRequirements?.minimum"
        :recommend-data="gameToMutate.systemRequirements?.recommend" />
      <!-- END SYSTEM REQUIREMENTS BAR-->

      <!-- START FOOTER FORM -->
      <div class="flex gap-x-2 flex-wrap gap-y-2 justify-between">
        <!-- START PRICE -->
        <div class="flex flex-col tablet:flex-row gap-x-2">
          <div class="flex gap-y-2 flex-col">
            <span class="text-white/80 font-black">
              {{ $t('features.filters.types.price') }}:
            </span>
            <input type="text" v-model.lazy="gameToMutate.price" @blur="
              () => {
                gameToMutate.price = isNaN(Number(gameToMutate.price))
                  ? 0
                  : Number(gameToMutate.price)
              }
            " placeholder="0"
              class="w-full outline-1 outline-white/30 bg-white/10 rounded-sm px-2 py-1 focus:outline-gray-400 focus:outline-2" />
          </div>

          <div class="flex gap-y-2 gap-x-2 items-end">
            <span class="text-white/80 font-black">
              {{ $t('title.pages.game_details.form.price_preview') }}:</span>
            <span class="text-white/80 font-medium">{{ pricePreview }}</span>
          </div>
        </div>
        <!-- END PRICE -->

        <!-- START ACTIONS -->
        <div class="flex flex-row-reverse items-center">
          <div class="flex flex-row-reverse gap-x-2 flex-wrap gap-y-2 justify-end items-center">
            <!-- SAVE UPDATE -->
            <button v-if="
              isUpdating
            " :disabled="isUpdating"
              class="px-3 flex items-center gap-x-2 font-black cursor-not-allowed duration-300 transition-colors py-2 border bg-yellow-400/30 rounded-sm">
              {{ $t('title.pages.game_details.form.update_game_opening') }}
              <LoaderCircle class="animate-spin size-6" />
            </button>
            <button :disabled="isUpdating" v-else @click="handleUpdateGameDetails"
              class="px-3 font-black cursor-pointer hover:bg-yellow-400/90 duration-300 transition-colors py-2 border bg-yellow-400/70 rounded-sm">
              {{ $t('title.pages.game_details.form.update_game_opening') }}
            </button>
            <!-- END UPDATE -->

            <!-- CANCEL -->
            <button @click="handleCancelForm"
              class="px-3 cursor-pointer duration-300 transition-all py-2 underline text-red-500">
              {{ $t('title.pages.game_details.form.cancel') }}
            </button>
            <!-- END CANCEL -->
          </div>
        </div>
        <Progress v-if="
          isUpdating
        " :model-value="progressDisplay" class="transition-all duration-500 w-full" />
        <!-- END ACTIONS -->
      </div>
      <!-- END FOOTER FORM -->
    </form>
  </TooltipProvider>
</template>

<script setup lang="ts">
import YourDeveloperTeams from '@/components/publisher/gameDetails/formComponents/developerTeam/YourDeveloperTeams.vue'
import RegionTagsPicker from '@/components/publisher/gameDetails/formComponents/region/RegionTagsPicker.vue'
import ConsiderTermsOfService from '@/components/publisher/gameDetails/formComponents/ConsiderTermsOfService.vue'
import CoverImageUpdate from '@/components/publisher/gameDetails/formComponents/CoverImageUpdate.vue'
import LanguagesSupportedPicker from '@/components/publisher/gameDetails/formComponents/region/LanguagesSupportedPicker.vue'
import SelectedTopBar from '@/components/publisher/gameDetails/formComponents/SelectedTopBar.vue'
import SystemRequirements from '@/components/publisher/gameDetails/formComponents/systemRequirements/SystemRequirementsBar.vue'
import PlatformsSupportedTags from '@/components/publisher/gameDetails/formComponents/platform/PlatformsSupportedTags.vue'
import DescriptionsBar from '@/components/publisher/gameDetails/formComponents/descriptions/DescriptionsBar.vue'
import MediaBar from '@/components/publisher/gameDetails/formComponents/MediaBar.vue'
import { getObjectDiff } from '@/utils/compare/comparationObject'
import {
  getDefaultValueRequirements,
  type GameType,
} from '@/types/game/gameDetails/GameDetailsType'
import { computed, ref, watch } from 'vue'
import { useSystemRequirementsStore } from '@/stores/SystemRequirements/useSystemRequirements'
import {
  toastErrorNotificationPopup,
  toastSuccessNotificationPopup,
  toastNotificationPopup,
} from '@/composables/toast/toastNotificationPopup'
import { useImageCompressor } from '@/composables/image/useImageCompression'
import { useImageStored } from '@/stores/image/useImageStored'
import {
  useGetPresignedImageUrl,
  usePostIntoPresignedUrl,
  useGetPresignedImageUrls,
  usePostIntoPresignedUrls,
  useDeleteImages,
} from '@/hooks/common/cdn/useCDNAssetsManager'
import { MediaType } from '@/types/image/MediaAndImage'
import { PostIntoPresignedURLsType, PresignedUrlResponse } from '@/types/cdn/CdnTypes'
import TooltipProvider from '@/components/ui/tooltip/TooltipProvider.vue'
import { Progress } from '@/components/ui/progress'
import { LoaderCircle } from 'lucide-vue-next'
import { useDebounceFn } from '@vueuse/core'
import {
  mutatePublisherUpdateGameDetails,
  mutatePublisherUpdateGamePrice,
} from '@/hooks/publisher/game/usePublisherGameManage'

const useSystem = useSystemRequirementsStore()
const useComporessionImage = useImageCompressor()
const useImageStore = useImageStored()

const { mutateAsync: mutateGetPresignedImageUrl } =
  useGetPresignedImageUrl()
const { mutateAsync: mutateGetPresignedImageUrls } =
  useGetPresignedImageUrls()
const { mutateAsync: mutatePostIntoPresignedUrl } =
  usePostIntoPresignedUrl()
const { mutateAsync: mutatePostIntoPresignedUrls } =
  usePostIntoPresignedUrls()

const { isPending: isDeleteImagesPending, mutateAsync: mutateDeleteImages } = useDeleteImages()
const { mutateAsync: mutateUpdateGameOpeningDetails } =
  mutatePublisherUpdateGameDetails()
const { mutateAsync: mutateUpdateGamePrice } =
  mutatePublisherUpdateGamePrice()

const props = defineProps<{
  gamePreviewDetails: GameType
}>()

const gameToMutate = ref<GameType>(JSON.parse(JSON.stringify(props.gamePreviewDetails)))
const isAssignedMediaFiles = ref<boolean>(false)
const isAddSystemRequirements = ref<boolean>(false)

const emit = defineEmits(['update:openDialogForm'])

const media_deleted_tracking = ref<{ url: string; type: string }[] | undefined>([])

const handleDeleteMedia = (index: number) => {
  if (!media_deleted_tracking.value) {
    media_deleted_tracking.value = []
  } else {
    if (gameToMutate.value?.media?.[index]) {
      media_deleted_tracking.value?.push(gameToMutate.value?.media?.[index])
    }
  }
  gameToMutate.value.media?.splice(index, 1)
}

const handleCancelForm = () => {
  emit('update:openDialogForm', false)
}

const pricePreview = computed(() => {
  return Number(gameToMutate.value.price).toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'VND',
  })
})

const internetRequiredData = computed({
  get: () => gameToMutate.value?.internetConnection ?? false,
  set: (val) => {
    if (gameToMutate.value) {
      gameToMutate.value.internetConnection = val
    }
  },
})

const updateAtStatus = computed({
  get: () => gameToMutate.value?.updatedAt ?? '',
  set: (val) => {
    if (gameToMutate.value.updatedAt) {
      gameToMutate.value.updatedAt = val
    }
  },
})

const developTeamsData = computed({
  get: () => gameToMutate.value?.developerTeams ?? [],
  set: (val) => {
    if (gameToMutate.value) {
      gameToMutate.value.developerTeams = val
    }
  },
})

const shortDescriptionsData = computed({
  get: () => gameToMutate.value?.shortDescription ?? '',
  set: (val) => {
    if (gameToMutate.value) {
      gameToMutate.value.shortDescription = val
    }
  },
})

const longDescriptionsData = computed({
  get: () => gameToMutate.value?.longDescription ?? '',
  set: (val) => {
    if (gameToMutate.value) {
      gameToMutate.value.longDescription = val
    }
  },
})

const regionsData = computed({
  get: () => gameToMutate.value?.regions ?? [],
  set: (val) => {
    if (gameToMutate.value.regions) {
      gameToMutate.value.regions = val
    }
    gameToMutate.value.regions = val || []
  },
})

const thumbnailUrlData = ref<string>(
  gameToMutate.value.thumbnail
    ? gameToMutate.value.thumbnail
    : 'https://ccdn.steak.io.vn/assets-desert.png',
)

const data_to_assigned = ref<
  {
    url: string
    type: 'video' | 'image'
  }[]
>([])
const completedApis = ref(0)
const totalApis = 6
const progressValue = computed(() => Math.floor((completedApis.value / totalApis) * 100))
const progressDisplay = ref(0)
let animationInterval: any = null

const handleResolveThumbnailImages = async () => {
  if (useImageStore.coverImage_stored) {
    const files: any = useImageStore.coverImage_stored

    const fileComporessed = await useComporessionImage.compressImage(files)

    const response = await mutateGetPresignedImageUrl({
      fileName: fileComporessed.name,
      fileSize: fileComporessed.size,
    })

    await mutatePostIntoPresignedUrl({
      url: response.signedUrl,
      file: fileComporessed,
    })
    completedApis.value += 1

    if (response) {
      gameToMutate.value.thumbnail = 'https://ccdn.steak.io.vn/' + response.cdnFileName
    }
  } else {
    completedApis.value += 1
  }
}

const handleResolveMediaFiles = async () => {
  if (useImageStore.media_files_stored.length > 0) {
    const media_files: any = useImageStore.media_files_stored
    const media_files_compressed = await Promise.all(
      media_files.map((file: MediaType) => {
        if (file.type === 'image') {
          return useComporessionImage.compressImage(file.file_instance)
        } else {
          return file.file_instance
        }
      }),
    )
    completedApis.value += 1

    const request_datas = media_files_compressed.map((file) => ({
      fileName: file.name,
      fileSize: file.size,
    }))

    const response: PresignedUrlResponse[] = await mutateGetPresignedImageUrls(request_datas)
    completedApis.value += 1

    const dataPostIntoPresignedUrls: PostIntoPresignedURLsType[] = media_files.map(
      (file: any, index: number) => {
        const { signedUrl } = response[index]
        return {
          signedUrl,
          file_instance: file.file_instance,
        }
      },
    )
    await mutatePostIntoPresignedUrls(dataPostIntoPresignedUrls)
    if (response) {
      data_to_assigned.value = response.map((file: PresignedUrlResponse, index: number) => {
        const { cdnFileName } = file
        return {
          url: `https://ccdn.steak.io.vn/${cdnFileName}`,
          type: media_files[index].type,
        }
      })
      await new Promise((resolve) => {
        setTimeout(() => {
          data_to_assigned.value.forEach((media) => {
            if (!gameToMutate.value.media) {
              gameToMutate.value.media = []
            }
            gameToMutate.value.media?.push(media)
          }),
            resolve(true)
        }, 2000)
      })
      isAssignedMediaFiles.value = true
    }
  } else {
    completedApis.value += 1
  }
}

const isUpdating = ref(false)
const handleUpdateGameDetails = useDebounceFn(async () => {
  // <-- handle upload cover image
  isUpdating.value = true
  completedApis.value = 0
  progressDisplay.value = 0

  // hanlde thumbnail
  await handleResolveThumbnailImages()

  // handle media files
  await handleResolveMediaFiles()

  const diff = getObjectDiff(gameToMutate.value, props.gamePreviewDetails)
  if (!diff) {
    isUpdating.value = false
    toastNotificationPopup(
      'No changes detected',
      'Please make some changes before saving as draft.',
    )
    return
  } else {
    isUpdating.value = true
    Object.assign(diff, { ...diff, id: props.gamePreviewDetails.id })
    try {
      delete diff.id
      const response = await mutateUpdateGameOpeningDetails({
        ...diff,
        gameId: props.gamePreviewDetails.id,
      })
      if (diff.price != null && diff.price !== undefined) {
        const priceResponse = await mutateUpdateGamePrice({
          gameId: props.gamePreviewDetails.id,
          price: diff.price,
        })
        if (priceResponse.status !== 200) {
          throw new Error('Failed to update game price')
        }
      }
      completedApis.value += 1
      if (response.status === 200) {
        useImageStore.media_files_stored = []
        useSystem.resetSystemRequirements()
        toastSuccessNotificationPopup(
          'Updated Game successfully',
          'Your game details have been updated successfully.',
        )
        isUpdating.value = false
      } else {
        if (media_deleted_tracking.value && media_deleted_tracking.value.length > 0)
          await mutateDeleteImages(
            media_deleted_tracking.value
              .map((media) => media.url)
              .filter((url) => url !== undefined),
          )
        toastErrorNotificationPopup('Failed to update game', 'Please try again later.')
      }
    } catch (error: any) {
      useImageStore.media_files_stored = []
      useSystem.resetSystemRequirements()
      if (data_to_assigned.value && data_to_assigned.value.length > 0)
        await mutateDeleteImages(
          data_to_assigned.value?.map((media) => media.url).filter((url) => url !== undefined),
        )

      toastErrorNotificationPopup(
        'Failed to update game. Please try again later.',
        `Error: ${error}`,
      )
    } finally {
      isUpdating.value = false
      completedApis.value = 0
      progressDisplay.value = 0
    }
  }
}, 200)

watch(progressValue, (newVal) => {
  if (animationInterval) clearInterval(animationInterval)

  animationInterval = setInterval(() => {
    if (progressDisplay.value < newVal) {
      progressDisplay.value += 1
    } else {
      clearInterval(animationInterval)
    }
  }, 10)
})

watch(
  () => isAddSystemRequirements.value,
  (val) => {
    if (val) {
      if (!gameToMutate.value.systemRequirements) {
        gameToMutate.value.systemRequirements = {
          minimum: getDefaultValueRequirements(),
          recommend: getDefaultValueRequirements(),
        }
      } else {
        if (!gameToMutate.value.systemRequirements.minimum)
          gameToMutate.value.systemRequirements.minimum = getDefaultValueRequirements()
        if (!gameToMutate.value.systemRequirements.recommend)
          gameToMutate.value.systemRequirements.recommend = getDefaultValueRequirements()
      }
    } else {
      if (gameToMutate.value.systemRequirements) {
        gameToMutate.value.systemRequirements.minimum = null
        gameToMutate.value.systemRequirements.recommend = null
      }
    }
  },
  { deep: true },
)
</script>
