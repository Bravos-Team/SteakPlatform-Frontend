<template>
  <div>
    <header-store :headerTitle="route.meta.title"></header-store>
    <router-view></router-view>
    <footer-store></footer-store>
  </div>
</template>
<script setup>
import FooterStore from '@/components/store/FooterStore.vue'
import HeaderStore from '@/components/store/HeaderStore.vue'
import { useRoute } from 'vue-router'
const route = useRoute()
</script>
