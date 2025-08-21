<template>
  <div class="flex flex-col gap-y-2">
    <div class="min-w-full min-h-screen grid grid-cols-12">
      <div
        class="tablet:col-span-9 order-2 tablet:order-1 col-span-12 laptop:col-span-10 flex flex-col gap-y-2"
      >
        <CommonFilterSelectBox
          :is-pending-reset-filter="isResetFilter"
          @reset-filter="handleResetFilter"
          :common-filter-option="commonFilterOption"
          @common-filter-change="(value) => (commonFilterOption = value)"
        />
        <div
          v-if="isPendingDiscoverGameFiltered || isFilteringGames"
          class="grid grid-cols-12 w-full gap-x-2 gap-y-4 px-3 animate-pulse"
        >
          <div
            v-for="n in 12"
            class="min-h-[15rem] col-span-3 rounded-xs overflow-hidden flex-col flex"
          >
            <div class="h-full w-full bg-white/8"></div>
            <div class="bg-white/6 w-full h-full"></div>
          </div>
        </div>
        <div v-else-if="gameFilteredList" class="grid grid-cols-12 w-full gap-x-2 gap-y-8 px-3">
          <GameCard
            v-if="gameFilteredList.content && gameFilteredList.content.length > 0"
            :game="game as any"
            v-for="game in gameFilteredList.content!"
          />
          <span v-else>Not game found</span>
          <span class="font-bold text-xl"></span>
        </div>
      </div>
      <div
        class="laptop:col-span-2 order-1 tablet:order-2 col-span-12 px-3 tablet:col-span-3 tablet:block"
      >
        <FilterOptionsBar
          :is-filtering="isFilteringGames"
          @update:price="
            (value) => {
              filters.minPrice = value.min
              filters.maxPrice = value.max
            }
          "
          @update:genres="(value) => (filters.genreIds = value)"
          @update:tags="(value) => (filters.tagIds = value)"
          @update:sort-by="(value) => (filters.sortBy = value)"
          v-model:search-value-on-change="searchValue"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CommonFilterSelectBox from '@/components/store/discover/CommonFilterSelectBox.vue'
import FilterOptionsBar from '@/components/store/discover/FilterOptionsBar.vue'
import { onBeforeMount, ref, watch } from 'vue'
import {
  useMutateToGetDiscoverGameFiltered,
  useGameCommingSoonQuery,
  useGameNewestReleasesQuery,
} from '@/hooks/store/game/useGameStore'
import { useRoute, useRouter } from 'vue-router'
import { DISCOVER_FILTERED_GAMES_DATA_TYPES, DISCOVER_GAME_FILTERS } from '@/types/game/store/Game'
import GameCard from '@/components/store/GameCard.vue'
import { useDebounceFn } from '@vueuse/core'
import { useQueryClient } from '@tanstack/vue-query'
import { GAME_STORE_LIST_QUERY_KEYS } from '@/hooks/constants/store/game-key'

const queryClient = useQueryClient()

const route = useRoute()
const router = useRouter()
const filters = ref<DISCOVER_GAME_FILTERS>({
  page: 1,
  pageSize: 12,
})

const { mutateAsync: mutateDiscoverGameFiltered, isPending: isPendingDiscoverGameFiltered } =
  useMutateToGetDiscoverGameFiltered()
const { data: comingSoonGames, refetch: refetchComingSoonGames } = useGameCommingSoonQuery(
  filters as any,
  false,
)
const { data: newestReleases, refetch: refetchNewestReleases } = useGameNewestReleasesQuery(
  filters as any,
  false,
)
const gameFilteredList = ref<DISCOVER_FILTERED_GAMES_DATA_TYPES>()
const commonFilterOption = ref('all')
const searchValue = ref('')
const isFilteringGames = ref(false)
const isResetFilter = ref(false)

const handleResetFilter = useDebounceFn(async (value: boolean) => {
  isResetFilter.value = true
  if (value) {
    commonFilterOption.value = 'all'
    await router.push({
      query: {
        ...route.query,
        keyword: null,
      },
    })
    delete filters.value.keyword
    resetFilters()
    queryClient.removeQueries({
      queryKey: GAME_STORE_LIST_QUERY_KEYS.DISCOVER_GAMES(filters),
    })
  }
  isResetFilter.value = false
}, 200)
const resetFilters = () => {
  return (filters.value = {
    page: 1,
    pageSize: 12,
  })
}

watch(commonFilterOption, async (type) => {
  isFilteringGames.value = true
  switch (type) {
    case 'coming': {
      try {
        const response = (await refetchComingSoonGames()).data
        if (response!.status === 200) {
          gameFilteredList.value = comingSoonGames.value?.data
          await queryClient.setQueryData(
            GAME_STORE_LIST_QUERY_KEYS.DISCOVER_GAMES(filters),
            response,
          )
        }
      } catch (err: any) {
        console.log(err)
      } finally {
        isFilteringGames.value = false
      }
      break
    }
    case 'newest': {
      try {
        const response = (await refetchNewestReleases()).data
        if (response?.status === 200) {
          gameFilteredList.value = newestReleases.value?.data
          await queryClient.setQueryData(
            GAME_STORE_LIST_QUERY_KEYS.DISCOVER_GAMES(filters),
            response,
          )
        }
      } catch (err: any) {
        console.log(err)
      } finally {
        isFilteringGames.value = false
      }
      break
    }
    case 'all': {
      try {
        resetFilters()
      } finally {
        isFilteringGames.value = false
      }
      break
    }
    default:
      resetFilters()
      break
  }
})

watch(
  searchValue,
  async (newVal) => {
    isFilteringGames.value = true
    try {
      filters.value.keyword = newVal || null
      const response = await mutateDiscoverGameFiltered(filters)
      await router.push({
        query: {
          ...route.query,
          keyword: newVal,
        },
      })
      if (response) {
        gameFilteredList.value = response
        await queryClient.setQueryData(GAME_STORE_LIST_QUERY_KEYS.DISCOVER_GAMES(filters), response)
      }
    } finally {
      isFilteringGames.value = false
    }
  },
  { deep: true },
)

watch(
  () => filters.value,
  async () => {
    isFilteringGames.value = true
    try {
      const response = await mutateDiscoverGameFiltered(filters)
      if (response) {
        gameFilteredList.value = response
        await queryClient.setQueryData(GAME_STORE_LIST_QUERY_KEYS.DISCOVER_GAMES(filters), response)
      }
    } finally {
      isFilteringGames.value = false
    }
  },
  {
    deep: true,
  },
)

onBeforeMount(async () => {
  if (route.query.keyword) {
    filters.value.keyword = route.query.keyword as string
  } else {
    filters.value.keyword = null
  }
})
</script>
