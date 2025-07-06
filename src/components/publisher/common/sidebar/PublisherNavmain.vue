<template>
  <!-- <sidebar-group class="group-data-[collapsible=icon]:hidden">  -->
  <sidebar-group>
    <sidebar-group-label>Platform</sidebar-group-label>
    <sidebar-menu>
      <sidebar-menu-skeleton v-if="!items" />
      <sidebar-menu-skeleton v-if="!items" />
      <sidebar-menu-skeleton v-if="!items" />
      <sidebar-menu-item class="flex flex-col gap-y-3" v-for="(value, index) in items" :key="index">
        <!-- SOLLAPSIBLE PARENT NAV ITEM -->
        <collapsible
          v-if="value?.items && value?.items.length > 0"
          :key="index"
          as-child
          :default-open="value?.isActive"
          class="group/collapsible transition-all duration-200 ease-in-out"
        >
          <sidebar-menu-item>
            <!-- PARENT TRIGGER -->
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
            <!-- END PARENT TRIGGER -->

            <!-- COLLAPSIBLE CONTENT -->
            <collapsible-content>
              <sidebar-menu-sub>
                <sidebar-menu-sub-item v-for="(subItem, index) in value?.items" :key="index">
                  <!-- IF HAVE SUB ITEM IN ITEM -->
                  <collapsible class="group" v-if="subItem?.subItems">
                    <sidebar-menu-item>
                      <sidebar-menu-button :tooltip="subItem?.title">
                        <component :is="subItem?.icon" />
                        <span>{{ subItem?.title }}</span>

                        <collapsible-trigger
                          class="bg-[#101014]/50 cursor-pointer rounded-sm"
                          as-child
                        >
                          <chevrons-down
                            class="ml-auto transition-transform duration-200 !shrink-0 -rotate-90 group-data-[state=open]:rotate-0"
                          />
                        </collapsible-trigger>
                        <!-- group-data-[state=open]/collapsible:rotate-0 -->
                      </sidebar-menu-button>
                      <collapsible-content>
                        <sidebar-menu-sub>
                          <sidebar-menu-sub-item
                            v-for="(valueSub, index) in subItem?.subItems"
                            :key="index"
                          >
                            <sidebar-menu-sub-button as-child>
                              <router-link :to="{ name: valueSub?.name }">
                                <component :is="valueSub?.icon" />
                                <span>{{ valueSub?.title }}</span>
                              </router-link>
                            </sidebar-menu-sub-button>
                          </sidebar-menu-sub-item>
                        </sidebar-menu-sub>
                      </collapsible-content>
                    </sidebar-menu-item>
                  </collapsible>
                  <!-- END IF HAVE SUB ITEM IN ITEM -->

                  <!-- IF NOT -->
                  <sidebar-menu-sub-button v-else as-child>
                    <router-link :to="{ name: subItem?.name }">
                      <component :is="subItem?.icon" />
                      <span>{{ subItem?.title }}</span>
                    </router-link>
                  </sidebar-menu-sub-button>
                  <!-- END IF NOT -->
                </sidebar-menu-sub-item>
              </sidebar-menu-sub>
            </collapsible-content>
            <!-- END COLLAPSIBLE CONTENT -->
          </sidebar-menu-item>
          <!-- <sidebar-separator /> -->
        </collapsible>
        <!-- END COLLAPSIBLE PARENT NAV ITEM -->

        <!-- SINGLE NAV ITEM -->
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
        <!-- END SINGLE NAV ITEM -->
      </sidebar-menu-item>
    </sidebar-menu>
  </sidebar-group>
</template>

<script setup lang="ts">
import { ChevronRight, ChevronsDown, type LucideIcon } from 'lucide-vue-next'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuAction,
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
      items: {
        title: string
        name: string
        icon: LucideIcon
        subItems?: {
          title: string
          name: string
          icon: LucideIcon
        }[]
      }[]
    },
  ]
}>()
</script>
