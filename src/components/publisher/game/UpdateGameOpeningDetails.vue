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
      <Dialog :open="showDialog" @update:open="showDialog = $event" class="!no-scrollbar">
        <button
          @click.seft="hanldeOpenDialog"
          class="bg-white/10 hover:bg-white/20 tablet:max-w-200 w-full cursor-pointer px-5 py-3 rounded-md flex gap-x-2 tablet:flex-wrap laptop:flex-nowrap"
        >
          <square-dot class="shrink-0" />
          <span class="lg:text-md xl:text-[17px] flex gap-x-1 w-full flex-wrap">
            <span>{{ $t('title.pages.game_details.actions.update') }}</span>
            <div class="flex gap-x-1 flex-wrap text-wrap">
              <span class="font-bold text-start text-wrap"> '{{ gameInformations?.title }}' </span>
              <span>{{ $t('title.pages.game_details.actions.informations') }}</span>
            </div>
          </span>
        </button>
        <dialog-scroll-content
          class="bg-linear-120 border-2 from-gray-200/7 to-indigo-400/10 min-w-full flex flex-col desktop-xl:min-w-[90rem]"
        >
          <dialog-header>
            <dialog-title class="text-lg tablet:text-2xl flex gap-x-1 text-wrap flex-wrap">
              <span>{{ $t('title.pages.game_details.actions.update') }}</span>
              <span
                class="font-bold bg-clip-text text-start text-transparent bg-gradient-to-r from-amber-200 to-cyan-500"
              >
                {{ gameInformations?.title }}
              </span>
              <span class="">{{ $t('title.pages.game_details.actions.informations') }}</span>
            </dialog-title>
          </dialog-header>
          <!-- START <update-game-opening-details-form /> -->
          <update-game-opening-details-form
            :game-preview-details="gameInformations"
            @update:open-dialog-form="showDialog = $event"
          />
          <!-- END <update-game-details-form /> -->
          <dialog-description class="text-gray-400 text-center text-wrap">
            <span class="text-sm">{{ $t('title.pages.game_details.form.footer_message') }}</span>
          </dialog-description>
        </dialog-scroll-content>
      </Dialog>
    </div>
  </card>
</template>

<script setup lang="ts">
import { Card } from '@/components/ui/card'
// import UpdateGameInformationsButton from '@/components/publisher/gameDetails/UpdateGameInformationsButton.vue'
import { SquareArrowUpRight, SquareDot } from 'lucide-vue-next'

import {
  Dialog,
  DialogScrollContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog'
import UpdateGameOpeningDetailsForm from '@/components/publisher/game/UpdateGameOpeningDetailsForm.vue'
import { ref } from 'vue'
import { type GameType } from '@/types/game/gameDetails/GameDetailsType'

const showDialog = ref(false)

const hanldeOpenDialog = () => {
  showDialog.value = !showDialog.value
}
const props = defineProps<{
  gameInformations: GameType
  isUpdateGameOpening?: boolean
  gameDetails: GameType
}>()
</script>
