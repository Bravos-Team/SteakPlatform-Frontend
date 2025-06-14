<template>
  <div
    class="flex flex-col gap-y-1 border-[2px] border-dashed p-3 rounded-sm border-white/20 hover:border-white/40 transition-all duration-500 cursor-pointer bg-linear-100 from-gray-200/20 to-black/50 hover:bg-gray-200/10"
  >
    <span class="font-bold text-lg">Recommended</span>
    <div class="grid grid-cols-1 laptop:grid-cols-2 gap-x-2 gap-y-3">
      <!-- START OS -->
      <div
        class="flex gap-x-1 hover:bg-gray-200/10 transition-colors duration-300 items-center border-1 px-2 border-white/20 text-gray-200/70"
      >
        <span class="text-sm font-bold">OS</span>
        <OsVersionTags :os-version="recommendedRequirements?.osVersion" />
      </div>
      <!-- END OS -->

      <!-- START CPU -->
      <div
        class="flex gap-x-1 items-center border-1 px-2 border-white/20 text-gray-200/70 hover:bg-gray-200/10 transition-colors duration-300"
      >
        <span class="text-sm font-bold">CPU</span>
        <cpu-tags :cpus="recommendedRequirements?.cpu" />
      </div>
      <!-- END CPU-->

      <!-- START GPU -->
      <div
        class="flex gap-x-1 items-center border-1 px-2 border-white/20 text-gray-200/70 hover:bg-gray-200/10 transition-colors duration-300"
      >
        <span class="text-sm font-bold">GPU</span>
        <gpu-tags :gpus="recommendedRequirements?.gpu" />
      </div>
      <!-- END GPU-->

      <!-- START MEMORY -->
      <div
        class="flex gap-x-1 items-center border-1 px-2 border-white/20 text-gray-200/70 hover:bg-gray-200/10 transition-colors duration-300"
      >
        <span class="text-sm font-bold">MEMORY</span>
        <memory-tags :memories="recommendedRequirements?.memory" />
      </div>
      <!-- END MEMORY-->

      <!-- START DIRECTX -->
      <div
        class="flex gap-x-1 items-center border-1 px-2 border-white/20 text-gray-200/70 hover:bg-gray-200/10 transition-colors duration-300"
      >
        <span class="text-sm font-bold">MEMORY</span>
        <direct-x-tags :directxs="recommendedRequirements?.directX" />
      </div>
      <!-- END DIRECTX-->

      <!-- START STORAGE -->
      <div
        class="flex gap-x-1 items-center border-1 px-2 border-white/20 text-gray-200/70 hover:bg-gray-200/10 transition-colors duration-300"
      >
        <span class="text-sm font-bold">STORAGE</span>
        <storage-tags :storages="recommendedRequirements?.storage" />
      </div>
      <!-- END STORAGE -->
    </div>
  </div>
</template>

<script setup lang="ts">
import OsVersionTags from '@/components/publisher/gameDetails/formComponents/systemRequirements/OsVersionTags.vue'
import CpuTags from '@/components/publisher/gameDetails/formComponents/systemRequirements/CpuTags.vue'
import GpuTags from '@/components/publisher/gameDetails/formComponents/systemRequirements/GpuTags.vue'
import MemoryTags from '@/components/publisher/gameDetails/formComponents/systemRequirements/MemoryTags.vue'
import StorageTags from '@/components/publisher/gameDetails/formComponents/systemRequirements/StorageTags.vue'
import DirectXTags from '@/components/publisher/gameDetails/formComponents/systemRequirements/DirectXTags.vue'
import { type RECOMMEDED_REQUIREMENTS_SUGGESTIONS_TYPE } from '@/types/game/gameDetails/GameDetailsType'

const props = defineProps<{
  recommendedRequirements?: RECOMMEDED_REQUIREMENTS_SUGGESTIONS_TYPE
}>()
</script>
