<template>
  <drawer>
    <div>
      <store-top-bar></store-top-bar>
      <store-searching-bar></store-searching-bar>
      <div class="desktop-xl:px-[14rem] desktop:px-[10rem] laptop:px-[6rem] tablet:px-[2rem]">
        <div class="@container flex w-full h-full flex-col">
          <router-view></router-view>
        </div>
      </div>
    </div>

    <footer-store></footer-store>
  </drawer>
</template>
<script setup>
import FooterStore from '@/components/store/FooterStore.vue'
import StoreSearchingBar from '@/components/store/StoreSearchingBar.vue'
import StoreTopBar from '@/components/store/StoreTopBar.vue'
import { Drawer } from '@/components/ui/drawer'
</script>
