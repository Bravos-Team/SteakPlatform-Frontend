<template>
  <div>
    <drawer className="sm:max-w-[425px]">
      <store-top-bar :isHiddenWhenMobile="true" />
    </drawer>
    <mobile-top-bar />
    <div class="desktop-xl:px-[14rem] desktop:px-[6rem] laptop:px-[3rem] tablet:px-[2rem]">
      <div class="@container flex w-full h-full flex-col">
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
