<template>
  <breadcrumb>
    <breadcrumb-list>
      <breadcrumb-item v-for="(route, index) in currentRouterList" :key="index">
        <breadcrumb-separator />
        <breadcrumb-link as-child>
          <router-link :to="{ name: route.name }"> {{ route?.meta?.baseName }} </router-link>
        </breadcrumb-link>

        <template
          v-if="route.children"
          v-for="(childRoute, childIndex) in route.children"
          :key="childIndex"
        >
          <breadcrumb-link as-child>
            <router-link :to="{ name: childRoute.name }">
              {{ childRoute?.meta?.baseName }}
            </router-link>
          </breadcrumb-link>
        </template>
      </breadcrumb-item>
    </breadcrumb-list>
  </breadcrumb>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { RouteRecordRaw, useRoute } from 'vue-router'
import { publisherRoutes } from '@/router/routes/publisher/PublisherRoutes'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

const route = useRoute()
const currentRouterList = ref<RouteRecordRaw[] | any>([])

watch(
  () => route.name,
  () => {
    const index: any = publisherRoutes[0].children?.findIndex((item) => item.name === route.name)
    if (index !== -1) {
      currentRouterList.value = publisherRoutes[0].children?.slice(0, index + 1)
    } else {
      currentRouterList.value = []
    }
  },
  { immediate: true },
)
</script>
