<template>
  <div class="grid grid-cols-1 gap-y-6 desktop:grid-cols-2 gap-x-3 w-full">
    <!-- START STATUS -->
    <div class="flex flex-col justify-center">
      <span class="flex items-center text-sm after:content-['*'] after:ms-1 after:text-yellow-400"
        >Status</span
      >
      <status-picker />
    </div>
    <!-- END STATUS -->

    <!-- START ESTIMATED RELEASE DATE -->
    <div class="flex flex-col justify-center">
      <span class="flex items-center text-sm after:content-['*'] after:ms-1 after:text-yellow-400"
        >Estimated Release Date</span
      >
      <div class="w-full border-2 border-double rounded-sm">
        <estimated-release-date />
      </div>
    </div>
    <!-- END ESTIMATED RELEASE DATE -->

    <!-- START SUBTITLE -->
    <div class="flex col-span-2 flex-col justify-center">
      <span class="flex items-center text-sm after:content-['*'] after:ms-1 after:text-yellow-400"
        >Subtitle</span
      >
      <Textarea
        name="subtitle"
        placeholder="Enter your subtitle..."
        class="w-full border-2 border-double rounded-sm"
      ></Textarea>
    </div>
    <!-- END SUBTITLE -->
  </div>
</template>

<script setup lang="ts">
import StatusPicker from '@/components/publisher/gameDetails/formComponents/status/StatusPicker.vue'
import EstimatedReleaseDate from '@/components/publisher/gameDetails/formComponents/date/EstimatedReleaseDate.vue'
import { Textarea } from '@/components/ui/textarea'
</script>
