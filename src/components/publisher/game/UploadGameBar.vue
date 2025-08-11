<template>
  <TooltipProvider>
    <div :class="{
      'grid !grid-rows-4': isCollaped,
      'grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3 desktop-xl:grid-cols-4 gap-x-3 gap-y-6 w-full py-3':
        !isCollaped,
    }">
      <tooltip v-for="(game, index) in games" :key="index">
        <tooltip-trigger as-child>
          <card :key="index"
            class="bg-[var(--bg-card-game-base)]/60 @container overflow-hidden transition-colors duration-200 pt-0 hover:bg-[#28282C] min-h-[18rem] relative">
            <div class="flex flex-col gap-y-2 w-full h-full">
              <router-link :to="{ name: 'PublisherEditGame', params: { id: game.id } }">
                <div :class="{
                  'bg-red-300/10': game.status === 'REJECTED',
                  'bg-green-300/30': game.status === 'ACCEPTED',
                  'bg-white/20': game.status === 'NEED_UPDATED',
                  'bg-green-950/60': game.status === 'PENDING_REVIEW',
                  'bg-sky-300/20': game.status === 'DRAFT',
                  'h-[12rem]': game.status !== 'ACCEPTED',
                }" class="w-full h-[10rem] overflow-hidden rounded-t-sm">
                  <!-- GAME IMAGE -->
                  <div v-if="game.status" class="inverted-radius !rounded-none" :style="{
                    '--x': xValueComputed(game.status) + 'px',
                  }">
                    <img v-if="game.thumbnail" class="object-cover scale-200 w-full" :src="game.thumbnail" alt="" />
                    <img v-else class="object-cover w-full scale-200" src="https://ccdn.steak.io.vn/assets-desert.png"
                      alt="" />
                  </div>
                  <div class="font-black text-white z-2 absolute p-1 px-2 m-0 top-0 flex items-center right-2">
                    <span :class="{
                      'text-red-500/90': game.status === 'REJECTED',
                      'text-green-500/90': game.status === 'ACCEPTED',
                      'text-gray-300/90': game.status === 'NEED_UPDATED',
                      'text-white': game.status === 'PENDING_REVIEW',
                      'text-sky-300/90': game.status === 'DRAFT',
                    }" class="w-full h-full">{{ game.status }}</span>
                  </div>
                </div>
                <!-- END GAME IMAGE-->
              </router-link>
              <!-- GAME ACTIONS -->
              <div class="flex flex-col w-full px-3 h-full justify-between" :class="{
                'h-3/12': game.status === 'ACCEPTED',
                'h-1/12': game.status !== 'ACCEPTED',
              }">
                <!-- GAME NAME -->
                <div class="flex flex-col">
                  <div :class="{ 'grid grid-cols-4': game.status === 'ACCEPTED' }"
                    class="flex items-center gap-x-2 justify-between">
                    <div class="overflow-hidden col-span-3">
                      <span class="font-bold text-2xl lg:text-2xl truncate text-wrap">{{
                        game.name
                        }}</span>
                    </div>
                    <div class="flex justify-end me-2">
                      <GameSettingButton :game-id="game.id.toString()" />
                    </div>
                  </div>
                  <card-description class="justify-start flex">
                    <span class="me-1"> Update at:</span>
                    <span class="">
                      {{
                        new Intl.DateTimeFormat(locale, {
                          dateStyle: 'full',
                        }).format(new Date(Number(game.updatedAt)))
                      }}
                    </span>
                  </card-description>
                </div>
                <!-- END GAME NAME -->
              </div>
            </div>
          </card>
        </tooltip-trigger>
        <tooltip-content :hidden="Number(game.updatedAt) < new Date().getTime()">
          {{ $t('title.routers.game_not_release_yet') }}
        </tooltip-content>
      </tooltip>
    </div>
  </TooltipProvider>
</template>

<script setup lang="ts">
import { Card, CardDescription } from '@/components/ui/card'
import { PUBLISHER_PERSONAL_PROJECT } from '@/types/publisher/project/PublisherPersonalProjectType'
import GameSettingButton from '@/components/publisher/game/GameSettingButton.vue'
import { useI18n } from 'vue-i18n'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
const { locale } = useI18n()
const props = defineProps<{
  isCollaped?: {
    type: boolean
  }
  games: PUBLISHER_PERSONAL_PROJECT[]
}>()

const xValueComputed = (status: string) => {
  switch (status) {
    case 'REJECTED':
      return 70
    case 'ACCEPTED':
      return 110
    case 'NEED_UPDATED':
      return 100
    case 'PENDING_REVIEW':
      return 150
    case 'DRAFT':
      return 90
    default:
      return 100
  }
}
</script>
