<template>
  <Combobox v-model:model-value="modalValue" v-model:open="open" :ignore-filter="true">
    <combobox-anchor as-child>
      <label for="languages">
        <tags-input
          v-model="modalValue"
          class="px-2 gap-2 w-full flex flex-col items-start bg-black/70 hover:bg-black/20 transition-colors duration-300 cursor-pointer"
        >
          <div class="flex gap-2 items-center flex-wrap">
            <tags-input-item
              v-for="language in modalValue"
              :key="language"
              :value="language"
              class=""
            >
              <tags-input-item-text />
              <tags-input-item-delete />
            </tags-input-item>
          </div>

          <combobox-input v-model="searchItem" as-child class="!w-full">
            <tags-input-input
              id="languages"
              :placeholder="$t('title.pages.game_details.form.languages_supported.placeholder')"
              class="min-w-full p-0 border-none focus-visible:ring-0 h-auto"
              @keydown.enter.prevent
            />
          </combobox-input>
        </tags-input>
      </label>

      <combobox-list class="w-[--reka-popper-anchor-width]">
        <combobox-empty />
        <combobox-group>
          <scroll-area
            :class="{
              'h-[20rem]': filteredLanguages.length > 6,
              'h-[10rem]': filteredLanguages.length <= 6,
            }"
          >
            <combobox-item
              v-for="(language, index) in filteredLanguages"
              :key="index"
              :value="language"
              @select.prevent="
                (event: any) => {
                  if (typeof event.detail.value === 'string') {
                    searchItem = ''
                    modalValue = [...(modalValue || []), event.detail.value]
                  }

                  if (filteredLanguages.length === 0) {
                    open = false
                  }
                }
              "
            >
              {{ language }}
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
import { queryGetCountriesList } from '@/hooks/common/countries/useCountries'
const filters = ref(['languages'])
const { data, isLoading } = queryGetCountriesList(filters)
const modalValue = defineModel<string[] | null>('getLanguagesSupportedData', { default: [] })
const open = ref(false)
const searchItem = ref('')

const { contains } = useFilter({ sensitivity: 'base' })

const flattenedLanguages = computed(() => {
  const langs = new Set<string>()

  data?.value?.forEach((country: any) => {
    if (country.languages) {
      Object.values(country.languages).forEach((lang) => {
        langs.add(lang as string)
      })
    }
  })

  return Array.from(langs)
})

const filteredLanguages = computed(() => {
  const options = flattenedLanguages.value.filter((lang) => !modalValue.value?.includes(lang))

  return searchItem.value ? options.filter((lang) => contains(lang, searchItem.value)) : options
})
</script>
