<template>
  <tooltip-provider>
    <div class="flex flex-col px-2 mt-6 mb-3 justify-start h-full gap-y-6">
      <div class="flex gap-y-5 tablet:justify-between justify-end flex-wrap">
        <span class="text-2xl laptop:text-5xl font-extrabold text-wrap px-3">
          {{ $t('title.pages.wishlist.title') }}
        </span>

        <router-link
          :to="{ name: 'CartManagementPage' }"
          class="group group flex gap-x-1 relative justify-end px-5"
        >
          <div class="relative">
            <span
              class="fill-white/30 border-b-1 group-hover:border-b-3 border-white transition-all duration-100"
            >
              {{ $t('title.store.cart') }}</span
            >

            <div
              v-if="userCartData?.data"
              class="absolute -top-4 -right-4 rounded-full bg-blue-500/50 group-hover:bg-blue-500 transition-colors duration-300 size-6 text-xs flex items-center justify-center"
            >
              {{ userCartData.data.items.length }}
            </div>
          </div>
        </router-link>
      </div>
      <div
        class="flex relative px-3 gap-y-5 flex-col-reverse desktop:flex-row gap-x-2 justify-start"
      >
        <div class="flex w-full h-full gap-y-3 flex-col">
          <div
            class="flex tablet:flex-row flex-col gap-x-1 gap-y-2 tablet:items-center justify-between"
          >
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

            <!-- CLEAR ALL -->

            <button
              v-if="userWishlistData?.data.length > 0"
              :disabled="isMutateClearWishlist"
              :class="{
                'cursor-progress': isMutateClearWishlist,
                'cursor-pointer': !isMutateClearWishlist,
              }"
              @click="handleClearWishlist"
              class="flex gap-x-3 items-center justify-center px-3 py-2 border-1 border-white-10 rounded-sm hover:bg-white/3"
            >
              {{ $t('title.pages.cart.actions.remove_all_from_wishlist') }}
            </button>
            <!-- END CLEAR ALL -->
          </div>
          <div
            v-if="userWishlistData?.data.length > 0"
            v-for="game in userWishlistData?.data"
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
                <button
                  :disabled="isRemoveGameFromWishlistPending"
                  :class="{
                    'cursor-progress': isRemoveGameFromWishlistPending,
                    'cursor-pointer': !isRemoveGameFromWishlistPending,
                  }"
                  @click="handleRemoveFromWishlist(game.id, game.title)"
                  class="hover:text-white/80 transition-colors duration-300"
                >
                  {{ $t('features.buttons.remove_from_wishlist') }}
                </button>
                <button
                  :disabled="isMoveItemToCartPending"
                  :class="{
                    'cursor-progress': isMoveItemToCartPending,
                    'cursor-pointer': !isMoveItemToCartPending,
                  }"
                  @click="handleMoveToCart(game.id, game.title)"
                  class="text-black px-3 py-1.5 rounded-sm text-sm font-medium transition-colors duration-300 bg-blue-400 hover:bg-blue-400/90"
                >
                  {{ $t('features.buttons.add_to_cart') }}
                </button>
              </div>
              <!-- END ACTION BUTTONS -->
            </div>
            <!-- END RIGHT CONTENT -->
          </div>
          <div v-else>
            <span class="text-lg font-black text-wrap">
              {{ $t('title.pages.wishlist.empty') }}
            </span>
          </div>
        </div>

        <!-- FILTERS  -->
        <div
          class="desktop:max-w-[20rem] top-25 sticky bg-[#101014] w-full px-3 gap-y-5 h-[10rem] flex flex-col"
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
        <!-- END FILTERS  -->
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
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
import {
  useGetUserWishlist,
  useMutateRemoveGameFromWishlist,
  useMutateMoveWishlistItemToCart,
  useMutateClearWishList,
} from '@/hooks/store/wishlist/useWishlist'
import {
  toastErrorNotificationPopup,
  toastSuccessNotificationPopup,
} from '@/composables/toast/toastNotificationPopup'
import { useUserCartList } from '@/hooks/store/cart/useUserCart'
import user from '@/router/middlewares/user'

const { data: userCartData, refetch: userCartRefetch } = useUserCartList()
const { mutateAsync: mutateMoveItemToCart, isPending: isMoveItemToCartPending } =
  useMutateMoveWishlistItemToCart()
const { mutateAsync: mutateRemoveGameFromWishlist, isPending: isRemoveGameFromWishlistPending } =
  useMutateRemoveGameFromWishlist()
const { mutateAsync: mutateClearWishlist, isPending: isMutateClearWishlist } =
  useMutateClearWishList()

const handleClearWishlist = async () => {
  try {
    const response = await mutateClearWishlist()
    if (response.status === 200) {
      toastSuccessNotificationPopup(
        `${t('title.pages.cart.actions.remove_all_from_wishlist_success')}`,
        '',
      )
    } else {
      toastErrorNotificationPopup(
        `${t('title.pages.cart.actions.remove_all_from_wishlist_error')}`,
        '',
      )
    }
  } catch (error: any) {
    console.log('Error clearing wishlist:', error)
  }
}

const handleMoveToCart = async (gameId: bigint, gameTitle: string) => {
  try {
    const response = await mutateMoveItemToCart(gameId)
    if (response.status === 200) {
      toastSuccessNotificationPopup(
        `${gameTitle} ${t('title.pages.cart.actions.has_been_moved_to_cart')}`,
        `${t('title.pages.cart.actions.add_to_cart_success')}`,
      )
    } else {
      toastErrorNotificationPopup('', `${t('title.pages.cart.actions.add_to_cart_error')}`)
    }
  } catch (error: any) {
    console.error('Error moving item to cart:', error)
    // toastErrorNotificationPopup('Error moving item to cart', error?.message || 'An error occurred')
  }
}

const handleRemoveFromWishlist = async (gameId: bigint, gameTitle: string) => {
  try {
    const response = await mutateRemoveGameFromWishlist(gameId)
    if (response.status === 200) {
      toastSuccessNotificationPopup(
        `${t('title.pages.cart.actions.has_been_removed_from_wishlist_success')}`,
        `${gameTitle} ${t('title.pages.cart.actions.has_been_removed_from_wishlist')}`,
      )
    } else {
      toastErrorNotificationPopup(``, ``)
    }
  } catch (error: any) {
    console.error('Error removing item from wishlist:', error)
    // toastErrorNotificationPopup(
    //   'Error removing item from wishlist',
    //   error?.message || 'An error occurred',
    // )
  }
}
const { data: userWishlistData, isFetching: isUserWishlistFetching } = useGetUserWishlist()
</script>
