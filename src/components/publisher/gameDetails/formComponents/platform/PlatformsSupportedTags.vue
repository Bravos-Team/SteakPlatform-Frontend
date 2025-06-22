<template>
  <Combobox v-model:model-value="modalValue" v-model:open="open" :ignore-filter="true">
    <combobox-anchor as-child>
      <label for="platforms">
        <tags-input
          v-model="modalValue"
          class="px-2 gap-2 w-full flex flex-col items-start bg-black/70 hover:bg-black/20 transition-colors duration-300 cursor-pointer"
        >
          <div class="flex gap-2 items-center flex-wrap">
            <tags-input-item
              v-for="platform in modalValue"
              :key="platform"
              :value="platform"
              class=""
            >
              <tags-input-item-text />
              <tags-input-item-delete />
            </tags-input-item>
          </div>

          <combobox-input v-model="searchItem" as-child>
            <tags-input-input
              id="platforms"
              placeholder="Platforms..."
              class="min-w-full p-0 border-none focus-visible:ring-0 h-auto"
              @keydown.enter.prevent
            />
          </combobox-input>
        </tags-input>
      </label>

      <combobox-list align="end" side="top" class="w-[--reka-popper-anchor-width]">
        <combobox-empty />
        <combobox-group>
          <scroll-area
            :class="{
              'h-[20rem]': filteredPlatforms.length > 6,
              'h-[10rem]': filteredPlatforms.length <= 6,
            }"
          >
            <combobox-item
              v-for="(platform, index) in filteredPlatforms"
              :key="index"
              :value="platform"
              @select.prevent="
                (event: any) => {
                  if (typeof event.detail.value === 'string') {
                    searchItem = ''
                    modalValue.push(event.detail.value)
                  }

                  if (filteredPlatforms.length === 0) {
                    open = false
                  }
                }
              "
            >
              {{ platform }}
            </combobox-item>
          </scroll-area>
        </combobox-group>
      </combobox-list>
    </combobox-anchor>
  </Combobox>
</template>

<script setup lang="ts">
import { useFilter } from 'reka-ui'
import {
  Combobox,
  ComboboxAnchor,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from '@/components/ui/combobox'
import {
  TagsInput,
  TagsInputInput,
  TagsInputItem,
  TagsInputItemDelete,
  TagsInputItemText,
} from '@/components/ui/tags-input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { computed, ref } from 'vue'
const gamingPlatforms = [
  'PC (Windows)',
  'macOS',
  'Linux',
  'Steam Deck',
  'PlayStation 5',
  'Xbox Series X/S',
  'Nintendo Switch',
  'Nintendo Switch 2 (upcoming)',
  'Android',
  'iOS',
  'NVIDIA GeForce Now',
  'Xbox Cloud Gaming',
  'Google Stadia (legacy)',
  'PlayStation Now',
  'Meta Quest 5',
  'Apple VisionPlay',
  'Steam Deck',
  'Asus ROG Xbox Ally',
  'Xbox Infinity (cloud hybrid)',
]

const modalValue = defineModel<string[]>('getPlatformsSupportedData', { default: [] })
const open = ref(false)
const searchItem = ref('')

const { contains } = useFilter({ sensitivity: 'base' })

const filteredPlatforms = computed(() => {
  const options = gamingPlatforms?.filter((platform) => !modalValue.value.includes(platform))
  return searchItem.value ? options.filter((option) => contains(option, searchItem.value)) : options
})
</script>
