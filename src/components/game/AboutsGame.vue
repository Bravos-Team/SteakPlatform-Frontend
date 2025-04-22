<template>
  <div class="flex flex-col gap-y-[20px]">
    <span class="font-bold text-[20px]">ABOUT THIS GAME</span>

    <div class="transition-all flex flex-col gap-y-[20px] duration-500 ease-in-out overflow-hidden">
      <div
        v-for="about in game.abouts"
        :key="about.id"
        class="flex text-[#ffffffa6] flex-col gap-y-[20px]"
      >
        <div>
          <template v-for="image in about.images" :key="image.id">
            <img :src="image.url" class="" />
          </template>
        </div>
        <template v-for="desc in about.descriptions" :key="desc.description">
          <p class="text-[16px] leading-relaxed">{{ desc.description }}</p>
        </template>
        <ul class="list-disc list-outside py-[0px] pr-[0px] pl-[0px] text-pretty">
          <li
            class="mt-[10px] leading-[26.4px] mr-[0px] mb-[10px] ml-[16px]"
            v-for="(section, index) in about.details"
            :key="index"
          >
            {{ section.section }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  game: {
    type: Object,
  },
})
</script>
