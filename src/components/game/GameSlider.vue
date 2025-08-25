<template>
  <!-- CAROUSELS BAR -->
  <div
    class="flex shrink-0 flex-col will-change-scroll transform-gpu !overflow-visible w-full gap-y-[20px]"
  >
    <!-- MAIN IMAGES SLIDERS -->
    <div
      v-if="game"
      ref="container"
      class="bg-gray-400/10 keen-slider snap-center group/img-slider relative flex flex-row rounded-xl overflow-hidden"
    >
      <div v-for="(media, index) in game" :key="index" class="cursor-grab active:cursor-grabbing">
        <img
          v-if="media.type === 'image'"
          :class="`number-slide${index + 1}`"
          :src="media.url"
          class="!w-full !shrink-0 keen-slider__slide"
        />
        <video
          autoplay
          controls
          playsinline
          muted
          v-else-if="media.type === 'video'"
          :class="`number-slide${index + 1}`"
          :src="media.url"
          class="!w-full !shrink-0 keen-slider__slide"
          preload="metadata"
        />
      </div>
      <!-- BUTTONS PREV & NEXT  -->
      <button
        @click="handlePrev"
        class="cursor-pointer absolute opacity-0 group-hover/img-slider:opacity-100 transition-all flex justify-center items-center duration-500 -left-20 group-hover/img-slider:left-0 h-full w-[50px] bg-gradient-to-l from-[#000]/0 to-[#000]/35"
      >
        <div
          class="w-[15px] opacity-0 group-hover/img-slider:opacity-100 transition-all duration-500 rotate-180"
        >
          <img src="https://ccdn.steak.io.vn/assets-arrow-right-white-ico.svg" alt="" />
        </div>
      </button>
      <button
        @click="handleNext"
        class="cursor-pointer absolute opacity-0 group-hover/img-slider:opacity-100 transition-all flex justify-center items-center duration-500 -right-20 group-hover/img-slider:right-0 h-full w-[50px] bg-gradient-to-r from-[#000]/0 to-[#000]/35"
      >
        <div
          class="w-[15px] opacity-0 group-hover/img-slider:opacity-100 transition-all duration-500"
        >
          <img src="https://ccdn.steak.io.vn/assets-arrow-right-white-ico.svg" alt="" />
        </div>
      </button>
      <!-- END BUTTONS PREV & NEXT  -->
    </div>
    <!-- END MAIN IMAGES SLIDERS -->
    <div class="grid grid-cols-12 gap-x-2 justify-between items-center w-full px-0 h-[57px]">
      <div class="col-span-2 tablet:col-span-1 justify-center flex items-center">
        <button
          @click="handlePrev"
          class="rounded-full cursor-pointer size-[2rem] tablet:size-[3rem] bg-[#fff]/20 flex justify-center items-center"
        >
          <img
            class="w-[5px] rotate-180"
            src="https://ccdn.steak.io.vn/assets-arrow-right-white-ico.svg"
            alt=""
          />
        </button>
      </div>

      <!-- THUMBNAIL NAVIGATION -->
      <div class="col-span-8 tablet:col-span-10">
        <div
          ref="thumbnail"
          class="tablet:gap-x-1 !px-10 flex flex-row !shrink gap-x-1 tablet:h-[57px] snap-x snap-mandatory keen-slider thumbnail no-scrollbar"
        >
          <div
            class="!overflow-hidden max-w-[10px] !w-[3rem] !snap-start keen-slider__slide border-[2px] group cursor-pointer p-0 items-center border-[#fff]/0 checked:border-[#fff] bg-white/8 brightness-[.40] hover:brightness-100 rounded-sm"
            v-for="(media, index) in game"
            :class="`number-slide${index + 1}`"
            :key="index"
          >
            <img
              v-if="media.type === 'image'"
              :src="media.url"
              alt=""
              class="object-cover w-full snap-center transition-all duration-300"
            />
            <video
              v-else-if="media.type === 'video'"
              :src="media.url"
              :autoplay="false"
              :controls="false"
              controlslist="nodownload noremoteplayback"
              disablepictureinpicture
              class="object-cover w-full h-full snap-center group-checked:scale-110 transition-all duration-300"
            />
          </div>
        </div>
      </div>
      <!-- END THUMBNAIL NAVIGATION -->

      <div class="col-span-2 tablet:col-span-1 justify-center flex items-center">
        <button
          @click="handleNext"
          class="rounded-full cursor-pointer size-[2rem] tablet:size-[3rem] bg-[#fff]/20 flex justify-center items-center"
        >
          <img
            class="w-[5px]"
            src="https://ccdn.steak.io.vn/assets-arrow-right-white-ico.svg"
            alt=""
          />
        </button>
      </div>
    </div>
  </div>
  <!-- END CAROUSEL BAR -->
</template>

<script setup lang="ts">
import { computed, onMounted, PropType, ref } from 'vue'
import { useKeenSlider } from 'keen-slider/vue.es'

const props = defineProps({
  game: {
    type: Array as PropType<Array<{ type: string; url: string }>>,
    required: true,
  },
})

const [container, slider] = useKeenSlider({
  loop: false,
  mode: 'snap',
})

const currentIndex = ref(0)
const containerWidth = ref<number | null>(null)
const itemWidth = ref(240)
const itemGap = ref(12)
const itemsPerview = computed(() => {
  if (props.game.length === 0) return 1
  return Math.floor(containerWidth.value! / (itemWidth.value + itemGap.value))
})

const maxIndex = computed(() => {
  return Math.max(0, props.game.length - itemsPerview.value)
})

const translateX = computed(() => {
  return currentIndex.value * (itemWidth.value + itemGap.value)
})

const ThumbnailPlugin = (main: any) => {
  return (slider: any) => {
    const removeActive = () => {
      slider.slides.forEach((slide: any) => {
        slide.classList.remove('active')
      })
    }

    const addActive = (index: any) => {
      slider.slides[index].classList.add('active')
    }

    const addClickEvents = () => {
      slider.slides.forEach((slide: any, index: any) => {
        slide.addEventListener('click', () => {
          // main.value.moveToIdx(index, true, { duration: 200, easing: (t: number) => t })
          main.value.moveToIdx(index)
        })
      })
    }

    slider.on('created', () => {
      addActive(main.value.track.details.rel)
      addClickEvents()
      main.value.on('animationStarted', () => {
        removeActive()
        const next = main.value.animator.targetIdx || 0
        addActive(main.value.track.absToRel(next))
        slider.moveToIdx(Math.min(slider.track.details.maxIdx, next))
      })
    })
  }
}

const [thumbnail] = useKeenSlider(
  {
    loop: false,
    mode: 'snap',
    slides: {
      perView: 5,
      origin: 'auto',
    },
    renderMode: 'performance',
  },
  [ThumbnailPlugin(slider)],
)

const handleResize = () => {
  if (thumbnail.value?.parentElement) {
    containerWidth.value = thumbnail.value.parentElement.offsetWidth
  }
}

const handlePrev = () => {
  if (slider.value) slider.value?.prev()
  if (currentIndex.value > 0) {
    currentIndex.value--
  }
}
const handleNext = () => {
  console.log(currentIndex.value)
  if (currentIndex.value < 3) {
    currentIndex.value++
  } else {
    currentIndex.value = 0
  }
  if (slider.value) slider.value?.next()
}
onMounted(() => {
  handleResize()
  window.addEventListener('resize', handleResize)
})
</script>

<style scoped>
@import url('keen-slider/keen-slider.css');
</style>

<style scoped>
.active {
  border-color: #fff;
  border-width: 1px;
  border-style: solid;
}

:deep(.active) {
  border-color: #fff;
  border-width: 1px;
  border-style: solid;
}
</style>
