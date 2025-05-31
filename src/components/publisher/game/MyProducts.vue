<template>
  <card class="p-3 bg-[#101014]/50 backdrop-blur-2xl w-full">
    <card-content>
      <!-- PRODUCT COUNT AND ACTIONS BUTTON -->
      <div class="flex flex-col lg:flex-row justify-between">
        <div class="flex flex-col">
          <span class="font-bold text-2xl">Your Products({{ games.length }})</span>
          <span class="font-normal text-md text-gray-400"
            >Manage products for the Steak Games Store and Steak Online Services.</span
          >
        </div>
        <div class="flex items-center">
          <create-product-button />
        </div>
      </div>
      <!-- END  PRODUCT COUNT AND ACTIONS BUTTON -->
      <!-- UPLOAD GAME BAR -->
      <upload-game-bar :games="games" />
      <!-- END UPLOAD GAME BAR -->
    </card-content>
  </card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CreateProductButton from '@/components/publisher/game/CreateProductButton.vue'
import { Plus } from 'lucide-vue-next'
import UploadGameBar from './UploadGameBar.vue'
import { Card, CardContent } from '@/components/ui/card'
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
</script>
