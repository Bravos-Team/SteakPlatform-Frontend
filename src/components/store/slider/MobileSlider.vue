<template>
  <div v-if="gameSliders.length" class="flex flex-col gap-y-3 w-full">
    <div
      ref="container"
      class="keen-slider cursor-grab snap-mandatory overflow-auto flex lg:w-[935px] xl:w-[1134px] snap-x xl:h-[638px] lg:h-[525px] no-scrollbar bg-gray-transparent"
    >
      <div
        v-for="(game, index) in gameSliders"
        :key="game.id"
        :class="`number-slide${index + 1}`"
        class="keen-slider__slide tablet:min-w-[40rem] tablet:w-full p-3 snap-center rounded-sm overflow-hidden shrink-0 h-[27rem] tablet:h-[40rem] flex"
      >
        <img :src="game.thumbnail" alt="" class="object-cover h-full w-full rounded-sm" />
      </div>
    </div>

    <div v-if="slider" class="flex justify-center gap-x-3">
      <button
        class="bg-[#ffffff] rounded-full w-2 h-2 flex items-center justify-center"
        v-for="(_slide, idx) in dotHelper"
        @click="slider.moveToIdx(idx)"
        :class="{ dot: true, active: current === idx }"
        :key="idx"
      ></button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/vue.es'

const current = ref(1)
const [container, slider] = useKeenSlider(
  {
    initial: current.value,
    loop: true,
    slideChanged: (slider) => (current.value = slider.track.details.rel),
  },
  [
    (slider) => {
      let timeout: any
      let mouseOver = false
      function clearNextTimeout() {
        clearTimeout(timeout)
      }
      function nextTimeout() {
        clearTimeout(timeout)
        if (mouseOver) return
        timeout = setTimeout(() => {
          slider.next()
        }, 2000)
      }
      slider.on('created', () => {
        slider.container.addEventListener('mouseover', () => {
          mouseOver = true
          clearNextTimeout()
        })
        slider.container.addEventListener('mouseout', () => {
          mouseOver = false
          nextTimeout()
        })
        nextTimeout()
      })
      slider.on('dragStarted', clearNextTimeout)
      slider.on('animationEnded', nextTimeout)
      slider.on('updated', nextTimeout)
    },
  ],
)

const dotHelper = computed(() =>
  slider.value ? [...Array(slider.value.track.details.slides.length).keys()] : [],
)

const props = defineProps<{
  gameSliders: {
    id: number
    name: string
    logo?: string
    message?: string
    prices?: number
    status?: number
    img?: string
    thumbnail: string
  }[]
}>()
</script>

<style scoped>
.active {
  background-color: #101014;
  border: 1px solid #ffffff;
  transition: all 0.3s ease-in-out;
}
</style>
