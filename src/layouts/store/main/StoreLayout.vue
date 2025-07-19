<template>
  <drawer direction="top" class="p-0 m-0">
    <div class="p-0">
      <store-top-bar></store-top-bar>
      <store-searching-bar :cart-items="data?.data"></store-searching-bar>
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
import { data } from '@/components/publisher/common/sidebar/SidebarItems'
import FooterStore from '@/components/store/FooterStore.vue'
import StoreSearchingBar from '@/components/store/StoreSearchingBar.vue'
import StoreTopBar from '@/components/store/StoreTopBar.vue'
import { Drawer } from '@/components/ui/drawer'
import { useUserCartList } from '@/hooks/store/cart/useUserCart'
import { getCookie } from '@/utils/cookies/cookie-utils'
import { onMounted } from 'vue'
const {
  data: userCartData,
  isFetching: isUserCartFetching,
  refetch: userCartRefetch,
} = useUserCartList()

onMounted(() => {
  if (getCookie('userAccessRights')) {
    userCartRefetch()
  }
})
</script>
