<template>
  <Select v-model:model-value="versionSelectedData" :body-lock="true">
    <select-trigger @keydown.stop.prevent="onSelectKeydown">
      <select-value placeholder="Game version" />
    </select-trigger>
    <select-content class="h-[20rem]" :body-lock="false">
      <select-group>
        <select-label>Versions</select-label>

        <input
          v-model.lazy="versionInputed"
          autocomplete="off"
          name="version"
          placeholder="Enter your own versions..."
          class="w-full focus:outline-none focus:ring-0 border-none px-2 py-1 rounded-sm text-gray-100/60"
        />
        <select-item
          v-if="!versions.includes(versionInputed) && versionInputed"
          :value="versionInputed"
        >
          v{{ versionInputed }}
        </select-item>
        <select-item v-for="version in versions" :key="version" :value="version">{{
          version
        }}</select-item>
        <!-- <scroll-area>

        </scroll-area> -->
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
import { ref } from 'vue'

const versionInputed = ref('')
const versions = Array.from({ length: 10 }).map((_, i, a) => {
  return `v${i + 1}.0.0`
})

const versionSelectedData = defineModel<string>({
  default: '',
})

const onSelectKeydown = (e: KeyboardEvent) => {
  if (/^[a-zA-Z0-9]$/.test(e.key)) {
    e.preventDefault()
  }
}
</script>
