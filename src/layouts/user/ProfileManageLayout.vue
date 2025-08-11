<template>
  <div class="w-full h-full py-[2rem]">
    <div class="flex flex-col laptop:flex-row gap-x-12 gap-y-8 laptop:px-[7rem] px-[1rem]">
      <div class="h-full bg-[#202024] rounded-lg basis-4/12">
        <div v-for="(option, index) in manageOptions" :key="index" class="flex flex-col items-center h-full py-3 px-3">
          <div class="flex justify-start items-start w-full px-3 py-1">
            <span class="font-medium text-md">{{ option.title }}</span>
          </div>
          <div class="flex flex-col gap-y-1 items-start justify-start w-full">
            <button v-for="(sub, index) in option.children" :key="index"
              class="flex gap-x-2 py-1 w-full hover:bg-[#444447]/50 transition-colors duration-300 ease-in-out cursor-pointer px-2 rounded-sm">
              <component :is="sub.icon" class="text-blue-300" />
              <span class="text-wrap"> {{ sub.title }}</span>
            </button>
          </div>
        </div>
      </div>
      <div class="h-full basis-8/12">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { KeySquare, UserCog } from 'lucide-vue-next'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const manageOptions = [
  {
    title: t('auth.informations.user.profile.title'),
    children: [
      {
        title: t('auth.informations.user.account.children.settings'),
        icon: UserCog,
      },
      {
        title: t('auth.informations.user.account.children.passwordAndSecurity'),
        icon: KeySquare,
      },
    ],
  },
]
</script>
