<template>
  <div class="w-full flex flex-col gap-y-3" :class="`bg-[${background_color}] h-[${height}]`">
    <!-- HEADER CATEGORY LIST-->
    <div class="flex flex-row justify-between w-full lg:mb-[23px] h-[30px]">
      <!-- Category title-->
      <router-link to="#" class="flex justify-center group/category items-center">
        <p class="font-bold text-[20px] text-white capitalize">{{ titleCategory }}</p>
        <img
          class="w-[8px] ms-2 mt-1 group-hover/category:translate-x-[7px] transition-all"
          src="https://ccdn.steak.io.vn/assets-arrow-right-white-ico.svg"
          alt=""
        />
      </router-link>
      <!-- END CATEGORY TITLE -->

      <!-- BUTTON PRE NEXT CATEGORY LIST-->
      <div class="flex gap-x-[10px] justify-center items-center">
        <button
          class="rounded-full focus:border focus:border-[#fff] hover:bg-[#fff]/40 size-[30px] bg-[#fff]/15 flex justify-center items-center"
        >
          <img
            class="w-[6px] rotate-180"
            src="https://ccdn.steak.io.vn/assets-arrow-right-white-ico.svg"
            alt=""
          />
        </button>
        <button
          class="rounded-full focus:border focus:border-[#fff] hover:bg-[#fff]/40 size-[30px] bg-[#fff]/15 flex justify-center items-center"
        >
          <img
            class="w-[6px]"
            src="https://ccdn.steak.io.vn/assets-arrow-right-white-ico.svg"
            alt=""
          />
        </button>
      </div>
      <!-- END BUTTON PRE NEXT CATEGORY LIST -->
    </div>
    <!-- END HEADER CATEGORY LIST-->

    <!-- CATEGORY CONTENT LIST-->
    <div class=" px-3 w-[{{ width }}] overflow-auto no-scrollbar snap-x  flex gap-x-[20px] ">
      <div
        class="min-w-full h-[422px] shrink-0 snap-start"
        v-for="(game, index) in gameByCategoryList"
      >
        <router-link
          :to="{ name: 'game-details', params: { id: game.id.toString() } }"
          class="w-[211px] h-[369px] cursor-pointer"
        >
          <game-card :game="game"></game-card>
        </router-link>
      </div>
    </div>
    <!-- END CATEGORY CONTENT LIST-->
  </div>
</template>

<script setup lang="ts">
import { GAME_ITEM } from '@/types/store/game'
import GameCard from '@/components/store/GameCard.vue'
import { onMounted } from 'vue'
import { PropType } from 'vue'
const props = defineProps({
  height: {
    type: String,
    default: '470px',
  },
  background_color: {
    type: String,
    default: '',
  },
  titleCategory: {
    type: String,
    default: 'not have category title yet',
  },
  gameByCategoryList: {
    type: Array as PropType<GAME_ITEM[]>,
    default: () => [],
  },
})

onMounted(() => {
  console.log('GameByCategoryList:', props.gameByCategoryList)
})
</script>
