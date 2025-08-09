<template>
  <div>
    <drawer className="sm:max-w-[425px]">
      <store-top-bar :isHiddenWhenMobile="true" />
    </drawer>
    <mobile-top-bar />
    <div class="desktop-xl:px-[20rem] desktop:px-[6rem] laptop:px-[3rem]">
      <div class="@container flex w-full h-full flex-col py-10">
        <router-view></router-view>
      </div>
    </div>
  </div>

  <footer-store></footer-store>
</template>
<script setup>
import FooterStore from '@/components/store/FooterStore.vue'
import MobileTopBar from '@/components/store/nav/MobileTopBar.vue'
import StoreTopBar from '@/components/store/StoreTopBar.vue'
import { Drawer } from '@/components/ui/drawer'
import { nextTick, onMounted } from 'vue'

onMounted(async () => await nextTick())
</script>
