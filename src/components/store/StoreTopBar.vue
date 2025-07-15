<template>
  <header class="bg-[#fff]/10 backdrop-blur-md">
    <teleport to="header">
      <div class="lg:relative z-[999]">
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
                to="/store/home"
                class="flex items-center hover:text-gray-300 h-full duration-300 transition-all hover:bg-gray-800/80 px-3"
              >
                Store
              </router-link>

              <a
                href=""
                class="h-full flex items-center hover:text-gray-300 duration-300 transition-all hover:bg-gray-800/80 px-3"
                >Hub</a
              >
              <a
                href=""
                class="hover:text-gray-300 flex items-center h-full duration-300 transition-all hover:bg-gray-800/80 px-3"
                >Community</a
              >
              <router-link
                :to="{ name: 'SupportCenter' }"
                class="px-3 hover:text-gray-300 flex items-center duration-300 h-full transition-all hover:bg-gray-800/80"
                >Help</router-link
              >
              <a
                href=""
                class="hover:text-gray-300 flex items-center duration-300 h-full transition-all hover:bg-gray-800/80 px-3"
                >About</a
              >
            </div>
            <!-- END NAVIGATION -->
          </div>

          <!-- Optional -->
          <div class="h-full w-full lg:w-auto flex justify-between items-center text-sm">
            <span class="block lg:hidden font-bold text-[18px]">STORE</span>
            <div
              class="settingOption w-full hidden lg:flex justify-center items-center group duration-300 transition-all hover:bg-gray-800/80 h-full px-3"
            >
              <img
                src="https://ccdn.steak.io.vn/setting-white.svg"
                alt=""
                class="w-5 lg:w-5 lg:h-5 lg:mt-1 lg:group-hover:rotate-45 transition-transform"
              />
              <button class="me-2 flex justify-center items-center px-2">Setting</button>
            </div>

            <drawer-trigger as-child>
              <div class="block lg:hidden cursor-pointer">
                <img
                  src="https://ccdn.steak.io.vn/assets-menu-mobile-repo-white.svg"
                  class="w-6.5"
                  alt=""
                />
              </div>
            </drawer-trigger>
            <drawer-content class="h-full bg-white/10 backdrop-blur-xl py-10">
              <div class="mx-auto w-full max-w-sm">
                <drawer-title class="hidden">Menu</drawer-title>
                <drawer-header
                  class="text-3xl font-extrabold py-0 w-full flex justify-between flex-row"
                >
                  <span>Menu</span>
                  <router-link
                    :to="{ name: 'Login' }"
                    class="text-lg bg-blue-400/70 transition-colors duration-300 hover:bg-blue-400/90 px-4 py-1 rounded-sm"
                  >
                    Login
                  </router-link>
                </drawer-header>
                <drawer-description class="hidden"> </drawer-description>
                <drawer-footer class="flex flex-col gap-y-2">
                  <router-link
                    class="w-full text-lg font-mono bg-white/5 px-3 py-1 rounded-xs hover:bg-white/10 focus:bg-white/20"
                    :to="{ name: 'store' }"
                    >Game Store</router-link
                  >
                  <router-link
                    class="w-full text-lg font-mono bg-white/5 px-3 py-1 rounded-xs hover:bg-white/10 focus:bg-white/20"
                    :to="{ name: 'PublisherDashboard' }"
                    >Development Workspace</router-link
                  >
                  <router-link
                    class="w-full text-lg font-mono bg-white/5 px-3 py-1 rounded-xs hover:bg-white/10 focus:bg-white/20"
                    :to="{ name: 'SupportCenter' }"
                    >Help Center</router-link
                  >
                </drawer-footer>
              </div>
            </drawer-content>

            <div
              class="loginOption hidden w-full lg:flex group duration-300 transition-all hover:bg-gray-800/80 h-full"
            >
              <router-link to="/login" class="flex justify-center items-center mx-auto"
                >Login</router-link
              >
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
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerTitle,
  DrawerHeader,
  DrawerTrigger,
} from '@/components/ui/drawer'
</script>
