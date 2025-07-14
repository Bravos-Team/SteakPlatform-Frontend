<template>
  <div class="flex flex-col gap-y-2 rounded-sm px-2 justify-center">
    <div class="flex gap-x-2">
      <Label for="add_requirements_switcher">System Requirements</Label>
      <Switch
        id="add_requirements_switcher"
        @update:model-value="addMinimunAndRecommended = $event"
      />
    </div>
    <div
      v-if="minimumData || recommendData"
      class="grid gap-x-3 grid-cols-1 gap-y-2 border-2 rounded-sm p-3 laptop:grid-cols-2 w-full gapx-3"
    >
      <!-- START MINIMUM SYS -->
      <minimum-requirements-form v-if="minimumData" :minimum="minimumData" />
      <!-- END MINIMUM SYS -->

      <!-- START RECOMMENDED SYS -->
      <recommended-requirements-form v-if="recommendData" :recommend="recommendData" />
      <!-- END RECOMMENDED SYS -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'

import { SystemRequirementsType } from '@/types/game/gameDetails/GameDetailsType'
import MinimumRequirementsForm from '@/components/publisher/gameDetails/formComponents/systemRequirements/MinimumRequirementsForm.vue'
import RecommendedRequirementsForm from '@/components/publisher/gameDetails/formComponents/systemRequirements/RecommendedRequirementsForm.vue'

const props = defineProps<{
  minimumData: SystemRequirementsType | null
  recommendData: SystemRequirementsType | null
}>()

const addMinimunAndRecommended = defineModel<boolean>('isInitSystemRequirements', {
  default: false,
})
</script>
