<template>
  <div>
    <drawer>
      <store-top-bar :isHiddenWhenMobile="true" />
    </drawer>
    <mobile-top-bar />
    <store-searching-bar
      :cart-items="userCartData?.data?.items"
      :is-fetching-cart="isUserCartFetching"
    ></store-searching-bar>
    <div class="desktop-xl:px-[14rem] desktop:px-[10rem] laptop:px-[6rem] tablet:px-[2rem]">
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
import StoreSearchingBar from '@/components/store/StoreSearchingBar.vue'
import StoreTopBar from '@/components/store/StoreTopBar.vue'
import { Drawer } from '@/components/ui/drawer'
import { useUserCartList } from '@/hooks/store/cart/useUserCart'
import { nextTick, onMounted } from 'vue'
const { data: userCartData, isFetching: isUserCartFetching } = useUserCartList()

onMounted(async () => await nextTick())
</script>
