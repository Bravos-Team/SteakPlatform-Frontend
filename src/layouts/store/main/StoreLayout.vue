<template>
  <div class="relative">
    <BackToTheTopButton />
    <drawer className="sm:max-w-[425px]">
      <store-top-bar v-if="!isFetchingUserProfile" :userProfileData="userProfile?.data"
        :isFetchingUserProfile="isFetchingUserProfile" :isHiddenWhenMobile="true" />
    </drawer>
    <mobile-top-bar />
    <div class="desktop-xl:px-[13rem] desktop:px-[6rem] tablet:px-[3rem]">
      <div class="@container flex w-full h-full flex-col py-2 tablet:py-10">
        <router-view></router-view>
      </div>
    </div>
  </div>

  <footer-store></footer-store>
</template>
<script setup>
import BackToTheTopButton from '@/components/common/BackToTheTopButton.vue'
import FooterStore from '@/components/store/FooterStore.vue'
import MobileTopBar from '@/components/store/nav/MobileTopBar.vue'
import StoreTopBar from '@/components/store/StoreTopBar.vue'
import { Drawer } from '@/components/ui/drawer'
import { nextTick, onMounted } from 'vue'
import { useQueryUserProfile } from '@/hooks/user/useUserProfile'
const { data: userProfile, isFetching: isFetchingUserProfile } = useQueryUserProfile()
onMounted(async () => await nextTick())
</script>
