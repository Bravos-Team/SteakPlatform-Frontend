<template>
  <header class="bg-[#101014] backdrop-blur-md mb-3 laptop:hidden">
    <div
      class="flex justify-between items-center peer/header lg:mx-auto lg:w-full text-white px-4 gap-x-[20px] h-[72px]">
      <!-- LOGO -->
      <div class="flex items-center justify-between peer/hover h-full">
        <div class="group/logo flex flex-row w-full items-center lg:me-5 bg-[#101014]">
          <div class="flex flex-row shrink-0 items-center lg:flex-none gap-x-[8px]">
            <router-link to="/" class="shrink-0">
              <img src="https://ccdn.steak.io.vn/logo_steak.svg" class="w-8 object-contain h-auto lg:w-10" alt="" />
            </router-link>

            <img src="https://ccdn.steak.io.vn/down-line-white.svg"
              class="lg:group-hover/logo:rotate-180 w-[8px] mt-2 hidden lg:block object-cover lg:w-3 lg:ms-2 lg:mt-3 lg:relative transition-all"
              alt="" />
          </div>
        </div>
      </div>

      <!-- Optional -->
      <div class="h-full w-full lg:w-auto flex justify-between items-center text-sm">
        <span class="block lg:hidden font-bold text-[18px]">
          {{ $t('navigation.home') }}
        </span>
        <div class="flex items-center gap-x-6 flex-row lg:gap-x-4 justify-end h-full">
          <languages-option />

          <Drawer :prevent-scroll-restoration="true" direction="top" :open="openDrawer">
            <drawer-trigger as-child>
              <button @click="openDrawer = true" class="block lg:hidden cursor-pointer">
                <img src="https://ccdn.steak.io.vn/assets-menu-mobile-repo-white.svg" class="w-6.5" alt="" />
              </button>
            </drawer-trigger>
            <drawer-content @interact-outside="openDrawer = false"
              class="h-full outline-0 bg-white/10 backdrop-blur-xl py-10">
              <div class="mx-auto w-full">
                <drawer-title class="hidden">Menu</drawer-title>
                <drawer-header class="text-3xl font-extrabold py-0 w-full flex justify-between flex-row">
                  <span>{{ $t('menu.base') }}</span>
                  <div>
                    <router-link @click="openDrawer = false" v-if="!getCookie('userAccessRights')"
                      :to="{ name: 'Login' }"
                      class="text-lg bg-blue-400/70 transition-colors duration-300 hover:bg-blue-400/90 px-4 py-1 rounded-sm">
                      {{ $t('auth.login') }}
                    </router-link>
                    <div v-else
                      class="flex items-center gap-x-2 text-lg cursor-pointer h-full font-black bg-white/10 px-6 py-1 rounded-sm">
                      {{ getCookie('userAccessRights') }}
                    </div>
                  </div>
                </drawer-header>
                <drawer-description class="hidden"> </drawer-description>
                <drawer-footer class="flex flex-col gap-y-2">
                  <router-link v-if="getCookie('userAccessRights')" :to="{ name: 'UserProfiles' }"
                    @click="openDrawer = false"
                    class="flex justify-between gap-x-2 items-center w-full text-lg font-mono bg-white/5 px-3 py-1 rounded-xs hover:bg-white/10 focus:bg-white/20">
                    <span class="text-center align-middle">
                      {{ $t('auth.informations.user.profile.title') }}</span>
                    <UserStar class="text-white" />
                  </router-link>
                  <router-link @click="openDrawer = false"
                    class="w-full text-lg font-mono bg-white/5 px-3 py-1 rounded-xs hover:bg-white/10 focus:bg-white/20"
                    :to="{ name: 'store-home' }">{{ $t('navigation.store') }}</router-link>
                  <router-link @click="openDrawer = false"
                    class="w-full text-lg font-mono bg-white/5 px-3 py-1 rounded-xs hover:bg-white/10 focus:bg-white/20"
                    :to="{ name: 'PublisherDashboard' }">{{ $t('navigation.development_workspace') }}</router-link>
                  <router-link @click="openDrawer = false"
                    class="w-full text-lg font-mono bg-white/5 px-3 py-1 rounded-xs hover:bg-white/10 focus:bg-white/20"
                    :to="{ name: 'SupportCenter' }">{{ $t('navigation.help') }}</router-link>
                  <button :class="{
                    '!cursor-not-allowed opacity-50': !invalidDevice,
                    'cursor-pointer': invalidDevice,
                  }" :disabled="!invalidDevice" @click="handleRedirectDownload"
                    class="w-full text-lg text-start font-mono bg-blue-300/20 px-3 py-1 rounded-xs hover:bg-blue-400/30 transition-all duration-300 font-black cursor-pointer">
                    {{ $t('Download') }}
                  </button>
                  <button v-if="getCookie('userAccessRights')" @click="handleLogout"
                    class="w-full flex flex-row-reverse justify-between cursor-pointer gap-x-2 text-lg font-mono bg-white/5 px-3 py-1 rounded-xs hover:bg-white/10 focus:bg-white/20">
                    <LogOut class="text-white" />
                    {{ $t('auth.logout') }}
                  </button>
                </drawer-footer>
              </div>
            </drawer-content>
          </Drawer>
        </div>
      </div>
      <!-- END OPTIONAL-->
    </div>
  </header>
</template>

<script setup>
import {
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerTitle,
  DrawerHeader,
  DrawerTrigger,
  Drawer,
} from '@/components/ui/drawer'
import LanguagesOption from '@/components/common/LanguagesOption.vue'
import { getCookie, removeCookie } from '@/utils/cookies/cookie-utils'
import { LogOut, UserStar } from 'lucide-vue-next'
import { useRouter } from 'vue-router'
import { toastSuccessNotificationPopup } from '@/composables/toast/toastNotificationPopup'
import { computed, ref } from 'vue'
const router = useRouter()
const openDrawer = ref(false)
const handleLogout = async () => {
  openDrawer.value = false
  removeCookie('userAccessRights')
  toastSuccessNotificationPopup('Logout successfully')
  await router.push({ name: 'Login' })
}
const invalidDevice = computed(
  () => navigator.platform.includes('Windows') || navigator.platform.includes('Win32') || navigator.platform.includes('Linux'),
)
const handleRedirectDownload = async () => {
  await router.push({ name: 'DownloadApplicationPage' })
  openDrawer.value = false
  openDrawer.value = false
}
</script>
