<template>
  <tooltip-provider>
    <div class="flex flex-col min-h-[20rem] justify-start h-full gap-y-6">
      <div
        class="w-full flex flex-col tablet:flex-row tablet:items-center gap-y-2 justify-between px-2"
      >
        <span class="text-3xl tablet:text-5xl font-extrabold">
          {{ $t('title.pages.cart.title') }}
        </span>

        <div class="flex items-center gap-x-6 flex-wrap gap-y-2">
          <router-link
            :to="{ name: 'WishlistManagementPage' }"
            class="relative border-b-1 hover:border-b-3 border-white transition-all duration-100 group flex gap-x-1 items-end"
          >
            {{ $t('title.store.wishlist') }}
          </router-link>
          <button
            v-if="userCartData?.data?.items.length > 0"
            :disabled="isMutateClearCart"
            :class="{ 'cursor-progress': isMutateClearCart, 'cursor-pointer': !isMutateClearCart }"
            @click="handleClearCart"
            class="flex gap-x-3 items-center justify-center px-3 py-2 border-1 border-white-10 rounded-sm hover:bg-white/3"
          >
            {{ $t('title.pages.cart.actions.remove_all_from_cart') }}
          </button>
        </div>
      </div>
      <div class="flex flex-col desktop:flex-row px-2 gap-y-10 gap-x-2 justify-between">
        <div v-if="userCartData?.data?.items" class="flex w-full gap-y-4 flex-col">
          <div
            v-if="userCartData?.data.items.length > 0"
            v-for="game in userCartData.data.items"
            :key="game.id"
            class="w-full cursor-pointer p-6 rounded-lg bg-white/6 grid grid-cols-12 gap-x-3 gap-y-3"
          >
            <!-- LEFT CONTENT -->
            <div class="flex flex-col col-span-12 tablet:col-span-3 gap-y-2">
              <img :src="game.thumbnail" class="w-full" alt="" />

              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="svg text-white/60 size-7 css-uwwqev"
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
            <div class="flex w-full flex-col gap-y-2 col-span-12 tablet:col-span-9">
              <!-- NAME AND HEADER BADGE -->
              <div class="flex justify-between w-full">
                <span class="bg-white/10 hover:bg-white/20 px-2 rounded-sm py-1">{{
                  $t('type.game.base')
                }}</span>
                <span class="font-bold">{{
                  Number(game.price).toLocaleString('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                  })
                }}</span>
              </div>
              <!-- END NAME AND HEADER BADGE -->

              <!-- AGES -->
              <div class="flex items-start gap-y-3 flex-col">
                <span class="font-extrabold text-2xl text-wrap">{{ game.title }}</span>
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
                <span class="text-wrap">{{ $t('noti_note.cart.self_refundable') }}</span>
                <div class="rounded-full flex">
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
              <div class="flex text-white/50 w-full items-center gap-x-6 justify-end flex-wrap">
                <button
                  :disabled="isRemoveFromCartPending"
                  :class="{
                    'cursor-progress': isRemoveFromCartPending,
                    'cursor-pointer': !isRemoveFromCartPending,
                  }"
                  @click="handleRemoveFromCart(game.id, game.title)"
                  class="hover:text-white/80 transition-colors duration-300"
                >
                  {{ $t('features.buttons.remove_from_cart') }}
                </button>
                <button
                  :disabled="isMoveToWishlistPending"
                  :class="{
                    'cursor-progress': isMoveToWishlistPending,
                    'cursor-pointer': !isMoveToWishlistPending,
                  }"
                  @click="handleMovedToWishlist(game.id, game.title)"
                  class="hover:text-white/80 transition-colors duration-300 text-wrap"
                >
                  {{ $t('features.buttons.move_to_wishlist') }}
                </button>
              </div>
              <!-- END ACTION BUTTONS -->
            </div>
            <!-- END RIGHT CONTENT -->
          </div>
          <div v-else>{{ $t('title.pages.cart.empty') }}</div>
        </div>
        <div
          v-if="userCartData?.data.items.length > 0"
          class="min-w-[296px] min-h-[326px] px-3 gap-y-5 flex flex-col"
        >
          <span class="text-3xl text-wrap font-extrabold">{{
            $t('title.subPagesCompo.game_and_apps_summary_price')
          }}</span>
          <div class="flex flex-col gap-y-3">
            <div class="flex flex-col gap-y-3 py-3 border-b-1">
              <div class="flex justify-between">
                <span class="text-white">{{ $t('features.filters.types.price') }}</span>
                <span class="text-white">{{ CurrencyUtils.formatCurrencyVND(totalPrices) }}</span>
              </div>

              <div class="flex justify-between">
                <span class="text-white">{{ $t('noti_note.cart.taxes') }}</span>
                <span class="text-white">{{ $t('noti_note.cart.calculated_at_checkout') }}</span>
              </div>
            </div>

            <router-link
              :to="{ name: 'GameStorePayment' }"
              @click="handleCheckout"
              class="text-center font-medium bg-blue-400/90 hover:bg-blue-400 cursor-pointer transition-colors duration-300 text-black text-sm w-full rounded-sm py-4"
            >
              {{ $t('title.store.payment') }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </tooltip-provider>
</template>

<script setup lang="ts">
import Tooltip from '@/components/ui/tooltip/Tooltip.vue'
import TooltipContent from '@/components/ui/tooltip/TooltipContent.vue'
import TooltipProvider from '@/components/ui/tooltip/TooltipProvider.vue'
import TooltipTrigger from '@/components/ui/tooltip/TooltipTrigger.vue'
import { Info } from 'lucide-vue-next'
import { computed, nextTick } from 'vue'
import { useUserCartList } from '@/hooks/store/cart/useUserCart'
import { onMounted } from 'vue'
import {
  useMutateRemoveFromCart,
  useMoveToWishList,
  useMutateClearCart,
} from '@/hooks/store/cart/useUserCart'
import {
  toastErrorNotificationPopup,
  toastSuccessNotificationPopup,
} from '@/composables/toast/toastNotificationPopup'
import { useI18n } from 'vue-i18n'
import CurrencyUtils from '@/services/common/CurrencyUtils'
const { t } = useI18n()
const { mutateAsync: moveToWishlist, isPending: isMoveToWishlistPending } = useMoveToWishList()
const { mutateAsync: mutateRemoveFromCart, isPending: isRemoveFromCartPending } =
  useMutateRemoveFromCart()
const { mutateAsync: mutateClearCart, isPending: isMutateClearCart } = useMutateClearCart()

const { data: userCartData, refetch: userCartRefetch } = useUserCartList()

const totalPrices = computed(() => {
  return Number(
    userCartData.value?.data?.items.reduce((total: any, game: any) => total + game.price, 0),
  )
})

const handleRemoveFromCart = async (gameId: bigint, gameTitle: string) => {
  try {
    const response = await mutateRemoveFromCart(gameId)
    if (response.status === 200) {
      toastSuccessNotificationPopup(
        `${t('title.pages.cart.actions.remove_from_cart_success')}`,
        `${gameTitle} ${t('title.pages.cart.actions.has_been_removed_from_cart')}`,
      )
    }
  } catch (error) {
    toastErrorNotificationPopup(`${t('title.pages.cart.actions.remove_from_cart_error')}`, ``)
  }
}

const handleMovedToWishlist = async (gameId: bigint, gameTitle: string) => {
  try {
    const response = await moveToWishlist(gameId)
    if (response.status === 200) {
      toastSuccessNotificationPopup(
        `${t('title.pages.cart.actions.move_to_wishlist_success')}`,
        `${gameTitle} ${t('title.pages.cart.actions.has_been_moved_to_wishlist')}`,
      )
    }
  } catch (error: any) {
    toastErrorNotificationPopup(
      `${t('title.pages.cart.actions.move_to_wishlist_error')}`,
      error.response.data.detail,
    )
  }
}

const handleClearCart = async () => {
  try {
    const response = await mutateClearCart()
    if (response.status === 200) {
      toastSuccessNotificationPopup(
        `${t('title.pages.cart.actions.remove_all_from_cart_success')}`,
        ``,
      )
    }
  } catch (error: any) {
    console.log(error)
  }
}

const handleCheckout = () => {}
onMounted(async () => {
  await nextTick(() => {
    userCartRefetch()
  })
})
</script>
