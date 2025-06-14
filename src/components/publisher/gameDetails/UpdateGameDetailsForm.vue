<template>
  <form @submit.prevent class="text-md flex flex-col gap-y-4 flex-wrap w-full">
    <!-- START SELECTED TOP BAR -->
    <selected-top-bar />
    <!-- END SELECTED TOP BAR -->
    <!-- CONSIDER TERMS OF SERVICE -->
    <consider-terms-of-service />
    <!-- END CONSIDER TERMS OF SERVICE -->

    <!-- COVER IMAGE -->
    <cover-image-update />
    <!-- END COVER IAMGE -->

    <!-- START MEDIAS & IMAGES BAR -->
    <media-bar />
    <!-- END MEDIAS & IMAGES BAR -->

    <!-- START DEVELOPER TEAM INPUTS -->
    <your-developer-teams />
    <!-- END DEVELOPER TEAM INPUTS -->

    <!-- RELEASE DATE & ESTIMATED MONTH-->
    <release-estimated-date />
    <!-- END RELEASE DATE & ESTIMATED MONTH-->

    <!-- START DESCRIPTIONS BAR -->
    <descriptions-bar v-model:get-preview-long-descriptions-data="getDataFromDescriptionsBar" />
    <!-- END DESCRIPTIONS BAR -->

    <!-- START TAGS SELECTED BAR -->
    <div class="grid tablet:grid-cols-2 laptop:grid-cols-3 gap-x-3 w-full flex-wrap gap-y-3">
      <!-- START AVAILABLE COUNTRIES PICKER -->
      <div class="flex flex-col justify-center w-full">
        <span class="flex items-center text-sm">Available Countries</span>
        <region-tags-picker />
      </div>
      <!-- END AVAILABLE COUNTRIES PICKER -->

      <!-- START LANGUAGES SUPPORTED PICKER -->
      <div class="flex flex-col justify-center w-full">
        <span class="flex items-center text-sm">Langagues Supported</span>
        <languages-supported-picker />
      </div>
      <!-- END LANGUAGES SUPPORTED PICKER -->

      <!-- START PLATFORMS SUPPORTED PICKER -->

      <div class="flex flex-col justify-center w-full">
        <span class="flex items-center text-sm">Platforms</span>
        <platforms-supported-tags />
      </div>
      <!-- END PLATFORMS SUPPORTED PICKER -->
    </div>
    <!-- END TAGS SELECTED BAR -->

    <!-- START SYSTEM REQUIREMENTS BAR -->
    <system-requirements />
    <!-- END SYSTEM REQUIREMENTS BAR-->
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

const getDataFromDescriptionsBar = defineModel<string>('getDataFromDescriptionsBar')
</script>
