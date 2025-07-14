<template>
  <div class="bg-[#16161a] h-full w-full">
    <router-view></router-view>
    <!-- <support-center-footer /> -->
    <footer-store />
  </div>
</template>

<script lang="ts" setup>
// import SupportCenterFooter from '@/components/help/SupportCenterFooter.vue'
import { Drawer } from '@/components/ui/drawer'
import FooterStore from '@/components/store/FooterStore.vue'
</script>
