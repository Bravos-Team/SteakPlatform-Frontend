<template>
  <edit-game-details-skeleton v-if="isGameByIdPending" />
  <div v-else class="px-2 py-4 flex flex-col gap-y-3 @container">
    <div class="h-full flex flex-col laptop:flex-row gap-2">
      <name-and-background-edit :game-details="gameById?.data" />
      <update-game-informations :game-details="gameById?.data" />
    </div>
    <!-- PREVIEW -->
    <div class="w-full @container">
      <card class="bg-[var(--bg-card-base)]/50 lg:px-[4rem] @container">
        <game-details-preview
          v-if="!isGameByIdPending && gameById?.data"
          :game-details="gameById.data"
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
import NameAndBackgroundEdit from '@/components/publisher/gameDetails/NameAndBackgroundEdit.vue'
import UpdateGameInformations from '@/components/publisher/gameDetails/UpdateGameInformations.vue'
import { useRoute } from 'vue-router'

import { useSystemRequirementsStore } from '@/stores/SystemRequirements/useSystemRequirements'
import { usePublisherGameDetails } from '@/hooks/publisher/game/usePublisherGameManage'
const useSystem = useSystemRequirementsStore()
const route = useRoute()

const { data: gameById, isPending: isGameByIdPending } = usePublisherGameDetails(
  route?.params?.id as unknown as bigint,
)
</script>
