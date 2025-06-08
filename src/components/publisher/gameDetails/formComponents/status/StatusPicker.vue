<template>
  <Select>
    <select-trigger class="w-full border-2 border-double rounded-sm cursor-pointer">
      <select-value placeholder="Select status" />
    </select-trigger>
    <select-content side="bottom">
      <select-group>
        <select-label>Status</select-label>
        <select-item value="1">In Development</select-item>
        <select-item value="2">Production</select-item>
        <select-item value="3">Pre-production</select-item>
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
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
</script>
