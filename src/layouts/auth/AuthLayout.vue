<template>
  <div>
    <header-auth :headerTitle="route.meta.title"></header-auth>
    <router-view></router-view>
    <footer-store></footer-store>
  </div>
</template>
<script setup>
import FooterStore from '@/components/store/FooterStore.vue'
import HeaderAuth from '@/components/auth/HeaderAuth.vue'
import { useRoute } from 'vue-router'
const route = useRoute()
</script>
