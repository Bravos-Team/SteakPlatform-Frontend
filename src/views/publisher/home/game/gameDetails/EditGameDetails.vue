<template>
  <div v-if="!isProjectByIdPending" class="p-4 flex flex-col gap-y-3 @container">
    <div class="grid grid-rows-1 h-full lg:grid-cols-6 xl:grid-cols-12 gap-2">
      <name-and-background-edit :game-details="projectById?.data" />
      <update-game-informations
        :game-details="projectById?.data"
        v-model:get-data-from-update-game-details-form="previewFormData"
      />
    </div>
    <div class="w-full @container">
      <card class="bg-[var(--bg-card-base)]/50 lg:px-[4rem] @container">
        <span v-if="previewFormData" v-html="previewFormData"></span>
        <skeleton-preview-form v-else />
      </card>
    </div>
  </div>
  <edit-game-details-skeleton v-else />
</template>

<script setup lang="ts">
import EditGameDetailsSkeleton from '@/components/publisher/gameDetails/EditGameDetailsSkeleton.vue'
import { Card } from '@/components/ui/card'
import SkeletonPreviewForm from '@/components/publisher/gameDetails/SkeletonPreviewForm.vue'
import { ref } from 'vue'
import NameAndBackgroundEdit from '@/components/publisher/gameDetails/NameAndBackgroundEdit.vue'
import UpdateGameInformations from '@/components/publisher/gameDetails/UpdateGameInformations.vue'
import { useRoute } from 'vue-router'
import { usePublisherGetPersonalProjectById } from '@/hooks/publisher/project/usePublisherPersonalProjects'

const route = useRoute()
const previewFormData = ref('')

const { data: projectById, isPending: isProjectByIdPending } = usePublisherGetPersonalProjectById(
  route?.params?.id as unknown as bigint,
)
</script>
