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
        class="grid grid-cols-12 gap-x-1 hover:bg-gray-200/10 flex-wrap transition-colors duration-300 items-center border-1 px-2 border-white/20 text-gray-200/70"
      >
        <span class="col-span-1 text-sm font-bold">OS</span>
        <div class="col-span-11">
          <OsVersionTags
            v-model:emit-recommended-os-version="recommend.osVersion"
            :os-version="systemRequirementSuggestions?.osVersion"
          />
        </div>
      </div>
      <!-- END OS -->

      <!-- START CPU -->
      <div
        class="grid grid-cols-12 gap-x-1 items-center border-1 px-2 flex-wrap border-white/20 text-gray-200/70 hover:bg-gray-200/10 transition-colors duration-300"
      >
        <span class="text-sm font-bold col-span-1">CPU</span>
        <div class="col-span-11">
          <cpu-tags
            v-model:emit-cpu-data="recommend.cpu"
            :cpus="systemRequirementSuggestions?.cpu"
          />
        </div>
      </div>
      <!-- END CPU-->

      <!-- START GPU -->
      <div
        class="grid grid-cols-12 gap-x-1 items-center border-1 flex-wrap px-2 border-white/20 text-gray-200/70 hover:bg-gray-200/10 transition-colors duration-300"
      >
        <span class="text-sm font-bold col-span-1">GPU</span>
        <div class="col-span-11">
          <gpu-tags
            :gpus="systemRequirementSuggestions?.gpu"
            v-model:emit-gpu-data="recommend.gpu"
          />
        </div>
      </div>
      <!-- END GPU-->

      <!-- START MEMORY -->
      <div
        class="grid grid-cols-12 gap-x-1 items-center border-1 px-2 border-white/20 text-gray-200/70 hover:bg-gray-200/10 transition-colors duration-300"
      >
        <span class="text-sm font-bold col-span-3">MEMORY</span>
        <div class="col-span-9">
          <memory-tags
            :memories="systemRequirementSuggestions?.memory"
            v-model:emit-memory-data="recommend.memory"
          />
        </div>
      </div>
      <!-- END MEMORY-->

      <!-- START DIRECTX -->
      <div
        class="grid grid-cols-12 gap-x-1 items-center border-1 px-2 border-white/20 text-gray-200/70 hover:bg-gray-200/10 transition-colors duration-300"
      >
        <span class="text-sm font-bold col-span-3">DIRECTX</span>
        <div class="col-span-9">
          <direct-x-tags
            :directxs="systemRequirementSuggestions?.directX"
            v-model:emit-directx-data="recommend.directX"
          />
        </div>
      </div>
      <!-- END DIRECTX-->

      <!-- START STORAGE -->
      <div
        class="grid grid-cols-12 gap-x-1 flex-wrap items-center border-1 px-2 border-white/20 text-gray-200/70 hover:bg-gray-200/10 transition-colors duration-300"
      >
        <span class="text-sm font-bold col-span-3">STORAGE</span>
        <div class="col-span-9">
          <storage-tags
            :storages="systemRequirementSuggestions?.storage"
            v-model:emit-storage-data="recommend.storage"
          />
        </div>
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
