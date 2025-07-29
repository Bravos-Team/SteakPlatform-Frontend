<template>
  <div class="flex tablet:px-3 desktop-xl:px-[5rem] h-25">
    <div class="flex w-full h-full items-center justify-between">
      <router-link to="#" class="flex items-center gap-2">
        <img src="https://ccdn.steak.io.vn/logo_steak.svg" alt="" />
        <span class="font-black text-xl capitalize">Steak help center</span>
      </router-link>

      <div class="flex gap-x-6">
        <div class="relative group">
          <router-link :to="{ name: 'HomePage' }" class="font-medium text-lg">Steak</router-link>
          <div
            class="w-full group-hover:h-1 h-0 bg-white absolute bottom-0 left-0 transition-all duration-100"
          ></div>
        </div>

        <div class="relative tablet:block group hidden">
          <router-link :to="{ name: 'SupportCenter' }" class="font-medium text-lg ease-in-out"
            >Support Center</router-link
          >
          <div
            class="w-full group-hover:h-1 h-0 bg-white absolute bottom-0 left-0 transition-all ease-in-out duration-100"
          ></div>
        </div>

        <div class="relative group tablet:block hidden">
          <router-link :to="{ name: 'Login' }" class="font-medium text-lg">Accounts</router-link>
          <div
            class="w-full group-hover:h-1 h-0 bg-white absolute bottom-0 left-0 transition-all duration-100"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>
