<template>
  <Select v-model:model-value="directxData">
    <select-trigger class="w-full !bg-transparent rounded-none border-none py-0 cursor-pointer">
      <select-value placeholder="Select DirectX" />
    </select-trigger>
    <select-content>
      <select-group>
        <select-item v-for="directx in directxs" :key="directx" :value="directx">
          <select-item-text>{{ directx }}</select-item-text>
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
  directxs?: string[]
}>()
const directxData = defineModel<string>('emitDirectxData')
</script>
