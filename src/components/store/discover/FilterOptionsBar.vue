<template>
  <div class="flex flex-col gap-y-2">
    <span class="font-bold">Filters</span>
    <label for="search" class="flex items-center bg-black/40 group px-2">
      <Search class="cursor-pointer text-white/80 size-4" />
      <Input
        @keyup.enter="(event: any) => (searchValue = event.target.value)"
        type="text"
        id="search"
        placeholder="Search..."
        class="border-0 !bg-transparent px-3 text-white/70 !ring-0 peer py-3 ! outline-0 rounded-xs w-full"
      />
    </label>
    <div class="flex flex-col">
      <Collapsible
        class="py-6 border-b last:border-b-0 flex flex-col justify-between"
        @update:open="(value) => handleCollapsibleOpenStates(value, filter.key.toLowerCase())"
        v-for="(filter, index) in selectFilterOptions"
        :key="index"
      >
        <CollapsibleTrigger class="flex items-center justify-between w-full cursor-pointer">
          <span
            class="text-md"
            :class="{
              'font-bold': collapsOpen[filter.key.toLowerCase()],
            }"
          >
            {{ filter.title }}</span
          >
          <ChevronUp
            class="transition-transform duration-300"
            :class="{ 'rotate-180': collapsOpen[filter.key.toLowerCase()] }"
          />
        </CollapsibleTrigger>
        <div class="space-y-2 my-3" v-if="filter.key === 'price' && collapsOpen.price">
          <!-- MIN -->
          <NumberField
            v-model="minValue"
            id="min"
            :default-value="0"
            :min="0"
            :max="100000"
            :step="1000"
          >
            <Label for="min">Min</Label>
            <NumberFieldContent>
              <NumberFieldDecrement />
              <NumberFieldInput />
              <NumberFieldIncrement />
            </NumberFieldContent>
          </NumberField>
          <!-- END MIN -->
          <!-- MAX -->
          <NumberField
            v-model="maxValue"
            id="max"
            :default-value="0"
            :min="0"
            :max="100000"
            :step="1000"
          >
            <Label for="max">Max</Label>
            <NumberFieldContent>
              <NumberFieldDecrement />
              <NumberFieldInput />
              <NumberFieldIncrement />
            </NumberFieldContent>
          </NumberField>
          <!-- END MAX -->
          <Button
            :class="{
              'cursor-not-allowed': isFiltering,
              'cursor-pointer': !isFiltering,
            }"
            :disabled="isFiltering"
            class="flex w-full"
            @click="emit('update:price', { min: minValue, max: maxValue })"
          >
            <Search />
            <span> Apply</span>
          </Button>
        </div>
        <CollapsibleContent
          class="text-sm text-white/80"
          v-for="(option, index) in filter.options"
          :key="index"
        >
          <!-- PRICE -->
          <button
            :class="{
              'cursor-not-allowed': isFiltering,
              'cursor-pointer': !isFiltering,
            }"
            :disabled="isFiltering"
            class="w-full h-full flex justify-start py-3 hover:bg-white/3"
            v-if="filter.key === 'price' && !(priceSelected === option.value)"
            @click="filterMinMax(option.value)"
          >
            {{ option.label }}
          </button>
          <button
            :class="{
              'cursor-not-allowed': isFiltering,
              'cursor-pointer': !isFiltering,
            }"
            :disabled="isFiltering"
            class="w-full h-full border-y-[1px] flex justify-between p-3 bg-white text-black"
            v-else-if="priceSelected === option.value && filter.key === 'price'"
          >
            <span> {{ option.label }}</span>
            <Check class="text-blue-400/50" />
          </button>
          <!-- END PRICE -->

          <!-- GENRES -->
          <button
            :class="{
              'cursor-not-allowed': isFiltering,
              'cursor-pointer': !isFiltering,
            }"
            :disabled="isFiltering"
            class="w-full h-full hover:bg-white/3 flex justify-start p-3"
            v-if="filter.key === 'genres' && !genresSelected.includes(option.value)"
            @click="handleFilteredByGenres(option.value)"
          >
            {{ option.label }}
          </button>
          <button
            :class="{
              'cursor-not-allowed': isFiltering,
              'cursor-pointer': !isFiltering,
            }"
            :disabled="isFiltering"
            class="w-full h-full border-y-[1px] flex justify-between p-3 bg-white text-black"
            v-else-if="genresSelected.includes(option.value) && filter.key === 'genres'"
            @click="handleRemoveGenre(option.value)"
          >
            <span> {{ option.label }}</span>
            <Check class="text-blue-400/50" />
          </button>
          <!-- END GENRES -->

          <!-- TAGS -->
          <button
            :class="{
              'cursor-not-allowed': isFiltering,
              'cursor-pointer': !isFiltering,
            }"
            :disabled="isFiltering"
            class="w-full h-full flex justify-start p-3 hover:bg-white/3"
            v-if="filter.key === 'tags' && !tagsSelected.includes(option.value)"
            @click="handleFilteredByTags(option.value)"
          >
            {{ option.label }}
          </button>
          <button
            :class="{
              'cursor-not-allowed': isFiltering,
              'cursor-pointer': !isFiltering,
            }"
            :disabled="isFiltering"
            class="w-full h-full border-y-[1px] flex justify-between p-3 bg-white text-black"
            v-else-if="tagsSelected.includes(option.value) && filter.key === 'tags'"
            @click="handleRemoveTag(option.value)"
          >
            <span> {{ option.label }}</span>
            <Check class="text-blue-400/50" />
          </button>
          <!-- END TAGS -->

          <!-- SORT BY -->
          <div v-if="filter.key === 'sortBy'" class="my-2">
            <Collapsible>
              <CollapsibleTrigger class="font-medium cursor-pointer">
                {{ option.label }}
              </CollapsibleTrigger>
              <CollapsibleContent>
                <button
                  :class="{
                    'cursor-not-allowed': isFiltering,
                    'cursor-pointer': !isFiltering,
                    'bg-white text-black': sortSelected.includes(option.value + ',desc'),
                  }"
                  :disabled="isFiltering"
                  class="w-full h-full flex justify-between p-3"
                  @click="handleSortByType(option.value, 'desc')"
                >
                  <span> {{ 'Descending' }}</span>
                  <Check
                    v-if="sortSelected.includes(option.value + ',desc')"
                    class="text-blue-400/50"
                  />
                  <ArrowDownAZ v-else class="size-5 shrink-0" />
                </button>
                <button
                  :class="{
                    'cursor-not-allowed': isFiltering,
                    'cursor-pointer': !isFiltering,
                    'bg-white text-black': sortSelected.includes(option.value + ',asc'),
                  }"
                  :disabled="isFiltering"
                  class="w-full h-full border-y-[1px] flex justify-between p-3"
                  @click="handleSortByType(option.value, 'asc')"
                >
                  <span> {{ 'Ascending' }}</span>
                  <Check
                    v-if="sortSelected.includes(option.value + ',asc')"
                    class="text-blue-400/50"
                  />
                  <ArrowDownZA v-else class="size-5 shrink-0" />
                </button>
              </CollapsibleContent>
            </Collapsible>
          </div>
          <!-- END SORT BY -->
        </CollapsibleContent>
      </Collapsible>
    </div>
  </div>
</template>

<script setup lang="ts">
import Input from '@/components/ui/input/Input.vue'

import { ArrowDownAZ, ArrowDownZA, Check, ChevronUp, Search } from 'lucide-vue-next'

import { useGameGenresQuery, useGameTagsQuery } from '@/hooks/store/game/useGameStore'
import { ref, watch } from 'vue'
import { GAME_GENRES_AND_TAG_TYPE } from '@/types/game/gameDetails/GameDetailsType'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Label } from '@/components/ui/label'

import {
  NumberField,
  NumberFieldContent,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
} from '@/components/ui/number-field'
import Button from '@/components/ui/button/Button.vue'

const props = defineProps<{
  isFiltering: boolean
  isResetFilter: boolean
}>()
const { data: genres } = useGameGenresQuery()
const { data: tags } = useGameTagsQuery()

const searchValue = defineModel<string>('searchValueOnChange', {
  default: '',
  required: false,
})

const minValue = ref(0)
const maxValue = ref(0)

const genresData = ref<any>([])
const tagsData = ref<any>([])

const genresSelected = ref<number[]>([])
const tagsSelected = ref<number[]>([])

const sortSelected = ref<string>('')

const collapsOpen = ref<Record<string, boolean>>({
  price: false,
  genres: false,
  tags: false,
  sortBy: false,
})
const selectFilterOptions = ref<any>([
  {
    title: 'Price',
    key: 'price',
    options: [
      { value: '0', label: 'Free' },
      { value: '1', label: 'Paid' },
      { value: '575000', label: 'Under ₫575,000' },
      { value: '1150000', label: 'Under ₫1,150,000' },
      { value: '2300000', label: 'Under ₫2,300,000' },
      { value: '100000', label: '₫100,000 and above' },
      { value: '200000', label: '₫200,000 and above' },
      { value: '300000', label: '₫300,000 and above' },
      { value: '400000', label: '₫400,000 and above' },
      { value: '500000', label: '₫500,000 and above' },
    ],
  },
  {
    title: 'Genres',
    key: 'genres',
    options: genresData,
  },
  {
    title: 'Tags',
    key: 'tags',
    options: tagsData,
  },
  {
    title: 'Sort By',
    key: 'sortBy',
    options: [
      { value: 'releaseDate', label: 'Release Date' },
      { value: 'name', label: 'Name' },
      { value: 'buyerCount', label: 'Most Buyer' },
    ],
  },
])
const emit = defineEmits<{
  (e: 'update:price', value: { min: number; max: number }): void
  (e: 'update:genres', value: number[]): void
  (e: 'update:tags', value: number[]): void
  (e: 'update:sortBy', value: string): void
}>()

const handleSortByType = (key: string, sortBy: string) => {
  sortSelected.value = key + ',' + sortBy
  if (key && sortBy) emit('update:sortBy', sortSelected.value)
}
const handleFilteredByGenres = (value: number) => {
  console.log(value)
  genresSelected.value.push(value)
  emit('update:genres', genresSelected.value)
}

const handleRemoveGenre = (value: number) => {
  genresSelected.value = genresSelected.value.filter((genreId) => genreId !== value)
  emit('update:genres', genresSelected.value)
}

const handleFilteredByTags = (value: number) => {
  console.log(value)
  tagsSelected.value.push(value)
  emit('update:tags', tagsSelected.value)
}

const handleRemoveTag = (value: number) => {
  tagsSelected.value = tagsSelected.value.filter((tagId) => tagId !== value)
  emit('update:tags', tagsSelected.value)
}

const handleCollapsibleOpenStates = (value: boolean, title: string) => {
  switch (title) {
    case 'sort by':
      collapsOpen.value.sortBy = value
      break
    default:
      collapsOpen.value[title] = value
  }
}

const priceSelected = ref<string>()
const filterMinMax = (value: string) => {
  priceSelected.value = value
  switch (value) {
    case '0':
      return emit('update:price', { min: 0, max: 0 })
    case '1':
      return emit('update:price', { min: 0.1, max: 99999999999999 })
    case '575000':
      return emit('update:price', { min: 0.1, max: 575000 })
    case '1150000':
      return emit('update:price', { min: 0.1, max: 1150000 })
    case '2300000':
      return emit('update:price', { min: 0.1, max: 2300000 })
    case '100000':
      return emit('update:price', { min: 100000, max: 99999999999999 })
    case '200000':
      return emit('update:price', { min: 200000, max: 99999999999999 })
    case '300000':
      return emit('update:price', { min: 300000, max: 99999999999999 })
    case '400000':
      return emit('update:price', { min: 400000, max: 99999999999999 })
    case '500000':
      return emit('update:price', { min: 500000, max: 99999999999999 })
  }
}

watch(genres, () => {
  genresData.value = genres.value?.data.map((genre: GAME_GENRES_AND_TAG_TYPE) => ({
    value: genre.id,
    label: genre.name,
  }))
})

watch(tags, () => {
  tagsData.value = tags.value?.data.map((tag: GAME_GENRES_AND_TAG_TYPE) => ({
    value: tag.id,
    label: tag.name,
  }))
})
watch(
  () => props.isResetFilter,
  () => {
    minValue.value = 0
    maxValue.value = 0
    priceSelected.value = undefined
    genresSelected.value = []
    tagsSelected.value = []
    sortSelected.value = ''
  },
  { immediate: true },
)
</script>
