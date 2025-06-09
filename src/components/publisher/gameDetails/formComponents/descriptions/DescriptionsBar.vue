<template>
  <div class="grid grid-cols-1 gap-y-6 desktop:grid-cols-2 gap-x-3 w-full">
    <!-- START SUBTITLE -->
    <div class="flex col-span-1 flex-col justify-center">
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

    <!-- START SHORT DESCRIPTIONS -->
    <div class="flex col-span-1 flex-col justify-center">
      <span class="flex items-center text-sm after:content-['*'] after:ms-1 after:text-yellow-400"
        >Short Descriptions</span
      >
      <Textarea
        name="shortDescriptions"
        placeholder="Enter your short descriptions..."
        class="w-full border-2 border-double rounded-sm"
      ></Textarea>
    </div>
    <!-- END SHORT DESCRIPTIONS -->

    <!-- START LONG DESCRIPTIONS -->
    <div class="flex col-span-2 flex-col justify-center">
      <span class="flex items-center text-sm after:content-['*'] after:ms-1 after:text-yellow-400"
        >Long Descriptions</span
      >
      <Textarea
        name="longDescriptions"
        placeholder="Enter your long descriptions..."
        class="w-full border-2 border-double rounded-sm"
      ></Textarea>
    </div>
    <!-- END LONG DESCRIPTIONS -->
  </div>
</template>

<script setup lang="ts">
import { Textarea } from '@/components/ui/textarea'
</script>
