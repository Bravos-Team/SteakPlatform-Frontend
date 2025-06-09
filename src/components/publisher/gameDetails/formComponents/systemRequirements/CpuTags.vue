<template>
  <Select>
    <select-trigger class="w-full !bg-transparent rounded-none border-none py-0 cursor-pointer">
      <select-value placeholder="Select CPU" />
    </select-trigger>
    <select-content>
      <select-group>
        <select-item v-for="cpu in cpus" :key="cpu" :value="cpu">
          <select-item-text>{{ cpu }}</select-item-text>
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
  cpus?: string[]
}>()
</script>
