<template>
  <div v-if="gameCollaboratorsList" class="flex gap-x-3 w-full bg-white/3 h-full  p-3 flex-col gap-y-3 ">
    <span class="font-black text-xl tablet:text-3xl">Game Coming Soone</span>
    <div class="flex snap-mandatory tablet:gap-x-10 gap-x-3 overflow-auto no-scrollbar ">
      <div class="snap-center min-w-[15rem]  max-w-[20rem] flex flex-col bg-white/5 rounded-2xl h-full "
        v-for="game in gameCollaboratorsList" :key="game.id">

        <!-- Hình -->
        <div class="w-full overflow-hidden ">
          <img :src="game.thumbnail" :alt="game.name" class="w-full object-contain rounded-sm" />
        </div>

        <!-- Thông tin -->
        <div class="p-4 flex flex-col gap-y-1 mt-10">
          <h3 class="text-lg font-semibold">{{ game.name }}</h3>
          <p class="text-sm text-gray-400">{{ game.description }}</p>
          <p class="text-sm font-mono" v-if="game.price === 0">Free</p>
          <p v-else class="text-lg font-bold mt-2">
            {{ CurrencyUtils.formatCurrency(game.price, '₫') }}
          </p>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import CurrencyUtils from '@/services/common/CurrencyUtils';
const props = defineProps({
  gameCollaboratorsList: {
    type: Array,
    default: () => [],
  },
})

</script>
