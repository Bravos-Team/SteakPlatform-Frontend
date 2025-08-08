<template>
  <!-- CAROUSELS BAR -->
  <div class="flex shrink-0 flex-col will-change-scroll transform-gpu overflow-hidden gap-y-[20px]">
    <!-- MAIN IMAGES SLIDERS -->
    <div v-if="game" ref="container"
      class="bg-gray-400/10 keen-slider snap-center group/img-slider relative flex flex-row rounded-xl overflow-hidden">
      <div v-for="(media, index) in game" :key="index" class="cursor-grab active:cursor-grabbing">
        <img v-if="media.type === 'image'" :class="`number-slide${index + 1}`" :src="media.url"
          class="!w-full !shrink-0 keen-slider__slide" />
        <video v-else-if="media.type === 'video'" :class="`number-slide${index + 1}`" :src="media.url"
          class="!w-full !shrink-0 keen-slider__slide" preload="metadata" />
      </div>
      <!-- BUTTONS PREV & NEXT  -->
      <button @click="slider?.prev()"
        class="cursor-pointer absolute opacity-0 group-hover/img-slider:opacity-100 transition-all flex justify-center items-center duration-500 -left-20 group-hover/img-slider:left-0 h-full w-[50px] bg-gradient-to-l from-[#000]/0 to-[#000]/35">
        <img class="w-[15px] opacity-0 group-hover/img-slider:opacity-100 transition-all duration-500 rotate-180"
          src="https://ccdn.steak.io.vn/assets-arrow-right-white-ico.svg" alt="" />
      </button>
      <button @click="slider?.next()"
        class="cursor-pointer absolute opacity-0 group-hover/img-slider:opacity-100 transition-all flex justify-center items-center duration-500 -right-20 group-hover/img-slider:right-0 h-full w-[50px] bg-gradient-to-r from-[#000]/0 to-[#000]/35">
        <img class="w-[15px] opacity-0 group-hover/img-slider:opacity-100 transition-all duration-500"
          src="https://ccdn.steak.io.vn/assets-arrow-right-white-ico.svg" alt="" />
      </button>
      <!-- END BUTTONS PREV & NEXT  -->
    </div>
    <!-- END MAIN IMAGES SLIDERS -->
    <div class="flex flex-row justify-center gap-x-[5px] w-full h-[57px]">
      <div class="h-full flex justify-center items-center">
        <button @click="slider?.prev()"
          class="rounded-full cursor-pointer size-[40px] bg-[#fff]/20 flex justify-center items-center">
          <img class="w-[5px] rotate-180" src="https://ccdn.steak.io.vn/assets-arrow-right-white-ico.svg" alt="" />
        </button>
      </div>
      <div ref="thumbnail"
        class="h-[57px] keen-slider thumbnail flex gap-x-[10px] justify-center w-full overflow-x-scroll no-scrollbar">
        <div
          class="keen-slider__slide border-[1px] cursor-pointer p-0 !min-w-[7rem] !max-w-[7rem] !min-h-full border-[#fff]/0 checked:border-[#fff] brightness-[.40] hover:brightness-100 overflow-hidden rounded-sm"
          v-for="(media, index) in game" :class="`number-slide${index + 1}`" :key="index">
          <img v-if="media.type === 'image'" :src="media.url" alt="" class="min-w-full !min-h-full object-cover" />
          <video v-else-if="media.type === 'video'" :src="media.url" class="min-w-full !min-h-full object-cover" />
        </div>
      </div>
      <div class="h-full items-center justify-center flex">
        <button @click="slider?.next()"
          class="rounded-full cursor-pointer size-[40px] bg-[#fff]/20 flex justify-center items-center">
          <img class="w-[5px]" src="https://ccdn.steak.io.vn/assets-arrow-right-white-ico.svg" alt="" />
        </button>
      </div>
    </div>
  </div>
  <!-- END CAROUSEL BAR -->
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { useKeenSlider } from 'keen-slider/vue.es'

const [container, slider] = useKeenSlider({
  loop: false,
  mode: 'snap',
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
      addActive(slider.track.details.rel)
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

const props = defineProps({
  game: {
    type: Array as PropType<Array<{ type: string; url: string }>>,
    required: true,
  },
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
</style>
