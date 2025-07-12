<template>
  <Select v-model:model-value="minimumOsVersions">
    <select-trigger class="w-full !bg-transparent rounded-none border-none py-0 cursor-pointer">
      <select-value placeholder="Select OS Version" />
    </select-trigger>
    <select-content>
      <select-group>
        <select-item
          v-for="(version, index) in osVersion"
          :key="'os-version-' + index"
          :value="version"
        >
          <select-item-text>{{ version }}</select-item-text>
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

const minimumOsVersions = defineModel<string | any>('emitMinimumOsVersions')
</script>
