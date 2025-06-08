<template>
  <form @submit.prevent class="text-md flex flex-col gap-y-4 flex-wrap w-full">
    <!-- START VERSION SELECTED -->
    <version-selected-and-status />
    <!-- END VERSION SELECTED -->

    <!-- CONSIDER TERMS OF SERVICE -->
    <consider-terms-of-service />
    <!-- END CONSIDER TERMS OF SERVICE -->

    <!-- COVER IMAGE -->
    <cover-image-update />
    <!-- END COVER IAMGE -->

    <!-- RELEASE DATE & ESTIMATED MONTH-->
    <release-estimated-date />
    <!-- END RELEASE DATE & ESTIMATED MONTH-->

    <div class="grid grid-cols-2 gap-x-3 w-full flex-wrap gap-y-3">
      <!-- START AVAILABLE COUNTRIES PICKER -->
      <div class="flex flex-col justify-center w-full">
        <span class="flex items-center text-sm">Available Countries</span>
        <region-tags-picker />
      </div>
      <!-- END AVAILABLE COUNTRIES PICKER -->

      <div class="flex flex-col justify-center w-full">
        <span class="flex items-center text-sm">Langagues Supported</span>
        <languages-supported-picker />
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import RegionTagsPicker from '@/components/publisher/gameDetails/formComponents/region/RegionTagsPicker.vue'
import ReleaseEstimatedDate from '@/components/publisher/gameDetails/formComponents/ReleaseEstimatedDate.vue'
import ConsiderTermsOfService from '@/components/publisher/gameDetails/formComponents/ConsiderTermsOfService.vue'
import CoverImageUpdate from '@/components/publisher/gameDetails/formComponents/CoverImageUpdate.vue'
import VersionSelectedAndStatus from '@/components/publisher/gameDetails/formComponents/version/VersionSelectedAndStatus.vue'
import LanguagesSupportedPicker from '@/components/publisher/gameDetails/formComponents/region/LanguagesSupportedPicker.vue'
</script>
