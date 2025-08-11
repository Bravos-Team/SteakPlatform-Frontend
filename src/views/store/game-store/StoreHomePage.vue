<template>
  <div id="containerBoxes">
    <store-searching-bar :cart-items="userCartData?.data?.items"
      :is-fetching-cart="isUserCartFetching"></store-searching-bar>

    <store-sliders></store-sliders>

    <div class="pt-6">
      <!-- GAME COMING SOON -->
      <div v-if="gameComingSoonData?.data && !isGameComingSoonFetching" class="px-3">
        <CollaboratorsBar :is-loading-games="isGameComingSoonFetching" :title-compo="'Games Coming Soon'"
          :game-collaborators-list="gameComingSoonData?.data.content" />
      </div>
      <!-- END GAME COMING SOON -->

      <!-- GAME NEWEST RELEASES -->
      <div v-if="gameNewestReleasesData?.data && !isGameNewestReleasesFetching" class="px-3">
        <CollaboratorsBar :title-compo="'Games Newest Releases'" :is-loading-games="isGameNewestReleasesFetching"
          :game-collaborators-list="gameNewestReleasesData?.data.content" />
      </div>
      <!-- END GAME NEWEST RELEASES -->

      <!-- TOP PLAYED -->
      <div v-if="topPlayedGamesData?.data && !isTopPlayedGamesFetching" class="px-3">
        <CollaboratorsBar :is-loading-games="isTopPlayedGamesFetching" :title-compo="'Games Top Played'"
          :game-collaborators-list="topPlayedGamesData?.data.content" />
      </div>
      <!-- END TOP PLAYED -->

    </div>

    <!-- GAME AVAILABLE -->
    <div v-if="useGameListData?.pages"
      class="flex flex-col @min-xl:w-full gap-y-[64px] my-[64px] items-center justify-center h-full">
      <div v-if="useGameListData?.pages.length > 0" class="w-full flex flex-col gap-y-5 mobile:px-3">
        <span class="text-3xl font-bold">Games Available</span>
        <div class="grid grid-cols-12 gap-x-4 tablet:gap-y-13 gap-y-8">

          <template v-for="(page, index) in useGameListData?.pages" :key="index">
            <GameCard v-for="(game, i) in page?.items" :key="game.id || i" :game="game" />
          </template>
        </div>
      </div>
    </div>
    <!-- END GAME AVAILABLE -->
  </div>

  <div ref="loadMoreTrigger" class="h-4"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { defineAsyncComponent } from 'vue'
import GameCard from '@/components/store/GameCard.vue'
import StoreSearchingBar from '@/components/store/StoreSearchingBar.vue'
import { useUserCartList } from '@/hooks/store/cart/useUserCart'
import { useGameCommingSoonQuery, useGameStoreInfiniteQueryList, useGameNewestReleasesQuery, useTopPlayedGamesQuery } from '@/hooks/store/game/useGameStore'
import CollaboratorsBar from '@/components/common/CollaboratorsBar.vue'

const { data: gameComingSoonData, isFetching: isGameComingSoonFetching } = useGameCommingSoonQuery()
const { data: userCartData, isFetching: isUserCartFetching } = useUserCartList()
const { data: gameNewestReleasesData, isFetching: isGameNewestReleasesFetching } = useGameNewestReleasesQuery()
const { data: topPlayedGamesData, isFetching: isTopPlayedGamesFetching } = useTopPlayedGamesQuery()

const {
  data: useGameListData,
  fetchNextPage: fetchNextPageGameList,
  isFetching: isFetchingGameList,
  hasNextPage: hasNextPageGameList,
} = useGameStoreInfiniteQueryList()

const StoreSliders = defineAsyncComponent(() => import('@/components/store/StoreSliders.vue'))

const loadMoreTrigger = ref<HTMLElement | null>(null)
let observer: IntersectionObserver

onMounted(() => {
  observer = new IntersectionObserver(entries => {
    if (!hasNextPageGameList.value) return
    if (entries[0].isIntersecting && hasNextPageGameList.value && !isFetchingGameList.value) {
      fetchNextPageGameList()
    }
  })
  if (loadMoreTrigger.value) {
    observer.observe(loadMoreTrigger.value)
  }
})

onUnmounted(() => {
  if (observer && loadMoreTrigger.value) {
    observer.disconnect()
  }
})

const containerBoxes = ref<HTMLElement | null>(null)


</script>
