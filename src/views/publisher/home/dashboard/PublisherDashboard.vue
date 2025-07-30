<template>
  <div class="py-4 px-2 flex flex-col gap-y-5">
    <!--  ORGANIZATION PROFILE -->
    <div class="flex flex-col-reverse lg:flex-row gap-y-3 lg:gap-y-0 lg:gap-x-3">
      <organization-profile />
    </div>
    <!-- END ORGANIZATION PROFILE -->
    <!-- CHANGE LOG SHEET -->
    <div class="z-10">
      <changelog-sheet />
    </div>
    <!-- END  CHANGE LOG SHEET -->
  </div>
</template>
<script setup lang="ts">
import OrganizationProfile from '@/components/publisher/game/OrganizationProfile.vue'
import ChangelogSheet from '@/components/publisher/game/ChangelogSheet.vue'
</script>
