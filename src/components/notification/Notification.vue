<template>
  <div v-if="visible"  class="z-10 absolute top-0 right-0 flex-col items-start m-[10px] w-[360px]">
    <div
      class="flex items-start justify-center w-full bg-neutral-900 rounded-[8px] px-4 py-2.5 overflow-hidden relative"
    >
      <div class="flex flex-col flex-1 gap-2 relative">
        <div class="flex items-center w-full gap-3 relative">
          <img class="w-12 h-12 relative" alt="Ix success filled" :src="typeConfig.iconURL" />
          <div class="flex flex-col flex-1 items-center justify-center gap-0.5 relative">
            <div
              class="w-full text-white text-[14px] font-extrabold leading-[17.1px] tracking-[0.42px]"
            >
              {{ message }}
            </div>
            <div
              class="w-full text-white text-[12px] font-medium leading-[14.7px] tracking-[0.36px] h-[27px]"
            ></div>
          </div>
        </div>
      </div>
      <img
        class="w-3 h-3 mr-[-1px] mt-[-1px] relative"
        alt="Vector"
        src="https://ccdn.steak.io.vn/assets-close-ico.svg"
      />
    </div>
    <div class="w-full h-1 bg-white rounded-[8px] relative"></div>
  </div>
</template>

<script lang="ts" setup>
import { notificationConfig } from '@/config/notificationConfig'
import { computed } from 'vue'

const props = defineProps<{
  message: string
  type: keyof typeof notificationConfig
  visible: boolean
}>()

const typeConfig = computed(() => notificationConfig[props.type])

</script>
