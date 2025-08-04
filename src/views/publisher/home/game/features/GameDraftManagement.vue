<template>
  <card class="py-3 px-1 bg-[#101014]/50 will-change-transform backdrop-blur-2xl w-full !h-full">
    <card-header>
      <card-title class="text-3xl font-bold">
        {{ $t('title.subPagesCompo.sidebar.publisher.game_management.items.draft') }}
      </card-title>
    </card-header>
    <card-content class="px-2 py-3 min-h-full">
      <!-- PRODUCT COUNT AND ACTIONS BUTTON -->
      <div class="flex flex-col basis-1/3">
        <!-- <span class="font-bold text-2xl">Your Products({{ games?.length }})</span> -->
        <span class="font-normal text-md text-gray-400 text-wrap"
          >Manage products for the Steak Games Store and Steak Online Services.</span
        >
      </div>
      <div class="flex flex-col tablet:flex-row tablet:items-center gap-x-3">
        <div class="flex items-center gap-x-2 mb-2 tablet:mb-0 justify-end">
          <!-- REFRESH -->
          <RotateCcw
            :class="{
              'cursor-progress animate-spin text-white/90 ': isReset,
              'cursor-pointer': !isReset,
            }"
            class="transition-all duration-300 size-6 text-white/80"
            @click="handleResetFilters"
          />
          <!-- END REFERSH -->
          <!-- SEARCH BY KEYWORD -->
          <label for="keyword">
            <input
              type="text"
              v-model="searchValue"
              id="keyword"
              placeholder="Search by keyword"
              autocomplete="off"
              class="focus:ring-2 focus:ring-blue-500 outline-1 px-2 py-1 rounded-sm"
              @blur="nextTick(() => handleRefetchingPersonalProjects())"
              @keyup.enter="nextTick(() => handleRefetchingPersonalProjects)"
            />
          </label>

          <button
            :class="{
              'cursor-progress animate-spin text-white/90 ': isRefetchingPersonalProjects,
              'cursor-pointer': !isRefetchingPersonalProjects,
            }"
            :disabled="isRefetchingPersonalProjects"
            class="w-20 rounded-sm border-1 h-[2rem]"
            @click="handleRefetchingPersonalProjects()"
          >
            Search
          </button>
          <!-- END SEARCH BY KEYWORD -->
        </div>

        <div
          class="flex flex-col tablet:flex-row gap-y-2 w-full tablet:items-center gap-x-2 mb-2 tablet:mb-0 justify-end"
        >
          <!-- SELECT STATUS -->
          <Select v-model:model-value="filters.status">
            <select-trigger class="min-w-full tablet:min-w-fit">
              <select-value
                :placeholder="t('title.pages.game_management.filters.placeholder')"
                :value="selectedStatusLabel"
              />
            </select-trigger>
            <select-content>
              <select-label>{{
                $t('title.pages.game_management.filters.options.title')
              }}</select-label>
              <select-separator />
              <select-group>
                <select-item
                  v-for="(option, index) in statusOptions"
                  :key="index"
                  :value="option.value"
                  >{{ showI18n(option.label) }}</select-item
                >
              </select-group>
            </select-content>
          </Select>
          <!-- END SELECT STATUS -->

          <!-- CREATE BUTTON -->
          <create-product-button :filters="filters" />
          <!-- END CREATE BUTTON -->
        </div>
      </div>
      <!-- END  PRODUCT COUNT AND ACTIONS BUTTON -->

      <!-- UPLOAD GAME BAR -->
      <div
        v-if="isLoadingPersonalProjects || isRefetchingPersonalProjects"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-3 gap-y-6 w-full p-2"
      >
        <Card
          v-for="obj in Array(8)"
          class="animate-pulse bg-[var(--bg-card-game-base)]/60 @container overflow-hidden transition-colors duration-200 hover:bg-[#28282C] h-[24rem] lg:h-[20rem] xl:h-[25rem] relative"
        >
        </Card>
      </div>
      <div class="flex flex-col gap-y-3 min-h-full" v-else>
        <upload-game-bar :games="games?.data.content ?? []" />
        <pagination
          v-slot="{ page }"
          :total="totalResults"
          :items-per-page="filters?.size ?? 8"
          :default-page="games?.data.page.number + 1"
          @update:page="filters.page = $event"
        >
          <pagination-content v-slot="{ items }">
            <pagination-first class="cursor-pointer" />
            <pagination-previous :disabled="page === 1" class="cursor-pointer" />
            <template v-for="(item, index) in items" :key="index" class="cursor-pointer">
              <pagination-item
                v-if="item.type === 'page'"
                :value="item.value"
                :key="item.value"
                :is-active="item.value === page"
              >
                {{ item.value }}
              </pagination-item>
            </template>
            <pagination-ellipsis :index="8" />
            <pagination-next
              :disabled="page === games?.data?.page.totalPages"
              class="cursor-pointer"
            />
            <pagination-last
              :disabled="page === games?.data?.page.totalPages"
              class="cursor-pointer"
            />
          </pagination-content>
        </pagination>
      </div>
      <!-- END UPLOAD GAME BAR -->
    </card-content>
  </card>
</template>

<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectSeparator,
  SelectValue,
} from '@/components/ui/select'

import { computed, nextTick, ref } from 'vue'
import CreateProductButton from '@/components/publisher/game/CreateProductButton.vue'
import UploadGameBar from '@/components/publisher/game/UploadGameBar.vue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { usePublisherGetPersonalProjects } from '@/hooks/publisher/project/usePublisherPersonalProjects'
import { PUBLISHER_PERSONAL_PROJECT_TYPE_FILTERS } from '@/types/publisher/project/PublisherPersonalProjectType'
import { useI18n } from 'vue-i18n'
import { watch } from 'vue'
import { RotateCcw } from 'lucide-vue-next'
import { useDebounceFn } from '@vueuse/core'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationFirst,
  PaginationItem,
  PaginationLast,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
const { t } = useI18n()
const showI18n = (key: string) => {
  return t(key)
}
const selectedStatus = ref<string | null>(null)

const selectedStatusLabel = computed(() => {
  const selected = statusOptions.find((opt) => opt.value === selectedStatus.value)
  return selected ? t(selected.label) : ''
})

const filters = ref<PUBLISHER_PERSONAL_PROJECT_TYPE_FILTERS>({
  status: 'DRAFT',
  page: 1,
  size: 8,
  keyword: null,
})

const statusOptions = [
  { value: 'DRAFT', label: 'title.pages.game_management.filters.options.draft' },
  // { value: 'ACCEPTED', label: 'title.pages.game_management.filters.options.accepted' },
  { value: 'REJECTED', label: 'title.pages.game_management.filters.options.rejected' },
  { value: 'PENDING_REVIEW', label: 'title.pages.game_management.filters.options.pending' },
]

const isReset = ref(false)

const handleResetFilters = async () => {
  isReset.value = true
  selectedStatus.value = null
  filters.value = {
    status: 'DRAFT',
    page: 1,
    number: 0,
    size: 8,
    keyword: undefined,
  }
  // await refetchPersonalProjects()
  isReset.value = false
}

const {
  data: games,
  isRefetching: isRefetchingPersonalProjects,
  isLoading: isLoadingPersonalProjects,
} = usePublisherGetPersonalProjects(filters)

const searchValue = ref('')
const handleRefetchingPersonalProjects = useDebounceFn(async () => {
  filters.value.keyword = searchValue.value
  filters.value.page = 1
}, 500)

const totalResults = computed(() => {
  return games.value?.data?.page?.totalElements ?? 0
})

watch(selectedStatus, async (newValue) => {
  filters.value.status = newValue
})
</script>
