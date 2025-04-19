<template>
  <header class="bg-[#fff]/10 backdrop-blur-md">
    <teleport to="header">
      <div class="relative z-[999]">
        <div
          class="flex justify-between items-center peer/header mx-auto w-full text-white px-4 p-0 h-[72px]"
        >
          <!-- LOGO -->
          <div class="flex items-center peer/hover h-full">
            <div class="group/logo flex items-center me-5 bg-[#101014]">
              <router-link to="/">
                <img src="https://ccdn.steak.io.vn/logo_steak.svg" class="w-10" alt="" />
              </router-link>

              <img
                src="https://ccdn.steak.io.vn/down-line-white.svg"
                class="group-hover/logo:rotate-180 w-3 ms-2 mt-3 relative transition-all"
                alt=""
              />

              <!-- DROP DOWN -->
              <div
                class="rounded-2xl group-focus:/logo:invisible shadow-2xl transition-all duration-300 ease-int-out group-hover/logo:visible invisible group-hover/logo:h-[506px] group-hover/logo:w-[620px] flex flex-row h-[0px] absolute top-17 border-gray-500/50 backdrop-blur-lg z-[1000] border-1 w-[0px] bg-black/30 group/after"
              >
                <div
                  class="flex flex-col opacity-0 group-hover/logo:opacity-100 h-full w-[620px] transition-all duration-300 ease-in-out"
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
                  class="m-[0px 0px opacity-0 group-hover/logo:opacity-100 duration-300 ease-in-out transition-all 10px] p-[32px] w-[345px] h-[505px]"
                >
                  <p class="font-bold text-2xl pb-3">Create</p>
                  <!-- PLAY OPTION -->
                  <div
                    class="flex gap-2 hover:bg-[#ffffff26] rounded-xl text-start pl-5 w-[228px] h-[40px]"
                  >
                    <img src="https://ccdn.steak.io.vn/fortnite-ico-white.svg" class="w-6" alt="" />
                    <button class="">Fortnite</button>
                  </div>
                  <!-- END PLAY -->
                </div>
              </div>
              <!-- END DROP DOWN -->
            </div>

            <!-- Navigation -->
            <div class="ms-5 flex items-center h-full">
              <router-link
                to="/store/home"
                class="flex items-center px-3 hover:text-gray-300 h-full duration-300 transition-all hover:bg-gray-800/80 px-3"
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
              <a
                href=""
                class="px-3 hover:text-gray-300 flex items-center duration-300 h-full transition-all hover:bg-gray-800/80"
                >Help</a
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
          <div class="h-full flex items-end-safe text-sm">
            <div
              class="settingOption w-full flex group duration-300 transition-all hover:bg-gray-800/80 h-full px-3"
            >
              <img
                src="https://ccdn.steak.io.vn/setting-white.svg"
                alt=""
                class="lg:w-5 lg:h-5 mt-6.5 group-hover:rotate-45 transition-transform"
              />
              <button class="me-2 flex justify-center items-center px-2">Setting</button>
            </div>
            <div
              class="loginOption w-full flex group duration-300 transition-all hover:bg-gray-800/80 h-full"
            >
              <router-link to="/auth/login" class="flex justify-center items-center mx-auto"
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
</script>
