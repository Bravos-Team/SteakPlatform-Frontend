<template>
    <button
        class="z-[999] backdrop-blur-xl fixed bottom-3 bg-white/20 hover:bg-white/30 duration-200 transition-colors  cursor-pointer group rounded-full p-2 right-3"
        @click="backToTop">
        <ArrowBigUp class="size-7 transition-transform duration-300 group-hover:-translate-y-1" />
    </button>
</template>

<script lang="ts" setup>
import { ArrowBigUp } from 'lucide-vue-next';

const backToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
}
</script>