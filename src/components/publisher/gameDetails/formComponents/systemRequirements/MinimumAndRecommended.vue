<template>
  <!-- START MINIMUM SYS -->
  <minimum-requirements-form
    v-model:minimum-requirements-model="minimum"
    :minimum-requirements="minimum"
  />
  <!-- END MINIMUM SYS -->

  <!-- START RECOMMENDED SYS -->
  <recommended-requirements-form
    v-model:recommended-requirements-model="recommended"
    :recommended-requirements="recommended"
  />
  <!-- END RECOMMENDED SYS -->
</template>

<script setup lang="ts">
import MinimumRequirementsForm from '@/components/publisher/gameDetails/formComponents/systemRequirements/MinimumRequirementsForm.vue'
import RecommendedRequirementsForm from '@/components/publisher/gameDetails/formComponents/systemRequirements/RecommendedRequirementsForm.vue'
import {
  SystemRequirementsType,
  getDefaultValueRequirements,
} from '@/types/game/gameDetails/GameDetailsType'

const minimum = defineModel<SystemRequirementsType>('getMinimumData', {
  default: getDefaultValueRequirements(),
})

const recommended = defineModel<SystemRequirementsType>('getRecommendedData', {
  default: getDefaultValueRequirements(),
})
</script>
