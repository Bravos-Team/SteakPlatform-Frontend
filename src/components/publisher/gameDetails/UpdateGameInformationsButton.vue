<template>
  <Dialog :open="showDialog" @update:open="showDialog = $event" class="!no-scrollbar">
    <button
      @click.seft="hanldeOpenDialog"
      class="bg-white/10 hover:bg-white/20 cursor-pointer px-5 py-3 rounded-md flex gap-x-2"
    >
      <square-dot />
      <span class="lg:text-md xl:text-[17px] flex gap-x-1 flex-wrap">
        <span>{{ $t('title.pages.game_details.actions.update') }}</span>
        <div class="flex gap-x-1">
          <span class="font-bold text-nowrap"> '{{ gameInformations?.name }}' </span>
          <span>{{ $t('title.pages.game_details.actions.informations') }}</span>
        </div>
      </span>
    </button>
    <dialog-scroll-content
      class="resize-x mobile:p-2 bg-linear-120 border-2 from-gray-200/7 to-indigo-400/10 min-w-full flex flex-col desktop-xl:min-w-[90rem]"
    >
      <dialog-header>
        <dialog-title class="text-2xl flex gap-x-1">
          <span>{{ $t('title.pages.game_details.actions.update') }}</span>
          <span
            class="font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-200 to-cyan-500"
          >
            {{ gameInformations?.name }}
          </span>
          <span>{{ $t('title.pages.game_details.actions.informations') }}</span>
        </dialog-title>
      </dialog-header>
      <!-- START <update-game-details-form /> -->
      <update-game-details-form
        :game-preview-details="gameInformations"
        @update:open-dialog-form="showDialog = $event"
      />
      <!-- END <update-game-details-form /> -->
      <dialog-description class="text-gray-400 text-center">
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
}>()
</script>
