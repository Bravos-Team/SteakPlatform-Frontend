<template>
  <div
    class="text-wrap flex flex-col gap-y-1 border-[2px] border-dashed p-3 rounded-sm border-white/20 hover:border-white/40 transition-all duration-500 cursor-pointer bg-linear-100 from-gray-200/20 to-black/50 hover:bg-gray-200/10"
  >
    <span class="font-bold text-lg">
      {{ $t('title.pages.game_details.form.system_requirements.recommended') }}</span
    >
    <div class="grid grid-cols-1 laptop:grid-cols-2 gap-x-2 gap-y-3">
      <!-- START OS -->
      <div
        class="flex gap-x-1 hover:bg-gray-200/10 flex-wrap transition-colors duration-300 items-center border-1 px-2 border-white/20 text-gray-200/70"
      >
        <span class="text-sm font-bold">OS</span>
        <OsVersionTags
          v-model:emit-recommended-os-version="recommend.osVersion"
          :os-version="systemRequirementSuggestions?.osVersion"
        />
      </div>
      <!-- END OS -->

      <!-- START CPU -->
      <div
        class="flex gap-x-1 items-center border-1 px-2 flex-wrap border-white/20 text-gray-200/70 hover:bg-gray-200/10 transition-colors duration-300"
      >
        <span class="text-sm font-bold">CPU</span>
        <cpu-tags v-model:emit-cpu-data="recommend.cpu" :cpus="systemRequirementSuggestions?.cpu" />
      </div>
      <!-- END CPU-->

      <!-- START GPU -->
      <div
        class="flex gap-x-1 items-center border-1 flex-wrap px-2 border-white/20 text-gray-200/70 hover:bg-gray-200/10 transition-colors duration-300"
      >
        <span class="text-sm font-bold">GPU</span>
        <gpu-tags :gpus="systemRequirementSuggestions?.gpu" v-model:emit-gpu-data="recommend.gpu" />
      </div>
      <!-- END GPU-->

      <!-- START MEMORY -->
      <div
        class="flex gap-x-1 items-center flex-wrap border-1 px-2 border-white/20 text-gray-200/70 hover:bg-gray-200/10 transition-colors duration-300"
      >
        <span class="text-sm font-bold">MEMORY</span>
        <memory-tags
          :memories="systemRequirementSuggestions?.memory"
          v-model:emit-memory-data="recommend.memory"
        />
      </div>
      <!-- END MEMORY-->

      <!-- START DIRECTX -->
      <div
        class="flex gap-x-1 flex-wrap items-center border-1 px-2 border-white/20 text-gray-200/70 hover:bg-gray-200/10 transition-colors duration-300"
      >
        <span class="text-sm font-bold">DIRECTX</span>
        <direct-x-tags
          :directxs="systemRequirementSuggestions?.directX"
          v-model:emit-directx-data="recommend.directX"
        />
      </div>
      <!-- END DIRECTX-->

      <!-- START STORAGE -->
      <div
        class="flex gap-x-1 flex-wrap items-center border-1 px-2 border-white/20 text-gray-200/70 hover:bg-gray-200/10 transition-colors duration-300"
      >
        <span class="text-sm font-bold">STORAGE</span>
        <storage-tags
          :storages="systemRequirementSuggestions?.storage"
          v-model:emit-storage-data="recommend.storage"
        />
      </div>
      <!-- END STORAGE -->
    </div>
  </div>
</template>

<script setup lang="ts">
import OsVersionTags from '@/components/publisher/gameDetails/formComponents/systemRequirements/recommended/OsVersionTags.vue'
import CpuTags from '@/components/publisher/gameDetails/formComponents/systemRequirements/recommended/CpuTags.vue'
import GpuTags from '@/components/publisher/gameDetails/formComponents/systemRequirements/recommended/GpuTags.vue'
import MemoryTags from '@/components/publisher/gameDetails/formComponents/systemRequirements/recommended/MemoryTags.vue'
import StorageTags from '@/components/publisher/gameDetails/formComponents/systemRequirements/recommended/StorageTags.vue'
import DirectXTags from '@/components/publisher/gameDetails/formComponents/systemRequirements/recommended/DirectXTags.vue'

import {
  SystemRequirementsType,
  systemRequirementSuggestions,
} from '@/types/game/gameDetails/GameDetailsType'

const props = defineProps<{
  recommend: SystemRequirementsType
}>()
</script>
