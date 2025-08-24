<template>
  <div class="py-[80px] bg-[#18181c] px-[64px] gap-[40px] flex flex-col text-pretty">
    <section class="flex justify-between">
      <span class="font-bold text-[20px] text-white">STORE</span>
      <div class="flex gap-[20px] shrink-0">
        <img
          src="https://ccdn.steak.io.vn/assets-facebook-ico.svg"
          class="w-[28px] shrink-0"
          alt=""
        />
        <img class="w-[28px] shrink-0" src="https://ccdn.steak.io.vn/assets-x-ico.svg" alt="" />
        <img
          class="w-[28px] shrink-0"
          src="https://ccdn.steak.io.vn/assets-youtube-ico.svg"
          alt=""
        />
      </div>
    </section>
    <section class="flex flex-col py-[40px] border-y-[1px] border-y-[#ffffff26]">
      <div class="flex flex-wrap gap-y-[48px] gap-x-[32px]">
        <div
          class="flex-basis-1/6 shrink-0 text-white h-full tablet:h-[356px] w-[204px]"
          v-for="(content, index) in footerContentColumns"
          :key="index"
        >
          <div class="flex flex-col gap-y-[16px]">
            <div class="flex items-center">
              <span class="text-xl font-bold">{{ content.title }}</span>
            </div>
            <div class="flex flex-col">
              <div
                class="h-[32px] flex items-center"
                v-for="(item, index) in content.items"
                :key="index"
              >
                <router-link class="text-[#ffffffa6] text-[15px]" to="#">
                  {{ item }}
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="flex flex-col gap-y-3 justify-between">
      <div class="flex flex-col justify-ween gap-[40px] w-full">
        <span class="text-[12px] text-[#ffffffa6] text-wrap"
          >© 2025, Epic Games, Inc. All rights reserved. Epic, Epic Games, the Epic Games logo,
          Fortnite, the Fortnite logo, Unreal, Unreal Engine, the Unreal Engine logo, Unreal
          Tournament, and the Unreal Tournament logo are trademarks or registered trademarks of Epic
          Games, Inc. in the United States of America and elsewhere. Other brands or product names
          are the trademarks of their respective owners. Our websites may contain links to other
          sites and resources provided by third parties. These links are provided for your
          convenience only. Epic Games has no control over the contents of those sites or resources,
          and accepts no responsibility for them or for any loss or damage that may arise from your
          use of them.</span
        >
        <div class="flex gap-y-[8px] gap-x-[24px] flex-wrap">
          <span class="text-[12px] text-[#ffffffa6]">Terms of Service</span>
          <span class="text-[12px] text-[#ffffffa6]">Privacy Policy</span>
          <span class="text-[12px] text-[#ffffffa6]">Safety & security</span>
          <span class="text-[12px] text-[#ffffffa6]">Store refund policy</span>
          <span class="text-[12px] text-[#ffffffa6]">Publisher Index</span>
        </div>
      </div>
      <!-- <button
        @click="scrollToTheTop"
        class="cursor-pointer py-[12px] text-nowrap w-[143px] justify-center h-[48px] px-[20px] leading-[21px] tracking-[0.28px] flex text-white bg-[#ffffff59]/50 hover:bg-[#ffffff59] gap-[8px] text-[15px] rounded-[8px] items-center"
      >
        {{ $t('footer.back_to_top') }}
      </button> -->
    </section>
  </div>
</template>

<script setup>
// const scrollToTheTop = () => {
//   window.scrollTo({ top: 0, behavior: 'smooth' })
// }
const footerContentColumns = [
  {
    title: 'Games',
    items: [
      'Fortnite',
      'Fall Guys',
      'Rocket League',
      'Unreal Tournament',
      'Infinity Blade',
      'Shadow Complex',
      'Robo Recall',
    ],
  },
  {
    title: 'Marketplaces',
    items: [
      'Epic Games Store',
      'Fab',
      'Sketchfab',
      'ArtStation',
      'Store Refund Policy',
      'Store EULA',
    ],
  },
  {
    title: 'Tools',
    items: [
      'Unreal Engine',
      'UEFN',
      'MetaHuman',
      'Twinmotion',
      'Megascans',
      'RealityScan',
      'Rad Game Tools',
    ],
  },
  {
    title: 'Online Services',
    items: [
      'Epic Online Services',
      'Kids Web Services',
      'Services Agreement',
      'Acceptable Use Policy',
      'Trust Statement',
      'Subprocessor List',
    ],
  },
  {
    title: 'Company',
    items: ['About', 'Newsroom', 'Careers', 'Students', 'UX Research'],
  },
  {
    title: 'Resources',
    items: [
      'Dev Community',
      'MegaGrants',
      'Support-A-Creator',
      'Creator Agreement',
      'Distribute on Epic Games',
      'Unreal Engine Branding Guidelines',
      'Fan Art Policy',
      'Community Rules',
      'EU Digital Services Act Inquiry',
      'Epic Pro Support',
    ],
  },
]
</script>
