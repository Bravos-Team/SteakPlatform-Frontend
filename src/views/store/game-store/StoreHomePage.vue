<template>
  <div id="containerBoxes">
    <store-searching-bar :cart-items="userCartData?.data?.items"
      :is-fetching-cart="isUserCartFetching"></store-searching-bar>

    <store-sliders></store-sliders>

    <!-- GAME COMING SOON -->
    <div v-if="!isGameComingSoonFetching" class="">
    </div>
    <div v-if="gameComingSoonData?.data && !isGameComingSoonFetching" class="px-3">
      <CollaboratorsBar :game-collaborators-list="gameComingSoonData?.data.content" />
    </div>
    <!-- END GAME COMING SOON -->
    <!-- GAME AVAILABLE -->
    <div v-if="useGameListData?.pages"
      class="flex flex-col @min-xl:w-full gap-y-[64px] my-[64px] items-center justify-center h-full">
      <div v-if="useGameListData?.pages.length > 0" class="w-full flex flex-col gap-y-5 mobile:px-3">
        <span class="text-3xl font-bold">Game Available</span>
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
import { useGameStoreInfiniteQueryList } from '@/hooks/store/game/useGameStore'
import GameCard from '@/components/store/GameCard.vue'
import StoreSearchingBar from '@/components/store/StoreSearchingBar.vue'
import { useUserCartList } from '@/hooks/store/cart/useUserCart'
import { useGameCommingSoonQuery } from '@/hooks/store/game/useGameStore'
import CollaboratorsBar from '@/components/common/CollaboratorsBar.vue'

const { data: gameComingSoonData, isFetching: isGameComingSoonFetching } = useGameCommingSoonQuery()
const { data: userCartData, isFetching: isUserCartFetching } = useUserCartList()

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
    if (useGameListData.value?.pages.maxCursor === 1754672400000) return
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
window.onscroll = function () {
  // if (window.innerHeight + window.pageYOffset >= containerBoxes.value!.offsetHeight) {
  //   alert("At the bottom!")

  // }
}

</script>
