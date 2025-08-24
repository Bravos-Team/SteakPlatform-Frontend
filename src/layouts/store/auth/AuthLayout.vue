<template>
  <div>
    <header-auth></header-auth>
    <router-view></router-view>
    <footer-store></footer-store>
  </div>
</template>
<script lang="ts" setup>
import FooterStore from '@/components/store/FooterStore.vue'
import HeaderAuth from '@/components/auth/HeaderAuth.vue'
import { useRoute } from 'vue-router'
const route = useRoute()
</script>
