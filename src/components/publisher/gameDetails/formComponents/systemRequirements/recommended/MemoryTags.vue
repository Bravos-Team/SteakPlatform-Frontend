<template>
  <Select v-model:model-value="memoryData">
    <select-trigger class="w-full !bg-transparent rounded-none border-none py-0 cursor-pointer">
      <select-value placeholder="Select Memory" />
    </select-trigger>
    <select-content>
      <select-group>
        <select-item v-for="memory in memories" :key="memory" :value="memory">
          <select-item-text class="text-wrap">{{ memory }}</select-item-text>
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
  memories?: string[]
}>()
const memoryData = defineModel<string>('emitMemoryData')
</script>
