<template>
  <Dialog :open="showDialog" @update:open="showDialog = $event">
    <button
      @click.seft="hanldeOpenDialog"
      class="bg-white/10 hover:bg-white/20 cursor-pointer px-5 py-3 rounded-md flex gap-x-2"
    >
      <square-dot />
      <span class="lg:text-md xl:text-lg flex"> Update your game informations </span>
    </button>
    <dialog-scroll-content
      class="resize-x tablet:min-w-[50rem] mobile:min-w-[30rem] laptop:min-w-[70rem] desktop:min-w-[90rem] flex flex-col"
    >
      <dialog-header>
        <dialog-title class="text-2xl">Update your game informations</dialog-title>
      </dialog-header>
      <!-- START <update-game-details-form /> -->
      <update-game-details-form />
      <!-- END <update-game-details-form /> -->
    </dialog-scroll-content>
  </Dialog>
</template>

<script setup lang="ts">
import {
  Dialog,
  DialogFooter,
  DialogScrollContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import UpdateGameDetailsForm from './UpdateGameDetailsForm.vue'
import { SquareDot } from 'lucide-vue-next'
import { ref } from 'vue'
import { ScrollArea } from '@/components/ui/scroll-area'
const showDialog = ref(false)

const hanldeOpenDialog = () => {
  showDialog.value = !showDialog.value
}
</script>
