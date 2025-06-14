<template>
  <Dialog :open="showDialog" @update:open="showDialog = $event" class="!no-scrollbar">
    <button
      @click.seft="hanldeOpenDialog"
      class="bg-white/10 hover:bg-white/20 cursor-pointer px-5 py-3 rounded-md flex gap-x-2"
    >
      <square-dot />
      <span class="lg:text-md xl:text-[17px] flex gap-x-1 flex-wrap">
        <span>Update</span>
        <div class="flex gap-x-1">
          <span class="font-bold text-nowrap"> '{{ gameInformations?.name }}' </span>
          <span>informations</span>
        </div>
      </span>
    </button>
    <dialog-scroll-content
      class="resize-x mobile:p-2 bg-linear-120 border-2 from-gray-200/7 to-indigo-400/10 laptop:py-10 laptop:px-5 tablet:min-w-[50rem] w-full laptop:min-w-[70rem] desktop:min-w-[90rem] flex flex-col"
    >
      <dialog-header>
        <dialog-title class="text-2xl"
          >Update
          <span
            class="font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-200 to-cyan-500"
          >
            {{ gameInformations?.name }}
          </span>
          informations</dialog-title
        >
      </dialog-header>
      <!-- START <update-game-details-form /> -->
      <update-game-details-form
        :game-details-form="gameInformations"
        v-model:get-data-from-descriptions-bar="getDataFromUpdateGameDetailsForm"
      />
      <!-- END <update-game-details-form /> -->
    </dialog-scroll-content>
  </Dialog>
</template>

<script setup lang="ts">
import { Dialog, DialogScrollContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import UpdateGameDetailsForm from './UpdateGameDetailsForm.vue'
import { SquareDot } from 'lucide-vue-next'
import { ref } from 'vue'
const showDialog = ref(false)

const hanldeOpenDialog = () => {
  showDialog.value = !showDialog.value
}

const props = defineProps<{
  gameInformations: {
    id: string
    name: string
    descriptions: string
  }
}>()

const getDataFromUpdateGameDetailsForm = defineModel<string>('getDataFromUpdateGameDetailsForm')
</script>
