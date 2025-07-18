<template>
  <dropdown-menu>
    <dropdown-menu-trigger as-child>
      <div class="flex items-center justify-center cursor-pointer">
        <img
          :src="'https://ccdn.steak.io.vn/language-white.svg'"
          class="content-start text-black dark:text-white hidden dark:block"
          alt="language icon"
        />
        <button class="me-2 flex justify-center items-center px-2 text-nowrap">
          {{ $t('navigation.languages') }}
        </button>
      </div>
    </dropdown-menu-trigger>
    <dropdown-menu-content>
      <dropdown-menu-label class="text-xl">
        {{ $t('navigation.languages_label') }}
      </dropdown-menu-label>
      <dropdown-menu-separator />
      <dropdown-menu-item
        @click="handleChangeLanguages('vi')"
        class="flex cursor-pointer items-center justify-between"
      >
        <img
          src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2NCIgaGVpZ2h0PSI2NCIgdmlld0JveD0iMCAwIDY0IDY0Ij4KCTxjaXJjbGUgY3g9IjMyIiBjeT0iMzIiIHI9IjMwIiBmaWxsPSIjZjQyZjRjIiAvPgoJPHBhdGggZmlsbD0iI2ZmZTYyZSIgZD0ibTMyIDM5bDkuOSA3bC0zLjctMTEuNGw5LjgtNy40SDM1LjhMMzIgMTZsLTMuNyAxMS4ySDE2bDkuOCA3LjRMMjIuMSA0NnoiIC8+Cjwvc3ZnPg=="
          alt=""
          class="size-6"
        />
        <span class="text-xl"> Vietnamese</span>
      </dropdown-menu-item>
      <dropdown-menu-item
        @click="handleChangeLanguages('en')"
        class="flex items-center cursor-pointer justify-between"
      >
        <img
          src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzNiIgaGVpZ2h0PSIzNiIgdmlld0JveD0iMCAwIDM2IDM2Ij4KCTxwYXRoIGZpbGw9IiMwMDI0N2QiIGQ9Ik0wIDkuMDU5VjEzaDUuNjI4ek00LjY2NCAzMUgxM3YtNS44Mzd6TTIzIDI1LjE2NFYzMWg4LjMzNXpNMCAyM3YzLjk0MUw1LjYzIDIzek0zMS4zMzcgNUgyM3Y1LjgzN3pNMzYgMjYuOTQyVjIzaC01LjYzMXpNMzYgMTNWOS4wNTlMMzAuMzcxIDEzek0xMyA1SDQuNjY0TDEzIDEwLjgzN3oiIC8+Cgk8cGF0aCBmaWxsPSIjY2YxYjJiIiBkPSJtMjUuMTQgMjNsOS43MTIgNi44MDFhNCA0IDAgMCAwIC45OS0xLjc0OUwyOC42MjcgMjN6TTEzIDIzaC0yLjE0MWwtOS43MTEgNi44Yy41MjEuNTMgMS4xODkuOTA5IDEuOTM4IDEuMDg1TDEzIDIzLjk0M3ptMTAtMTBoMi4xNDFsOS43MTEtNi44YTQgNCAwIDAgMC0xLjkzNy0xLjA4NUwyMyAxMi4wNTd6bS0xMi4xNDEgMEwxLjE0OCA2LjJhNCA0IDAgMCAwLS45OTEgMS43NDlMNy4zNzIgMTN6IiAvPgoJPHBhdGggZmlsbD0iI2VlZSIgZD0iTTM2IDIxSDIxdjEwaDJ2LTUuODM2TDMxLjMzNSAzMUgzMmE0IDQgMCAwIDAgMi44NTItMS4xOTlMMjUuMTQgMjNoMy40ODdsNy4yMTUgNS4wNTJjLjA5My0uMzM3LjE1OC0uNjg2LjE1OC0xLjA1MnYtLjA1OEwzMC4zNjkgMjNIMzZ6TTAgMjF2Mmg1LjYzTDAgMjYuOTQxVjI3YzAgMS4wOTEuNDM5IDIuMDc4IDEuMTQ4IDIuOGw5LjcxMS02LjhIMTN2Ljk0M2wtOS45MTQgNi45NDFjLjI5NC4wNy41OTguMTE2LjkxNC4xMTZoLjY2NEwxMyAyNS4xNjNWMzFoMlYyMXpNMzYgOWEzLjk4IDMuOTggMCAwIDAtMS4xNDgtMi44TDI1LjE0MSAxM0gyM3YtLjk0M2w5LjkxNS02Ljk0MkE0IDQgMCAwIDAgMzIgNWgtLjY2M0wyMyAxMC44MzdWNWgtMnYxMGgxNXYtMmgtNS42MjlMMzYgOS4wNTl6TTEzIDV2NS44MzdMNC42NjQgNUg0YTQgNCAwIDAgMC0yLjg1MiAxLjJsOS43MTEgNi44SDcuMzcyTC4xNTcgNy45NDlBNCA0IDAgMCAwIDAgOXYuMDU5TDUuNjI4IDEzSDB2MmgxNVY1eiIgLz4KCTxwYXRoIGZpbGw9IiNjZjFiMmIiIGQ9Ik0yMSAxNVY1aC02djEwSDB2NmgxNXYxMGg2VjIxaDE1di02eiIgLz4KPC9zdmc+"
          alt=""
          class="size-6"
        />
        <span class="text-xl"> English</span>
      </dropdown-menu-item>
    </dropdown-menu-content>
  </dropdown-menu>
</template>

<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import i18n from '@/i18n'

const handleChangeLanguages = (lang: string) => {
  switch (lang) {
    case 'vi':
      return (i18n.global.locale.value = 'vi')
    case 'en':
      return (i18n.global.locale.value = 'en')
    default:
      return (i18n.global.locale.value = 'vi')
  }
}
</script>
