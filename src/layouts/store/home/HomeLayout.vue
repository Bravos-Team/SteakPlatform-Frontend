<template>
  <store-header :userProfileData="userProfile.data" :isHiddenSearchingBar="isHiddenSearchingBar"
    :isHiddenWhenMobile="false"></store-header>
  <router-view></router-view>
  <store-footer></store-footer>
</template>

<script setup>
import StoreFooter from '@/components/store/FooterStore.vue'
import StoreHeader from '@/components/store/StoreTopBar.vue'
import { ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { useQueryUserProfile } from '@/hooks/user/useUserProfile'
const { data: userProfile, isFetching: isFetchingUserProfile } = useQueryUserProfile()

const route = useRoute()
const isHiddenSearchingBar = ref(false)
watchEffect(() => {
  isHiddenSearchingBar.value = !!route.meta?.isHiddenSearchingBar
})
</script>
