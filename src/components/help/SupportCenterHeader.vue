<template>
  <div class="flex tablet:px-3 desktop-xl:px-[15rem] h-25">
    <div class="flex w-full h-full items-center justify-between">
      <router-link to="#" class="flex items-center gap-2">
        <img src="https://ccdn.steak.io.vn/logo_steak.svg" alt="" />
        <span class="font-black text-xl capitalize">Steak {{ $t('navigation.help') }}</span>
      </router-link>

      <div class="flex gap-x-6">
        <div class="relative group">
          <router-link :to="{ name: 'HomePage' }" class="font-medium text-lg">Steak</router-link>
          <div
            class="w-full group-hover:h-1 h-0 bg-white absolute bottom-0 left-0 transition-all duration-100"
          ></div>
        </div>

        <div class="relative group">
          <router-link :to="{ name: 'PublisherHome' }" class="font-medium text-lg">{{
            $t('navigation.development_workspace')
          }}</router-link>
          <div
            class="w-full group-hover:h-1 h-0 bg-white absolute bottom-0 left-0 transition-all duration-100"
          ></div>
        </div>

        <div class="relative group">
          <router-link :to="{ name: 'PublisherHome' }" class="font-medium text-lg ease-in-out">{{
            $t('navigation.community')
          }}</router-link>
          <div
            class="w-full group-hover:h-1 h-0 bg-white absolute bottom-0 left-0 ease-in-out transition-all duration-100"
          ></div>
        </div>
        <div class="relative group">
          <router-link :to="{ name: 'HomePage' }" class="font-medium text-lg ease-in-out"
            >Client App</router-link
          >
          <div
            class="w-full group-hover:h-1 h-0 bg-white absolute bottom-0 left-0 transition-all ease-in-out duration-100"
          ></div>
        </div>
      </div>

      <div class="flex gap-x-6 items-center">
        <router-link :to="{ name: 'HomePage' }" class="flex gap-2">
          <span class="font-black text-lg"> steak.io.vn </span>
          <square-arrow-out-up-right class="size-6" />
        </router-link>
        <router-link
          :to="{ name: 'TicketsRequest' }"
          class="px-4 hover:bg-[#7f5af0] hover:border-[#010101]/50 transition-colors duration-200 cursor-pointer font-black py-2 bg-transparent border-white/50 rounded-sm border-2"
        >
          Create Tickets
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { SquareArrowOutUpRight } from 'lucide-vue-next'
</script>
