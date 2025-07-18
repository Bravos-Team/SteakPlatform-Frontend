<template>
  <div class="w-full">
    <div class="flex flex-col laptop:flex-row gap-x-5">
      <div
        class="w-full hidden laptop:flex lg:w-[935px] xl:w-[1134px] xl:h-[638px] lg:h-[525px] overflow-hidden rounded-3xl bg-gray-200/5"
      >
        <div class="w-full h-full">
          <img
            v-for="game in gameSliders"
            :key="game.id"
            :src="game.background"
            alt=""
            class="object-cover h-full w-full"
          />
        </div>
      </div>

      <div
        class="w-full px-3 shrink-0 snap-mandatory laptop:hidden flex gap-x-10 lg:w-[935px] xl:w-[1134px] snap-x xl:h-[638px] lg:h-[525px] overflow-x-scroll no-scrollbar bg-gray-transparent"
      >
        <div
          v-for="game in gameSliders"
          :key="game.id"
          class="w-full tablet:min-w-[40rem] tablet:w-full snap-center rounded-sm overflow-hidden shrink-0 h-[40rem] flex"
        >
          <img :src="game.background" alt="" class="object-cover h-full w-full" />
        </div>
      </div>
      <!-- SUB SLIDER BAR-->
      <div class="lg:w-[180px] lg:h-[526px] hidden laptop:flex flex-col">
        <div
          class="lg:w-[180px] xl:w-[256px] xl:h-[101px] shrink-0 lg:h-[85px] flex flex-row justify-center items-center hover:bg-[#404044]/40 mb-[3px] rounded-md"
          v-for="game in gameSliders"
          :key="game.id"
        >
          <img
            :src="game.img"
            alt=""
            class="w-10 rounded-md mx-5 flex justify-center items-center"
          />
          <p class="text-white w-[120px]">{{ game.name }}</p>
        </div>
      </div>
      <!-- END SUB SLIDER BAR -->
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const tempImage =
  'https://cdn2.unrealengine.com/egs-blades-of-fire-carousel-desktop-1920x1080-d2399d7a8fcb.jpg?resize=1&w=1280&h=720&quality=medium'

const gameSliders = ref([
  {
    id: 1,
    name: 'Fortnite Reload',
    logo: '',
    message: '',
    prices: 0,
    status: 0,
    img: 'https://cdn2.unrealengine.com/egs-fortnite-reload-dashberry-carousel-thumb-1200x1600-d9805272fe28.jpg?resize=1&w=96&h=128&quality=medium',
    background:
      'https://cdn2.unrealengine.com/egs-fortnite-reload-dashberry-carousel-desktop-1920x1080-319f46230c37.jpg?resize=1&w=1280&h=720&quality=medium',
  },

  {
    id: 2,
    name: 'Epic Savings',
    logo: '',
    message: '',
    prices: 0,
    status: 1,
    img: 'https://cdn2.unrealengine.com/en-epic-savings-april-carousel-thumbnail-1200x1600-fff732adff08.jpg?resize=1&w=96&h=128&quality=medium',
    background:
      'https://cdn2.unrealengine.com/epic-savings-april-desktop-carousel-asset-deb7fd8eb5cf.avif?resize=1&w=1280&h=720&quality=medium',
  },

  {
    id: 3,
    name: 'Wuthering Waves',
    logo: '',
    message: '',
    prices: 0,
    status: 0,
    img: 'https://cdn2.unrealengine.com/egs-wuthering-waves-2-2-shorekeeper-carousel-thumb-1200x1600-ffbf355a6a27.jpg?resize=1&w=96&h=128&quality=medium',
    background:
      'https://cdn2.unrealengine.com/egs-wuthering-waves-2-2-shorekeeper-carousel-desktop-1920x1080-06ddd1a6f0b0.jpg?resize=1&w=1280&h=720&quality=medium',
  },

  {
    id: 4,
    name: 'The Last of Us™ Part II Remastered',
    logo: '',
    message: '',
    prices: 0,
    status: 2,
    img: 'https://cdn2.unrealengine.com/egs-the-last-of-us-part-ii-remastered-carousel-thumb-1200x1600-70850877a9c8.jpg?resize=1&w=96&h=128&quality=medium',
    background:
      'https://cdn2.unrealengine.com/egs-the-last-of-us-part-ii-remastered-carousel-desktop-v2-1920x1080-04d275677a28.jpg?resize=1&w=1280&h=720&quality=medium',
  },

  {
    id: 5,
    name: 'Blades of Fire',
    logo: '',
    message: '',
    prices: 0,
    status: 2,
    img: 'https://cdn2.unrealengine.com/egs-blades-of-fire-carousel-thumb-1200x1600-eb1a19ecef09.jpg?resize=1&w=96&h=128&quality=medium',
    background:
      'https://cdn2.unrealengine.com/egs-blades-of-fire-carousel-desktop-1920x1080-d2399d7a8fcb.jpg?resize=1&w=1280&h=720&quality=medium',
  },

  {
    id: 6,
    name: 'Split Fiction',
    logo: '',
    message: '',
    prices: 0,
    status: 1,
    img: 'https://cdn2.unrealengine.com/egs-split-fiction-carousel-thumb-1200x1600-9b5a96bf6479.jpg?resize=1&w=96&h=128&quality=medium',
    background: tempImage,
  },
])
</script>
