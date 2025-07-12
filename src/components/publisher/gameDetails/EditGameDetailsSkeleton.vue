<template>
  <div class="grid grid-cols-12 gap-y-3 p-4 gap-x-2">
    <div class="bg-gray-400/30 col-span-5 min-h-[318px] rounded-sm animate-pulse relative">
      <div class="absolute top-5 right-5 min-h-[3rem] rounded-sm w-[15rem] bg-white/20"></div>
      <div class="absolute bottom-5 left-5 min-h-[3rem] rounded-sm w-[11rem] bg-white/20"></div>
    </div>
    <div class="bg-gray-400/30 col-span-7 min-h-[318px] rounded-sm animate-pulse flex">
      <div class="flex flex-col">
        <div class="flex items-center gap-x-2 p-6">
          <div class="w-15 h-15 bg-white/20 rounded-full animate-pulse"></div>
          <div class="w-62 h-13 bg-white/20 rounded-sm animate-pulse"></div>
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
