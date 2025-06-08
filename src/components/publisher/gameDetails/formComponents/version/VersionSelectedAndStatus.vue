<template>
  <div class="flex w-full flex-wrap justify-end">
    <Select>
      <select-trigger @keydown.stop.prevent="onSelectKeydown">
        <select-value placeholder="Game version" />
      </select-trigger>
      <select-content>
        <select-group>
          <select-label>Versions</select-label>

          <input
            v-model.lazy="versionInputed"
            autocomplete="off"
            name="version"
            placeholder="your versions..."
            class="w-full focus:outline-none focus:ring-0 border-none px-2 py-1 rounded-sm text-gray-100/60"
          />
          <scroll-area>
            <select-item
              v-if="!versions.includes(versionInputed) && versionInputed"
              :value="versionInputed"
            >
              v{{ versionInputed }}
            </select-item>
            <select-item v-for="version in versions" :key="version" :value="version">{{
              version
            }}</select-item>
            <separator />
          </scroll-area>
        </select-group>
      </select-content>
    </Select>
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
import { Separator } from '@/components/ui/separator'
import { ref } from 'vue'
import { ScrollArea } from '@/components/ui/scroll-area'

const versionInputed = ref('')
const versions = Array.from({ length: 10 }).map((_, i, a) => {
  return `v${i + 1}.0.0`
})
const onSelectKeydown = (e: KeyboardEvent) => {
  if (/^[a-zA-Z0-9]$/.test(e.key)) {
    e.preventDefault()
  }
}
</script>
