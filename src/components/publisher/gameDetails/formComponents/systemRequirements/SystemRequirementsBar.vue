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
      class="grid gap-x-3 grid-cols-1 gap-y-2 border-2 rounded-sm p-3 laptop:grid-cols-2 w-full gapx-3"
      v-if="addMinimunAndRecommended"
    >
      <minimum-and-recommended
        v-model:get-recommended-data="recommededData"
        v-model:get-minimum-data="minimumData"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import MinimumAndRecommended from '@/components/publisher/gameDetails/formComponents/systemRequirements/MinimumAndRecommended.vue'
import {
  SystemRequirementsType,
  getDefaultValueRequirements,
} from '@/types/game/gameDetails/GameDetailsType'
import { ref, computed } from 'vue'
import SystemRequirements from '@/components/publisher/gameDetails/formComponents/systemRequirements/SystemRequirementsBar.vue'
const addMinimunAndRecommended = defineModel<boolean>('isInitSystemRequirements', {
  default: false,
})

const minimumData = defineModel<SystemRequirementsType>('emitMinimumData', {
  default: getDefaultValueRequirements(),
})
const recommededData = defineModel<SystemRequirementsType>('emitRecommendedData', {
  default: getDefaultValueRequirements(),
})
</script>
