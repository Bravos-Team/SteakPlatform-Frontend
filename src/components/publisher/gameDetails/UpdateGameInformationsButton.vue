<template>
  <Dialog :open="showDialog" @update:open="showDialog = $event" class="!no-scrollbar">
    <button
      @click.seft="hanldeOpenDialog"
      class="bg-white/10 hover:bg-white/20 tablet:max-w-200 w-full cursor-pointer px-5 py-3 rounded-md flex gap-x-2 tablet:flex-wrap laptop:flex-nowrap"
    >
      <square-dot class="shrink-0" />
      <span class="lg:text-md xl:text-[17px] flex gap-x-1 w-full flex-wrap">
        <span>{{ $t('title.pages.game_details.actions.update') }}</span>
        <div class="flex gap-x-1 flex-wrap text-wrap">
          <span class="font-bold text-start text-wrap"> '{{ gameInformations?.name }}' </span>
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
            {{ gameInformations?.name }}
          </span>
          <span class="">{{ $t('title.pages.game_details.actions.informations') }}</span>
        </dialog-title>
      </dialog-header>
      <!-- START <update-game-details-form /> -->
      <update-game-details-form
        :is-update-game-opening="isUpdateGameOpening"
        :game-preview-details="gameInformations"
        @update:open-dialog-form="showDialog = $event"
      />
      <!-- END <update-game-details-form /> -->
      <dialog-description class="text-gray-400 text-center text-wrap">
        <span class="text-sm">{{ $t('title.pages.game_details.form.footer_message') }}</span>
      </dialog-description>
    </dialog-scroll-content>
  </Dialog>
</template>

<script setup lang="ts">
import {
  Dialog,
  DialogScrollContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog'
import UpdateGameDetailsForm from '@/components/publisher/gameDetails/UpdateGameDetailsForm.vue'
import { SquareDot } from 'lucide-vue-next'
import { ref } from 'vue'
import { type GameType } from '@/types/game/gameDetails/GameDetailsType'

const showDialog = ref(false)

const hanldeOpenDialog = () => {
  showDialog.value = !showDialog.value
}
const props = defineProps<{
  gameInformations: GameType
  isUpdateGameOpening?: boolean
}>()
</script>
