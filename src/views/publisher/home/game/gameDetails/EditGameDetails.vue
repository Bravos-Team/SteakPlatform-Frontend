<template>
  <edit-game-details-skeleton v-if="isProjectByIdPending" />
  <div v-else class="p-4 flex flex-col gap-y-3 @container">
    <div class="grid grid-rows-1 h-full lg:grid-cols-6 xl:grid-cols-12 gap-2">
      <name-and-background-edit :game-details="projectById?.data" />
      <update-game-informations :game-details="projectById?.data" />
    </div>
    <!-- PREVIEW -->
    <div class="w-full @container">
      <card class="bg-[var(--bg-card-base)]/50 lg:px-[4rem] @container">
        <game-details-preview
          v-if="!isProjectByIdPending && projectById?.data"
          :game-details="projectById.data"
        />
        <skeleton-preview-form v-else />
      </card>
    </div>
    <!-- END PREVIEW -->
  </div>
</template>

<script setup lang="ts">
import EditGameDetailsSkeleton from '@/components/publisher/gameDetails/EditGameDetailsSkeleton.vue'
import { Card } from '@/components/ui/card'
import SkeletonPreviewForm from '@/components/publisher/gameDetails/SkeletonPreviewForm.vue'
import GameDetailsPreview from '@/components/publisher/gameDetails/GameDetailsPreview.vue'
import { nextTick, onBeforeMount, watch } from 'vue'
import NameAndBackgroundEdit from '@/components/publisher/gameDetails/NameAndBackgroundEdit.vue'
import UpdateGameInformations from '@/components/publisher/gameDetails/UpdateGameInformations.vue'
import { useRoute } from 'vue-router'
import { usePublisherGetPersonalProjectById } from '@/hooks/publisher/project/usePublisherPersonalProjects'

import { useSystemRequirementsStore } from '@/stores/SystemRequirements/useSystemRequirements'
const useSystem = useSystemRequirementsStore()
const route = useRoute()

const { data: projectById, isPending: isProjectByIdPending } = usePublisherGetPersonalProjectById(
  route?.params?.id as unknown as bigint,
)

watch(
  projectById,
  async () => {
    await nextTick()
    if (projectById.value?.data.systemRequirements) {
      useSystem.minimumRequirement = projectById.value.data.systemRequirements.minimum
      useSystem.recommendRequirement =
        projectById.value.data.systemRequirements.recommended ?? useSystem.minimumRequirement
    } else {
      useSystem.resetSystemRequirements()
    }
  },
  { deep: true },
)

onBeforeMount(async () => {
  usePublisherGetPersonalProjectById(route?.params?.id as unknown as bigint)
  await nextTick()
})
</script>
