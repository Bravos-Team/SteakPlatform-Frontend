<template>
  <card class="p-3 bg-[#101014]/50 backdrop-blur-2xl w-full">
    <card-content>
      <!-- PRODUCT COUNT AND ACTIONS BUTTON -->
      <div class="flex flex-col lg:flex-row justify-between">
        <div class="flex flex-col">
          <span class="font-bold text-2xl">Your Products({{ productsCount }})</span>
          <span class="font-normal text-md text-gray-400"
            >Manage products for the Steak Games Store and Steak Online Services.</span
          >
        </div>
        <div class="flex items-center">
          <button
            class="flex bg-[#343437]/70 hover:bg-[#343437]/90 cursor-pointer items-center rounded-md px-2 h-9/12 gap-x-1"
          >
            <plus class="w-5 h-5" />
            Create Product
          </button>
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
import { Plus } from 'lucide-vue-next'
import UploadGameBar from './UploadGameBar.vue'
import { Card, CardAction, CardContent } from '@/components/ui/card'
const productsCount = ref(0)
const games = ref([
  {
    name: 'Clash of Clan',
  },

  {
    name: 'Spider man 2 Remastered',
  },

  {
    name: 'Grant Thief Auto ',
  },
])
</script>
