<template>
  <span class="text-white font-medium px-2">
    {{ $t('title.pages.game_management.noti.message_logs') }}
    {{ new Date().toLocaleDateString('vi-VN') }}
  </span>
  <sheet>
    <sheet-trigger as-child>
      <button
        class="text-sky-400 ms-1 underline underline-blue-200 decoration-sky-500 cursor-pointer"
      >
        {{ $t('title.pages.game_management.noti.actions') }}
      </button>
    </sheet-trigger>
    <sheet-content class="pt-10 px-3">
      <sheet-header class="font-black text-3xl">Development Platform Changelog </sheet-header>
      <sheet-description>
        <changelog-accordion />
      </sheet-description>
    </sheet-content>
  </sheet>
</template>
<script setup lang="ts">
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

import ChangelogAccordion from '@/components/publisher/game/ChangelogAccordion.vue'
</script>
