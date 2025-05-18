<template>
  <div>
    <store-top-bar></store-top-bar>
    <store-searching-bar></store-searching-bar>
    <div class="lg:w-[1135px] xl:w-[1423px] xl:mx-[237px] lg:mx-[189px]">
      <router-view></router-view>
    </div>
  </div>

  <footer-store></footer-store>
</template>
<script setup>
import FooterStore from '@/components/store/FooterStore.vue'
import StoreSearchingBar from '@/components/store/StoreSearchingBar.vue'
import StoreTopBar from '@/components/store/StoreTopBar.vue'
</script>
