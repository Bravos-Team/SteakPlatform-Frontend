<template>
  <div
    class="flex flex-col gap-y-1 border-[2px] border-dashed p-3 rounded-sm border-white/20 hover:border-white/40 transition-all duration-500 cursor-pointer bg-linear-300 from-gray-200/20 to-black/50 hover:bg-gray-200/10"
  >
    <span class="font-bold text-lg">Minimum</span>
    <div class="grid grid-cols-1 laptop:grid-cols-2 gap-x-2 gap-y-3">
      <!-- START OS -->
      <div
        class="flex hover:bg-gray-200/10 transition-colors duration-300 gap-x-1 items-center border-1 px-2 border-white/20 text-gray-200/70"
      >
        <span class="text-sm font-bold">OS</span>
        <OsVersionTags :os-version="minimumRequirements?.osVersion" />
      </div>
      <!-- END OS -->

      <!-- START CPU -->
      <div
        class="flex hover:bg-gray-200/10 transition-colors duration-300 gap-x-1 items-center border-1 px-2 border-white/20 text-gray-200/70"
      >
        <span class="text-sm font-bold">CPU</span>
        <cpu-tags :cpus="minimumRequirements?.cpu" />
      </div>
      <!-- END CPU-->

      <!-- START GPU -->
      <div
        class="flex gap-x-1 items-center border-1 px-2 border-white/20 hover:bg-gray-200/10 transition-colors duration-300 text-gray-200/70"
      >
        <span class="text-sm font-bold">GPU</span>
        <gpu-tags :gpus="minimumRequirements?.gpu" />
      </div>
      <!-- END GPU-->

      <!-- START MEMORY -->
      <div
        class="flex gap-x-1 items-center border-1 px-2 border-white/20 text-gray-200/70 hover:bg-gray-200/10 transition-colors duration-300"
      >
        <span class="text-sm font-bold">MEMORY</span>
        <memory-tags :memories="minimumRequirements?.memory" />
      </div>
      <!-- END MEMORY-->

      <!-- START DIRECTX -->
      <div
        class="flex gap-x-1 items-center border-1 px-2 border-white/20 text-gray-200/70 hover:bg-gray-200/10 transition-colors duration-300"
      >
        <span class="text-sm font-bold">MEMORY</span>
        <direct-x-tags :directxs="minimumRequirements?.directX" />
      </div>
      <!-- END DIRECTX-->

      <!-- START STORAGE -->
      <div
        class="flex gap-x-1 items-center border-1 px-2 border-white/20 text-gray-200/70 hover:bg-gray-200/10 transition-colors duration-300"
      >
        <span class="text-sm font-bold">STORAGE</span>
        <storage-tags :storages="minimumRequirements?.storage" />
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
import { type MINIMUM_REQUIREMENTS_SUGGESTIONS_TYPE } from '@/types/game/gameDetails/GameDetailsType'

const props = defineProps<{
  minimumRequirements?: MINIMUM_REQUIREMENTS_SUGGESTIONS_TYPE
}>()
</script>
