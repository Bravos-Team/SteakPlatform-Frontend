<template>
  <div class="flex justify-between pe-4">
    <div class="flex justify-start items-center gap-x-2">
      <span class="text-white/60">Show:</span>
      <Select
        :model-value="commonFilterOption"
        @update:model-value="(value) => $emit('common-filter-change', value as string)"
      >
        <select-trigger class="!ring-0 !bg-transparent !border-0 cursor-pointer">
          <select-value placeholder="Select filter" />
        </select-trigger>
        <select-content>
          <select-group>
            <select-label class="text-white/30">Filter</select-label>
            <select-item
              class="cursor-pointer"
              v-for="option in options"
              :key="option.value"
              :value="option.value"
              >{{ option.label }}</select-item
            >
          </select-group>
        </select-content>
      </Select>
      <span class="text-white capitalize"></span>
    </div>
    <LoaderCircle class="animate-spin" v-if="isPendingResetFilter" />
    <list-restart
      @click="() => $emit('resetFilter', true)"
      v-else
      class="text-white/50 hover:text-white transition-colors duration-300 cursor-pointer"
    />
  </div>
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
import { ListRestart, LoaderCircle } from 'lucide-vue-next'

const props = defineProps<{
  commonFilterOption: string
  isPendingResetFilter: boolean
}>()

const emit = defineEmits<{
  (e: 'common-filter-change', value: string): void
  (e: 'resetFilter', value: boolean): void
}>()

const handleCommonFilterChange = (value: string) => {
  emit('common-filter-change', value)
}

const options = [
  { value: 'all', label: 'All' },
  { value: 'coming', label: 'Coming Soon' },
  { value: 'newest', label: 'Newest' },
]
</script>
