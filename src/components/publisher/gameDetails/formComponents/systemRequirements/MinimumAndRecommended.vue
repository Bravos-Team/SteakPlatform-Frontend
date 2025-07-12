<template>
  <!-- START MINIMUM SYS -->
  <minimum-requirements-form />
  <!-- END MINIMUM SYS -->

  <!-- START RECOMMENDED SYS -->
  <recommended-requirements-form />
  <!-- END RECOMMENDED SYS -->
</template>

<script setup lang="ts">
import MinimumRequirementsForm from '@/components/publisher/gameDetails/formComponents/systemRequirements/MinimumRequirementsForm.vue'
import RecommendedRequirementsForm from '@/components/publisher/gameDetails/formComponents/systemRequirements/RecommendedRequirementsForm.vue'
</script>
