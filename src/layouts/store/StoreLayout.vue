<template>
  <div>
    <store-top-bar></store-top-bar>
    <store-searching-bar></store-searching-bar>
    <div class="lg:w-[1135px] mx-[189px]">
      <store-sliders></store-sliders>
      <router-view></router-view>
    </div>
    <footer-store></footer-store>
  </div>
</template>
<script setup>
import FooterStore from '@/components/store/FooterStore.vue'
import StoreSearchingBar from '@/components/store/StoreSearchingBar.vue'
import StoreSliders from '@/components/store/StoreSliders.vue'
import StoreTopBar from '@/components/store/StoreTopBar.vue'
</script>
