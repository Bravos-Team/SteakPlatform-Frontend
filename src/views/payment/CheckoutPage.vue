<template>
  <div
    v-if="userCartData?.data.items.length > 0"
    :hide-close-button="true"
    class="bg-[#F2F2F2] !rounded-xs z-999 p-0 min-h-screen min-w-10/12 desktop:min-w-[70rem] text-black flex flex-col"
  >
    <div class="flex bg-white min-h-3/12 p-3 h-full flex-row justify-between items-center">
      <span class="text-lg tablet:text-2xl font-bold font-mono">{{
        $t('title.pages.cart.checkout.title')
      }}</span>
    </div>
    <div class="p-3 min-h-full flex flex-1 flex-col gap-y-2">
      <div
        v-if="!isUserCartFetching"
        class="flex rounded-xs overflow-hidden gap-x-3"
        v-for="game in userCartData?.data?.items"
        :key="game.id"
      >
        <img :src="game.thumbnail" class="object-cover h-20" alt="" />
        <span class="flex text-black flex-col justify-center gap-y-1">
          <span class="text-lg font-bold font-mono">{{ game.title }}</span>
          <span>{{ CurrencyUtils.formatCurrencyVND(game.price) }}</span>
        </span>
      </div>
    </div>
    <div class="min-h-2/12 p-3 bg-white flex !flex-col gap-y-2">
      <div class="flex gap-x-8 laptop:flex-row-reverse flex-col gap-y-4">
        <div class="flex flex-col gap-y-1 laptop:basis-7xl">
          <div class="flex justify-between items-center">
            <span>{{ $t('features.filters.types.price') }}</span>
            <span>{{ CurrencyUtils.formatCurrencyVND(totalPrice) }}</span>
          </div>
          <div class="flex justify-between items-center">
            <span>{{ $t('title.pages.cart.checkout.VAT_included') + ' (5%)' }}</span>
            <span>{{ '- ' + CurrencyUtils.formatCurrencyVND(totalPrice * 0.05) }}</span>
          </div>
          <div class="flex justify-between items-center">
            <span>{{ $t('noti_note.cart.total_prices') }}</span>
            <span>{{ CurrencyUtils.formatCurrencyVND(totalPrice - totalPrice * 0.05) }}</span>
          </div>
        </div>
        <span class="text-sm">
          {{ $t('title.pages.cart.checkout.place_order_description') }}
        </span>
      </div>
      <button
        :disabled="isMutateCheckoutPending"
        :class="{
          'cursor-not-allowed': isMutateCheckoutPending,
          'cursor-pointer': !isMutateCheckoutPending,
        }"
        @click="handleCheckout"
        class="w-full bg-blue-400/80 py-3 rounded-xs hover:bg-blue-400 transition-colors duration-300"
      >
        {{ $t('title.pages.cart.checkout.place_order') }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import CurrencyUtils from '@/services/common/CurrencyUtils'
import { useMutateCheckout } from '@/hooks/payment/usePayment'
import { computed, ref } from 'vue'
import { useUserCartList } from '@/hooks/store/cart/useUserCart'
import { useDebounceFn } from '@vueuse/core'
const { isPending: isMutateCheckoutPending, mutateAsync: mutateAsyncCheckout } = useMutateCheckout()
const { data: userCartData, isFetching: isUserCartFetching } = useUserCartList()

const isCheckout = ref(false)

const gameIdsList = computed(() => {
  return userCartData.value?.data.items.map((game: any) => game.id)
})

const totalPrice = computed(() => {
  return userCartData.value?.data.items.reduce((total: number, game: any) => {
    return total + game.price
  }, 0)
})

const handleCheckout = useDebounceFn(async () => {
  try {
    if (isCheckout.value) return
    isCheckout.value = true
    const response = await mutateAsyncCheckout(gameIdsList.value)
    if (response.status === 200) {
      window.location.href = response?.data?.paymentUrl
    }
  } catch (error) {
    console.error('Checkout error:', error)
  } finally {
    isCheckout.value = false
  }
}, 1000)
</script>
