<template>
  <!-- CAROUSELS BAR -->
  <div class="flex shrink-0 flex-col will-change-scroll transform-gpu !overflow-visible  w-full gap-y-[20px]">
    <!-- MAIN IMAGES SLIDERS -->
    <div v-if="game" ref="container"
      class="bg-gray-400/10 keen-slider snap-center group/img-slider relative flex flex-row rounded-xl overflow-hidden">
      <div v-for="(media, index) in game" :key="index" class="cursor-grab active:cursor-grabbing">
        <img v-if="media.type === 'image'" :class="`number-slide${index + 1}`" :src="media.url"
          class="!w-full !shrink-0 keen-slider__slide" />
        <video autoplay controls muted v-else-if="media.type === 'video'" :class="`number-slide${index + 1}`"
          :src="media.url" class="!w-full !shrink-0 keen-slider__slide" preload="metadata" />
      </div>
      <!-- BUTTONS PREV & NEXT  -->
      <button @click="handlePrev"
        class="cursor-pointer absolute opacity-0 group-hover/img-slider:opacity-100 transition-all flex justify-center items-center duration-500 -left-20 group-hover/img-slider:left-0 h-full w-[50px] bg-gradient-to-l from-[#000]/0 to-[#000]/35">
        <div class="w-[15px] opacity-0 group-hover/img-slider:opacity-100 transition-all duration-500 rotate-180">
          <img src="https://ccdn.steak.io.vn/assets-arrow-right-white-ico.svg" alt="" />
        </div>
      </button>
      <button
        class="cursor-pointer absolute opacity-0 group-hover/img-slider:opacity-100 transition-all flex justify-center items-center duration-500 -right-20 group-hover/img-slider:right-0 h-full w-[50px] bg-gradient-to-r from-[#000]/0 to-[#000]/35">
        <div class="w-[15px] opacity-0 group-hover/img-slider:opacity-100 transition-all duration-500">
          <img @click="handleNext" src="https://ccdn.steak.io.vn/assets-arrow-right-white-ico.svg" alt="" />
        </div>
      </button>
      <!-- END BUTTONS PREV & NEXT  -->
    </div>
    <!-- END MAIN IMAGES SLIDERS -->
    <div class="flex flex-row justify-center items-center gap-x-[5px] w-full  h-[57px]">
      <div class="h-full flex justify-center items-center">
        <button @click="handlePrev"
          class="rounded-full cursor-pointer size-[40px] bg-[#fff]/20 flex justify-center items-center">
          <img class="w-[5px] rotate-180" src="https://ccdn.steak.io.vn/assets-arrow-right-white-ico.svg" alt="" />
        </button>
      </div>

      <!-- THUMBNAIL NAVIGATION -->
      <div ref="thumbnail"
        class="h-[57px] snap-x snap-mandatory keen-slider thumbnail px-[10rem] flex max-w--[7rem]  gap-x-3 w-full overflow-x-hidden   no-scrollbar">
        <div
          class="!snap-start  keen-slider__slide border-[2px] cursor-pointer p-0   shrink-0  !min-h-full border-[#fff]/0  checked:border-[#fff] brightness-[.40] hover:brightness-100  rounded-sm"
          v-for="(media, index) in game" :class="`number-slide${index + 1}`" :key="index">
          <img v-if="media.type === 'image'" :src="media.url" alt="" class="object-cover snap-center" />
          <video v-else-if="media.type === 'video'" :src="media.url" :autoplay="false" :controls="false"
            class="object-cover snap-center" />
        </div>
      </div>
      <!-- END THUMBNAIL NAVIGATION -->

      <div class="h-full items-center justify-center flex">
        <button @click="handleNext"
          class="rounded-full cursor-pointer size-[40px] bg-[#fff]/20 flex justify-center items-center">
          <img class="w-[5px]" src="https://ccdn.steak.io.vn/assets-arrow-right-white-ico.svg" alt="" />
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
          main.value.moveToIdx(index, true, { duration: 200, easing: (t: number) => t })
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
        // if(slider)
        // slider.moveToIdx(Math.min(slider.track.details.maxIdx, next))
        // slider.moveToIdx(next ** itemsPerview.value)
        console.log('next', next)
        console.log('maxIndex', maxIndex.value)
        console.log('currentIndex', currentIndex.value)
        console.log('tracking', slider.track.details.maxIdx)

        if (currentIndex.value == 5) {
          // console.log('cu:', currentIndex.value)
          slider.moveToIdx(Math.min(slider.track.details.maxIdx, next))
          currentIndex.value = 0
        }
        // currentIndex.value = Math.min(next, maxIndex.value)
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
  if (currentIndex.value <= 5) {
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
