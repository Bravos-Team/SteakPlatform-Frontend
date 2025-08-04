<template>
  <div class="!overflow-auto">
    <store-searching-bar
      :cart-items="userCartData?.data?.items"
      :is-fetching-cart="isUserCartFetching"
    ></store-searching-bar>
    <!-- SLIDER -->
    <store-sliders></store-sliders>
    <!-- END SLIDER -->
    <div
      v-if="useGameListData?.pages"
      class="flex flex-col @min-xl:w-full gap-y-[64px] my-[64px] items-center justify-center h-full"
    >
      <div
        v-if="useGameListData?.pages.length > 0"
        class="w-full flex flex-col gap-y-5 mobile:px-3"
      >
        <span class="text-3xl font-bold">Game Available</span>
        <div
          class="flex flex-wrap gap-x-6 items-center justify-center-safe tablet:justify-start gap-y-25 tablet:gap-y-20 grid-cols-2 tablet:grid tablet:grid-cols-3 laptop:grid-cols-4"
        >
          <div v-if="isFetchingGameList"></div>
          <template v-for="(page, index) in useGameListData?.pages" :index="index">
            <GameCard v-for="(game, index) in page?.data?.items" :key="index" :game="game" />
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// import StoreSliders from '@/components/store/StoreSliders.vue'
// import { onMounted, ref, nextTick, onBeforeMount } from 'vue'
import { useGameStoreInfiniteQueryList } from '@/hooks/store/game/useGameStore'
import GameCard from '@/components/store/GameCard.vue'
import { onMounted, nextTick, defineAsyncComponent } from 'vue'
import StoreSearchingBar from '@/components/store/StoreSearchingBar.vue'
import { useUserCartList } from '@/hooks/store/cart/useUserCart'
const { data: userCartData, isFetching: isUserCartFetching } = useUserCartList()
const {
  data: useGameListData,
  fetchNextPage: fetchNextPageGameList,
  isLoading: isLoadingGameList,
  isFetching: isFetchingGameList,
  hasNextPage: hasNextPageGameList,
} = useGameStoreInfiniteQueryList()

const StoreSliders = defineAsyncComponent(() => import('@/components/store/StoreSliders.vue'))
</script>

<style>
.webkit-overflow-scrolling-touch {
  -webkit-overflow-scrolling: touch;
}

.touch-action-manipulation {
  touch-action: manipulation;
}
.ios-scroll-fix {
  -webkit-overflow-scrolling: touch;
  overflow-y: auto;
  touch-action: manipulation;
}
</style>
