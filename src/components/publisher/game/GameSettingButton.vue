<template>
  <dropdown-menu>
    <dropdown-menu-trigger as-child>
      <button class="cursor-pointer hover:rotate-45 transition-all duration-300 ease-in-out">
        <settings class="w-5 h-5" />
      </button>
    </dropdown-menu-trigger>
    <dropdown-menu-content align="start" side="top">
      <dropdown-menu-group>
        <dropdown-menu-item as-child>
          <button class="w-full text-left cursor-pointer font-bold">Delete Project</button>
        </dropdown-menu-item>
      </dropdown-menu-group>
    </dropdown-menu-content>
  </dropdown-menu>
</template>

<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Settings } from 'lucide-vue-next'
</script>
