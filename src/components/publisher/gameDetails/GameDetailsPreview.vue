<template>
  <!-- START GAME TITLE  -->
  <card-header class="text-2xl font-bold">
    <card-title class="!text-[40px] !text-wrap max-w-[50rem] text-white/80 font-black">{{
      gameDetails?.name
    }}</card-title>
    <div class="flex flex-col gap-y-2">
      <div
        v-if="gameDetails?.developerTeams"
        class="flex gap-x-3 w-full flex-wrap desktop:w-[40rem]"
      >
        <span class="text-nowrap text-lg">Develop Team:</span>
        <div
          class="text-sm flex flex-wrap bg-white/10 rounded-sm items-center justify-center px-1 font-mono font-normal"
          v-for="(developerTeam, index) in gameDetails?.developerTeams"
          :key="index"
        >
          {{ developerTeam }}
        </div>
      </div>

      <div v-else class="flex gap-x-2">
        <div class="tablet:w-25 w-15 bg-white/10 h-4" />
        <div class="tablet:w-15 h-4 w-15 bg-white/10" />
        <div class="tablet:w-20 h-4 w-15 bg-white/10" />
      </div>
    </div>
  </card-header>
  <!-- END GAME TITLE  -->

  <!-- START PREVIEW CONTENT -->
  <card-content class="flex flex-col gap-y-1 laptop:gap-y-3 p-0 !w-full">
    <!-- START PREVIEW TOP NAV -->
    <!-- <div class="flex gap-x-2 gap-y-2">
      <div class="bg-white/10 tablet:w-25 w-20 h-8" v-for="i in 3" />
    </div> -->
    <!-- END PREVIEW TOP NAV -->

    <!-- START PREVIEW MAIN CONTENT -->
    <div class="gap-y-6 !w-full grid tablet:grid-cols-12 px-6 gap-x-3 laptop:px-0">
      <!-- START LEFT CONTENT -->
      <div class="flex flex-col gap-y-3 min-w-full col-span-9">
        <!--- PREVIEW MEDIA BAR -->
        <div class="flex items-center flex-col gap-y-8 h-full w-full">
          <!-- START MEDIA -->
          <div
            class="w-full overflow-hidden bg-white/10 flex items-center justify-center rounded-sm"
          >
            <img
              v-if="gameDetails?.thumbnail"
              :src="gameDetails?.thumbnail"
              alt=""
              class="object-cover w-full"
            />

            <span v-else class="text-center font-bold text-20 laptop:text-[100px] text-white/30"
              >MEDIA</span
            >
          </div>
          <!-- END MEDIA -->

          <!-- START SUB MEDIA -->
          <div class="flex gap-x-2 justify-between w-full items-center">
            <div class="rounded-full size-12 shrink-0 bg-white/10 flex items-center justify-center">
              <chevron-left class="w-6 h-6 stroke-3 text-white/30" />
            </div>
            <div
              class="flex flex-nowrap laptop:gap-x-3 max-w-[40rem] gap-x-2 items-center justify-center w-full !overflow-hidden"
            >
              <div
                v-if="gameDetails?.media"
                v-for="media in gameDetails?.media"
                class="shrink-0 min-w-[100px] h-14 bg-white/10 rounded-sm flex justify-center"
              >
                <img
                  v-if="media.type === 'image'"
                  :src="media.url"
                  class="w-full h-full object-cover rounded-sm"
                  alt="Game Media"
                />
                <video
                  v-else-if="media.type === 'video'"
                  :src="media.url"
                  class="w-full h-full object-cover rounded-sm"
                />
              </div>

              <div v-else v-for="i in 6" class="!w-25 h-14 bg-white/10 rounded-sm shrink-0" />
            </div>
            <div class="rounded-full size-12 shrink-0 bg-white/10 flex items-center justify-center">
              <chevron-right class="w-6 h-6 stroke-3 text-white/30" />
            </div>
          </div>
          <!-- END SUB MEDIA -->

          <!-- START SUB DES -->
          <div class="w-full flex flex-col font-mono text-wrap">
            {{ gameDetails?.shortDescription }}
          </div>
          <!-- END SUB DES -->

          <!-- START SUB TYPE BAR -->
          <div class="w-full grid tablet:grid-cols-2 gap-y-2 gap-x-2 justify-between">
            <div
              class="w-6/12 px-2 flex-wrap laptop:border-r-1 border-b-1 pb-1 laptop:pb-0 border-white/30 laptop:border-b-0 flex flex-col gap-y-2"
            >
              <template v-if="gameDetails?.regions">
                <div class="w-16 font-black h-5 rounded-xs">Regions:</div>
                <div class="flex flex-wrap gap-y-2 gap-x-2">
                  <div
                    class="px-1 flex items-center justify-center bg-white/10 h-5 rounded-xs text-nowrap"
                    v-for="(region, index) in gameDetails.regions"
                    :key="index"
                  >
                    {{ region }}
                  </div>
                </div>
              </template>
              <template v-else>
                <div class="w-16 bg-white/10 h-5 rounded-xs" />
                <div class="flex gap-x-2">
                  <div class="w-20 bg-white/10 h-5 rounded-xs" v-for="i in 4" />
                </div>
              </template>
            </div>
            <div class="w-full flex flex-col gap-y-2">
              <template v-if="gameDetails?.languageSupported">
                <div class="h-5 font-black rounded-xs">Languages Supported:</div>
                <div class="flex flex-wrap gap-x-2 gap-y-2">
                  <div
                    class="px-1 flex items-center justify-center bg-white/10 h-5 rounded-xs text-nowrap"
                    v-for="(language, index) in gameDetails.languageSupported"
                    :key="index"
                  >
                    {{ language }}
                  </div>
                </div>
              </template>

              <template>
                <div class="w-18 bg-white/10 h-5 rounded-xs" />
                <div class="flex flex-wrap gap-x-2">
                  <div class="w-20 bg-white/10 h-5 rounded-xs" v-for="i in 2" />
                </div>
              </template>
            </div>
          </div>

          <!-- START LONG DESCRIPTION -->

          <div v-if="gameDetails?.longDescription" class="flex flex-col gap-y-3 w-full">
            <span class="bg-white/10 px-2 rounded-xs text-white/30 font-bold">
              {{ $t('title.pages.game_details.form.long_descriptions.title') }}</span
            >
            <span
              class="text-sm text-white/80 text-pretty"
              v-html="DOMPurify.sanitize(gameDetails.longDescription)"
            >
            </span>
          </div>
          <div v-else class="flex flex-col gap-y-3 w-full">
            <span class="bg-white/10 px-2 rounded-xs text-white/30 font-bold">
              {{ $t('title.pages.game_details.form.long_descriptions.title') }}
            </span>
            <div class="h-4 w-full bg-white/10 rounded-xs" v-for="i in 12" />
          </div>
          <!-- END LONG DESCRIPTION -->
          <!-- END SUB TYPE BAR -->
        </div>
        <!-- END PREVIEW MEDIA BAR -->
      </div>
      <!-- END LEFT CONTENT -->

      <!-- START RIGHT CONTENT -->
      <div class="sticky top-0 flex-col gap-y-[15px] col-span-3">
        <!-- START GAME THUMBNAIL -->
        <div class="justify-center items-center flex flex-col">
          <div v-if="gameDetails?.thumbnail" class="flex justify-center items-center w-full">
            <img :src="gameDetails.thumbnail" alt="" />
          </div>
          <div v-else class="flex justify-center items-center mt-3 w-full">
            <div class="w-full bg-white/10 rounded-sm laptop:w-40 h-40" />
          </div>
        </div>
        <!-- END GAME THUMBNAIL -->

        <!-- START AGE RATING BAR -->
        <div
          class="flex flex-wrap p-[15px] gap-x-[15px] gap-y-2 justify-start rounded-[10px] items-center border-[#fff]/20 border w-full mt-3"
        >
          <div class="flex justify-center w-full items-center">
            <div class="w-16 bg-white/10 rounded-sm h-15" />
          </div>

          <div class="flex flex-col w-full gap-y-1 justify-between">
            <div class="laptop:w-16 w-full h-5 bg-white/10 rounded-sm" />
            <div class="min-w-full h-5 bg-white/10 rounded-sm" />
          </div>
        </div>
        <!-- END AGE RATING BAR -->

        <div class="flex justify-start w-full mt-2">
          <button
            class="rounded-[4px] py-[1px] justify-center px-[8px] flex items-center bg-[#ffffff26] w-23 h-7"
          ></button>
        </div>
        <div class="flex justify-start w-full font-bold text-[18px] text-white/50">
          {{
            Number(gameDetails?.price).toLocaleString('vi-VN', {
              style: 'currency',
              currency: 'VND',
            })
          }}
        </div>

        <div class="flex flex-col gap-y-[10px]">
          <button
            class="py-[12px] text-white/30 px-[20px] align-middle bg-[#26bbff]/30 rounded-[10px] flex justify-center items-center"
          >
            <!-- {{ $t('title.pages.game_details.form.long_descriptions') }} -->
            {{ $t('features.buttons.buy_now') }}
          </button>
          <button
            class="py-[12px] px-[20px] align-middle bg-[#ffffff59]/50 text-white/40 rounded-[10px] flex justify-center items-center"
          >
            {{ $t('features.buttons.add_to_cart') }}
          </button>
          <button
            class="text-wrap py-[12px] px-[20px] align-middle bg-[#ffffff59]/50 text-white/40 rounded-[10px] flex justify-center items-center"
          >
            {{ $t('features.buttons.add_to_wishlist') }}
          </button>
        </div>

        <div class="flex flex-col text-[15px]">
          <div
            class="flex border-b-[0.5px] border-b-[#ffffff37] justify-between py-[10px] px-[0px]"
          >
            <span class="text-[#ffffffa6]">
              <div class="w-25 h-4 rounded-xs bg-white/10" />
            </span>
            <span class="text-white flex gap-x-[10px] items-center">
              <div v-if="gameDetails?.platforms" class="w-20 h-4 rounded-xs bg-white/10"></div>
              <div v-else class="w-20 h-4 rounded-xs bg-white/10" />
              <img
                class="w-5"
                src="https://ccdn.steak.io.vn/assets-5-percent-rewards-blue.svg"
                alt=""
              />
            </span>
          </div>
          <div
            class="flex border-b-[0.5px] border-b-[#ffffff37] justify-between py-[10px] px-[0px]"
          >
            <div class="w-23 h-4 rounded-xs bg-white/10" />
            <div class="w-15 h-4 rounded-xs bg-white/10" />
          </div>
          <div
            class="flex justify-between py-[10px] px-[0px] border-b-[0.5px] border-b-[#ffffff37]"
          >
            <div class="w-28 h-4 rounded-xs bg-white/10" />
            <div class="w-15 h-4 rounded-xs bg-white/10" />
          </div>
          <div
            class="flex justify-between py-[10px] px-[0px] border-b-[0.5px] border-b-[#ffffff37]"
          >
            <div class="w-23 h-4 rounded-xs bg-white/10" />
            <div class="w-15 h-4 rounded-xs bg-white/10" />
          </div>
          <div
            class="flex justify-between py-[10px] px-[0px] border-b-[0.5px] border-b-[#ffffff37]"
          >
            <div class="w-20 h-4 rounded-xs bg-white/10" />
            <div class="w-15 h-4 rounded-xs bg-white/10" />
          </div>
          <div
            class="flex justify-between items-center py-[10px] px-[0px] border-b-[0.5px] border-b-[#ffffff37]"
          >
            <div class="w-28 h-4 rounded-xs bg-white/10" />
            <div class="w-8 h-8 rounded-xs bg-white/10" />
          </div>
        </div>
        <div class="flex flex-col gap-y-3">
          <div class="flex gap-x-3 items-center">
            <div class="w-60 bg-white/10 h-4 rounded-xs" />
            <chevron-right class="rotate-90 text-white/30" />
          </div>
          <div class="flex gap-x-3 items-center">
            <div class="w-full h-10 rounded-xs bg-white/10" />
            <div class="w-full h-10 rounded-xs bg-white/10" />
          </div>
        </div>
      </div>
      <!-- END RIGHT CONTENT -->
    </div>
    <!-- END PREVIEW MAIN CONTENT -->
  </card-content>
  <!-- END PREVIEW CONTENT -->
</template>

<script setup lang="ts">
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card'
import { ChevronRight, ChevronLeft } from 'lucide-vue-next'
import DOMPurify from 'dompurify'
import { GameType } from '@/types/game/gameDetails/GameDetailsType'

// import { Skeleton } from '@/components/ui/skeleton'

const props = defineProps<{
  gameDetails: GameType | null
}>()
</script>
