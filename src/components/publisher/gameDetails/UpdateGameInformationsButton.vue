<template>
  <Dialog :open="showDialog" @update:open="showDialog = $event">
    <button
      @click.seft="hanldeOpenDialog"
      class="bg-white/10 hover:bg-white/20 cursor-pointer px-5 py-3 rounded-md flex gap-x-2"
    >
      <square-dot />
      <span class="lg:text-md xl:text-lg"> Update your game informations </span>
    </button>
    <dialog-scroll-content class="min-w-9/12">
      <dialog-header>
        <dialog-title class="text-2xl">Update your game informations</dialog-title>
      </dialog-header>

      <dialog-description class="text-md flex flex-col gap-y-4">
        <!-- START <update-game-details-form /> -->
        <update-game-details-form />
        <!-- END <update-game-details-form /> -->
      </dialog-description>
    </dialog-scroll-content>
  </Dialog>
</template>

<script setup lang="ts">
import {
  Dialog,
  DialogFooter,
  DialogScrollContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import UpdateGameDetailsForm from './UpdateGameDetailsForm.vue'
import { ref } from 'vue'

const showDialog = ref(false)

const hanldeOpenDialog = () => {
  showDialog.value = !showDialog.value
}
</script>
