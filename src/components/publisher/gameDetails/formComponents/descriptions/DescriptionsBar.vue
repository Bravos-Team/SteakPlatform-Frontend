<template>
  <div class="grid grid-cols-2 gap-y-6 tablet:grid-cols-2 gap-x-3 w-full">
    <!-- START SUBTITLE -->
    <!-- <div class="flex col-span-2 tablet:col-span-1 flex-col justify-center">
      <span class="flex items-center text-sm after:content-['*'] after:ms-1 after:text-yellow-400"
        >Subtitle</span
      >
      <Textarea
        v-model:model-value="getSubtitles"
        name="subtitles"
        placeholder="Enter your subtitle..."
        class="w-full border-2 border-double rounded-sm"
      ></Textarea>
    </div> -->
    <!-- END SUBTITLE -->

    <!-- START SHORT DESCRIPTIONS -->
    <div class="flex col-span-2 flex-col justify-center">
      <span class="flex items-center text-sm after:content-['*'] after:ms-1 after:text-yellow-400"
        >Short Descriptions</span
      >
      <Textarea
        maxlength="125"
        v-model:model-value="getShortDescriptions"
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
      <text-editor v-model:emit-long-descriptions-data="getLongDescriptionsHTML" />
    </div>
    <!-- END LONG DESCRIPTIONS -->
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import { Textarea } from '@/components/ui/textarea'

const TextEditor = defineAsyncComponent(() => {
  return import('@/components/common/texteditor/TextEditor.vue')
})

// const getSubtitles = defineModel<string>('getSubtitles')
const getShortDescriptions = defineModel<string>('getShortDescriptions')
const getLongDescriptionsHTML = defineModel<string>('getPreviewLongDescriptionsData')
</script>
