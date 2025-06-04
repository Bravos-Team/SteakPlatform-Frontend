<template>
  <!-- CONSIDER TERMS OF SERVICE -->
  <consider-terms-of-service />
  <!-- END CONSIDER TERMS OF SERVICE -->

  <!-- COVER IMAGE -->
  <cover-image-update />
  <!-- END COVER IAMGE -->

  <!-- RELEASE DATE & ESTIMATED MONTH-->
  <release-estimated-date />
  <!-- END RELEASE DATE & ESTIMATED MONTH-->
</template>

<script setup lang="ts">
import ReleaseEstimatedDate from '@/components/publisher/gameDetails/formComponents/ReleaseEstimatedDate.vue'
import ConsiderTermsOfService from '@/components/publisher/gameDetails/formComponents/ConsiderTermsOfService.vue'
import CoverImageUpdate from '@/components/publisher/gameDetails/formComponents/CoverImageUpdate.vue'
</script>
