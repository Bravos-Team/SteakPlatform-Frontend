<template>
  <form @submit.prevent class="text-md flex flex-col gap-y-4 flex-wrap w-full">
    <!-- START SELECTED TOP BAR ${data} -->
    <selected-top-bar
      v-model:get-internet-connected-required-data="gamePreviewDetails.internetConnection"
      v-model:get-version-selected="gamePreviewDetails.buildInfo.versionName"
    />
    <!-- END SELECTED TOP BAR ${data}-->

    <!-- CONSIDER TERMS OF SERVICE -->
    <consider-terms-of-service />
    <!-- END CONSIDER TERMS OF SERVICE -->

    <!-- COVER IMAGE ${data}-->
    <cover-image-update />
    <!-- END COVER IAMGE ${data}-->

    <!-- START MEDIAS & IMAGES BAR ${data} -->
    <media-bar />
    <!-- END MEDIAS & IMAGES BAR -->

    <!-- START DEVELOPER TEAM INPUTS ${data} -->
    <your-developer-teams v-model:develop-teams="gamePreviewDetails.developerTeams" />
    <!-- END DEVELOPER TEAM INPUTS -->

    <!-- RELEASE DATE & ESTIMATED MONTH ${data}-->
    <release-estimated-date
      v-model:estimated-release-date="gamePreviewDetails.estimatedReleaseDate"
    />
    <!-- END RELEASE DATE & ESTIMATED MONTH ${data}-->

    <!-- START DESCRIPTIONS BAR ${data} -->
    <descriptions-bar
      v-model:get-short-descriptions="gamePreviewDetails.shortDescription"
      v-model:get-subtitles="gamePreviewDetails.subtitles"
      v-model:get-preview-long-descriptions-data="getDataFromDescriptionsBar"
    />

    <!-- END DESCRIPTIONS BAR ${data} -->

    <!-- START TAGS SELECTED BAR ${data} -->
    <div class="grid tablet:grid-cols-2 laptop:grid-cols-3 gap-x-3 w-full flex-wrap gap-y-3">
      <!-- START AVAILABLE COUNTRIES PICKER -->
      <div class="flex flex-col justify-center w-full">
        <span class="flex items-center text-sm">Available Countries</span>
        <region-tags-picker v-model:get-regions-data="gamePreviewDetails.regions" />
      </div>
      <!-- END AVAILABLE COUNTRIES PICKER -->

      <!-- START LANGUAGES SUPPORTED PICKER -->
      <div class="flex flex-col justify-center w-full">
        <span class="flex items-center text-sm">Langagues Supported</span>
        <languages-supported-picker
          v-model:get-languages-supported-data="gamePreviewDetails.languageSupported"
        />
      </div>
      <!-- END LANGUAGES SUPPORTED PICKER -->

      <!-- START PLATFORMS SUPPORTED PICKER -->

      <div class="flex flex-col justify-center w-full">
        <span class="flex items-center text-sm">Platforms</span>
        <platforms-supported-tags
          v-model:get-platforms-supported-data="gamePreviewDetails.platforms"
        />
      </div>
      <!-- END PLATFORMS SUPPORTED PICKER -->
    </div>
    <!-- END TAGS SELECTED BAR ${data} -->

    <!-- START SYSTEM REQUIREMENTS BAR -->
    <system-requirements
      v-model:emit-recommended-data="gamePreviewDetails.systemRequirements.recommend"
      v-model:emit-minimum-data="gamePreviewDetails.systemRequirements.minimum"
      v-model:is-init-system-requirements="isInitSystemRequirements"
    />
    <!-- END SYSTEM REQUIREMENTS BAR-->

    <!-- START FOOTER FORM -->
    <div class="flex gap-x-2 flex-wrap gap-y-2 justify-between">
      <!-- START PRICE -->
      <div class="flex gap-x-2">
        <div class="flex gap-y-2 flex-col">
          <span class="text-white/80 font-black">Price:</span>
          <input
            type="text"
            v-model.lazy="gamePreviewDetails.price"
            placeholder="0"
            class="w-full outline-1 outline-white/30 bg-white/10 rounded-sm px-2 py-1 focus:outline-gray-400 focus:outline-2"
          />
        </div>

        <div class="flex gap-y-2 gap-x-2 items-end">
          <span class="text-white/80 font-black">Price Preview:</span>
          <span class="text-white/80 font-medium">{{ pricePreview }}</span>
        </div>
      </div>
      <!-- END PRICE -->

      <!-- START ACTIONS -->
      <div class="flex items-center">
        <div class="flex gap-x-2 flex-wrap gap-y-2 justify-end items-center">
          <button
            class="px-3 font-black cursor-pointer hover:bg-green-400/70 duration-300 transition-colors py-2 border bg-green-500/50 rounded-sm"
          >
            Verify Request
          </button>
          <button
            class="px-3 font-black cursor-pointer hover:bg-white/30 duration-300 transition-colors py-2 border bg-white/10 rounded-sm"
          >
            Save as Draft
          </button>

          <button
            class="px-2 font-black cursor-pointer hover:bg-sky-400/80 duration-300 transition-colors py-2 border bg-sky-400/60 rounded-sm"
            @click="handleResetForm"
          >
            Reset Form
          </button>
          <button
            @click="handleCancelForm"
            class="px-3 font-black cursor-pointer hover:bg-red-400/80 duration-300 transition-colors py-2 border bg-red-400/50 rounded-sm"
          >
            Cancel
          </button>
        </div>
      </div>
      <!-- END ACTIONS -->
    </div>
    <!-- END FOOTER FORM -->
  </form>
</template>

<script setup lang="ts">
import YourDeveloperTeams from '@/components/publisher/gameDetails/formComponents/developerTeam/YourDeveloperTeams.vue'
import RegionTagsPicker from '@/components/publisher/gameDetails/formComponents/region/RegionTagsPicker.vue'
import ReleaseEstimatedDate from '@/components/publisher/gameDetails/formComponents/ReleaseEstimatedDate.vue'
import ConsiderTermsOfService from '@/components/publisher/gameDetails/formComponents/ConsiderTermsOfService.vue'
import CoverImageUpdate from '@/components/publisher/gameDetails/formComponents/CoverImageUpdate.vue'
import LanguagesSupportedPicker from '@/components/publisher/gameDetails/formComponents/region/LanguagesSupportedPicker.vue'
import SelectedTopBar from '@/components/publisher/gameDetails/formComponents/SelectedTopBar.vue'
import SystemRequirements from '@/components/publisher/gameDetails/formComponents/systemRequirements/SystemRequirementsBar.vue'
import PlatformsSupportedTags from '@/components/publisher/gameDetails/formComponents/platform/PlatformsSupportedTags.vue'
import DescriptionsBar from '@/components/publisher/gameDetails/formComponents/descriptions/DescriptionsBar.vue'
import MediaBar from '@/components/publisher/gameDetails/formComponents/MediaBar.vue'
import { type GameType, getDefaultGameValue } from '@/types/game/gameDetails/GameDetailsType'
import { computed, ref } from 'vue'

const isInitSystemRequirements = ref<boolean>(false)
const getDataFromDescriptionsBar = computed({
  get: () => props.gamePreviewDetails.longDescription,
  set: (val: string) => (props.gamePreviewDetails.longDescription = val),
})

const props = defineProps<{
  gamePreviewDetails: GameType
}>()

const emit = defineEmits(['update:openDialogForm', 'update:gamePreviewDetailsData'])

const handleResetForm = () => {
  emit('update:gamePreviewDetailsData', getDefaultGameValue())
}
const handleCancelForm = () => {
  emit('update:openDialogForm', false)
}

const pricePreview = computed(() => {
  return Number(props.gamePreviewDetails.price).toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'VND',
  })
})
</script>
