<template>
  <!-- START MINIMUM SYS -->
  <minimum-requirements-form :minimum-requirements="systemRequirementSuggestions?.minimum" />
  <!-- END MINIMUM SYS -->

  <!-- START RECOMMENDED SYS -->
  <recommended-requirements-form
    :recommended-requirements="systemRequirementSuggestions?.recommend"
  />
  <!-- END RECOMMENDED SYS -->
</template>

<script setup lang="ts">
import MinimumRequirementsForm from '@/components/publisher/gameDetails/formComponents/systemRequirements/MinimumRequirementsForm.vue'
import RecommendedRequirementsForm from '@/components/publisher/gameDetails/formComponents/systemRequirements/RecommendedRequirementsForm.vue'
import { type SYSTEM_REQUIREMENTS_SUGGESTIONS_TYPE } from '@/types/game/gameDetails/GameDetailsType'

const props = defineProps<{
  systemRequirementSuggestions?: SYSTEM_REQUIREMENTS_SUGGESTIONS_TYPE
}>()
</script>
