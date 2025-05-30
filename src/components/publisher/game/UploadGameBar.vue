<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-3 gap-y-6 w-full py-3">
    <card
      v-for="(game, index) in games"
      :key="index"
      class="bg-[#28282C]/60 transition-colors duration-200 pt-0 hover:bg-[#28282C] h-[25rem]"
    >
      <div class="flex flex-col gap-y-2 w-full h-full">
        <!-- GAME IMAGE -->
        <div class="overflow-hidden rounded-t-sm w-full h-6/12">
          <img
            class="object-contain w-full -translate-y-15"
            src="https://ccdn.steak.io.vn/assets-guts-profile-pic.png"
            alt=""
          />
        </div>
        <!-- END GAME IMAGE-->

        <!-- GAME ACTIONS -->
        <div class="flex flex-col flex-wrap w-full px-3 h-6/12 justify-between">
          <!-- GAME NAME -->
          <div class="flex flex-col">
            <div class="flex justify-between">
              <div class="overflow-hidden">
                <span class="font-bold text-md lg:text-xl truncate">{{ game.name }}</span>
              </div>
              <button class="cursor-pointer">
                <settings class="w-5 h-5" />
              </button>
            </div>
            <card-description>{{ game.descriptions }}</card-description>
          </div>
          <!-- END GAME NAME -->

          <div class="flex flex-col w-full">
            <card-action as-child class="w-full">
              <button
                class="flex bg-[--bg-base] gap-x-2 cursor-pointer items-center hover:bg-[#4B4B4E] w-full rounded-sm p-1"
              >
                <shopping-cart />
                Steak Game Store
              </button>
            </card-action>

            <card-action as-child class="w-full">
              <button
                class="flex bg-[--bg-base] gap-x-2 cursor-pointer items-center hover:bg-[#4B4B4E] w-full rounded-sm p-1"
              >
                <gamepad2 />
                Game Services
              </button>
            </card-action>
            <card-action as-child class="w-full">
              <button
                class="flex bg-[--bg-base] gap-x-2 cursor-pointer items-center hover:bg-[#4B4B4E] w-full rounded-sm p-1"
              >
                <user-round-cog />
                Steak Account Services
              </button>
            </card-action>
            <card-action as-child class="w-full">
              <button
                class="flex bg-[--bg-base] gap-x-2 cursor-pointer items-center hover:bg-[#4B4B4E] w-full rounded-sm p-1"
              >
                <chart-spline />
                Analytics
              </button>
            </card-action>
          </div>
        </div>
      </div>
    </card>
  </div>
</template>

<script setup lang="ts">
import { ChartSpline, UserRoundCog, Gamepad2, ShoppingCart, Settings } from 'lucide-vue-next'
import { Card, CardAction, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ref } from 'vue'

const props = defineProps<{
  games: {
    name: string
    descriptions: string
  }[]
}>()
</script>
