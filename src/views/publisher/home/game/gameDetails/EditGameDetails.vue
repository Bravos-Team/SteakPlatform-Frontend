<template>
  <div class="p-4">
    <div class="grid grid-rows-1 md:grid-rows-2 lg:grid-cols-6 xl:grid-cols-12 gap-2">
      <name-and-background-edit :game-details="gameDetails" />
      <update-game-informations :game-details="gameDetails" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import NameAndBackgroundEdit from '@/components/publisher/gameDetails/NameAndBackgroundEdit.vue'
import UpdateGameInformations from '@/components/publisher/gameDetails/UpdateGameInformations.vue'
import { useRoute } from 'vue-router'

const gameDetails = ref<
  | {
      id: string
      name: string
      descriptions: string
    }
  | any
>({
  id: '',
  name: '',
  descriptions: '',
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
onMounted(() => {
  gameDetails.value = games.value.find((game) => game.id === route.params.id)
})
</script>
