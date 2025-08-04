<template>
  <div v-if="isGameDetailsFetching" class="p-3">
    <SkeletonPreviewForm />
  </div>
  <div v-else class="flex text-white flex-col h-full px-3">
    <!-- GAME NAME BAR -->
    <div class="flex flex-row h-full mb-[8px]">
      <span class="text-[42px] leading-10 font-extrabold text-wrap">{{
        gameDetailData.data?.details?.title
      }}</span>
    </div>
    <!-- END GAME NAME BAR -->

    <!-- OPTIONS BAR -->
    <div class="flex flex-row lg:w-full mb-[20px]">
      <div class="flex w-full flex-row items-center mx-[0px] me-[20px] ms-[0px] gap-x-[30px]">
        <router-link to="#" class="pt-0 pr-0 pb-2 pl-0 border-b-3 border-[#00a6ff]" :class="''">{{
          $t('title.subPagesCompo.sidebar.publisher.dashboard.items.overview')
        }}</router-link>
        <!-- <router-link to="#" class="pt-0 pr-0 pb-2 pl-0 text-[#fff]/50 hover:text-white" :class="''"
          >Achievements</router-link
        > -->
      </div>
    </div>
    <!-- END OPTIONS BAR-->

    <!-- MAIN CONTENT -->
    <div class="grid grid-cols-12 justify-between gap-x-4 w-full">
      <div class="flex flex-col gap-y-[0px] relative col-span-12 laptop:col-span-9 w-full">
        <!-- LEFT CONTENT -->
        <div
          :class="{ '!min-h-full !max-h-full overflow-visible': showMore }"
          class="flex flex-col gap-y-[3rem] max-h-[80rem] overflow-hidden"
        >
          <!-- CAROUSEL -->
          <game-slider :game="gameDetailData?.data?.details?.media"></game-slider>
          <!-- END CAROUSEL -->

          <!-- DESCRIPTIONS -->
          <div class="flex shrink-0 text-[17px] text-wrap">
            {{ gameDetailData.data?.details.shortDescription }}
          </div>
          <!-- END DESCRIPTIONS -->

          <!-- RELATED FIELDS & FEATURES -->
          <!-- <relate-field-and-features-bar :game="game"></relate-field-and-features-bar> -->
          <!-- END RELATED FIELDS & FEATURES -->

          <!-- RELATED GAMES BY DEVELOPER -->
          <relate-games-by-developer
            :develop-teams="gameDetailData.data?.details.developersTeams"
          ></relate-games-by-developer>
          <!-- END RELATED GAMES BY DEVELOPER -->

          <!-- ABOUT THE GAME -->
          <abouts-game
            :long-descriptions="gameDetailData?.data?.details?.longDescription"
          ></abouts-game>
          <!-- END ABOUT THE GAME -->
        </div>
        <!-- SHOW MORE BUTTON-->
        <div class="flex flex-col w-full relative z-[5]">
          <div class="w-full bg-[#101014] h-[26px] flex justify-start relative">
            <div
              v-if="!showMore"
              class="h-[100px] w-full absolute bottom-1 bg-gradient-to-t from-[#101014] to-black/0 pointer-events-none z-[4]"
            ></div>
            <button
              @click="showMore = !showMore"
              class="cursor-pointer text-[#26bbff] hover:underline text-[18px] z-10"
            >
              {{ showMore ? 'Show less' : 'Show more' }}
            </button>
          </div>
        </div>
      </div>
      <!-- END SHOW MORE BUTTON -->
      <!-- END LEFT CONTENT -->

      <!-- RIGHT CONTENT -->
      <sub-game-details :right-contents-data="gameDetailData?.data"></sub-game-details>
      <!-- END RIGHT CONTENT -->
    </div>
    <!-- END MAIN CONTENT -->

    <!-- SUB DETAILS -->
    <div class="text-white">
      <div class="xl:w-[1039px] lg:w-[751px] flex flex-col justify-around">
        <div class="mt-[50px] mr-[0px] mb-[0px] shrink-0 flex flex-col h-[141px] justify-between">
          <span class="text-[18px] font-bold">FOLLOW US</span>
          <div class="py-[35px] px-[60px] rounded-[12px] bg-[#202024]">
            <div class="flex justify-center -my-[10px] mx-[0px]">
              <div
                class="flex justify-center w-[66px] h-[46px] items-center"
                v-for="(contact, index) in contacts"
                :key="index"
              >
                <img :src="contact.img" class="shrink-0 w-[26px]" alt="" />
              </div>
            </div>
          </div>
        </div>
        <div class="mt-[50px] mr-[0px] gap-y-[20px] mb-[0px] flex flex-col">
          <span class="text-[20px] tracking-[0.4px] font-bold w-full text-wrap">{{
            gameDetailData.data.details.title + ' System Requirements'
          }}</span>
          <div
            class="bg-[#202024] rounded-[12px] py-[35px] px-[60px] text-white justify-between gap-[35px]"
          >
            <div class="flex flex-col gap-[35px]">
              <div class="flex flex-col">
                <!-- <div class="w-full flex justify-start gap-[32px]">
                  <button
                    class="flex cursor-pointer border-b-3 border-b-[#35B8EF] justify-center gap-[8px] text-[18px] ml-[2px]"
                  >
                    {{ system.name }}
                  </button>
                </div> -->
                <div class="gap-[13px] pt-[35px] pr-[0px] pb-[0px] flex flex-col">
                  <!-- CONTENT -->
                  <div class="w-full flex gap-x-[20px]">
                    <span class="text-[20px] w-6/12 font-bold">Minimum</span>
                    <span class="text-[20px] w-6/12 font-bold">Recommended</span>
                  </div>
                  <div class="flex gap-x-[20px]">
                    <div class="flex w-6/12 flex-col">
                      <span class="w-auto text-[#ffffffa6] text-[15px]">OS version</span>
                      <span class="w-[11/12]">{{
                        gameDetailData.data?.details?.systemRequirements?.minimum?.osVersion
                      }}</span>
                    </div>
                    <div class="flex flex-col w-6/12">
                      <span class="w-auto text-[#ffffffa6] text-[15px]">OS version</span>
                      <span class="w-auto">{{
                        gameDetailData.data?.details?.systemRequirements?.recommend?.osVersion
                      }}</span>
                    </div>
                  </div>
                  <div class="flex gap-x-[20px]">
                    <div class="flex w-6/12 flex-col">
                      <span class="w-auto text-[#ffffffa6] text-[15px]">CPU</span>
                      <span class="text-[17px] text-pretty">{{
                        gameDetailData.data?.details?.systemRequirements?.minimum?.cpu
                      }}</span>
                    </div>
                    <div class="flex w-6/12 flex-col">
                      <span class="w-auto text-[#ffffffa6] text-[15px]">CPU</span>
                      <span class="text-[17px] text-pretty">{{
                        gameDetailData.data?.details?.systemRequirements?.recommend?.cpu
                      }}</span>
                    </div>
                  </div>
                  <div class="flex gap-x-[20px]">
                    <div class="flex w-6/12 flex-col">
                      <span class="w-auto text-[#ffffffa6] text-[15px]">Memory</span>
                      <span class="text-[17px] text-pretty">{{
                        gameDetailData.data?.details?.systemRequirements?.minimum?.memory
                      }}</span>
                    </div>
                    <div class="flex w-6/12 flex-col">
                      <span class="w-auto text-[#ffffffa6] text-[15px]">Memory</span>
                      <span class="text-[17px] text-pretty">{{
                        gameDetailData.data?.details?.systemRequirements?.recommend?.memory
                      }}</span>
                    </div>
                  </div>

                  <div class="flex gap-x-[20px]">
                    <div class="flex w-6/12 flex-col">
                      <span class="w-auto text-[#ffffffa6] text-[15px]">GPU</span>
                      <span class="text-[17px] text-pretty">{{
                        gameDetailData.data?.details?.systemRequirements?.minimum?.gpu
                      }}</span>
                    </div>
                    <div class="flex w-6/12 flex-col">
                      <span class="w-auto text-[#ffffffa6] text-[15px]">GPU</span>
                      <span class="text-[17px] text-pretty">{{
                        gameDetailData.data?.details?.systemRequirements?.recommend?.gpu
                      }}</span>
                    </div>
                  </div>
                  <div class="flex gap-x-[20px]">
                    <div class="flex w-6/12 flex-col">
                      <span class="w-auto text-[#ffffffa6] text-[15px]">DirectX</span>
                      <span class="text-[17px] text-pretty">{{
                        gameDetailData.data?.details?.systemRequirements?.minimum?.directX
                      }}</span>
                    </div>
                    <div class="flex w-6/12 flex-col">
                      <span class="w-auto text-[#ffffffa6] text-[15px]">DirectX</span>
                      <span class="text-[17px] text-pretty">{{
                        gameDetailData.data?.details?.systemRequirements?.recommend?.directX
                      }}</span>
                    </div>
                  </div>
                  <div class="flex gap-x-[20px]">
                    <div class="flex w-6/12 flex-col">
                      <span class="w-auto text-[#ffffffa6] text-[15px]">Storage</span>
                      <span class="text-[17px] text-pretty">{{
                        gameDetailData.data?.details?.systemRequirements?.minimum?.storage
                      }}</span>
                    </div>
                    <div class="flex w-6/12 flex-col">
                      <span class="w-auto text-[#ffffffa6] text-[15px]">Storage</span>
                      <span class="text-[17px] text-pretty">{{
                        gameDetailData.data?.details?.systemRequirements?.recommend?.storage
                      }}</span>
                    </div>
                  </div>
                  <!-- END CONTENT -->
                </div>
              </div>
              <!-- <div class="flex flex-col w-auto">
                <span class="w-auto text-[#ffffffa6] text-[15px]">Login Accounts Required</span>
                <span class="w-auto text-white text-[17px]">{{ system.login_required }}</span>
              </div> -->
              <div class="flex flex-col gap-[35px]">
                <div class="flex flex-col">
                  <span class="text-[15px] text-[#ffffffa6]">Languages Supported</span>

                  <!-- LANGUAGES SUPPORTED -->
                  <div class="min-h-[80px]">
                    <span class="text-[17px] text-white">
                      Text:
                      <span
                        class="text-white text-[17px]"
                        v-for="(language, index) in gameDetailData.data?.details?.languageSupported"
                        :key="index"
                      >
                        {{ language }}
                        <span
                          v-if="
                            index !== gameDetailData.data?.details?.languageSupported.length - 1
                          "
                          >,</span
                        >
                      </span>
                    </span>
                  </div>
                  <!-- END LANGUAGES SUPPORTED -->
                </div>

                <!-- RIGHT POLICY NOTIFICATIONS -->
                <div class="flex flex-col">
                  <span class="text-[15px] text-[#ffffffa6] text-wrap">
                    Trademarks, tradenames, and copyrights are property of their respective owners,
                    Digital Sun Games (2025) and Hooded Horse Inc.™ (2025). All Rights
                    Reserved.</span
                  >
                  <router-link to="/" class="text-white flex text-[16px] hover:underline"
                    >Privacy Policy
                    <img
                      class="w-[18px]"
                      src="https://ccdn.steak.io.vn/assets-shared-ico-collaborators-list.svg"
                      alt=""
                    />
                  </router-link>
                </div>
                <!-- END RIGHT POLICY NOTIFICATIONS -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- END SUB DETAILS -->
    <div class="h-[15px] mt-[24px] mb-[90px] pt-[28px] w-full border-t-1 border-[#ffffffa6]">
      <span class="before:content-['*_'] text-wrap"
        >The lowest price offered on The Epic Games Store in the last 30 days before discount
      </span>
    </div>
  </div>
</template>

<script setup>
import AboutsGame from '@/components/game/AboutsGame.vue'
import GameSlider from '@/components/game/GameSlider.vue'
import RelateGamesByDeveloper from '@/components/game/RelateGamesByDeveloper.vue'
import SubGameDetails from '@/components/game/SubGameDetails.vue'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useGameStoreDetailsQuery } from '@/hooks/store/game/useGameStore'
import SkeletonPreviewForm from '@/components/publisher/gameDetails/SkeletonPreviewForm.vue'

const showMore = ref(false)
const route = useRoute()
const game = ref({})
const { data: gameDetailData, isFetching: isGameDetailsFetching } = useGameStoreDetailsQuery(
  route.params.id,
)
const contacts = [
  {
    img: 'https://ccdn.steak.io.vn/assets-twitter-ico.svg',
  },
  {
    img: 'https://ccdn.steak.io.vn/assets-discord-ico-opa.svg',
  },
  {
    img: 'https://ccdn.steak.io.vn/assets-youtube-ico.svg',
  },
  {
    img: 'https://ccdn.steak.io.vn/assets-facebook-ico.svg',
  },
  {
    img: 'https://ccdn.steak.io.vn/assets-earth-ico.svg',
  },
  {
    img: 'https://ccdn.steak.io.vn/assets-reddit-ico.svg',
  },
  {
    img: 'https://ccdn.steak.io.vn/assets-ig-ico-opa.svg',
  },
  {
    img: 'https://ccdn.steak.io.vn/assets-switch-ico.svg',
  },
]
</script>
