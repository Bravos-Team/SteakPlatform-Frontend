<template>
  <div class="p-3">
    <card class="py-3 px-1 bg-[#101014]/50 will-change-transform backdrop-blur-2xl w-full">
      <card-header>
        <card-title class="tablet:text-3xl text-xl font-bold text-wrap">
          {{ $t('title.subPagesCompo.sidebar.publisher.game_management.items.published') }}
        </card-title>
      </card-header>
      <card-content class="px-3 py-3 gap-y-2 flex flex-col">
        <!-- UPLOAD GAME BAR -->
        <div
          v-if="isFetchingGameList"
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-3 gap-y-6 w-full py-3'"
        >
          <Card
            v-for="obj in Array(8)"
            class="animate-pulse bg-[var(--bg-card-game-base)]/60 @container overflow-hidden transition-colors duration-200 pt-0 hover:bg-[#28282C] h-[24rem] lg:h-[20rem] xl:h-[25rem] relative"
          >
          </Card>
        </div>
        <div
          class="flex flex-col tablet:grid tablet:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-4 gap-y-6 gap-x-3"
          v-else-if="gamesList?.data && !isFetchingGameList"
        >
          <div v-for="(game, index) in gamesList?.data.content" :key="index">
            <card
              class="!rounded-sm cursor-pointer bg-[var(--bg-card-game-base)]/60 @container overflow-hidden transition-colors duration-200 pt-0 hover:bg-[#28282C] min-h-[15rem] relative"
            >
              <div class="flex flex-col gap-y-2 w-full h-full">
                <router-link
                  :to="{
                    name: 'PublisherGameAcceptedDetails',
                    params: { id: game.gameId as any },
                  }"
                >
                  <div class="flex max-h-[10.5rem] overflow-hidden relative">
                    <img :src="game.thumbnail" class="object-contain w-full h-full" alt="" />
                    <div
                      :class="{
                        'text-green-500': game.status === 'OPENING',
                        'text-red-500': game.status === 'CLOSED',
                      }"
                      class="absolute bg-white/10 w-full text-center px-1 rounded-xs bottom-0 backdrop-blur-[0.5rem] right-0 font-light lower text-sm tracking-[3px]"
                    >
                      <span> {{ game.status }}</span>
                    </div>
                  </div>
                </router-link>
                <div class="min-h-5/12 justify-between flex px-3 w-full">
                  <span class="text-xl text-wrap font-bold">{{ game.title }}</span>
                  <DropdownMenu>
                    <DropdownMenuTrigger as-child>
                      <button
                        class="p-2 cursor-pointer rounded-md hover:bg-gray-600/30 transition-colors"
                      >
                        <Settings class="w-5 h-5" />
                      </button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent class="w-40" side="top" align="end">
                      <DropdownMenuItem
                        v-if="game.status !== 'CLOSED'"
                        class="text-red-400 font-black cursor-pointer"
                        @click="handleClosedGame(game.gameId)"
                      >
                        <button
                          :disabled="isUpdateGameStatusPending"
                          :class="{
                            'cursor-not-allowed opacity-50': isUpdateGameStatusPending,
                            'cursor-pointer': !isUpdateGameStatusPending,
                          }"
                        >
                          🗑️ Đóng Game
                        </button>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        v-else
                        class="text-white font-black cursor-pointer"
                        @click="handleOpenGame(game.gameId)"
                      >
                        <button
                          :disabled="isUpdateGameStatusPending"
                          :class="{
                            'cursor-not-allowed opacity-50': isUpdateGameStatusPending,
                            'cursor-pointer': !isUpdateGameStatusPending,
                          }"
                        >
                          <div class="flex gap-x-2 items-center">
                            <PackageOpen class="size-4" />
                            <span> Open Game</span>
                          </div>
                        </button>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </card>
          </div>
        </div>

        <pagination
          v-if="gamesList?.data.page"
          v-slot="{ page }"
          :total="gamesList.data.page.totalElements"
          :page="gamesList.data.page.number + 1"
          :items-per-page="filters.size!"
          :default-page="gamesList.data.page.number + 1"
          @update:page="filters.page = $event"
        >
          <pagination-content v-slot="{ items }">
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
            <!-- <pagination-ellipsis :index="8" /> -->
            <pagination-next class="cursor-pointer" />
          </pagination-content>
        </pagination>
        <!-- END UPLOAD GAME BAR -->
      </card-content>
    </card>
  </div>
</template>

<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu'
import DropdownMenuTrigger from '@/components/ui/dropdown-menu/DropdownMenuTrigger.vue'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { toastSuccessNotificationPopup } from '@/composables/toast/toastNotificationPopup'
import { GAME_MANAGE_QUERY_KEYS } from '@/hooks/constants/publisher/game/gameManage-key'
import { GAME_STORE_LIST_QUERY_KEYS } from '@/hooks/constants/store/game-key'
import {
  mutatePublisherUpdateGameStatus,
  usePublisherGameList,
} from '@/hooks/publisher/game/usePublisherGameManage'
import { GAME_MANAGE_FILTERS_TYPE } from '@/types/publisher/game/GameManage'
import { useGameStoreList } from '@/views/store/publisher/game/useGameList'
import { useQueryClient } from '@tanstack/vue-query'
import { useDebounceFn } from '@vueuse/core'
import { PackageOpen, Settings } from 'lucide-vue-next'
import { nextTick, ref, watch } from 'vue'
const useGameListStore = useGameStoreList()
const { mutateAsync: mutateGameStatus, isPending: isUpdateGameStatusPending } =
  mutatePublisherUpdateGameStatus()

const filters = ref<GAME_MANAGE_FILTERS_TYPE>({
  size: 8,
  page: 1,
})

const { data: gamesList, isFetching: isFetchingGameList } = usePublisherGameList(filters)

const queryClient = useQueryClient()
const handleOpenGame = useDebounceFn(async (gameId: bigint) => {
  try {
    await mutateGameStatus({
      gameId,
      status: 'OPENING',
    }).then(async (rp) => {
      if (rp.status === 200) {
        {
          await queryClient.invalidateQueries({
            queryKey: GAME_STORE_LIST_QUERY_KEYS.ALL,
          })
          await queryClient.invalidateQueries({
            queryKey: GAME_MANAGE_QUERY_KEYS.LIST(filters),
          })
          toastSuccessNotificationPopup('Reopen game successfully', '')
        }
      }
    })
  } catch (err: any) {
    console.error('Error opening game:', err)
  }
}, 200)

const handleClosedGame = useDebounceFn(async (gameId: bigint) => {
  try {
    await mutateGameStatus({
      gameId,
      status: 'CLOSED',
    }).then(async (rp) => {
      if (rp.status === 200) {
        {
          await queryClient.invalidateQueries({
            queryKey: GAME_STORE_LIST_QUERY_KEYS.ALL,
          })
          await queryClient.invalidateQueries({
            queryKey: GAME_MANAGE_QUERY_KEYS.LIST(filters),
          })
          toastSuccessNotificationPopup('Close game successfully', '')
        }
      }
    })
  } catch (err: any) {
    console.error('Error closing game:', err)
  }
}, 200)

watch(
  () => useGameListStore.pagination,
  async () => {
    await nextTick()
    filters.value.page = useGameListStore.pagination.page
    filters.value.size = useGameListStore.pagination.size
    console.log(filters.value)
  },
  { deep: true },
)
</script>
