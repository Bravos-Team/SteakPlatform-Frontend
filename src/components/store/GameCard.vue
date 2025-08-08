<template>
  <div v-if="game && isReleased(game)"
    class="group relative px-1 tablet:w-[16rem] desktop:w-[16rem] desktop-xl:w-[18rem] tablet:col-span-4 col-span-12 laptop:col-span-3 rounded-2xl">
    <router-link :to="{ name: 'game-details', params: { id: game?.id.toString() } }">
      <!-- IMAGE -->
      <div
        class="group relative w-full rounded-2xl overflow-hidden   filter filter-[drop-shadow(0_0_10px_rgba(255,255,255,0.3))]">
        <img :src="game?.thumbnail" :alt="game.name" class="object-cotain rounded-2xl" />
      </div>
      <!-- END IMAGE -->

      <!-- TITLE AND PRICE -->
      <div class="flex flex-col gap-y-3 px-3 py-2 text-white w-fit justify-between h-fit">
        <div class="w-fit break-words leading-tight text-wrap font-bold tablet:text-xl text-sm">
          {{ game?.name }}
        </div>
        <div class="flex flex-row flex-wrap">
          <p v-if="game?.price === 0" class="text-white text-sm tablettext-lg font-mono">
            Free
          </p>
          <p v-else class="text-white text-sm tablettext-lg">
            {{ CurrencyUtils.formatCurrency(game?.price, '₫') }}
          </p>
        </div>
      </div>
    </router-link>
    <!-- END TITLE AND PRICE -->

    <!-- ADD TO CART -->
    <button :disabled="isAddToCartPending" :class="{
      'cursor-progress': isAddToCartPending,
      'cursor-pointer': !isAddToCartPending,
    }"
      class="peer/category-img absolute group-hover:opacity-100 opacity-0 transition-all duration-300 top-[10px] right-[10px]"
      @click="handleAddToCart(game.id, game.name)">
      <img src="https://ccdn.steak.io.vn/assets-ico-plus-white.svg" alt="" />
    </button>

    <!-- END ADD TO CART -->
  </div>
</template>

<script setup lang="ts">

import CurrencyUtils from '@/services/common/CurrencyUtils'
import { GAME_ITEM } from '@/types/store/game'
import { PropType } from 'vue'
import { useMutateAddToCart } from '@/hooks/store/cart/useUserCart'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
import {
  toastErrorNotificationPopup,
  toastSuccessNotificationPopup,
} from '@/composables/toast/toastNotificationPopup'
const { isPending: isAddToCartPending, mutateAsync: mutateAddToCart } = useMutateAddToCart()

const props = defineProps({
  game: {
    type: Object as PropType<GAME_ITEM>,
  },
})

const handleAddToCart = async (gameId: bigint, name: string) => {
  try {
    await mutateAddToCart(gameId)
    toastSuccessNotificationPopup(
      t('title.pages.cart.actions.add_to_cart_success'),
      ` ${name} ${t('title.pages.cart.actions.has_been_added_to_cart')}.`,
    )
  } catch (error: any) {
    toastErrorNotificationPopup(
      `${t('title.pages.cart.actions.add_to_cart_error')}`,
      t(`${name} ${t('title.pages.cart.actions.already_in_cart')}`),
    )
  }
}
const isReleased = (game: any): boolean => {
  return game.releaseDate < new Date().getTime()
}
</script>
