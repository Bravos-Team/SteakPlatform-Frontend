<template>
  <Select v-model:model-value="storageData">
    <select-trigger class="w-full !bg-transparent rounded-none border-none py-0 cursor-pointer">
      <select-value placeholder="Select Storage" />
    </select-trigger>
    <select-content>
      <select-group>
        <select-item v-for="storage in storages" :key="storage" :value="storage">
          <select-item-text class="text-wrap">{{ storage }}</select-item-text>
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
  storages?: string[]
}>()
const storageData = defineModel<string>('emitStorageData')
</script>
