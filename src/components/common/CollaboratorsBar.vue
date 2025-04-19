<template>
  <div class="flex flex-row gap-x-[22px]" :class="`h-[${height}]`">
    <router-link
      to="#"
      class="text-white flex flex-col"
      v-for="game in gameCollaboratorsList"
      :key="game.id"
    >
      <collaboration-card :game="game" :gapY="gapCollacborationCardY"></collaboration-card>
    </router-link>
  </div>
</template>

<script setup>
import CollaborationCard from '@/components/store/CollaborationCard.vue'
const props = defineProps({
  height: {
    type: String,
    default: '388px',
  },
  gameCollaboratorsList: {
    type: Array,
    default: () => [],
  },
  gapCollacborationCardY: {
    type: String,
    default: '10px',
  },
})
</script>
