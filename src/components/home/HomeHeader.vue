<template>
  <div class="relative z-[999]">
    <div
      class="mx-auto bg-[#fff]/1 will-change-transform backdrop-blur-md text-white w-full px-4 p-0 flex items-center justify-between h-[72px]"
    >
      <!-- LOGO -->
      <div class="flex items-center h-full">
        <div class="group/logo flex items-center me-5">
          <img src="https://ccdn.steak.io.vn/logo_steak.svg" class="w-10" alt="" />
          <img
            src="https://ccdn.steak.io.vn/down-line-white.svg"
            class="group-hover/logo:rotate-180 w-3 ms-2 mt-3 relative transition-all"
            alt=""
          />

          <div
            class="rounded-lg group-hover/logo:visible invisible flex flex-row h-[506px] z-50 backdrop-blur-md absolute top-16 border-gray-500/50 border-1 w-[620px] bg-[#303034b3]"
          >
            <div class="h-full flex flex-col">
              <div
                class="p-[32px] m-[0px 0px 10px] border-r-1 border-gray-600/50 w-[284px] h-[225px]"
              >
                <p class="font-bold text-2xl pb-3">Play</p>
                <!-- PLAY OPTION -->
                <div
                  class="flex gap-2 hover:bg-[#ffffff26] rounded-xl text-start pl-5 w-[228px] h-[40px]"
                >
                  <img src="https://ccdn.steak.io.vn/fortnite-ico-white.svg" class="w-6" alt="" />
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
                  <img src="https://ccdn.steak.io.vn/fortnite-ico-white.svg" class="w-6" alt="" />
                  <button class="">Fortnite</button>
                </div>
                <!-- END PLAY -->
              </div>
            </div>

            <div class="m-[0px 0px 10px] p-[32px] w-[345px] h-[505px]">
              <p class="font-bold text-2xl pb-3">Create</p>
              <!-- PLAY OPTION -->
              <div
                class="flex gap-2 hover:bg-[#ffffff26] rounded-xl text-start pl-5 w-[228px] h-[40px]"
              >
                <img src="https://ccdn.steak.io.vn/fortnite-ico-white.svg" class="w-6" alt="" />
                <button class="">Fortnite</button>
              </div>

              <div
                class="flex gap-2 hover:bg-[#ffffff26] rounded-xl text-start pl-5 w-[228px] h-[40px]"
              >
                <img src="https://ccdn.steak.io.vn/fortnite-ico-white.svg" class="w-6" alt="" />
                <button class="">Publish on Steak Game Store</button>
              </div>
              <!-- END PLAY -->
            </div>
          </div>
        </div>

        <!-- Navigation -->
        <div class="ms-5 flex items-center h-full">
          <a
            href=""
            class="flex items-center px-3 hover:text-gray-300 h-full duration-300 transition-all hover:bg-gray-800/80 px-3"
          >
            Store
          </a>

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
      </div>

      <!-- Optional -->
      <div class="h-full flex items-center text-sm">
        <div
          class="settingOption w-full flex group backdrop-blur-md duration-300 transition-all hover:bg-gray-800/80 h-full px-3"
        >
          <img
            src="https://ccdn.steak.io.vn/setting-white.svg"
            alt=""
            class="lg:w-5 lg:h-5 mt-6.5 group-hover:rotate-45 transition-transform"
          />
          <button class="me-2 flex justify-center items-center px-2">Setting</button>
        </div>
        <div
          class="loginOption w-full flex group backdrop-blur-md duration-300 transition-all hover:bg-gray-800/80 h-full"
        >
          <router-link to="/login" class="flex justify-center items-center mx-auto"
            >Login</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>
