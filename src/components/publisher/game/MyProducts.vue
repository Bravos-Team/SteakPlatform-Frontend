<template>
  <card class="py-3 px-1 bg-[#101014]/50 backdrop-blur-2xl w-full">
    <card-content class="px-3 py-3">
      <!-- PRODUCT COUNT AND ACTIONS BUTTON -->
      <div class="flex flex-col lg:flex-row justify-between">
        <div class="flex flex-col">
          <!-- <span class="font-bold text-2xl">Your Products({{ games?.length }})</span> -->
          <span class="font-normal text-md text-gray-400"
            >Manage products for the Steak Games Store and Steak Online Services.</span
          >
        </div>
        <div class="flex items-center gap-x-3">
          <!-- SEARCH BY KEYWORD -->
          <label for="keyword">
            <input
              v-model="filters.keyword"
              type="text"
              id="keyword"
              placeholder="Search by keyword"
              autocomplete="off"
              class="focus:ring-2 focus:ring-blue-500 outline-1 px-2 py-1 rounded-sm"
              @keyup.enter="handleRefetchingPersonalProjects"
            />
          </label>
          <!-- END SEARCH BY KEYWORD -->

          <!-- SELECT STATUS -->
          <Select v-model:model-value="selectedStatus">
            <select-trigger>
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
          <create-product-button />
          <!-- END CREATE BUTTON -->
        </div>
      </div>
      <!-- END  PRODUCT COUNT AND ACTIONS BUTTON -->

      <!-- UPLOAD GAME BAR -->
      <div
        v-if="isLoadingPersonalProjects || isRefetchingPersonalProjects"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-3 gap-y-6 w-full py-3'"
      >
        <Card
          v-for="obj in Array(4)"
          class="animate-pulse bg-[var(--bg-card-game-base)]/60 @container overflow-hidden transition-colors duration-200 pt-0 hover:bg-[#28282C] h-[24rem] lg:h-[20rem] xl:h-[25rem] relative"
        >
        </Card>
      </div>
      <upload-game-bar :games="games?.data.content ?? []" v-else />
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
import { computed, ref } from 'vue'
import CreateProductButton from '@/components/publisher/game/CreateProductButton.vue'
import UploadGameBar from '@/components/publisher/game/UploadGameBar.vue'
import { Card, CardContent } from '@/components/ui/card'
import { usePublisherGetPersonalProjects } from '@/hooks/publisher/project/usePublisherPersonalProjects'
import { PUBLISHER_PERSONAL_PROJECT_TYPE_FILTERS } from '@/types/publisher/project/PublisherPersonalProjectType'
import { useI18n } from 'vue-i18n'
import { watch } from 'vue'
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
  status: null,
  page: 1,
  size: 10,
  keyword: undefined,
})

const statusOptions = [
  { value: 'DRAFT', label: 'title.pages.game_management.filters.options.draft' },
  { value: 'ACCEPTED', label: 'title.pages.game_management.filters.options.accepted' },
  { value: 'REJECTED', label: 'title.pages.game_management.filters.options.rejected' },
  { value: 'PENDING_REVIEW', label: 'title.pages.game_management.filters.options.pending' },
]

const {
  data: games,
  refetch: refetchPersonalProjects,
  isRefetching: isRefetchingPersonalProjects,
  isLoading: isLoadingPersonalProjects,
} = usePublisherGetPersonalProjects(filters)

const handleRefetchingPersonalProjects = async () => {
  await refetchPersonalProjects()
}
watch(selectedStatus, async (newValue) => {
  filters.value.status = newValue
  handleRefetchingPersonalProjects()
})
</script>
