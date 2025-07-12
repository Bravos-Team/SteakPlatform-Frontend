<template>
  <card class="p-3 bg-[#101014]/50 backdrop-blur-2xl w-full">
    <card-content>
      <!-- PRODUCT COUNT AND ACTIONS BUTTON -->
      <div class="flex flex-col lg:flex-row justify-between">
        <div class="flex flex-col">
          <!-- <span class="font-bold text-2xl">Your Products({{ games?.length }})</span> -->
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
      <upload-game-bar :games="games?.data.content ?? []" />
      <!-- END UPLOAD GAME BAR -->
    </card-content>
  </card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CreateProductButton from '@/components/publisher/game/CreateProductButton.vue'
import UploadGameBar from '@/components/publisher/game/UploadGameBar.vue'
import { Card, CardContent } from '@/components/ui/card'
import { usePublisherGetPersonalProjects } from '@/hooks/publisher/project/usePublisherPersonalProjects'
import { PUBLISHER_PERSONAL_PROJECT_TYPE_FILTERS } from '@/types/publisher/project/PublisherPersonalProjectType'
const filters = ref<PUBLISHER_PERSONAL_PROJECT_TYPE_FILTERS>({
  status: null,
  page: 1,
  size: 10,
  keyword: undefined,
})

const { data: games } = usePublisherGetPersonalProjects(filters)
</script>
