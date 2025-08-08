<template>
  <div class="grid grid-cols-12 gap-y-3 p-4 gap-x-2">
    <div
      class="bg-gray-400/30 col-span-12 laptop:col-span-5 rounded-sm animate-pulse flex flex-col min-h-full justify-between py-3 px-3"
    >
      <div class="flex justify-between flex-col">
        <div
          class="tablet:right-5 min-h-[3rem] rounded-sm w-full tablet:w-[10rem] desktop:w-[15rem] bg-white/20"
        ></div>
      </div>
      <div class="flex justify-end">
        <div class="min-h-[3rem] rounded-sm w-[11rem] bg-white/20"></div>
      </div>
    </div>
    <div
      class="bg-gray-400/30 tablet:col-span-12 laptop:col-span-7 min-h-[318px] rounded-sm animate-pulse flex flex-col min-w-full"
    >
      <div class="flex flex-col min-w-full">
        <div class="flex items-center gap-x-2 p-6">
          <div class="w-15 h-15 bg-white/20 rounded-full animate-pulse"></div>
          <div
            class="desktop:w-62 tablet:w-40 w-full h-13 bg-white/20 rounded-sm animate-pulse"
          ></div>
        </div>

        <div class="flex flex-col gap-y-1 px-6">
          <div class="w-122 h-6 bg-white/20 rounded-sm animate-pulse"></div>

          <div class="w-92 h-6 bg-white/20 rounded-sm animate-pulse"></div>
          <div class="w-102 h-6 bg-white/20 rounded-sm animate-pulse"></div>
          <div class="w-102 h-6 bg-white/20 rounded-sm animate-pulse"></div>
          <div class="w-82 h-6 bg-white/20 rounded-sm animate-pulse"></div>
          <div class="w-42 h-6 bg-white/20 rounded-sm animate-pulse"></div>
        </div>
      </div>
      <div class="flex flex-col p-6 gap-y-2 justify-end items-end w-full">
        <div class="w-42 h-12 bg-white/20 rounded-sm animate-pulse"></div>
      </div>
    </div>
  </div>
  <div class="w-full min-h-[50rem] p-4">
    <div class="bg-gray-400/30 animate-pulse min-h-[50rem] rounded-sm"></div>
  </div>
</template>
<script setup lang="ts"></script>
