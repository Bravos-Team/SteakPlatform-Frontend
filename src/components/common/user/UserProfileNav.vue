<template>
  <sidebar-menu>
    <sidebar-menu-item>
      <dropdown-menu>
        <dropdown-menu-trigger asChild>
          <sidebar-menu-button
            size="lg"
            class="gap-3 hover:bg-gray-300/10 cursor-pointer data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground p-2 py-7 rounded-lg flex items-center"
          >
            <avatar class="size-12 rounded-full overflow-hidden">
              <avatar-image
                class="object-fit group-data-[collapsible=icon]:-translate-x-1.5"
                :src="user.avatar"
                :alt="user.name"
              />
              <avatar-fallback>...</avatar-fallback>
            </avatar>
            <div class="grid flex-1 text-left text-sm leading-tight">
              <span class="truncate font-semibold">{{ user.name }}</span>
              <span class="truncate text-xs">{{ user.email }}</span>
            </div>
            <ChevronsUpDown className="ml-auto size-4" />
          </sidebar-menu-button>
        </dropdown-menu-trigger>
        <DropdownMenuContent
          class="min-w-56 rounded-lg mt-5 bg-[#101014] p-3 border-1 border-gray-500/10 shadow-lg"
          :side="isMobile ? 'bottom' : 'right'"
          :align="'end'"
          :sideOffset="4"
        >
          <DropdownMenuLabel className="p-0 font-normal">
            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage :src="user.avatar" :alt="user.name" />
                <AvatarFallback className="rounded-lg">...</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{{ user.name }}</span>
                <span className="truncate text-xs">{{ user.email }}</span>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Sparkles />
              Upgrade to Pro
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <BadgeCheck />
              Account
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CreditCard />
              Billing
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Bell />
              Notifications
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <LogOut />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </dropdown-menu>
    </sidebar-menu-item>
  </sidebar-menu>
</template>

<script setup lang="ts">
import { BadgeCheck, Bell, ChevronsUpDown, CreditCard, LogOut, Sparkles } from 'lucide-vue-next'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'

const props = defineProps<{
  user: {
    name: string
    email: string
    avatar: string
  }
}>()

const { isMobile } = useSidebar()
</script>
