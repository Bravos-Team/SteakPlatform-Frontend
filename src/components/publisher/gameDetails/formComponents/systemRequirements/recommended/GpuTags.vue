<template>
  <Select v-model:model-value="gpuData">
    <select-trigger class="w-full !bg-transparent rounded-none border-none py-0 cursor-pointer">
      <select-value placeholder="Select GPU" />
    </select-trigger>
    <select-content>
      <select-group>
        <select-item v-for="gpu in gpus" :key="gpu" :value="gpu">
          <select-item-text>{{ gpu }}</select-item-text>
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
  gpus?: string[]
}>()
const gpuData = defineModel<string>('emitGpuData')
</script>
