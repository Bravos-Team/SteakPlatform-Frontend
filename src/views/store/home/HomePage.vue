<template>
  <div ref="container" class="keen-slider max-h-[904px] flex">
    <div
      v-for="(img, index) in imageList"
      :key="index"
      class="keen-slider__slide !w-[200px] cursor-grab active:cursor-grabbing"
      :class="`number-slide${index}`"
    >
      <img :src="img" alt="" class="object-cover h-full w-full" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useKeenSlider } from 'keen-slider/vue'

const animation = { duration: 100000, easing: (t: any) => t }
const [container] = useKeenSlider({
  loop: true,
  renderMode: 'performance',
  drag: true,
  created(s) {
    s.moveToIdx(5, true, animation)
  },
  updated(s) {
    s.moveToIdx(s.track.details.abs + 5, true, animation)
  },
  animationEnded(s) {
    s.moveToIdx(s.track.details.abs + 5, true, animation)
  },
})

const imageList = [
  'https://cdn2.unrealengine.com/rl-f2p-hero-epic-adjust-gradient-1920x1080-982990639.jpg?resize=1&w=1920',
  'https://cdn2.unrealengine.com/epichomepage-artboard-1-1920x1080-329693365.jpg?resize=1&w=1920',
  'https://cdn2.unrealengine.com/Epic+Games+Node%2Frr-1920x1080-5a3f8bce26f45d078c2738cf5140ad18be39041c.jpg?resize=1&w=1920',
  'https://cdn2.unrealengine.com/Epic+Games+Node%2Fut-1920x1080-416b0b679e572854df52c39154aff5945328c04d.jpg?resize=1&w=1920',
  'https://cdn2.unrealengine.com/Epic+Games+Node%2Fue-alt-1920x1080-e653a4a4dae65307fd2420076abe44bb71b22f06.jpg?resize=1&w=1920',
  'https://cdn2.unrealengine.com/Epic+Games+Node%2Ffn-1920x1080-05e434e24b3170bc6cc6003c102270ee4cde3a75.jpg?resize=1&w=1920',
]
</script>

<style scoped>
@import url('keen-slider/keen-slider.css');
</style>
