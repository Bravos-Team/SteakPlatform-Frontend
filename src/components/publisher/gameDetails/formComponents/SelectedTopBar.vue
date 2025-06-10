<template>
  <div class="flex laptop:flex-row flex-col w-full gap-y-2 justify-between gap-x-2">
    <!-- START INTERNET CONNECTED SWITCHER -->
    <internet-connected-switcher />
    <!-- END INTERNET CONNECTED SWITCHER -->

    <div class="flex gap-x-2 w-full justify-between laptop:justify-end">
      <!-- START UPDATE AT INFORMATION -->
      <update-at-information />
      <!-- END UPDATE AT INFORMATION -->

      <!-- START VERSION SELECTED -->
      <version-selected-and-status />
      <!-- END VERSION SELECTED -->
    </div>
  </div>
</template>

<script setup lang="ts">
import InternetConnectedSwitcher from '@/components/publisher/gameDetails/formComponents/updateStatus/InternetConnectedSwitcher.vue'
import UpdateAtInformation from '@/components/publisher/gameDetails/formComponents/updateStatus/UpdateAtInformation.vue'
import VersionSelectedAndStatus from '@/components/publisher/gameDetails/formComponents/version/VersionSelectedAndStatus.vue'
</script>
