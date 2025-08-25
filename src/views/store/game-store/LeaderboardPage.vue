<template>
  <div class="w-full mx-auto p-8 min-h-screen text-white">
    <div class="flex justify-end w-full gap-2 mb-4 p-2 rounded-2xl">
      <button
        v-for="tab in timeTabs"
        :key="tab.value"
        class="flex items-center gap-2 px-5 py-2 rounded-sm font-medium transition-all duration-200"
        :class="[
          activeTab === tab.value
            ? 'bg-white text-black'
            : 'text-gray-400 hover:text-white hover:bg-gray-800',
          isLoading ? 'cursor-not-allowed opacity-60' : 'cursor-pointer',
        ]"
        @click="handleTabChange(tab.value)"
        :disabled="isLoading"
      >
        <span class="text-sm">{{ tab.label }}</span>
        <div
          v-if="isLoading && activeTab === tab.value"
          class="w-4 h-4 border-1 border-transparent border-t-current rounded-full animate-spin"
        ></div>
      </button>
    </div>

    <div class="bg-white/3 rounded-sm p-6 border border-white/10">
      <div v-if="isLoading" class="flex flex-col items-center justify-center py-16 text-gray-400">
        <div class="flex flex-col items-center gap-4">
          <div
            class="w-12 h-12 border-3 border-gray-700 border-t-white rounded-full animate-spin"
          ></div>
          <p class="text-lg">Loading leaderboard...</p>
        </div>
      </div>

      <div
        v-else-if="sortedGames.length === 0"
        class="flex flex-col items-center justify-center py-16 text-gray-400"
      >
        <svg class="w-16 h-16 mb-4" viewBox="0 0 24 24" fill="currentColor">
          <path
            d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V21C3 22.11 3.89 23 5 23H19C20.11 23 21 22.11 21 21V9H21ZM19 21H5V3H13V9H19V21Z"
          />
        </svg>
        <p class="text-lg">No games data available</p>
      </div>

      <!-- Games List -->
      <div v-else class="flex flex-col gap-4">
        <router-link
          :to="{ name: 'game-details', params: { id: game.id } }"
          v-for="(game, index) in sortedGames"
          :key="game.id"
          class="flex items-center p-5 rounded-xs border transition-all duration-300 cursor-pointer hover:-translate-y-1 hover:shadow-2xl relative overflow-hidden group"
          :class="[
            index === 0
              ? 'bg-gradient-to-r from-yellow-500/10 to-yellow-600/5 border-yellow-500/30 hover:border-yellow-400'
              : index === 1
                ? 'bg-gradient-to-r from-gray-400/10 to-gray-500/5 border-gray-400/30 hover:border-gray-300'
                : index === 2
                  ? 'bg-gradient-to-r from-orange-600/10 to-orange-700/5 border-orange-600/30 hover:border-orange-500'
                  : 'bg-gray-800 border-gray-700 hover:border-gray-600',
          ]"
        >
          <!-- Rank Badge -->
          <div class="flex items-center justify-center w-12 h-12 mr-5 flex-shrink-0">
            <span v-if="index < 3" class="medal">
              <div
                v-if="index === 0"
                class="text-lg font-bold text-yellow-400 border-1 size-9 flex justify-center items-center rounded-full border-yellow-400 bg-yellow-300/30"
              >
                #1
              </div>
              <div
                v-else-if="index === 1"
                class="text-lg font-bold text-gray-400 border-1 size-9 flex justify-center items-center rounded-full border-gray-400 bg-gray-300/30"
              >
                #2
              </div>
              <div
                v-else-if="index === 2"
                class="text-lg font-bold text-orange-400 border-1 size-9 flex justify-center items-center rounded-full border-orange-400 bg-orange-300/30"
              >
                #3
              </div>
            </span>
            <span v-else class="text-xl font-bold text-gray-400">#{{ index + 1 }}</span>
          </div>

          <!-- Game Thumbnail -->
          <div class="w-26 h-16 rounded-xl overflow-hidden mr-5 flex-shrink-0">
            <img
              :src="game.thumbnail"
              :alt="game.name"
              class="w-full h-full object-cover"
              @error="handleImageError"
            />
          </div>

          <!-- Game Info -->
          <div class="flex-1 min-w-0">
            <h3 class="text-xl font-semibold mb-2 text-white truncate">{{ game.name }}</h3>
            <div class="flex items-center gap-4">
              <span
                class="flex items-center gap-1.5 font-semibold text-base"
                :class="getGrowthClass(game.growthRate)"
              >
                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path
                    v-if="game.growthRate > 0"
                    d="M16 6L18.29 8.29L13.41 13.17L9.41 9.17L2 16.59L3.41 18L9.41 12L13.41 16L19.71 9.71L22 12V6H16Z"
                  />
                  <path
                    v-else
                    d="M16 18L18.29 15.71L13.41 10.83L9.41 14.83L2 7.41L3.41 6L9.41 12L13.41 8L19.71 14.29L22 12V18H16Z"
                  />
                </svg>
                {{ formatGrowthRate(game.growthRate) }}
              </span>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import {
  useQueryGamesByDays,
  useQueryGamesByWeeks,
  useQueryGamesByMonths,
} from '@/hooks/store/game/useGameStore'

const activeTab = ref('days')
const leaderBoardGamesData = ref([])

const {
  data: gamesByDays,
  isFetching: isFetchingGamesByDays,
  refetch: refetchGamesByDays,
} = useQueryGamesByDays(false)
const {
  data: gamesByWeeks,
  isFetching: isFetchingGamesByWeeks,
  refetch: refetchGamesByWeeks,
} = useQueryGamesByWeeks(false)
const {
  data: gamesByMonths,
  isFetching: isFetchingGamesByMonths,
  refetch: refetchGamesByMonths,
} = useQueryGamesByMonths(false)

const timeTabs = [
  { value: 'days', label: 'Last 7 Days' },
  { value: 'weeks', label: 'Last 4 Weeks' },
  { value: 'months', label: 'Last 6 Months' },
]

const isLoading = computed(() => {
  switch (activeTab.value) {
    case 'days':
      return isFetchingGamesByDays.value
    case 'weeks':
      return isFetchingGamesByWeeks.value
    case 'months':
      return isFetchingGamesByMonths.value
    default:
      return false
  }
})

const sortedGames = computed(() => {
  if (!leaderBoardGamesData.value || leaderBoardGamesData.value.length === 0) {
    return []
  }

  return [...leaderBoardGamesData.value].sort((a, b) => b.growthRate - a.growthRate).slice(0, 10)
})

const handleTabChange = async (tabValue: string) => {
  if (activeTab.value === tabValue || isLoading.value) return

  activeTab.value = tabValue

  try {
    let response
    switch (tabValue) {
      case 'days':
        response = await refetchGamesByDays()
        break
      case 'weeks':
        response = await refetchGamesByWeeks()
        break
      case 'months':
        response = await refetchGamesByMonths()
        break
    }

    if (response?.data?.data) {
      leaderBoardGamesData.value = response.data.data
    }
  } catch (error) {
    console.error('Error fetching leaderboard data:', error)
  }
}

const getGrowthClass = (growthRate: number) => {
  if (growthRate > 20) return 'text-green-400'
  if (growthRate > 0) return 'text-green-500'
  if (growthRate < -10) return 'text-red-400'
  return 'text-red-500'
}

const formatGrowthRate = (rate: number) => {
  const sign = rate > 0 ? '+' : ''
  return `${sign}${rate.toFixed(1)}%`
}

const getGrowthWidth = (rate: number) => {
  if (sortedGames.value.length === 0) return '0%'
  const maxRate = Math.max(...sortedGames.value.map((g) => Math.abs(g.growthRate)))
  if (maxRate === 0) return '0%'
  const width = (Math.abs(rate) / maxRate) * 100
  return `${Math.min(width, 100)}%`
}

const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement
  target.src = '/placeholder-game.jpg'
}

watch(
  [gamesByDays, gamesByWeeks, gamesByMonths],
  () => {
    switch (activeTab.value) {
      case 'days':
        if (gamesByDays.value?.data) leaderBoardGamesData.value = gamesByDays.value.data
        break
      case 'weeks':
        if (gamesByWeeks.value?.data) leaderBoardGamesData.value = gamesByWeeks.value.data
        break
      case 'months':
        if (gamesByMonths.value?.data) leaderBoardGamesData.value = gamesByMonths.value.data
        break
    }
  },
  { immediate: true },
)

onMounted(async () => {
  await refetchGamesByDays()
})
</script>

<style scoped>
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #1f2937;
}

::-webkit-scrollbar-thumb {
  background: #374151;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #4b5563;
}

@media (max-width: 768px) {
  .leaderboard-container {
    padding: 1rem;
  }

  .time-tabs {
    flex-direction: column;
    width: 100%;
  }

  .game-item {
    padding: 1rem;
  }

  .game-thumbnail {
    width: 3.5rem;
    height: 3.5rem;
  }

  .rank-badge {
    width: 2.5rem;
    height: 2.5rem;
    margin-right: 1rem;
  }

  .medal svg {
    width: 2rem;
    height: 2rem;
  }
}
</style>
