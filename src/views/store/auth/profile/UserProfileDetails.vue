<template>
  <SkeletonProfileSettings v-if="isUserProfileFetching" />
  <div v-else class="min-h-[50rem] flex flex-col gap-y-6">
    <!-- TITLE -->
    <div class="flex flex-col gap-y-1">
      <span class="text-4xl font-bold gap-y-2">{{
        t('auth.informations.user.account.router.settings.title')
      }}</span>
      <span class="text-gray-300">{{
        t('auth.informations.user.account.router.settings.descriptions')
      }}</span>
    </div>
    <!-- END TITLE -->

    <div class="flex flex-col gap-y-3">
      <div class="flex flex-col gap-y-2">
        <span class="font-bold text-xl">{{
          t('auth.informations.user.account.router.settings.profile_informations')
        }}</span>
        <div class="flex gap-x-1">
          <span class="font-bold">ID:</span>{{ userProfileData?.data.id }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useQueryUserProfile } from '@/hooks/user/useUserProfile'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import SkeletonProfileSettings from '@/components/user/SkeletonProfileSettings.vue'

const { t } = useI18n()
const route = useRoute()

const { data: userProfileData, isFetching: isUserProfileFetching } = useQueryUserProfile()
</script>
