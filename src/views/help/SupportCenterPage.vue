<template>
  <support-center-header />
  <top-banner-bar />
  <div class="flex flex-col gap-y-5 desktop-xl:px-[18rem] py-[3rem]">
    <span class="font-extrabold text-4xl px-3">Popular Topics</span>
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
import { supportCardContentDatas } from '@/components/help/articles/supportCardContentDatas'
</script>
