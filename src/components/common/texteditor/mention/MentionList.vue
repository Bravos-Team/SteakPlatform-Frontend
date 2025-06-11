<template>
  <div
    class="bg-white z-50 border border-gray-100 rounded-xl shadow flex flex-col gap-[0.1rem] overflow-auto p-2 relative"
  >
    <template v-if="items.length">
      <button
        v-for="(item, index) in items"
        :key="index"
        :class="[
          'flex items-center gap-1 w-full text-left px-2 py-1 rounded z-9999 cursor-pointer',
          index === selectedIndex
            ? 'bg-gray-900/40 font-medium'
            : 'hover:bg-gray-900/30 text-black bg-gray-100',
        ]"
        @click="selectItem(index)"
      >
        {{ item }}
      </button>
    </template>
    <div v-else class="text-gray-900 px-2 py-1">
      No results. You can add your custom mentions in 'Your develop teams feature'
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
const selectedIndex = ref(0)

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },

  command: {
    type: Function,
    required: true,
  },
})
watch(
  () => props.items,
  () => {
    selectedIndex.value = 0
  },
)

const onKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'ArrowUp') {
    upHandler()
    return true
  }

  if (event.key === 'ArrowDown') {
    downHandler()
    return true
  }

  if (event.key === 'Enter') {
    enterHandler()
    return true
  }

  return false
}
const upHandler = () => {
  selectedIndex.value = (selectedIndex.value + props.items.length - 1) % props.items.length
}

const downHandler = () => {
  selectedIndex.value = (selectedIndex.value + 1) % props.items.length
}

const enterHandler = () => {
  selectItem(selectedIndex.value)
}

const selectItem = (index: number) => {
  const item = props.items[index]

  if (item) {
    props.command({ id: item })
  }
}
defineExpose({
  onKeyDown: (e: KeyboardEvent) => onKeyDown(e),
})
</script>
