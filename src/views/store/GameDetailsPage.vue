<template>
  <div class="flex text-white flex-col" v-if="game.details">
    <!-- GAME NAME BAR -->
    <div class="flex flex-row h-[70px] mb-[8px]">
      <span class="text-[42px] leading-[90px] font-extrabold">{{ game.name }}</span>
    </div>
    <!-- END GAME NAME BAR -->

    <!-- OPTIONS BAR -->
    <div class="flex flex-row lg:w-full mb-[20px]">
      <div
        v-if="game.achievements != null"
        class="flex w-full flex-row items-center mx-[0px] me-[20px] ms-[0px] gap-x-[30px]"
      >
        <router-link class="pt-0 pr-0 pb-2 pl-0 border-b-3 border-[#00a6ff]" :class="''"
          >Overview</router-link
        >
        <router-link class="pt-0 pr-0 pb-2 pl-0 text-[#fff]/50 hover:text-white" :class="''"
          >Achievements</router-link
        >
      </div>
    </div>
    <!-- END OPTIONS BAR-->

    <!-- MAIN CONTENT -->
    <div class="lg:w-full flex flex-row justify-between">
      <!-- LEFT CONTENT -->
      <div
        class="flex flex-col h-[1412px] overflow-hidden w-[751px] gap-y-[50px] relative"
        :class="showMore ? 'h-full' : ''"
      >
        <!-- CAROUSEL -->
        <game-slider :game="game"></game-slider>
        <!-- END CAROUSEL -->

        <!-- DESCRIPTIONS -->
        <div class="flex shrink-0 text-[17px]">
          {{ game.descriptions }}
        </div>
        <!-- END DESCRIPTIONS -->

        <!-- RELATED FIELDS & FEATURES -->
        <relate-field-and-features-bar :game="game"></relate-field-and-features-bar>
        <!-- END RELATED FIELDS & FEATURES -->

        <!-- RELATED GAMES BY DEVELOPER -->
        <relate-games-by-developer :game="game"></relate-games-by-developer>
        <!-- END RELATED GAMES BY DEVELOPER -->

        <!-- ABOUT THE GAME -->
        <abouts-game :game="game"></abouts-game>
        <!-- END ABOUT THE GAME -->

        <!-- SHOW MORE BUTTON-->
        <div class="flex flex-col absolute bottom-0 w-full">
          <div class="h-[100px] w-full bg-gradient-to-t from-[#101014]/100 to-black/0"></div>
          <div class="w-full bg-[#101014] h-[26px] flex justify-start">
            <button
              @click="showMore = !showMore"
              class="text-[#26bbff] hover:underline text-[18px]"
            >
              {{ showMore ? 'Show less' : 'Show more' }}
            </button>
          </div>
        </div>
        <!-- END SHOW MORE BUTTON -->
      </div>
      <!-- END LEFT CONTENT -->

      <!-- RIGHT CONTENT -->
      <sub-game-details :game="game"></sub-game-details>
      <!-- END RIGHT CONTENT -->
    </div>
    <!-- END MAIN CONTENT -->

    <!-- SUB DETAILS -->
    <div class="text-white">
      <div class="w-[751px] flex flex-col justify-around">
        <div class="mt-[50px] mr-[0px] mb-[0px] shrink-0 flex flex-col h-[141px] justify-between">
          <span class="text-[18px] font-bold">FOLLOW US</span>
          <div class="py-[35px] px-[60px] rounded-[12px] bg-[#202024]">
            <div class="flex justify-center -my-[10px] mx-[0px]">
              <div
                class="flex justify-center w-[66px] h-[46px] items-center"
                v-for="(contact, index) in game.contacts"
                :key="index"
              >
                <img :src="contact.img" class="shrink-0 w-[26px]" alt="" />
              </div>
            </div>
          </div>
        </div>
        <div class="mt-[50px] mr-[0px] gap-y-[20px] mb-[0px] flex flex-col">
          <span class="text-[20px] tracking-[0.4px] font-bold w-full">{{
            game.name + 'System Requirements'
          }}</span>
          <div
            class="bg-[#202024] rounded-[12px] py-[35px] px-[60px] text-white justify-between gap-[35px]"
          >
            <div
              class="flex flex-col gap-[35px]"
              v-for="(system, index) in game.systemRequirements"
              :key="index"
            >
              <div class="flex flex-col">
                <div class="w-full flex justify-start gap-[32px]">
                  <button
                    class="flex cursor-pointer border-b-3 border-b-[#35B8EF] justify-center gap-[8px] text-[18px] ml-[2px]"
                  >
                    {{ system.name }}
                  </button>
                </div>
                <div class="gap-[13px] pt-[35px] pr-[0px] pb-[0px] flex flex-col">
                  <!-- CONTENT -->
                  <div class="w-full flex gap-x-[20px]">
                    <span class="text-[20px] w-6/12 font-bold">Minimum</span>
                    <span class="text-[20px] w-6/12 font-bold">Recommended</span>
                  </div>
                  <div class="flex gap-x-[20px]">
                    <div class="flex w-6/12 flex-col">
                      <span class="w-auto text-[#ffffffa6] text-[15px]">OS version</span>
                      <span class="w-[11/12]">{{ system.minimum.os }}</span>
                    </div>
                    <div class="flex flex-col w-6/12">
                      <span class="w-auto text-[#ffffffa6] text-[15px]">OS version</span>
                      <span class="w-auto">{{ system.recommended.os }}</span>
                    </div>
                  </div>
                  <div class="flex gap-x-[20px]">
                    <div class="flex w-6/12 flex-col">
                      <span class="w-auto text-[#ffffffa6] text-[15px]">CPU</span>
                      <span class="text-[17px] text-pretty">{{ system.minimum.cpu }}</span>
                    </div>
                    <div class="flex w-6/12 flex-col">
                      <span class="w-auto text-[#ffffffa6] text-[15px]">CPU</span>
                      <span class="text-[17px] text-pretty">{{ system.recommended.cpu }}</span>
                    </div>
                  </div>
                  <div class="flex gap-x-[20px]">
                    <div class="flex w-6/12 flex-col">
                      <span class="w-auto text-[#ffffffa6] text-[15px]">Memory</span>
                      <span class="text-[17px] text-pretty">{{ system.minimum.memory }}</span>
                    </div>
                    <div class="flex w-6/12 flex-col">
                      <span class="w-auto text-[#ffffffa6] text-[15px]">Memory</span>
                      <span class="text-[17px] text-pretty">{{ system.recommended.memory }}</span>
                    </div>
                  </div>

                  <div class="flex gap-x-[20px]">
                    <div class="flex w-6/12 flex-col">
                      <span class="w-auto text-[#ffffffa6] text-[15px]">GPU</span>
                      <span class="text-[17px] text-pretty">{{ system.minimum.gpu }}</span>
                    </div>
                    <div class="flex w-6/12 flex-col">
                      <span class="w-auto text-[#ffffffa6] text-[15px]">GPU</span>
                      <span class="text-[17px] text-pretty">{{ system.recommended.gpu }}</span>
                    </div>
                  </div>
                  <div class="flex gap-x-[20px]">
                    <div class="flex w-6/12 flex-col">
                      <span class="w-auto text-[#ffffffa6] text-[15px]">DirectX</span>
                      <span class="text-[17px] text-pretty">{{ system.minimum.directx }}</span>
                    </div>
                    <div class="flex w-6/12 flex-col">
                      <span class="w-auto text-[#ffffffa6] text-[15px]">DirectX</span>
                      <span class="text-[17px] text-pretty">{{ system.recommended.directx }}</span>
                    </div>
                  </div>
                  <div class="flex gap-x-[20px]">
                    <div class="flex w-6/12 flex-col">
                      <span class="w-auto text-[#ffffffa6] text-[15px]">Storage</span>
                      <span class="text-[17px] text-pretty">{{ system.minimum.storage }}</span>
                    </div>
                    <div class="flex w-6/12 flex-col">
                      <span class="w-auto text-[#ffffffa6] text-[15px]">Storage</span>
                      <span class="text-[17px] text-pretty">{{ system.recommended.storage }}</span>
                    </div>
                  </div>
                  <!-- END CONTENT -->
                </div>
              </div>
              <div class="flex flex-col w-auto">
                <span class="w-auto text-[#ffffffa6] text-[15px]">Login Accounts Required</span>
                <span class="w-auto text-white text-[17px]">{{ system.login_required }}</span>
              </div>
              <div class="flex flex-col gap-[35px]">
                <div class="flex flex-col">
                  <span class="text-[15px] text-[#ffffffa6]">Languages Supported</span>
                  <!-- AUDIO SUPPORTED -->
                  <div class="min-h-[46px]">
                    <span class="text-[17px] text-white">
                      Audio:
                      <span
                        class="text-white text-[17px]"
                        v-for="(audio, index) in system.languages_supported.audio"
                        :key="index"
                      >
                        {{ audio }}
                      </span>
                    </span>
                  </div>
                  <!-- END AUDIO SUPPORTED -->
                  <!-- LANGUAGES SUPPORTED -->
                  <div class="min-h-[80px]">
                    <span class="text-[17px] text-white">
                      Text:
                      <span
                        class="text-white text-[17px]"
                        v-for="(text, index) in system.languages_supported.text"
                        :key="index"
                      >
                        {{ text }}
                        <span v-if="index !== system.languages_supported.text.length - 1">,</span>
                      </span>
                    </span>
                  </div>
                  <!-- END LANGUAGES SUPPORTED -->
                </div>

                <!-- RIGHT POLICY NOTIFICATIONS -->
                <div class="flex flex-col">
                  <span class="text-[15px] text-[#ffffffa6]">
                    Trademarks, tradenames, and copyrights are property of their respective owners,
                    Digital Sun Games (2025) and Hooded Horse Inc.™ (2025). All Rights
                    Reserved.</span
                  >
                  <router-link to="#" class="text-white flex text-[16px] hover:underline"
                    >Privacy Policy
                    <img
                      class="w-[18px]"
                      src="https://ccdn.steak.io.vn/assets-shared-ico-collaborators-list.svg"
                      alt=""
                    />
                  </router-link>
                </div>
                <!-- END RIGHT POLICY NOTIFICATIONS -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- END SUB DETAILS -->
    <div class="h-[15px] mt-[24px] mb-[90px] pt-[28px] w-full border-t-1 border-[#ffffffa6]">
      <span class="before:content-['*_']"
        >The lowest price offered on The Epic Games Store in the last 30 days before discount
      </span>
    </div>
  </div>
</template>

<script setup>
import AboutsGame from '@/components/game/AboutsGame.vue'
import GameSlider from '@/components/game/GameSlider.vue'
import RelateFieldAndFeaturesBar from '@/components/game/RelateFieldAndFeaturesBar.vue'
import RelateGamesByDeveloper from '@/components/game/RelateGamesByDeveloper.vue'
import SubGameDetails from '@/components/game/SubGameDetails.vue'
import { nextTick, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const showMore = ref(false)

const route = useRoute()
const game = ref({})
const gameList = ref([
  {
    id: 1,
    name: 'Cataclismo',
    price: 399000,
    salePercent: 0,
    type: 1,
    status: 1,
    recommend: 0,
    descriptions:
      'Design and build fortresses brick by brick to stand against endless hordes of Horrors in this real-time strategy game with resource management, siege defense, and exploration. Lead from the ramparts, push back the darkness, and hold fast against the creatures of the Mist.',
    img: 'https://cdn1.epicgames.com/spt-assets/a730a8b1b09148619db00c18bc998f09/cataclismo-1cdwe.jpg?resize=1&w=360&h=480&quality=medium',
    signatureImage:
      'https://cdn1.epicgames.com/spt-assets/a730a8b1b09148619db00c18bc998f09/cataclismo-logo-c48f9.png?resize=1&w=480&h=270&quality=medium',
    suitableAges: 12,
    category: { id: 1, name: 'Base Game' },
    relateFields: [
      { id: 1, name: 'City Builder' },
      { id: 2, name: 'Strategy' },
      { id: 3, name: 'Tower Defense' },
    ],
    relateFeatures: [
      { id: 1, name: 'Cloud Saves' },
      { id: 2, name: 'Single Player' },
    ],
    achievements: [
      {
        id: 1,
        name: 'A Towering Achievement',
        descriptions: 'Complete every option defense level on any difficulty',
        img: 'https://shared-static-prod.epicgames.com/epic-achievements/a730a8b1b09148619db00c18bc998f09/2f7dd9c2f1a4416fbcfed127b9873f65/icons/9207e88158ef8edf74a651002bb60846',
        exp: 10,
      },
      {
        id: 2,
        name: 'Architecture Degree',
        descriptions: 'Accquire all Citadel upgrades from the Book of Insight',
        img: 'https://shared-static-prod.epicgames.com/epic-achievements/a730a8b1b09148619db00c18bc998f09/2f7dd9c2f1a4416fbcfed127b9873f65/icons/58d59d3306bbcc21a7b67fc25a322012',
        exp: 5,
      },
      {
        id: 3,
        name: 'Berserker',
        descriptions: 'Complete all skirmish levels on Extreme difficulty',
        img: 'https://shared-static-prod.epicgames.com/epic-achievements/a730a8b1b09148619db00c18bc998f09/2f7dd9c2f1a4416fbcfed127b9873f65/icons/1874900a69916bee13e5b3e57e4a74d7',
        exp: 100,
      },
      {
        id: 4,
        name: 'Creator',
        descriptions: 'Create and save a level in Creative Mode',
        img: 'https://shared-static-prod.epicgames.com/epic-achievements/a730a8b1b09148619db00c18bc998f09/2f7dd9c2f1a4416fbcfed127b9873f65/icons/9839eab59b0fe75ed21b853baf12c365',
        exp: 5,
      },
      {
        id: 5,
        name: 'Fate Is A Dark Comedy',
        descriptions: "Complete 'the Defense of Hogar' on any difficulty",
        img: 'https://shared-static-prod.epicgames.com/epic-achievements/a730a8b1b09148619db00c18bc998f09/2f7dd9c2f1a4416fbcfed127b9873f65/icons/77a95227e7c0f24808a17582f1d32623',
        exp: 5,
      },
    ],
    details: {
      images: [
        {
          url: 'https://cdn1.epicgames.com/spt-assets/a730a8b1b09148619db00c18bc998f09/cataclismo-19p7i.png?resize=1&w=480&h=270&quality=medium',
        },
        {
          url: 'https://cdn1.epicgames.com/spt-assets/a730a8b1b09148619db00c18bc998f09/cataclismo-1okzp.png?resize=1&w=480&h=270&quality=medium',
        },
        {
          url: 'https://cdn1.epicgames.com/spt-assets/a730a8b1b09148619db00c18bc998f09/cataclismo-jyrld.png?resize=1&w=480&h=270&quality=medium',
        },
        {
          url: 'https://cdn1.epicgames.com/spt-assets/a730a8b1b09148619db00c18bc998f09/cataclismo-13ipm.png?resize=1&w=480&h=270&quality=medium',
        },
        {
          url: 'https://cdn1.epicgames.com/spt-assets/a730a8b1b09148619db00c18bc998f09/cataclismo-w4o19.png?resize=1&w=480&h=270&quality=medium',
        },
        {
          url: 'https://cdn1.epicgames.com/spt-assets/a730a8b1b09148619db00c18bc998f09/cataclismo-l0emh.png?resize=1&w=480&h=270&quality=medium',
        },
        {
          url: 'https://cdn1.epicgames.com/spt-assets/a730a8b1b09148619db00c18bc998f09/cataclismo-om2cm.png?resize=1&w=480&h=270&quality=medium',
        },
        {
          url: 'https://cdn1.epicgames.com/spt-assets/a730a8b1b09148619db00c18bc998f09/cataclismo-16xem.png?resize=1&w=480&h=270&quality=medium',
        },
      ],
    },
    abouts: [
      {
        id: 1,
        descriptions: [
          {
            description:
              'Lead the last survivors in the aftermath of the Cataclismo as a corrupted world seeks to destroy all that remains of humanity. Build fortresses brick by brick, designing intricate, towering structures of wood and stone to fend off waves of Horrors as they attempt to overwhelm your band of survivors. Command powerful units in their stalwart defense, coordinating their varied capabilities as you race from breach to breach. Lead forays into the unknown to secure the vital resources needed to grow your military might and construction capabilities as you hold fast against the ever-growing onslaught – siege after siege, night after night.',
          },
        ],
        images: [
          {
            url: 'https://cdn1.epicgames.com/spt-assets/a730a8b1b09148619db00c18bc998f09/cataclismo-13w2k.png',
          },
        ],
        details: [],
      },
      {
        id: 2,
        descriptions: [
          {
            description:
              'Far from the relative safety of the Last City, your citadels and outposts hold back the hordes of Horrors before they can strike at the heart of humanity. Build impregnable fortresses across multiple biomes using an intricate building system that allows you to design your defenses with full freedom and strategic creativity, adapting your plans to the surrounding environment. Take advantage of natural chokepoints, height advantages, and local resources as you strategize for the challenge of each upcoming night’s attack.',
          },
        ],
        images: [
          {
            url: 'https://cdn1.epicgames.com/spt-assets/a730a8b1b09148619db00c18bc998f09/cataclismo-1q2dc.png',
          },
          {
            url: 'https://cdn1.epicgames.com/spt-assets/a730a8b1b09148619db00c18bc998f09/cataclismo-iwaal.png',
          },
        ],
        details: [
          {
            section:
              'A highly modular building system allows you to design your fortresses exactly as you desire – one piece at a time, with blueprints you have designed in advance, or using community creations shared by other players. Use your hard-earned resources to build structures that grant access to previously unreachable parts of the map, or construct fortifications that deny the Horrors access and provide your troops safe vantage points.',
          },
          {
            section:
              'Build cheaply and quickly using wood, or establish quarries and use durable stone to better withstand the onslaught. Keep an eye on structural integrity and load-bearing columns as falling pieces will kill friend and foe alike, often creating unique opportunities to crush numerous enemies with cleverly placed vulnerabilities.',
          },
          {
            section:
              'Adapt your fortress to growing needs as you acquire new tools and expand in an attempt to secure all the resources needed to sustain a powerful defensive force. Optimize the path from resource deposits to your warehouses with well placed structures and use rooftop construction to make the most of your limited space.',
          },
        ],
      },
      {
        id: 3,
        descriptions: [
          {
            description:
              'Though the Horrors may test your defenses during the day, only at night do they pour forth in full force. Spend your days exploring the world and pursuing the growth of your fortress, but as the sun starts to set, you would be wise to position your forces in preparation for the night’s onslaught.',
          },
        ],
        images: [
          {
            url: 'https://cdn1.epicgames.com/spt-assets/a730a8b1b09148619db00c18bc998f09/cataclismo-w0r2z.png',
          },
          {
            url: 'https://cdn1.epicgames.com/spt-assets/a730a8b1b09148619db00c18bc998f09/cataclismo-yxze5.png',
          },
        ],
        details: [
          {
            section:
              'Skillfully command soldiers ranging from sharp-eyed bowmen to explosive cannoneers to respond to an ever-evolving situation as new Horrors emerge. Draw the enemy into chokepoints lined with devastating traps and ambush them raining down fire arrows and pots of poison flung from your battlements. Maneuver your troops into precise tactical positions to take advantage of special traits and abilities made available as they upgrade, positioning them at heights that let them perform at their best – a wise architect can design fortresses that allow for a tiered defense.',
          },
          {
            section:
              "Build vital structures to sustain your defenses against the growing threat and unlock higher levels of prosperity alongside new technologies. Resource gathering outposts, unit recruitment centers, and housing for your citizens all directly and indirectly support your troops in their efforts. Should the walls falter, even your citizens' homes can be used as a secondary layer of defense – you must protect the citadel at all costs.",
          },
        ],
      },
      {
        id: 4,
        descriptions: [
          {
            description:
              'Cataclismo contains all three of: an epic single-player narrative campaign; a skirmish mode featuring hand-crafted maps; and an endlessly replayable challenge mode that puts you to the test on procedurally generated maps where you fend off increasingly dangerous waves of Horrors. A complex map editor gives you the ability to design and share skirmish maps of your own to challenge the community while the intricate construction system will allow the architecturally inclined to build and share blueprints and help others in their defense against the Horrors.',
          },
          {
            description:
              'The Cataclismo left the world devastated. But all hope is not lost – lead humanity through the darkness to a bright future as you design grand fortresses and command troops in real-time battles against a seemingly endless horde that will stop at nothing to see your people destroyed.',
          },
        ],
        images: [
          {
            url: 'https://cdn1.epicgames.com/spt-assets/a730a8b1b09148619db00c18bc998f09/cataclismo-5vkoo.png',
          },
          {
            url: 'https://cdn1.epicgames.com/spt-assets/a730a8b1b09148619db00c18bc998f09/cataclismo-77658.png',
          },
        ],
        details: [],
      },
      {
        id: 5,
        descriptions: [],
        images: [
          {
            url: 'https://cdn1.epicgames.com/spt-assets/a730a8b1b09148619db00c18bc998f09/cataclismo-1ixoc.png',
          },
        ],
        details: [],
      },
    ],
    developer: {
      id: 1,
      name: 'Digital Sun',
    },
    publisher: {
      id: 1,
      name: 'Hooded Horse',
    },
    refundType: {
      id: 1,
      name: 'Self-Refundable',
    },
    rewards: {
      id: 1,
      name: 'Earn 5% Back',
      value: 5,
    },
    releaseDate: '03/21/2025',
    platforms: [
      {
        id: 1,
        name: 'Windows',
      },
    ],
    contacts: [
      {
        img: 'https://ccdn.steak.io.vn/assets-twitter-ico.svg',
      },
      {
        img: 'https://ccdn.steak.io.vn/assets-discord-ico-opa.svg',
      },
      {
        img: 'https://ccdn.steak.io.vn/assets-youtube-ico.svg',
      },
      {
        img: 'https://ccdn.steak.io.vn/assets-facebook-ico.svg',
      },
      {
        img: 'https://ccdn.steak.io.vn/assets-earth-ico.svg',
      },
      {
        img: 'https://ccdn.steak.io.vn/assets-reddit-ico.svg',
      },
      {
        img: 'https://ccdn.steak.io.vn/assets-ig-ico-opa.svg',
      },
      {
        img: 'https://ccdn.steak.io.vn/assets-switch-ico.svg',
      },
    ],
    systemRequirements: [
      {
        id: 1,
        name: 'Windows',
        minimum: {
          os: 'Windows 10 (64-bit)',
          cpu: 'Intel Core i7-4770 (quad-core) / AMD FX-Series FX-9590 (quad-core)',
          memory: '8 GB RAM',
          gpu: 'NVIDIA GeForce GTX 760 (2 GB) / AMD Radeon R9 270X (2 GB)',
          directx: 'DirectX 11',
          storage: '10 GB available space',
        },
        recommended: {
          os: 'Windows 10 (64-bit)',
          cpu: 'Intel Core i7-6700 (quad-core) / AMD Ryzen 5 1500X (quad-core)',
          memory: '12 GB RAM',
          gpu: 'NVIDIA GeForce GTX 1050 Ti (4 GB) / AMD Radeon RX 570 (4 GB)',
          directx: 'DirectX 12',
          storage: '10 GB available space',
        },
        login_required: 'Epic ID',
        languages_supported: {
          audio: ['English'],
          text: [
            'Russian',
            'Spanish (Spain)',
            'Chinese (Simplified)',
            'Chinese (Traditional)',
            'Portuguese (Brazil)',
            'Korean',
            'Polish',
            'German',
            'Japanese',
            'English',
            'French',
            'Hungarian',
            'Italian',
            'Czech',
            'Turkish',
            'Ukrainian',
          ],
        },
      },
    ],
  },
])

onMounted(() => {
  console.log(route.params.id)
  game.value = gameList.value.find((game) => game.id === Number(route.params.id))
  console.log(game.value)
  nextTick()
})
</script>
