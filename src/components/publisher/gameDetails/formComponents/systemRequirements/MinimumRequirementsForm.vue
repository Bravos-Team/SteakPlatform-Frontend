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
        <OsVersionTags
          v-model:emit-minimum-os-versions="minimumRequirements.osVersion"
          :os-version="systemRequirementSuggestions?.osVersion"
        />
      </div>
      <!-- END OS -->

      <!-- START CPU -->
      <div
        class="flex hover:bg-gray-200/10 transition-colors duration-300 gap-x-1 items-center border-1 px-2 border-white/20 text-gray-200/70"
      >
        <span class="text-sm font-bold">CPU</span>
        <cpu-tags
          v-model:emit-cpu-data="minimumRequirements.cpu"
          :cpus="systemRequirementSuggestions?.cpu"
        />
      </div>
      <!-- END CPU-->

      <!-- START GPU -->
      <div
        class="flex gap-x-1 items-center border-1 px-2 border-white/20 hover:bg-gray-200/10 transition-colors duration-300 text-gray-200/70"
      >
        <span class="text-sm font-bold">GPU</span>
        <gpu-tags
          v-model:emit-gpu-data="minimumRequirements.gpu"
          :gpus="systemRequirementSuggestions?.gpu"
        />
      </div>
      <!-- END GPU-->

      <!-- START MEMORY -->
      <div
        class="flex gap-x-1 items-center border-1 px-2 border-white/20 text-gray-200/70 hover:bg-gray-200/10 transition-colors duration-300"
      >
        <span class="text-sm font-bold">MEMORY</span>
        <memory-tags
          v-model:emit-memory-data="minimumRequirements.memory"
          :memories="systemRequirementSuggestions?.memory"
        />
      </div>
      <!-- END MEMORY-->

      <!-- START DIRECTX -->
      <div
        class="flex gap-x-1 items-center border-1 px-2 border-white/20 text-gray-200/70 hover:bg-gray-200/10 transition-colors duration-300"
      >
        <span class="text-sm font-bold">DIRECTX</span>
        <direct-x-tags
          v-model:emit-directx-data="minimumRequirements.directX"
          :directxs="systemRequirementSuggestions?.directX"
        />
      </div>
      <!-- END DIRECTX-->

      <!-- START STORAGE -->
      <div
        class="flex gap-x-1 items-center border-1 px-2 border-white/20 text-gray-200/70 hover:bg-gray-200/10 transition-colors duration-300"
      >
        <span class="text-sm font-bold">STORAGE</span>
        <storage-tags
          v-model:emit-storage-data="minimumRequirements.storage"
          :storages="systemRequirementSuggestions?.storage"
        />
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
  getDefaultValueRequirements,
} from '@/types/game/gameDetails/GameDetailsType'
import { ref, watch } from 'vue'
const props = defineProps<{
  minimumRequirements: SystemRequirementsType
}>()

const minimumRequirements = ref<SystemRequirementsType>(props.minimumRequirements)
const minimumRequirementsModel = defineModel<SystemRequirementsType>('minimumRequirementsModel', {
  default: getDefaultValueRequirements(),
})

watch(
  minimumRequirements,
  (val) => {
    minimumRequirementsModel.value = val
  },
  { deep: true, immediate: true },
)
</script>
