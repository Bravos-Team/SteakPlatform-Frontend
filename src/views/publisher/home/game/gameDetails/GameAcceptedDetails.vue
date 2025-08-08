<template>
  <edit-game-details-skeleton v-if="isGameByIdPending" />
  <div v-else class="px-2 py-4 flex flex-col gap-y-3 @container">
    <div v-if="gameById?.data" class="h-full flex flex-col laptop:flex-row gap-2">
      <name-and-game-background-edit
        :is-update-game-opening="true"
        :game-details="gameById?.data.details"
      />
      <update-game-opening-details
        :game-informations="{ ...gameById.data.details, price: gameById.data.game.price }"
        :game-details="{ ...gameById.data.details, price: gameById.data.game.price }"
      />
    </div>
    <!-- PREVIEW -->
    <div class="w-full @container">
      <card class="bg-[var(--bg-card-base)]/50 lg:px-[4rem] @container">
        <game-details-preview
          v-if="gameById?.data"
          :game-details="{ ...gameById.data.details, price: gameById.data.game.price }"
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
import NameAndGameBackgroundEdit from '@/components/publisher/game/NameAndGameBackgroundEdit.vue'
import UpdateGameOpeningDetails from '@/components/publisher/game/UpdateGameOpeningDetails.vue'
import { useRoute } from 'vue-router'

import { useSystemRequirementsStore } from '@/stores/SystemRequirements/useSystemRequirements'
import { usePublisherGameDetails } from '@/hooks/publisher/game/usePublisherGameManage'
const useSystem = useSystemRequirementsStore()
const route = useRoute()

const { data: gameById, isPending: isGameByIdPending } = usePublisherGameDetails(
  route?.params?.id as unknown as bigint,
)
</script>
