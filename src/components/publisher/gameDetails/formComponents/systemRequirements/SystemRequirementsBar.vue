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
      <minimum-and-recommended />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import MinimumAndRecommended from '@/components/publisher/gameDetails/formComponents/systemRequirements/MinimumAndRecommended.vue'

const addMinimunAndRecommended = defineModel<boolean>('isInitSystemRequirements', {
  default: false,
})
</script>
