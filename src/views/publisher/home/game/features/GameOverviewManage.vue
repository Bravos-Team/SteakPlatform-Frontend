<template>
  <div class="p-4 flex flex-col gap-y-5">
    <!--  ORGANIZATION PROFILE -->
    <div class="flex flex-col-reverse lg:flex-row gap-y-3 lg:gap-y-0 lg:gap-x-3">
      <organization-profile />
    </div>
    <!-- END ORGANIZATION PROFILE -->

    <!-- CHANGE LOG SHEET -->
    <div>
      <changelog-sheet />
    </div>
    <!-- END  CHANGE LOG SHEET -->

    <!-- MY PRODUCTS -->
    <div class="flex w-full">
      <my-products />
    </div>
    <!-- END MY PRODUCTS -->
  </div>
</template>
<script setup lang="ts">
import MyProducts from '@/components/publisher/game/MyProducts.vue'
import OrganizationProfile from '@/components/publisher/game/OrganizationProfile.vue'
import ChangelogSheet from '@/components/publisher/game/ChangelogSheet.vue'
</script>
