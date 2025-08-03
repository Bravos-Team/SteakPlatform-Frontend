<template>
  <Select v-model:model-value="recommendedOsVersion">
    <select-trigger class="w-full !bg-transparent rounded-none border-none py-0 cursor-pointer">
      <select-value placeholder="Select OS Version" />
    </select-trigger>
    <select-content>
      <select-group>
        <select-item v-for="version in osVersion" :key="version" :value="version">
          <select-item-text class="text-wrap">{{ version }}</select-item-text>
        </select-item>
      </select-group>
    </select-content>
  </Select>
</template>
<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectItemText,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
const props = defineProps<{
  osVersion?: string[]
}>()

const recommendedOsVersion = defineModel<string>('emitRecommendedOsVersion')
</script>
