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
          <div v-for="(game, index) in gamesList?.data" :key="index">
            <card
              class="cursor-pointer bg-[var(--bg-card-game-base)]/60 @container overflow-hidden transition-colors duration-200 pt-0 hover:bg-[#28282C] min-h-[18rem] relative"
            >
              <div class="flex flex-col gap-y-2 w-full h-full">
                <router-link
                  :to="{
                    name: 'PublisherGameAcceptedDetails',
                    params: { id: game.gameId as any },
                  }"
                >
                  <div class="flex max-h-[15rem] overflow-hidden">
                    <img :src="game.thumbnail" class="object-cover w-full h-full" alt="" />
                  </div>
                </router-link>
                <div class="min-h-5/12 flex-col flex px-3">
                  <span class="text-xl text-wrap font-bold">{{ game.title }}</span>
                </div>
              </div>
            </card>
          </div>
        </div>

        <pagination
          v-if="gamesList"
          v-slot="{ page }"
          :total="8"
          :page="useGameListStore.pagination.page"
          :items-per-page="8"
          :default-page="1"
          @update:page="useGameListStore.pagination.page = $event"
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
import { usePublisherGameList } from '@/hooks/publisher/game/usePublisherGameManage'
import { useI18n } from 'vue-i18n'
import { GAME_MANAGE_FILTERS_TYPE } from '@/types/publisher/game/GameManage'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { useGameStoreList } from '@/views/store/publisher/game/useGameList'
import { storeToRefs } from 'pinia'
import { nextTick, onMounted, ref, watch } from 'vue'
const useGameListStore = useGameStoreList()

const filters = ref<GAME_MANAGE_FILTERS_TYPE>({
  ...useGameListStore.pagination,
  size: 100,
})

const { t } = useI18n()
const showI18n = (key: string) => {
  return t(key)
}

const { data: gamesList, isFetching: isFetchingGameList } = usePublisherGameList(filters)

watch(
  () => useGameListStore.pagination,
  async () => {
    await nextTick()
    filters.value.page = useGameListStore.pagination.page
    filters.value.size = useGameListStore.pagination.size
  },
  { deep: true },
)
</script>
