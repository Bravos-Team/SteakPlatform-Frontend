<template>
  <div class="flex tablet:flex-row flex-col w-full gap-y-2 justify-between gap-x-2">
    <!-- START INTERNET CONNECTED SWITCHER -->
    <internet-connected-switcher v-model:model-value="getInternetConnectedRequiredData" />
    <!-- END INTERNET CONNECTED SWITCHER -->

    <div class="flex gap-x-2 w-full justify-between tablet:justify-end">
      <!-- START UPDATE AT INFORMATION -->
      <div class="flex items-center gap-x-2">
        <span>{{ $t('title.pages.game_details.form.update_at') }}:</span>
        <tooltip>
          <tooltip-trigger>
            <update-at-information
              :update-at="new Date(updateAt).toLocaleDateString('vi-VN', { dateStyle: 'full' })"
            />
          </tooltip-trigger>
          <tooltip-content>
            <!-- {{ new Date(updateAt).toLocaleDateString('vi-VN', { dateStyle: 'short' }) }} -->
            {{
              new Date(updateAt).toLocaleTimeString('vi-VN') +
              ' ' +
              new Date(updateAt).toLocaleString('vi-VN', { dateStyle: 'full' })
            }}
          </tooltip-content>
        </tooltip>
      </div>
      <!-- END UPDATE AT INFORMATION -->

      <!-- START VERSION SELECTED -->
      <!-- <version-selected-and-status v-model:model-value="getVersionSelected" /> -->
      <!-- END VERSION SELECTED -->
    </div>
  </div>
</template>

<script setup lang="ts">
import InternetConnectedSwitcher from '@/components/publisher/gameDetails/formComponents/updateStatus/InternetConnectedSwitcher.vue'
import UpdateAtInformation from '@/components/publisher/gameDetails/formComponents/updateStatus/UpdateAtInformation.vue'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
// import VersionSelectedAndStatus from '@/components/publisher/gameDetails/formComponents/version/VersionSelectedAndStatus.vue'

// const getVersionSelected = defineModel<string>('getVersionSelected')
const getInternetConnectedRequiredData = defineModel<boolean>('getInternetConnectedRequiredData')
const updateAt = defineModel<string | number | Date>('updateAt')
</script>
