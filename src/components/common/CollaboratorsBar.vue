<template>
  <div v-if="isLoadingGames"></div>
  <div v-if="gameCollaboratorsList.length > 0 && !isLoadingGames"
    class="flex gap-x-3 w-full bg-white/3 h-full p-3 flex-col gap-y-3">
    <div class="flex justify-between items-center gap-x-3 flex-wrap">
      <div class="flex gap-x-2 items-end justify-between w-full flex-wrap text-pretty">
        <span class="font-black text-xl tablet:text-3xl">{{ titleCompo }}</span>
        <router-link class="underline hover:text-gray-400 text-gray-300/50 font-medium  transition-colors duration-200"
          :to="'#'">view
          all</router-link>
      </div>

      <div class="flex gap-x-2 justify-between w-full">
        <button @click="prevSlide" :disabled="currentIndex === 0" :class="{
          'cursor-pointer': !(currentIndex === 0),
          'cursor-not-allowed': currentIndex === 0
        }"
          class="p-2 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>

        <button :class="{
          'cursor-pointer': !(currentIndex >= maxIndex),
          'cursor-not-allowed': currentIndex >= maxIndex
        }" @click="nextSlide" :disabled="currentIndex >= maxIndex"
          class="p-2 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </div>

    <div class="relative overflow-hidden">
      <div ref="carouselContainer" class="flex gap-x-3 tablet:gap-x-6 transition-transform duration-500 ease-in-out"
        :style="{ transform: `translateX(-${translateX}px)` }">
        <router-link :to="{ name: 'game-details', params: { id: game.id } }"
          class="snap-start min-w-[15rem] max-w-[20rem] flex flex-col bg-white/5 overflow-hidden rounded-xs h-full transition-all duration-300"
          :class="{ 'scale-100': isActiveCard(index) }" v-for="(game, index) in gameCollaboratorsList" :key="game.id">
          <div class="w-full overflow-hidden">
            <img :class="{ 'scale-100': isActiveCard(index), 'scale-120': !isActiveCard(index) }" :src="game.thumbnail"
              :alt="game.name" class="w-full object-contain transition-transform duration-300" />
          </div>

          <div class="p-4 flex flex-col gap-y-1 h-[8rem]">
            <h3 class="text-lg font-semibold">{{ game.name }}</h3>
            <p class="text-sm text-gray-400">{{ game.description }}</p>
            <p class="text-sm font-mono" v-if="game.price === 0">Free</p>
            <p v-else class="text-lg font-bold mt-2">
              {{ CurrencyUtils.formatCurrency(game.price, '₫') }}
            </p>
          </div>
        </router-link>
      </div>
    </div>

    <div class="flex justify-center gap-x-2 mt-4">
      <button v-for="(dot, index) in Math.ceil(gameCollaboratorsList.length / itemsPerView)" :key="index"
        @click="goToSlide(index)" class="w-2 h-2 rounded-full transition-all duration-300"
        :class="Math.floor(currentIndex / itemsPerView) === index ? 'bg-white/60' : 'bg-white/30'"></button>
    </div>
  </div>
</template>

<script setup>
import CurrencyUtils from '@/services/common/CurrencyUtils'
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  gameCollaboratorsList: {
    type: Array,
    required: true
  },
  titleCompo: {
    type: String,
    required: true
  }
  , isLoadingGames: {
    type: Boolean,
    default: false
  },
  relatedWith: {
    type: String,
    default: ''
  },
  routeName: {
    type: String,
    default: ''
  }
})

const currentIndex = ref(0)
const carouselContainer = ref(null)
const itemWidth = ref(240)
const itemGap = ref(12)
const containerWidth = ref(0)

const itemsPerView = computed(() => {
  if (containerWidth.value === 0) return 1
  return Math.floor(containerWidth.value / (itemWidth.value + itemGap.value))
})

const maxIndex = computed(() => {
  return Math.max(0, props.gameCollaboratorsList.length - itemsPerView.value)
})

const translateX = computed(() => {
  return currentIndex.value * (itemWidth.value + itemGap.value)
})

const nextSlide = () => {
  if (currentIndex.value < maxIndex.value) {
    currentIndex.value++
  }
}

const prevSlide = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--
  }
}

const goToSlide = (slideIndex) => {
  const targetIndex = slideIndex * itemsPerView.value
  currentIndex.value = Math.min(targetIndex, maxIndex.value)
}

const isActiveCard = (index) => {
  return index >= currentIndex.value && index < currentIndex.value + itemsPerView.value
}

const autoSlideInterval = ref(null)


const stopAutoSlide = () => {
  if (autoSlideInterval.value) {
    clearInterval(autoSlideInterval.value)
    autoSlideInterval.value = null
  }
}

const handleResize = () => {
  if (carouselContainer.value) {
    containerWidth.value = carouselContainer.value.parentElement.offsetWidth
  }
}

const handleKeydown = (event) => {
  if (event.key === 'ArrowLeft') {
    prevSlide()
  } else if (event.key === 'ArrowRight') {
    nextSlide()
  }
}

onMounted(() => {
  handleResize()
  window.addEventListener('resize', handleResize)
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  window.removeEventListener('keydown', handleKeydown)
  stopAutoSlide()
})

const touchStart = ref({ x: 0, y: 0 })
const touchEnd = ref({ x: 0, y: 0 })

const handleTouchStart = (event) => {
  touchStart.value = {
    x: event.touches[0].clientX,
    y: event.touches[0].clientY
  }
}

const handleTouchEnd = (event) => {
  touchEnd.value = {
    x: event.changedTouches[0].clientX,
    y: event.changedTouches[0].clientY
  }

  const deltaX = touchStart.value.x - touchEnd.value.x
  const deltaY = touchStart.value.y - touchEnd.value.y

  if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
    if (deltaX > 0) {
      nextSlide()
    } else {
      prevSlide()
    }
  }
}
</script>

<style scoped>
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.carousel-container {
  scroll-behavior: smooth;
}

.ring-2 {
  box-shadow: 1 rgb(96 165 250);
}

button:hover:not(:disabled) {
  transform: scale(1.05);
}

@media (hover: none) {
  .overflow-auto {
    -webkit-overflow-scrolling: touch;
  }
}
</style>