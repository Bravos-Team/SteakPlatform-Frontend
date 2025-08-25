<template>
  <support-center-header />
  <top-banner-bar />
  <div class="flex flex-col gap-y-5 desktop-xl:px-[18rem] py-[3rem]">
    <span class="font-extrabold text-4xl px-3">{{ $t('popularTopics') }}</span>
    <div
      class="grid grid-cols-1 tablet:grid-cols-2 px-2 laptop:grid-cols-3 tablet:gap-y-8 gap-3 tablet:gap-x-8"
    >
      <support-card-content v-for="card in supportCardContentDatas" :content="card" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import SupportCenterHeader from '@/components/help/SupportCenterHeader.vue'
import TopBannerBar from '@/components/help/topBannerBar/TopBannerBar.vue'
import SupportCardContent from '@/components/help/articles/SupportCardContent.vue'
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
const { t } = useI18n()

import {
  Sparkles,
  UserRoundCog,
  ShieldCheck,
  CloudUpload,
  CreditCard,
  Gamepad,
  type LucideIcon,
  Store,
  Users2,
} from 'lucide-vue-next'
const supportCardContentDatas = computed(() => [
  {
    icon: Sparkles,
    name: t('gettingStarted'),
    descriptions: t('gettingStartedDescriptions'),
    link: '/help/getting-started',
  },
  {
    icon: CreditCard,
    name: t('paymentAndBilling'),
    descriptions: t('paymentAndBillingDescriptions'),
    link: '/help/payment',
  },
  {
    icon: CloudUpload,
    name: t('publishYourGame'),
    descriptions: t('publishYourGameDescriptions'),
    link: '/help/publish',
  },
  {
    icon: ShieldCheck,
    name: t('accountSecurity'),
    descriptions: t('accountSecurityDescriptions'),
    link: '/help/security',
  },
  {
    icon: UserRoundCog,
    name: t('accountSettings'),
    descriptions: t('accountSettingsDescriptions'),
    link: '/help/account-settings',
  },
  {
    icon: Gamepad,
    name: t('gameplayIssues'),
    descriptions: t('gameplayIssuesDescriptions'),
    link: '/help/gameplay-issues',
  },
  {
    icon: Store,
    name: t('marketplaceAndItems'),
    descriptions: t('marketplaceAndItemsDescriptions'),
    link: '/help/marketplace',
  },
  {
    icon: Users2,
    name: t('communityGuidelines'),
    descriptions: t('communityGuidelinesDescriptions'),
    link: '/help/community-guidelines',
  },
])
</script>
