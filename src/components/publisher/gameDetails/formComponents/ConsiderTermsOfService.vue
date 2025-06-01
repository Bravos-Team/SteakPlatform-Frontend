<template>
  <!-- TITLE DESCRIPTIONS ALERT -->
  <div class="before:content-['*'] before:text-red-500">
    The information you enter on this page will be used by the team at
    <span class="text-white"> Steak Game Store</span>
    to discover your title and consider you for additional help as part of Steak Community.
  </div>
  <!-- END TITLE DESCRIPTIONS ALERT -->

  <!-- CONSIDER ALERT BOX -->
  <card
    :class="{ hidden: consider.showConsiderCard == false }"
    class="group border-yellow-400/50 p-3 bg-yellow-200/10"
    @click="consider.showConsider = !consider.showConsider"
  >
    <div class="flex flex-col gap-y-1">
      <div
        class="flex px-1 lg:px-3 py-1 cursor-pointer w-full hover:bg-yellow-300/10 rounded-md gap-x-2 items-center text-white transition-colors duration-250 ease-in-out"
        :class="{ 'w-full': consider.showConsider == false }"
      >
        <badge-alert />
        <span> Consider Carefully </span>
      </div>
      <span
        :class="{ hidden: consider.showConsider == false }"
        class="flex flex-col gap-y-1 lg:gap-y-0 px-1 lg:px-11"
      >
        <span>
          Please only share information that you feel would help Steak understand your game better.
          If your game is confidential or you are working with a third party such as a publisher,
          please ensure that you are able to share this information with Epic. If you would like
          details of your project to be shared with partners we work with, you can let us know
          below. To make things easier, please share your information in English. Apologies for any
          hassle, and thanks for understanding!
        </span>
        <div class="flex justify-end">
          <button
            class="px-4 cursor-pointer rounded-md py-1 bg-orange-400/30 hover:bg-orange-400/40 transition-colors duration-250 text-md"
            @click="consider.showConsiderCard = false"
          >
            Hide
          </button>
        </div>
      </span>
    </div>
  </card>
  <!-- END CONSIDER ALERT BOX -->
</template>
<script setup lang="ts">
import { Card } from '@/components/ui/card'

import { ref } from 'vue'
import { BadgeAlert } from 'lucide-vue-next'

const consider = ref<{ showConsider: boolean; showConsiderCard: boolean }>({
  showConsider: false,
  showConsiderCard: true,
})
</script>
