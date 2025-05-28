<template>
  <breadcrumb>
    <breadcrumb-list>
      <breadcrumb-item v-for="(route, index) in currentRouterList" :key="index">
        <breadcrumb-separator v-if="index > 0" />
        <breadcrumb-link as-child>
          <router-link :to="{ name: route.name }">
            {{ route?.meta?.baseName || route.name }}
          </router-link>
        </breadcrumb-link>
      </breadcrumb-item>
    </breadcrumb-list>
  </breadcrumb>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { publisherRoutes } from '@/router/routes/publisher/PublisherRoutes'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

const route = useRoute()
const currentRouterList = ref<any[]>([])

const findBreadcrumbTrail = (
  routes: any[],
  targetName: string,
  trail: any[] = [],
): any[] | null => {
  for (const r of routes) {
    const newTrail = [...trail, r]
    if (r.name === targetName) return newTrail
    if (r.children) {
      const found = findBreadcrumbTrail(r.children, targetName, newTrail)
      if (found) return found
    }
  }
  return null
}

watch(
  () => route.name,
  () => {
    const foundTrail = findBreadcrumbTrail(publisherRoutes, route.name as string)
    currentRouterList.value = foundTrail ?? []
  },
  { immediate: true },
)
</script>
