<template>
  <card
    class="bg-[var(--bg-card-base)]/50 xl:col-span-7 lg:col-span-4 p-4 border-double border-3 inset-shadow-blue-300 flex flex-col lg:flex-row justify-between"
  >
    <div class="flex flex-col lg:w-7/12 gap-y-6 h-full w-full">
      <div class="flex w-full gap-x-2 items-center">
        <img src="https://ccdn.steak.io.vn/logo_steak.svg" class="size-10" alt="" />
        <span class="font-bold text-lg lg:text-2xl">FOR DEVELOPER</span>
      </div>
      <span class="text-lg">
        As part of our support for the indie
        <span class="underline decoration-sky-500 inline-block">
          <div class="flex gap-x-1">
            <span>developer community</span>
            <square-arrow-up-right class="text-sky-500" />
          </div>
        </span>
        we regularly give extra
        <div class="inline-block">
          <span class="underline decoration-sky-500 flex gap-x-1">
            <span>help and assistance</span>
            <square-arrow-up-right class="text-sky-500" />
          </span>
        </div>
        to promising upcoming or recently released indie titles. Let us know about your game!
      </span>
    </div>
    <div class="flex lg:w-5/12 justify-center items-center">
      <button
        class="bg-white/10 hover:bg-white/20 cursor-pointer px-5 py-3 rounded-md flex gap-x-2"
      >
        <square-dot />
        <span> Update your game informations </span>
      </button>
    </div>
  </card>
</template>

<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

import { Card } from '@/components/ui/card'
import { SquareArrowUpRight, SquareDot } from 'lucide-vue-next'
</script>
