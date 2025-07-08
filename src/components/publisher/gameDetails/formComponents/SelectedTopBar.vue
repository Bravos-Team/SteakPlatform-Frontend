<template>
  <div class="flex laptop:flex-row flex-col w-full gap-y-2 justify-between gap-x-2">
    <!-- START INTERNET CONNECTED SWITCHER -->
    <internet-connected-switcher v-model:model-value="getInternetConnectedRequiredData" />
    <!-- END INTERNET CONNECTED SWITCHER -->

    <div class="flex gap-x-2 w-full justify-between laptop:justify-end">
      <!-- START UPDATE AT INFORMATION -->
      <update-at-information
        :update-at="new Date(updateAt).toLocaleDateString('vi-VN', { dateStyle: 'full' })"
      />
      <!-- END UPDATE AT INFORMATION -->

      <!-- START VERSION SELECTED -->
      <version-selected-and-status v-model:model-value="getVersionSelected" />
      <!-- END VERSION SELECTED -->
    </div>
  </div>
</template>

<script setup lang="ts">
import InternetConnectedSwitcher from '@/components/publisher/gameDetails/formComponents/updateStatus/InternetConnectedSwitcher.vue'
import UpdateAtInformation from '@/components/publisher/gameDetails/formComponents/updateStatus/UpdateAtInformation.vue'
import VersionSelectedAndStatus from '@/components/publisher/gameDetails/formComponents/version/VersionSelectedAndStatus.vue'

const getVersionSelected = defineModel<string>('getVersionSelected')
const getInternetConnectedRequiredData = defineModel<boolean>('getInternetConnectedRequiredData')
const updateAt = defineModel<string | number | Date>('updateAt')
</script>
