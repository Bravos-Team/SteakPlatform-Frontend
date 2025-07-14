<template>
  <div>
    <store-top-bar></store-top-bar>
    <store-searching-bar></store-searching-bar>
    <div class="px-[14rem]">
      <div class="@container flex w-full h-full flex-col">
        <router-view></router-view>
      </div>
    </div>
  </div>

  <footer-store></footer-store>
</template>
<script setup>
import FooterStore from '@/components/store/FooterStore.vue'
import StoreSearchingBar from '@/components/store/StoreSearchingBar.vue'
import StoreTopBar from '@/components/store/StoreTopBar.vue'
</script>
