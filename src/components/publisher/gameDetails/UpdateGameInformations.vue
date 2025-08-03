<template>
  <card
    class="bg-[var(--bg-card-base)]/50 xl:col-span-7 lg:col-span-4 p-4 border-double border-3 inset-shadow-blue-300 flex flex-col @container justify-between w-full"
  >
    <div class="flex flex-col desktop-xl:w-7/12 gap-y-6 h-full w-full">
      <div class="flex w-full gap-x-2 items-center">
        <img src="https://ccdn.steak.io.vn/logo_steak.svg" class="size-10" alt="" />
        <span class="font-bold text-lg lg:text-2xl">FOR DEVELOPER</span>
      </div>
      <span class="text-lg text-wrap">
        As part of our support for the indie
        <span class="underline decoration-sky-500 inline-block">
          <div class="flex gap-x-1">
            <span>developer community</span>
            <square-arrow-up-right class="text-sky-500" />
          </div>
        </span>
        we regularly give extra
        <div class="inline-block">
          <span class="underline decoration-sky-500 flex gap-x-1">
            <span>help and assistance</span>
            <square-arrow-up-right class="text-sky-500" />
          </span>
        </div>
        to promising upcoming or recently released indie titles. Let us know about your game!
      </span>
    </div>
    <div class="flex w-full justify-end items-center">
      <update-game-informations-button :game-informations="gameDetails" />
    </div>
  </card>
</template>

<script setup lang="ts">
import { Card } from '@/components/ui/card'
import UpdateGameInformationsButton from '@/components/publisher/gameDetails/UpdateGameInformationsButton.vue'
import { SquareArrowUpRight } from 'lucide-vue-next'
import { GameType } from '@/types/game/gameDetails/GameDetailsType'

const props = defineProps<{
  gameDetails: GameType
}>()
</script>
