<template>
  <div
    :class="{
      'grid !grid-rows-4': isCollaped,
      'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-3 gap-y-6 w-full py-3': !isCollaped,
    }"
  >
    <card
      v-for="(game, index) in games"
      :key="index"
      class="bg-[var(--bg-card-game-base)]/60 transition-colors duration-200 pt-0 hover:bg-[#28282C] h-[24rem] lg:h-[20rem] xl:h-[25rem]"
    >
      <router-link
        :to="{ name: 'PublisherEditGame', params: { id: game.id } }"
        class="w-full h-full"
      >
        <div class="flex flex-col gap-y-2 w-full h-full">
          <!-- GAME IMAGE -->
          <div class="overflow-hidden rounded-t-sm w-full h-full">
            <img
              class="object-contain w-full -translate-y-15"
              src="https://ccdn.steak.io.vn/assets-guts-profile-pic.png"
              alt=""
            />
          </div>
          <!-- END GAME IMAGE-->

          <!-- GAME ACTIONS -->
          <div class="flex flex-col w-full px-3 h-full justify-between">
            <!-- GAME NAME -->
            <div class="flex flex-col">
              <div class="grid grid-cols-4">
                <div class="overflow-hidden col-span-3">
                  <span class="font-bold text-3xl lg:text-xl truncate">{{ game.name }}</span>
                </div>
                <div class="flex justify-end me-2">
                  <button class="cursor-pointer">
                    <settings class="w-5 h-5" />
                  </button>
                </div>
              </div>
              <card-description>{{ game.descriptions }}</card-description>
            </div>
            <!-- END GAME NAME -->

            <div
              class="flex flex-col text-lg sm:text-[12px] md:text-[14px] lg:text-[12px] xl:text-[16px]"
            >
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
                  class="flex bg-[--bg-base] gap-x-2 cursor-pointer items-start hover:bg-[#4B4B4E] w-full rounded-sm p-1"
                >
                  <gamepad2 />
                  <span> Game Services </span>
                </button>
              </card-action>
              <card-action as-child class="w-full">
                <button
                  class="flex bg-[--bg-base] gap-x-2 cursor-pointer items-center hover:bg-[#4B4B4E] w-full rounded-sm p-1"
                >
                  <user-round-cog />
                  <span class="truncate" title="Steak Account Services">
                    Steak Account Services
                  </span>
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
      </router-link>
    </card>
  </div>
</template>

<script setup lang="ts">
import { ChartSpline, UserRoundCog, Gamepad2, ShoppingCart, Settings } from 'lucide-vue-next'
import { Card, CardAction, CardDescription } from '@/components/ui/card'

const props = defineProps<{
  isCollaped: {
    type: boolean
    default: true
  }
  games: {
    id: string
    name: string
    descriptions: string
  }[]
}>()
</script>
