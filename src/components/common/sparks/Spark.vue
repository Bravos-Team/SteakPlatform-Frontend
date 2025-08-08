<template>
  <div
    :style="{
      top: props.top + 'px',
      left: props.left + 'px',
      right: props.right + 'px',
      bottom: props.bottom + 'px',
    }"
    class="absolute mobile:hidden z-0 w-full h-full flex items-center justify-center"
  >
    <div
      :id="idSpark"
      :style="{ backgroundColor: props.colorFirst }"
      className="w-[55rem]  h-[35rem] rounded-full blur-[10rem] left-[10rem]"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { animate } from 'animejs'
import { ref, onMounted, nextTick } from 'vue'
import { string } from 'zod'
const props = defineProps({
  top: {
    type: String,
    default: '0',
  },
  left: {
    type: String,
    default: '0',
  },
  right: {
    type: String,
    default: '0',
  },

  bottom: {
    type: String,
    default: '0',
  },
  colorFirst: {
    type: String,
    default: '#422277',
  },

  colorChanges: {
    type: String,
    default: '#64403b',
  },
  idSpark: {
    type: String,
    default: 'left',
  },
})
onMounted(async () => {
  await nextTick()
  animate('#' + props.idSpark, {
    backgroundColor: props.colorChanges,
    loopDelay: 100,
    duration: 10000,
    loop: true,
    alternate: true,
  })
})
</script>
