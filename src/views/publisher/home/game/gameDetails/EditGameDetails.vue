<template>
  <div class="p-4 flex flex-col gap-y-3 @container">
    <div class="grid grid-rows-1 h-full lg:grid-cols-6 xl:grid-cols-12 gap-2">
      <name-and-background-edit :game-details="gameDetails" />
      <update-game-informations
        :game-details="gameDetails"
        v-model:get-data-from-update-game-details-form="previewFormData"
      />
    </div>
    <div class="w-full @container">
      <card class="bg-[var(--bg-card-base)]/50 lg:px-[4rem] @container">
        <span v-if="previewFormData" v-html="previewFormData"></span>
        <skeleton-preview-form v-else />
      </card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Card } from '@/components/ui/card'
import SkeletonPreviewForm from '@/components/publisher/gameDetails/SkeletonPreviewForm.vue'
import { ref, watch, onMounted } from 'vue'
import NameAndBackgroundEdit from '@/components/publisher/gameDetails/NameAndBackgroundEdit.vue'
import UpdateGameInformations from '@/components/publisher/gameDetails/UpdateGameInformations.vue'
import { useRoute } from 'vue-router'

const gameDetails = ref<
  | {
      id: string
      name: string
      descriptions: string
      image: string
    }
  | any
>({
  id: '',
  name: '',
  descriptions: '',
  image: 'https://ccdn.steak.io.vn/assets-desert.png',
})

const games = ref([
  {
    id: '1',
    name: 'Clash of Clan',
    descriptions: 'stupid game',
  },

  {
    id: '2',
    name: 'Spider man 2 Remastered',

    descriptions: 'GOTY 2023',
  },

  {
    id: '3',
    name: 'Grant Thief Auto VI ',

    descriptions: 'seventh awards ',
  },
  {
    id: '4',
    name: 'Super Ultra Gay Deluxe Edition',
    descriptions: 'anbatocom',
  },
])

const route = useRoute()
const previewFormData = ref('')
onMounted(() => {
  gameDetails.value = games.value.find((game) => game.id === route.params.id)
})
</script>
