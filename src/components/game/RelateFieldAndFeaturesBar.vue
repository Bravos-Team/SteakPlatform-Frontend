<template>
  <div class="flex shrink-0 justify-between h-[55px]">
    <div
      class="flex flex-col justify-between w-[375px] gap-y-[8px] border-r-1 border-r-[#ffffff37]"
    >
      <span class="text-[#ffffffa6] text-medium"> Genres</span>
      <div class="flex gap-x-[8px]">
        <template v-for="field in game.relateFields" :key="field.id">
          <button
            class="py-[0px] flex px-[8px] text-[16px] justify-center items-center rounded-[4px] bg-[#ffffff59]/50 hover:bg-[#ffffff59]"
          >
            {{ field.name }}
          </button>
        </template>
      </div>
    </div>
    <div class="flex flex-col justify-between w-[375px] gap-y-[8px] py-[0xp] px-[20px]">
      <span class="text-[#ffffffa6] text-medium">Features</span>
      <div class="flex gap-x-[8px]">
        <template v-for="feature in game.relateFeatures" :key="feature.id">
          <button
            class="py-[0px] flex px-[8px] text-[16px] justify-center items-center rounded-[4px] bg-[#ffffff59]/50 hover:bg-[#ffffff59]"
          >
            {{ feature.name }}
          </button>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  game: {
    type: Object,
    required: true,
  },
})
</script>
