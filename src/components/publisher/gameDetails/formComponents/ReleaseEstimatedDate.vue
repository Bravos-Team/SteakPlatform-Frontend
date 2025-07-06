<template>
  <div class="grid grid-cols-1 gap-y-6 gap-x-3 w-full">
    <!-- START STATUS -->
    <!-- <div class="flex flex-col justify-center">
      <span class="flex items-center text-sm after:content-['*'] after:ms-1 after:text-yellow-400"
        >Status</span
      >
      <status-picker />
    </div> -->
    <!-- END STATUS -->

    <!-- START ESTIMATED RELEASE DATE -->
    <div class="flex flex-col justify-center">
      <span class="flex items-center text-sm after:content-['*'] after:ms-1 after:text-yellow-400"
        >Estimated Release Date</span
      >
      <div class="w-full border-2 border-double rounded-sm">
        <estimated-release-date v-model:emitEstimatedReleaseDate="emitEstimatedReleaseDate" />
      </div>
    </div>
    <!-- END ESTIMATED RELEASE DATE -->
  </div>
</template>

<script setup lang="ts">
// import StatusPicker from '@/components/publisher/gameDetails/formComponents/status/StatusPicker.vue'
import EstimatedReleaseDate from '@/components/publisher/gameDetails/formComponents/date/EstimatedReleaseDate.vue'
const emitEstimatedReleaseDate = defineModel<string>('estimatedReleaseDate')
</script>
