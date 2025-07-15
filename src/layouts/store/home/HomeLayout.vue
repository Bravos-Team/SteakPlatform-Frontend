<template>
  <drawer direction="top">
    <store-header :isHiddenSearchingBar="isHiddenSearchingBar"></store-header>
    <router-view></router-view>
    <store-footer></store-footer>
  </drawer>
</template>

<script setup>
import StoreFooter from '@/components/store/FooterStore.vue'
import StoreHeader from '@/components/store/StoreTopBar.vue'
import { Drawer } from '@/components/ui/drawer'
import { ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isHiddenSearchingBar = ref(false)

watchEffect(() => {
  isHiddenSearchingBar.value = !!route.meta?.isHiddenSearchingBar
})
</script>
