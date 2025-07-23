<template>
  <div class="w-full">
    <div class="flex flex-col laptop:flex-row gap-x-5">
      <div
        class="w-full hidden laptop:flex lg:w-[935px] xl:w-[1134px] xl:h-[638px] lg:h-[525px] overflow-hidden rounded-3xl bg-gray-200/5"
      >
        <div class="!min-w-[10rem] !min-h-full keen-slider" ref="container">
          <img
            v-for="(game, index) in gameSliders"
            :key="game.id"
            :src="game.background"
            class="object-cover !h-full !w-full keen-slider__slide"
            :class="`number-slide${index + 1}`"
          />
        </div>
      </div>

      <!-- MOBILE SLIDER -->
      <div
        class="w-full px-3 shrink-0 snap-mandatory laptop:hidden flex gap-x-10 lg:w-[935px] xl:w-[1134px] snap-x xl:h-[638px] lg:h-[525px] overflow-x-scroll no-scrollbar bg-gray-transparent"
      >
        <div
          v-for="(game, index) in gameSliders"
          :key="game.id"
          class="w-full tablet:min-w-[40rem] tablet:w-full snap-center rounded-sm overflow-hidden shrink-0 h-[40rem] flex"
        >
          <img :src="game.background" alt="" class="object-cover h-full w-full" />
        </div>
      </div>
      <!-- END MOBILE SLIDER -->

      <!-- SUB SLIDER BAR-->
      <div
        class="lg:w-[180px] lg:!min-h-full !hidden gap-y-5 justify-between laptop:!flex laptop:!flex-col thumbnail-list"
      >
        <div
          v-for="(game, index) in gameSliders"
          :key="game.id"
          class="thumbnail-item flex flex-row justify-start items-center px-3 py-2 rounded-md cursor-pointer transition-all duration-300 ease-in-out"
          :class="{ active: currentSlideIndex === index }"
          @click="goToSlide(index)"
        >
          <img :src="game.img" alt="" class="w-10 h-12 rounded-md object-cover" />
          <p class="text-white text-sm font-medium truncate flex-1 ml-3">{{ game.name }}</p>
        </div>
      </div>
      <!-- END SUB SLIDER BAR -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref } from 'vue'
import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/vue.es'
const animation = { duration: 300, easing: (t: number) => t }
let autoplayTimeout: NodeJS.Timeout | null = null
const startAutoplay = (sliderInstance: any) => {
  if (autoplayTimeout) {
    clearTimeout(autoplayTimeout)
  }
  autoplayTimeout = setTimeout(() => {
    if (sliderInstance) {
      sliderInstance.moveToIdx(sliderInstance.track.details.abs + 1, true, animation)
    }
  }, 3750)
}

const [container, slider] = useKeenSlider({
  loop: true,
  rtl: false,
  drag: true,
  slides: {
    origin: 'auto',
  },
  renderMode: 'precision',
  created(s) {
    currentSlideIndex.value = s.track.details.rel
    startAutoplay(s)
  },
  animationEnded(s) {
    startAutoplay(s)
  },
  slideChanged: (s) => {
    currentSlideIndex.value = s.track.details.rel
  },
})

const currentSlideIndex = ref(0)

const goToSlide = (index: number) => {
  if (slider.value) {
    if (autoplayTimeout) {
      clearTimeout(autoplayTimeout)
    }
    slider.value.moveToIdx(index, true, animation)
    startAutoplay(slider.value)
  }
}

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

// Cleanup autoplay timeout khi component bị destroy
onUnmounted(() => {
  if (autoplayTimeout) {
    clearTimeout(autoplayTimeout)
  }
})

await nextTick()
</script>

<style scoped>
body {
  margin: 0;
  font-family: 'Inter', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

[class^='number-slide'],
[class*=' number-slide'] {
  background: grey;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 50px;
  color: #fff;
  font-weight: 500;
  height: 200px;
  max-height: 100vh;
}

.number-slide1 {
  background: rgb(64, 175, 255);
  background: linear-gradient(128deg, rgba(64, 175, 255, 1) 0%, rgba(63, 97, 255, 1) 100%);
}

.number-slide2 {
  background: rgb(255, 75, 64);
  background: linear-gradient(128deg, rgba(255, 154, 63, 1) 0%, rgba(255, 75, 64, 1) 100%);
}

.number-slide3 {
  background: rgb(182, 255, 64);
  background: linear-gradient(128deg, rgba(182, 255, 64, 1) 0%, rgba(63, 255, 71, 1) 100%);
  background: linear-gradient(128deg, rgba(189, 255, 83, 1) 0%, rgba(43, 250, 82, 1) 100%);
}

.number-slide4 {
  background: rgb(64, 255, 242);
  background: linear-gradient(128deg, rgba(64, 255, 242, 1) 0%, rgba(63, 188, 255, 1) 100%);
}

.number-slide5 {
  background: rgb(255, 64, 156);
  background: linear-gradient(128deg, rgba(255, 64, 156, 1) 0%, rgba(255, 63, 63, 1) 100%);
}

.number-slide6 {
  background: rgb(64, 76, 255);
  background: linear-gradient(128deg, rgba(64, 76, 255, 1) 0%, rgba(174, 63, 255, 1) 100%);
}

.thumbnail-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow-y: auto;
  max-height: 100%;
}

.thumbnail-item {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  min-height: 60px;
  border: 2px solid transparent;
  position: relative;
  overflow: hidden;
}

.thumbnail-item:hover {
  background-color: rgba(64, 64, 68, 0.4);
}

.thumbnail-item.active {
  background-color: rgba(64, 64, 68, 0.2);
}

.thumbnail-item.active::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 0%;
  background-color: rgba(187, 187, 187, 0.2);
  /* background: linear-gradient(90deg, rgba(59, 130, 246, 0.6) 0%, rgba(59, 130, 246, 0.3) 100%); */
  animation: progressBar 3.9s linear infinite;
  z-index: 1;
}

.thumbnail-item.active > * {
  position: relative;
  z-index: 2;
}

@keyframes progressBar {
  0% {
    width: 0%;
  }
  100% {
    width: 100%;
  }
}
</style>
