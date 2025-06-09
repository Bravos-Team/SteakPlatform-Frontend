<template>
  <Combobox v-model="modalValue" v-model:open="open" :ignore-filter="true">
    <combobox-anchor as-child>
      <label for="regions">
        <tags-input
          v-model="modalValue"
          class="px-2 gap-2 w-full flex flex-col items-start bg-black/70 hover:bg-black/20 transition-colors duration-300 cursor-pointer"
        >
          <div class="flex gap-2 items-center flex-wrap">
            <tags-input-item v-for="country in modalValue" :key="country" :value="country" class="">
              <tags-input-item-text />
              <tags-input-item-delete />
            </tags-input-item>
          </div>

          <combobox-input v-model="searchItem" as-child>
            <tags-input-input
              id="regions"
              placeholder="Country..."
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
              'h-[20rem]': filterCountries.length > 6,
              'h-[10rem]': filterCountries.length <= 6,
            }"
          >
            <combobox-item
              v-for="(country, index) in filterCountries"
              :key="index"
              :value="country.name.common"
              @select.prevent="
                (event: any) => {
                  if (typeof event.detail.value === 'string') {
                    searchItem = ''
                    modalValue.push(event.detail.value)
                  }

                  if (filterCountries.length === 0) {
                    open = false
                  }
                }
              "
            >
              {{ country.name.common }}
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
import { watch, computed, onMounted, ref, toRaw } from 'vue'
import { queryGetCountriesList } from '@/hooks/common/countries/useCountries'
import { type Country } from '@/apis/common/countries/countries'
const filters = ref(['name', 'flags'])
const { data, isLoading } = queryGetCountriesList(filters)
const modalValue = ref<string[]>([])
const open = ref(false)
const searchItem = ref('')

const { contains } = useFilter({ sensitivity: 'base' })

const CountryData = computed(() => {
  if (data) {
    return data.value
  }
  console.log('NOT HAVE COUNTRIES DATA')
  return []
})
const filterCountries = computed(() => {
  const options = CountryData?.value?.filter(
    (i: Country) => !modalValue.value.includes(i.name.common),
  )
  return searchItem.value
    ? options.filter((option: Country) => contains(option.name.common, searchItem.value))
    : options
})
</script>
