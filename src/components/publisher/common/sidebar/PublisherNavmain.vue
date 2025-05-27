<template>
  <!-- <sidebar-group class="group-data-[collapsible=icon]:hidden">  -->
  <sidebar-group>
    <sidebar-group-label>Platform</sidebar-group-label>
    <sidebar-menu>
      <sidebar-menu-skeleton v-if="!items" />
      <sidebar-menu-skeleton v-if="!items" />
      <sidebar-menu-skeleton v-if="!items" />
      <sidebar-menu-item class="flex flex-col gap-y-3" v-for="(value, index) in items" :key="index">
        <collapsible
          v-if="value?.items && value?.items.length > 0"
          :key="index"
          as-child
          :default-open="value?.isActive"
          class="group/collapsible transition-all duration-200 ease-in-out"
        >
          <sidebar-menu-item>
            <collapsible-trigger as-child>
              <sidebar-menu-button :tooltip="value?.title">
                <component :is="value?.icon" />
                <span>{{ value?.title }}</span>
                <chevron-right
                  class="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
                />
              </sidebar-menu-button>
              <!-- <sidebar-menu-badge class="mr-5">{{ items?.length }}</sidebar-menu-badge> -->
            </collapsible-trigger>
            <collapsible-content>
              <sidebar-menu-sub>
                <sidebar-menu-sub-item v-for="(subItem, index) in value?.items" :key="index">
                  <sidebar-menu-sub-button as-child>
                    <router-link :to="{ name: subItem?.name }">
                      <component :is="subItem?.icon" />
                      <span>{{ subItem?.title }}</span>
                    </router-link>
                  </sidebar-menu-sub-button>
                </sidebar-menu-sub-item>
              </sidebar-menu-sub>
            </collapsible-content>
          </sidebar-menu-item>
          <!-- <sidebar-separator /> -->
        </collapsible>
        <collapsible v-else>
          <sidebar-menu-item>
            <collapsible-trigger as-child>
              <router-link :to="{ name: value?.name }">
                <sidebar-menu-button :tooltip="value?.title">
                  <component :is="value?.icon" />
                  <span>{{ value?.title }}</span>
                </sidebar-menu-button>
              </router-link>
            </collapsible-trigger>
          </sidebar-menu-item>
        </collapsible>
      </sidebar-menu-item>
    </sidebar-menu>
  </sidebar-group>
</template>

<script setup lang="ts">
import { ChevronRight, type LucideIcon } from 'lucide-vue-next'
import { computed } from 'vue'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Tooltip } from '@/components/ui/tooltip'

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuBadge,
  SidebarSeparator,
  SidebarMenuSkeleton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar'

const props = defineProps<{
  items: [
    {
      title: string
      name?: string
      icon: LucideIcon
      isActive?: boolean
      items?: {
        title: string
        name: string
        icon: LucideIcon
      }[]
    },
  ]
}>()
</script>
