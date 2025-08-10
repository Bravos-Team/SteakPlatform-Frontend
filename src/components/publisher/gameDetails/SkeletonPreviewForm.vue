<template>
  <!-- START GAME TITLE  -->
  <card-header class="text-2xl font-bold mb-3">
    <card-title class="!text-[40px] text-white/80 font-black">Game Preview</card-title>
    <div class="flex flex-col gap-y-2">
      <div class="px-2 rounded-sm text-center w-70 tablet:w-120 animate-pulse laptop:w-140 h-10 bg-white/10"></div>
      <div class="flex gap-x-2 gap-y-1 animate-pulse">
        <div class="tablet:w-25 w-15 bg-white/10 h-4" />
        <div class="tablet:w-15 h-4 w-15 bg-white/10" />
        <div class="tablet:w-20 h-4 w-15 bg-white/10" />
      </div>
    </div>
  </card-header>
  <!-- END GAME TITLE  -->

  <!-- START PREVIEW CONTENT -->
  <card-content class="flex flex-col gap-y-1 laptop:gap-y-3 @container animate-pulse">
    <!-- START PREVIEW TOP NAV -->
    <div class="flex gap-x-2 gap-y-2">
      <div class="bg-white/10 tablet:w-25 w-20 h-8" v-for="i in 3" />
    </div>
    <!-- END PREVIEW TOP NAV -->

    <!-- START PREVIEW MAIN CONTENT -->
    <div class="flex w-full items-start mobile:flex-col-reverse laptop:flex-row gap-y-6 gap-x-[5rem]">
      <!-- START LEFT CONTENT -->
      <div class="flex flex-col gap-y-3 @min-[1200px]:!w-[10cqw] @xl:min-w-[70cqw] w-full">
        <!--- PREVIEW MEDIA BAR -->
        <div class="flex items-center flex-col gap-y-8 h-full w-full">
          <!-- START MEDIA -->
          <div
            class="w-full h-50 desktop:h-120 laptop:h-100 tablet:h-70 desktop-xl:h-145 bg-white/10 flex items-center justify-center rounded-sm">
            <span class="text-center font-bold text-20 laptop:text-[100px] text-white/30">MEDIA</span>
          </div>
          <!-- END MEDIA -->

          <!-- START SUB MEDIA -->
          <div class="flex gap-x-2 justify-between w-full items-center">
            <div class="rounded-full size-12 shrink-0 bg-white/10 flex items-center justify-center">
              <chevron-left class="w-6 h-6 stroke-3 text-white/30" />
            </div>
            <div
              class="flex justify-start laptop:gap-x-3 gap-x-2 items-center desktop:justify-center w-full !overflow-hidden">
              <div v-for="i in 8" class="!w-25 h-14 bg-white/10 rounded-sm shrink-0" />
            </div>
            <div class="rounded-full size-12 shrink-0 bg-white/10 flex items-center justify-center">
              <chevron-right class="w-6 h-6 stroke-3 text-white/30" />
            </div>
          </div>
          <!-- END SUB MEDIA -->

          <!-- START SUB DES -->
          <div class="w-full flex flex-col gap-y-1">
            <div class="w-80 bg-white/10 h-8 rounded-bl-none rounded-br-sm rounded-t-sm" />
            <div class="tablet:w-100 w-50 bg-white/10 h-7 rounded-sm" />
          </div>
          <!-- END SUB DES -->

          <!-- START SUB TYPE BAR -->
          <div class="flex w-full flex-col laptop:flex-row gap-y-2 gap-x-2">
            <div
              class="w-full laptop:border-r-1 border-b-1 pb-1 laptop:pb-0 border-white/30 laptop:border-b-0 flex flex-col gap-y-2">
              <div class="w-16 bg-white/10 h-5 rounded-xs" />
              <div class="flex gap-x-2">
                <div class="w-20 bg-white/10 h-5 rounded-xs" v-for="i in 4" />
              </div>
            </div>
            <div class="w-full flex flex-col gap-y-2">
              <div class="w-18 bg-white/10 h-5 rounded-xs" />
              <div class="flex gap-x-2">
                <div class="w-20 bg-white/10 h-5 rounded-xs" v-for="i in 2" />
              </div>
            </div>
          </div>

          <!-- START LONG DESCRIPTION -->
          <div class="flex flex-col gap-y-3 w-full">
            <span class="bg-white/10 px-2 rounded-xs text-white/30 font-bold">LONG DESCRIPTION</span>
            <div class="h-4 w-full bg-white/10 rounded-xs" v-for="i in 12" />
          </div>
          <!-- END LONG DESCRIPTION -->
          <!-- END SUB TYPE BAR -->
        </div>
        <!-- END PREVIEW MEDIA BAR -->
      </div>
      <!-- END LEFT CONTENT -->

      <!-- START RIGHT CONTENT -->
      <div class="w-full sitcky top-0 flex-col gap-y-[15px]">
        <!-- START GAME THUMBNAIL -->
        <div class="flex justify-center items-center p-[20px]">
          <div class="flex justify-center items-center w-full">
            <div class="w-full bg-white/10 rounded-sm laptop:w-40 h-40" />
          </div>
        </div>
        <!-- END GAME THUMBNAIL -->

        <!-- START AGE RATING BAR -->
        <div
          class="flex p-[15px] gap-x-[15px] justify-start rounded-[10px] items-center border-[#fff]/20 border w-full">
          <div class="flex justify-center items-center">
            <div class="w-16 bg-white/10 rounded-sm h-15" />
          </div>

          <div class="flex flex-col gap-y-2 justify-between">
            <div class="w-16 h-5 bg-white/10 rounded-sm" />
            <div class="w-46 h-5 bg-white/10 rounded-sm" />
          </div>
        </div>
        <!-- END AGE RATING BAR -->

        <div class="flex justify-start w-full mt-2">
          <button
            class="rounded-[4px] py-[1px] justify-center px-[8px] flex items-center bg-[#ffffff26] w-23 h-7"></button>
        </div>
        <div class="flex justify-start w-full font-bold text-[18px] text-white/50">000.000</div>

        <div class="flex flex-col gap-y-[10px]">
          <button
            class="py-[12px] text-white/30 px-[20px] align-middle bg-[#26bbff]/30 rounded-[10px] flex justify-center items-center">
            Buy Now
          </button>
          <button
            class="py-[12px] px-[20px] align-middle bg-[#ffffff59]/50 text-white/40 rounded-[10px] flex justify-center items-center">
            Add To Cart
          </button>
          <button
            class="py-[12px] px-[20px] align-middle bg-[#ffffff59]/50 text-white/40 rounded-[10px] flex justify-center items-center">
            Add To Wishlist
          </button>
        </div>

        <div class="flex flex-col text-[15px]">
          <div class="flex border-b-[0.5px] border-b-[#ffffff37] justify-between py-[10px] px-[0px]">
            <span class="text-[#ffffffa6]">
              <div class="w-25 h-4 rounded-xs bg-white/10" />
            </span>
            <span class="text-white flex gap-x-[10px] items-center">
              <div class="w-20 h-4 rounded-xs bg-white/10" />
              <img class="w-5" src="https://ccdn.steak.io.vn/assets-5-percent-rewards-blue.svg" alt="" />
            </span>
          </div>
          <div class="flex border-b-[0.5px] border-b-[#ffffff37] justify-between py-[10px] px-[0px]">
            <div class="w-23 h-4 rounded-xs bg-white/10" />
            <div class="w-15 h-4 rounded-xs bg-white/10" />
          </div>
          <div class="flex justify-between py-[10px] px-[0px] border-b-[0.5px] border-b-[#ffffff37]">
            <div class="w-28 h-4 rounded-xs bg-white/10" />
            <div class="w-15 h-4 rounded-xs bg-white/10" />
          </div>
          <div class="flex justify-between py-[10px] px-[0px] border-b-[0.5px] border-b-[#ffffff37]">
            <div class="w-23 h-4 rounded-xs bg-white/10" />
            <div class="w-15 h-4 rounded-xs bg-white/10" />
          </div>
          <div class="flex justify-between py-[10px] px-[0px] border-b-[0.5px] border-b-[#ffffff37]">
            <div class="w-20 h-4 rounded-xs bg-white/10" />
            <div class="w-15 h-4 rounded-xs bg-white/10" />
          </div>
          <div class="flex justify-between items-center py-[10px] px-[0px] border-b-[0.5px] border-b-[#ffffff37]">
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

// import { Skeleton } from '@/components/ui/skeleton'
</script>
