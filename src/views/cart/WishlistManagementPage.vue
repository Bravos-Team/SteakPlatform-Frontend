<template>
  <tooltip-provider>
    <div class="flex flex-col mb-3 justify-center h-full gap-y-6">
      <span class="text-5xl font-extrabold">{{ $t('title.pages.wishlist') }}</span>
      <div
        class="flex relative px-3 gap-y-5 flex-col-reverse desktop:flex-row gap-x-2 justify-between"
      >
        <div class="flex w-full gap-y-3 flex-col">
          <div class="flex gap-x-1 items-center">
            <div class="text-white/50">{{ $t('features.filters.sortBy') }}:</div>
            <Select>
              <select-trigger>
                <select-value :placeholder="$t('features.filters.type')" class="max-h-8 px-5" />
              </select-trigger>
              <select-content>
                <select-group>
                  <select-label class="text-white/30">{{
                    $t('features.filters.sortType')
                  }}</select-label>
                  <select-item value="asc">{{ $t('features.filters.sorts.asc') }}</select-item>

                  <select-item value="desc">{{ $t('features.filters.sorts.desc') }}</select-item>
                  <select-item value="new">{{ $t('features.filters.sorts.new') }}</select-item>
                  <select-item value="old">{{ $t('features.filters.sorts.old') }}</select-item>
                </select-group>
              </select-content>
            </Select>
          </div>
          <div
            v-for="game in mockProducts"
            :key="game.id"
            class="w-full cursor-pointer p-6 rounded-lg bg-white/6 flex gap-x-3 gap-[20px]"
          >
            <!-- LEFT CONTENT -->
            <div class="flex flex-col gap-y-2">
              <img :src="game.thumbnail" class="size-35" alt="" />

              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="svg text-white/30 size-4 css-uwwqev"
                viewBox="0 0 512 512"
              >
                <title>Windows</title>
                <g>
                  <path
                    fill="currentColor"
                    d="M0.175 256l-0.175-156.037 192-26.072v182.109zM224 69.241l255.936-37.241v224h-255.936zM479.999 288l-0.063 224-255.936-36.008v-187.992zM192 471.918l-191.844-26.297-0.010-157.621h191.854z"
                  ></path>
                </g>
              </svg>
            </div>
            <!-- END LEFT CONTENT -->

            <!-- RIGHT CONTENT -->
            <div class="flex w-full flex-col gap-y-2">
              <!-- NAME AND HEADER BADGE -->
              <div class="flex justify-between w-full">
                <span class="bg-white/10 hover:bg-white/20 px-2 rounded-sm py-1">{{
                  $t('type.game.base')
                }}</span>
                <span class="font-bold">{{
                  Number(game.price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
                }}</span>
              </div>
              <!-- END NAME AND HEADER BADGE -->

              <!-- AGES -->
              <div class="flex items-start gap-y-3 flex-col">
                <span class="font-extrabold text-2xl">{{ game.title }}</span>
                <div class="w-full rounded-lg border-1 p-4 border-white/20 flex gap-x-3">
                  <img
                    alt="12+"
                    src="https://cdn1.epicgames.com/gameRating/gameRating/Generic_12_192_192x192-01e962f26c693e725097658fa7e4e29d"
                    class="size-12"
                    data-image="https://cdn1.epicgames.com/gameRating/gameRating/Generic_12_192_192x192-01e962f26c693e725097658fa7e4e29d"
                    data-testid="picture-image"
                  />
                  <div class="flex flex-col gap-y-3 w-full">
                    <span class="text-sm font-bold">12+</span>
                    <span class="text-xs font-light border-t-1 border-white/20 py-2 text-white/50">
                      {{ $t('warnings.game.type.horror_moderate_violence') }}
                    </span>
                  </div>
                </div>
              </div>
              <!-- END AGES -->

              <!-- SELF-REFUNDABLE -->
              <div class="flex gap-x-2">
                <span>{{ $t('noti_note.cart.self_refundable') }}</span>
                <div class="rounded-full">
                  <tooltip>
                    <tooltip-trigger>
                      <router-link :to="{ name: 'SupportCenter' }">
                        <Info class="size-5 text-white/70" />
                      </router-link>
                    </tooltip-trigger>
                    <tooltip-content :color="1">
                      <span>{{ $t('noti_note.cart.learn_about_refunds') }}</span>
                    </tooltip-content>
                  </tooltip>
                </div>
              </div>
              <!-- END SELF-REFUNDABLE -->

              <!-- ACTION BUTTONS -->
              <div class="flex text-white/50 w-full items-center gap-x-3 justify-end">
                <button class="hover:text-white/80 cursor-pointer transition-colors duration-300">
                  {{ $t('features.buttons.remove_from_wishlist') }}
                </button>
                <button
                  class="text-black px-3 py-1.5 rounded-sm text-sm font-medium cursor-pointer transition-colors duration-300 bg-blue-400 hover:bg-blue-400/90"
                >
                  {{ $t('features.buttons.add_to_cart') }}
                </button>
              </div>
              <!-- END ACTION BUTTONS -->
            </div>
            <!-- END RIGHT CONTENT -->
          </div>
        </div>
        <div
          class="tablet:min-h-[326px] desktop:max-w-[20rem] laptop:relative top-25 sticky bg-[#101014] w-full px-3 gap-y-5 h-[10rem] flex flex-col"
        >
          <div class="font-bold">{{ $t('features.filters.title') }}</div>
          <div class="border-y-1 border-white/40">
            <div class="flex w-full flex-col justify-between py-2">
              <div class="flex justify-between gap-x-1 w-full">
                <checkbox />
                <span> {{ $t('features.filters.types.name') }}</span>
              </div>

              <div class="flex justify-between gap-x-1 w-full">
                <checkbox />
                <span> {{ $t('features.filters.types.price') }}</span>
              </div>

              <div class="flex justify-between gap-x-1 w-full">
                <checkbox />
                <span>{{ $t('features.filters.types.free') }}</span>
              </div>

              <div class="flex justify-between gap-x-1 w-full">
                <checkbox />
                <span>{{ $t('features.filters.types.dlc') }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </tooltip-provider>
</template>

<script setup lang="ts">
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import Tooltip from '@/components/ui/tooltip/Tooltip.vue'
import TooltipContent from '@/components/ui/tooltip/TooltipContent.vue'
import TooltipProvider from '@/components/ui/tooltip/TooltipProvider.vue'
import TooltipTrigger from '@/components/ui/tooltip/TooltipTrigger.vue'
import { Info } from 'lucide-vue-next'
import { computed, ref } from 'vue'

const mockProducts = ref<{ id: number; title: string; thumbnail: string; price: number }[]>([
  {
    id: 1,
    title: 'Product 1',
    thumbnail: 'https://ccdn.steak.io.vn/assets-desert.png',
    price: 250000,
  },
  {
    id: 2,
    title: 'Product 2',
    thumbnail: 'https://ccdn.steak.io.vn/assets-desert.png',
    price: 180000,
  },
  {
    id: 3,
    title: 'Product 3',
    thumbnail: 'https://ccdn.steak.io.vn/assets-desert.png',
    price: 99000,
  },
  {
    id: 4,
    title: 'Product 4',
    thumbnail: 'https://ccdn.steak.io.vn/assets-desert.png',
    price: 315000,
  },
  {
    id: 5,
    title: 'Product 5',
    thumbnail: 'https://ccdn.steak.io.vn/assets-desert.png',
    price: 279000,
  },
  {
    id: 6,
    title: 'Product 6',
    thumbnail: 'https://ccdn.steak.io.vn/assets-desert.png',
    price: 150000,
  },
  {
    id: 7,
    title: 'Product 7',
    thumbnail: 'https://ccdn.steak.io.vn/assets-desert.png',
    price: 65000,
  },
  {
    id: 8,
    title: 'Product 8',
    thumbnail: 'https://ccdn.steak.io.vn/assets-desert.png',
    price: 205000,
  },
  {
    id: 9,
    title: 'Product 9',
    thumbnail: 'https://ccdn.steak.io.vn/assets-desert.png',
    price: 420000,
  },
  {
    id: 10,
    title: 'Product 10',
    thumbnail: 'https://ccdn.steak.io.vn/assets-desert.png',
    price: 123000,
  },
])
</script>
