<template>
  <header class="bg-[#fff]/10 backdrop-blur-md">
    <teleport to="header">
      <div :class="{ 'hidden laptop:block': isHiddenWhenMobile }" class="lg:relative z-[999]">
        <div
          class="flex justify-between items-center peer/header lg:mx-auto lg:w-full text-white px-4 gap-x-[20px] h-[72px]"
        >
          <!-- LOGO -->
          <div class="flex items-center justify-between peer/hover h-full">
            <div class="group/logo flex flex-row w-full items-center lg:me-5 bg-[#101014]">
              <div class="flex flex-row shrink-0 items-center lg:flex-none gap-x-[8px]">
                <router-link to="/" class="shrink-0">
                  <img
                    src="https://ccdn.steak.io.vn/logo_steak.svg"
                    class="w-8 object-contain h-auto lg:w-10"
                    alt=""
                  />
                </router-link>

                <img
                  src="https://ccdn.steak.io.vn/down-line-white.svg"
                  class="lg:group-hover/logo:rotate-180 w-[8px] mt-2 hidden lg:block object-cover lg:w-3 lg:ms-2 lg:mt-3 lg:relative transition-all"
                  alt=""
                />
              </div>

              <!-- DROP DOWN -->
              <div
                class="rounded-2xl delay-100 lg:group-focus:/logo:invisible shadow-2xl transition-all duration-300 ease-int-out lg:group-hover/logo:visible hidden lg:invisible lg:group-hover/logo:h-[506px] lg:group-hover/logo:w-[620px] lg:flex lg:flex-row h-[0px] absolute top-17 border-gray-500/50 backdrop-blur-lg z-[1000] border-1 w-[0px] bg-black/30 group/after"
              >
                <div
                  class="flex flex-col delay-200 opacity-0 group-hover/logo:opacity-100 h-full w-[620px] transition-all duration-300 ease-in-out"
                >
                  <div
                    class="p-[32px] m-[0px 0px 10px] border-r-1 border-gray-600/50 w-[284px] h-[225px]"
                  >
                    <p class="font-bold text-2xl pb-3">Play</p>
                    <!-- PLAY OPTION -->
                    <div
                      class="flex gap-2 hover:bg-[#ffffff26] rounded-xl text-start pl-5 w-[228px] h-[40px]"
                    >
                      <img
                        src="https://ccdn.steak.io.vn/fortnite-ico-white.svg"
                        class="w-6"
                        alt=""
                      />
                      <button class="">Fortnite</button>
                    </div>
                    <!-- END PLAY -->
                  </div>

                  <div
                    class="p-[32px] m-[0px 0px 10px] border-b-1 border-r-1 border-t-1 border-gray-600/50 w-[284px] h-[284px]"
                  >
                    <p class="font-bold text-2xl pb-3">Discover</p>
                    <!-- PLAY OPTION -->
                    <div
                      class="flex gap-2 hover:bg-[#ffffff26] rounded-xl text-start pl-5 w-[228px] h-[40px]"
                    >
                      <img
                        src="https://ccdn.steak.io.vn/fortnite-ico-white.svg"
                        class="w-6"
                        alt=""
                      />
                      <button class="">Fortnite</button>
                    </div>

                    <!-- END PLAY -->
                  </div>
                </div>

                <div
                  class="delay-200 m-[0px 0px 10px] opacity-0 group-hover/logo:opacity-100 duration-300 ease-in-out transition-all px-[60px] py-[32px] w-[345px] h-[505px]"
                >
                  <p class="font-bold text-2xl pb-3">Create</p>
                  <!-- PLAY OPTION -->
                  <div
                    class="flex gap-2 hover:bg-[#ffffff26] rounded-xl text-start px-1 w-[248px] h-[40px]"
                  >
                    <img src="https://ccdn.steak.io.vn/fortnite-ico-white.svg" class="w-6" alt="" />
                    <button class="">Fortnite</button>
                  </div>

                  <router-link
                    :to="{ name: 'PublisherHome' }"
                    class="flex gap-2 hover:bg-[#ffffff26] rounded-xl text-start px-1 w-[248px] h-[40px]"
                  >
                    <img src="https://ccdn.steak.io.vn/fortnite-ico-white.svg" class="w-6" alt="" />
                    <button class="">Publish on Steak Game Store</button>
                  </router-link>
                  <!-- END PLAY -->
                </div>
              </div>
              <!-- END DROP DOWN -->
            </div>

            <!-- Navigation -->
            <div class="ms-5 hidden lg:flex lg:items-center lg:h-full">
              <router-link
                :to="{ name: 'store-home' }"
                class="flex items-center text-nowrap hover:text-gray-300 h-full duration-300 transition-all hover:bg-gray-800/80 px-3"
              >
                {{ $t('navigation.store') }}
              </router-link>

              <a
                href=""
                class="h-full flex items-center text-nowrap hover:text-gray-300 duration-300 transition-all hover:bg-gray-800/80 px-3"
                >{{ $t('navigation.hub') }}</a
              >
              <a
                href=""
                class="hover:text-gray-300 flex text-nowrap items-center h-full duration-300 transition-all hover:bg-gray-800/80 px-3"
                >{{ $t('navigation.community') }}</a
              >
              <router-link
                :to="{ name: 'SupportCenter' }"
                class="px-3 hover:text-gray-300 text-nowrap flex items-center duration-300 h-full transition-all hover:bg-gray-800/80"
                >{{ $t('navigation.help') }}</router-link
              >
              <a
                href=""
                class="hover:text-gray-300 text-nowrap flex items-center duration-300 h-full transition-all hover:bg-gray-800/80 px-3"
                >{{ $t('navigation.about') }}</a
              >
            </div>
            <!-- END NAVIGATION -->
          </div>

          <!-- Optional -->
          <div class="h-full w-full lg:w-auto flex justify-between items-center text-sm">
            <span class="block lg:hidden font-bold text-[18px]">
              {{ $t('navigation.home') }}
            </span>
            <div class="flex items-center gap-x-6 flex-row lg:gap-x-4 justify-end h-full">
              <languages-option />
              <Drawer direction="top" :open="openDrawer">
                <drawer-trigger as-child>
                  <button @click="openDrawer = true" class="block lg:hidden cursor-pointer">
                    <img
                      src="https://ccdn.steak.io.vn/assets-menu-mobile-repo-white.svg"
                      class="w-6.5"
                      alt=""
                    />
                  </button>
                </drawer-trigger>
                <drawer-content class="h-full outline-0 bg-white/10 backdrop-blur-xl py-10">
                  <div class="mx-auto w-full">
                    <drawer-title class="hidden">Menu</drawer-title>
                    <drawer-header
                      class="text-3xl font-extrabold py-0 w-full flex justify-between flex-row"
                    >
                      <span>{{ $t('menu.base') }}</span>
                      <div>
                        <router-link
                          @click="openDrawer = false"
                          v-if="!getCookie('userAccessRights')"
                          :to="{ name: 'Login' }"
                          class="text-lg bg-blue-400/70 transition-colors duration-300 hover:bg-blue-400/90 px-4 py-1 rounded-sm"
                        >
                          {{ $t('auth.login') }}
                        </router-link>
                        <div
                          v-else
                          class="flex items-center gap-x-2 text-lg cursor-pointer h-full font-black bg-white/10 px-6 py-1 rounded-sm"
                        >
                          {{ getCookie('userAccessRights') }}
                        </div>
                      </div>
                    </drawer-header>
                    <drawer-description class="hidden"> </drawer-description>
                    <drawer-footer class="flex flex-col gap-y-2">
                      <router-link
                        @click="openDrawer = false"
                        class="w-full text-lg font-mono bg-white/5 px-3 py-1 rounded-xs hover:bg-white/10 focus:bg-white/20"
                        :to="{ name: 'store-home' }"
                        >{{ $t('navigation.store') }}</router-link
                      >
                      <router-link
                        @click="openDrawer = false"
                        class="w-full text-lg font-mono bg-white/5 px-3 py-1 rounded-xs hover:bg-white/10 focus:bg-white/20"
                        :to="{ name: 'PublisherDashboard' }"
                        >{{ $t('navigation.development_workspace') }}</router-link
                      >
                      <router-link
                        @click="openDrawer = false"
                        class="w-full text-lg font-mono bg-white/5 px-3 py-1 rounded-xs hover:bg-white/10 focus:bg-white/20"
                        :to="{ name: 'SupportCenter' }"
                        >{{ $t('navigation.help') }}</router-link
                      >
                      <button
                        v-if="getCookie('userAccessRights')"
                        @click="handleLogout"
                        class="w-full flex flex-row-reverse justify-between cursor-pointer gap-x-2 text-lg font-mono bg-white/5 px-3 py-1 rounded-xs hover:bg-white/10 focus:bg-white/20"
                      >
                        <LogOut class="text-white" />
                        {{ $t('auth.logout') }}
                      </button>
                    </drawer-footer>
                  </div>
                </drawer-content>
              </Drawer>

              <div class="hidden laptop:block">
                <div
                  v-if="!getCookie('userAccessRights')"
                  class="loginOption hidden w-full lg:flex group duration-300 transition-all hover:bg-gray-800/80 h-full"
                >
                  <router-link to="/login" class="flex justify-center items-center mx-auto">{{
                    $t('auth.login')
                  }}</router-link>
                </div>

                <dropdown-menu v-else>
                  <dropdown-menu-trigger as-child>
                    <div class="flex items-center gap-x-2 cursor-pointer h-full font-black">
                      {{ getCookie('userAccessRights') }}
                    </div>
                  </dropdown-menu-trigger>
                  <dropdown-menu-content align="end">
                    <dropdown-menu-label>
                      <span class="flex w-full text-center font-extrabold">{{
                        $t('auth.informations.user.profile.title')
                      }}</span>
                    </dropdown-menu-label>
                    <dropdown-menu-separator />
                    <dropdown-menu-group>
                      <dropdown-menu-item class="cursor-pointer" @click="handleLogout">
                        <LogOut class="text-white" />
                        {{ $t('auth.logout') }}
                      </dropdown-menu-item>
                    </dropdown-menu-group>
                  </dropdown-menu-content>
                </dropdown-menu>
              </div>
            </div>
          </div>
          <!-- END OPTIONAL-->
        </div>
      </div>
    </teleport>
  </header>
</template>

<script setup>
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
import { LogOut } from 'lucide-vue-next'
import { useRouter } from 'vue-router'
import { toastSuccessNotificationPopup } from '@/composables/toast/toastNotificationPopup'
import { ref } from 'vue'
const router = useRouter()
const handleLogout = async () => {
  removeCookie('userAccessRights')
  toastSuccessNotificationPopup('Logout successfully')
  await router.push({ name: 'Login' })
}
const props = defineProps({
  isHiddenWhenMobile: {
    type: Boolean,
    default: false,
  },
})

const openDrawer = ref(false)
</script>
