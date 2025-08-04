<template>
  <div
    class="flex flex-col gap-y-1 border-[2px] border-dashed p-3 rounded-sm border-white/20 hover:border-white/40 transition-all duration-500 cursor-pointer bg-linear-300 from-gray-200/20 to-black/50 hover:bg-gray-200/10"
  >
    <span class="font-bold text-lg">
      {{ $t('title.pages.game_details.form.system_requirements.minimum') }}</span
    >
    <div class="grid grid-cols-1 laptop:grid-cols-2 gap-x-2 gap-y-3">
      <!-- START OS -->
      <div
        class="grid grid-cols-12 hover:bg-gray-200/10 transition-colors duration-300 gap-x-1 items-center border-1 px-2 border-white/20 text-gray-200/70"
      >
        <span class="col-span-1 text-sm font-bold">OS</span>
        <div class="col-span-11 laptop:col-span-10">
          <OsVersionTags
            v-model:emit-minimum-os-versions="minimum.osVersion"
            :os-version="systemRequirementSuggestions?.osVersion"
          />
        </div>
      </div>
      <!-- END OS -->

      <!-- START CPU -->
      <div
        class="grid grid-cols-12 hover:bg-gray-200/10 transition-colors duration-300 gap-x-1 items-center border-1 px-2 border-white/20 text-gray-200/70"
      >
        <span class="col-span-1 text-sm font-bold">CPU</span>
        <div class="col-span-11">
          <cpu-tags v-model:emit-cpu-data="minimum.cpu" :cpus="systemRequirementSuggestions?.cpu" />
        </div>
      </div>
      <!-- END CPU-->

      <!-- START GPU -->
      <div
        class="grid grid-cols-12 gap-x-1 items-center flex-wrap border-1 px-2 border-white/20 hover:bg-gray-200/10 transition-colors duration-300 text-gray-200/70"
      >
        <span class="col-span-3 text-sm font-bold">GPU</span>
        <div class="col-span-9">
          <gpu-tags v-model:emit-gpu-data="minimum.gpu" :gpus="systemRequirementSuggestions?.gpu" />
        </div>
      </div>
      <!-- END GPU-->

      <!-- START MEMORY -->
      <div
        class="grid grid-cols-12 gap-x-1 items-center flex-wrap border-1 px-2 border-white/20 text-gray-200/70 hover:bg-gray-200/10 transition-colors duration-300"
      >
        <span class="col-span-3 text-sm font-bold">MEMORY</span>
        <div class="col-span-9">
          <memory-tags
            v-model:emit-memory-data="minimum.memory"
            :memories="systemRequirementSuggestions?.memory"
          />
        </div>
      </div>
      <!-- END MEMORY-->

      <!-- START DIRECTX -->
      <div
        class="grid grid-cols-12 gap-x-1 items-center flex-wrap border-1 px-2 border-white/20 text-gray-200/70 hover:bg-gray-200/10 transition-colors duration-300"
      >
        <span class="col-span-3 text-sm font-bold">DIRECTX</span>
        <div class="col-span-9">
          <direct-x-tags
            v-model:emit-directx-data="minimum.directX"
            :directxs="systemRequirementSuggestions?.directX"
          />
        </div>
      </div>
      <!-- END DIRECTX-->

      <!-- START STORAGE -->
      <div
        class="grid grid-cols-12 gap-x-1 items-center border-1 px-2 border-white/20 text-gray-200/70 hover:bg-gray-200/10 transition-colors duration-300"
      >
        <span class="col-span-3 text-sm font-bold">STORAGE</span>
        <div class="col-span-9">
          <storage-tags
            v-model:emit-storage-data="minimum.storage"
            :storages="systemRequirementSuggestions?.storage"
          />
        </div>
      </div>
      <!-- END STORAGE -->
    </div>
  </div>
</template>

<script setup lang="ts">
import OsVersionTags from '@/components/publisher/gameDetails/formComponents/systemRequirements/minimum/OsVersionTags.vue'
import CpuTags from '@/components/publisher/gameDetails/formComponents/systemRequirements/minimum/CpuTags.vue'
import GpuTags from '@/components/publisher/gameDetails/formComponents/systemRequirements/minimum/GpuTags.vue'
import MemoryTags from '@/components/publisher/gameDetails/formComponents/systemRequirements/minimum/MemoryTags.vue'
import StorageTags from '@/components/publisher/gameDetails/formComponents/systemRequirements/minimum/StorageTags.vue'
import DirectXTags from '@/components/publisher/gameDetails/formComponents/systemRequirements/minimum/DirectXTags.vue'
import {
  SystemRequirementsType,
  systemRequirementSuggestions,
} from '@/types/game/gameDetails/GameDetailsType'

const props = defineProps<{
  minimum: SystemRequirementsType
}>()
</script>
