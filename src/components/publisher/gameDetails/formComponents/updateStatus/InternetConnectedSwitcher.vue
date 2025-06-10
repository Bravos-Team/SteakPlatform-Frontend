<template>
  <div class="flex gap-x-2 items-center w-full">
    <div class="flex gap-x-1 relative">
      <Label for="internet_connected_switcher">
        <Wifi
          class="w-5 h-5 transition-all duration-1000 absolute -top-[5px] left-0"
          :class="{
            'opacity-0 ': !isInternetConnectedRequired,
            'text-green-400': isInternetConnectedRequired,
          }"
        />
        <WifiOff
          class="w-5 h-5 transition-all duration-1000 absolute -top-[5px] left-0"
          :class="{ 'opacity-0 ': isInternetConnectedRequired }"
        />
        <span class="ml-6">Require Internet Connection</span>
      </Label>
    </div>
    <Switch
      @update:model-value="isInternetConnectedRequired = $event"
      id="internet_connected_switcher"
    />
  </div>
</template>

<script setup lang="ts">
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { ref } from 'vue'
import { WifiOff, Wifi } from 'lucide-vue-next'
const isInternetConnectedRequired = ref(false)
</script>
