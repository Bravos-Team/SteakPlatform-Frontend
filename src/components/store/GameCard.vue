<template>
  <div
    v-if="game && isReleased(game)"
    class="group shadow-2xl relative px-1 w-full tablet:col-span-6 col-span-12 laptop:col-span-4 desktop:col-span-3 transition-transform duration-200 hover:-translate-y-1 hover:shadow-3xl rounded-lg"
  >
    <router-link :to="{ name: 'game-details', params: { id: game?.id.toString() } }" class="">
      <!-- IMAGE -->
      <div
        class="group relative min-w-full overflow-hidden tablet:max-h-[7rem] bg-white/10 min-h-[9.5rem] tablet:min-h-[7rem]"
      >
        <img :src="game?.thumbnail" :alt="game.name" class="object-contain size-full" />
      </div>
      <!-- END IMAGE -->

      <!-- TITLE AND PRICE -->
      <div
        class="flex flex-col gap-y-3 px-3 py-2 text-white justify-between bg-gray-400/10 w-full h-[9rem]"
      >
        <div class="w-fit break-words leading-tight text-wrap font-bold tablet:text-xl text-2xl">
          {{ game?.name }}
        </div>
        <div class="flex flex-row flex-wrap">
          <p v-if="game?.price === 0" class="text-white text-sm tablettext-lg font-mono">Free</p>
          <p v-else class="text-white text-md tablet:text-lg tablettext-lg">
            {{ CurrencyUtils.formatCurrency(game?.price, '₫') }}
          </p>
        </div>
      </div>
    </router-link>
    <!-- END TITLE AND PRICE -->

    <!-- ADD TO CART -->
    <button
      :disabled="isAddToCartPending"
      :class="{
        'cursor-progress': isAddToCartPending,
        'cursor-pointer': !isAddToCartPending,
      }"
      class="peer/category-img absolute group-hover:opacity-100 opacity-0 transition-all duration-300 top-[10px] right-[10px]"
      @click="handleAddToCart(game.id, game.name)"
    >
      <img src="https://ccdn.steak.io.vn/assets-ico-plus-white.svg" alt="" />
    </button>
    <!-- END ADD TO CART -->
  </div>
</template>

<script setup lang="ts">
import CurrencyUtils from '@/services/common/CurrencyUtils'
import { GAME_ITEM } from '@/types/store/game'
import { computed, PropType } from 'vue'
import { useMutateAddToCart } from '@/hooks/store/cart/useUserCart'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
import {
  toastErrorNotificationPopup,
  toastSuccessNotificationPopup,
} from '@/composables/toast/toastNotificationPopup'
import { useUserProfilesStores } from '@/stores/user/useUserProfiles'
import { useGetUserWishlist, useMutateAddToWishlist } from '@/hooks/store/wishlist/useWishlist'
const { isPending: isAddToCartPending, mutateAsync: mutateAddToCart } = useMutateAddToCart()

const { data: userWishlistData, refetch: refetchUserWishlist } = useGetUserWishlist(false)

const props = defineProps({
  game: {
    type: Object as PropType<GAME_ITEM>,
  },
})

const handleAddToCart = async (gameId: bigint, name: string) => {
  try {
    if (useUserProfilesStores().getAccessRight()) {
      await refetchUserWishlist()
      let isAlreadyHaveInWishlist = false
      if (userWishlistData.value)
        isAlreadyHaveInWishlist = userWishlistData.value.data.some(
          (item: any) => item.id === props.game?.id,
        )
      if (isAlreadyHaveInWishlist) {
        toastErrorNotificationPopup(
          `${t('title.pages.cart.actions.add_to_cart_error')}`,
          t(`${name} ${t('title.pages.cart.actions.already_in_wishlist')}`),
        )
        return
      }
    }
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
