<template>
  <div
    v-if="rightContentsData"
    class="laptop:h-[884px] order-1 laptop:order-2 col-span-12 laptop:col-span-3 mt-1 h-full w-full desktop:sticky top-0 bottom-0 right-0 flex flex-col gap-y-[15px]"
  >
    <div class="flex justify-center items-center p-[20px]">
      <div class="flex justify-center items-center">
        <img :src="rightContentsData?.details?.thumbnail" alt="" />
      </div>
    </div>
    <div
      class="flex p-[15px] gap-x-[15px] justify-between rounded-[10px] items-center border-[#fff]/20 border hover:border-[#fff]"
    >
      <div class="flex justify-center items-center">
        <img
          :src="'https://cdn1.epicgames.com/gameRating/gameRating/Generic_12_192_192x192-01e962f26c693e725097658fa7e4e29d'"
          alt=""
          class="w-16"
        />
      </div>
      <div class="flex flex-col w-full items-start" v>
        <span class="font-bold">{{ '12' }}+</span>
        <span class="text-[#ffffffa6] text-[12px]">Moderate Violence</span>
      </div>
    </div>
    <div class="flex justify-start w-full">
      <!-- <button
        class="rounded-[4px] py-[1px] justify-center px-[8px] flex items-center bg-[#ffffff26]"
      >
        {{ game.category.name }}
      </button> -->
    </div>
    <div
      v-if="rightContentsData?.price !== 0"
      class="flex justify-start w-full font-bold text-[18px]"
    >
      {{ CurrencyUtils.formatCurrencyVND(rightContentsData?.price) }}
    </div>
    <div v-else class="flex justify-start w-full font-bold text-[18px]">Free</div>

    <div class="flex flex-col gap-y-[10px]">
      <template v-if="rightContentsData?.isOwned">
        <button
          class="py-[12px] px-[20px] align-middle bg-[#26bbff]/30 cursor-not-allowed text-black rounded-[10px] flex justify-center items-center"
          disabled
        >
          {{ $t('features.buttons.already_in_library') }}
        </button>
      </template>
      <template v-else>
        <button
          :class="{
            'cursor-not-allowed': isMutateCheckoutPending,
            'cursor-pointer': !isMutateCheckoutPending,
          }"
          :disabled="isMutateCheckoutPending"
          @click="handleCheckout"
          class="py-[12px] px-[20px] align-middle bg-[#26bbff] hover:bg-[#61cdff] text-black rounded-[10px] flex justify-center items-center"
        >
          {{ $t('features.buttons.buy_now') }}
        </button>
        <button
          class="py-[12px] px-[20px] align-middle bg-[#ffffff59]/30 cursor-not-allowed text-white rounded-[10px] flex justify-center items-center"
          v-if="isAlreadyHaveInCart && !isAlreadyHaveInWishlist"
        >
          <span> {{ $t('alreadyInCart') }}</span>
        </button>
        <button
          v-else-if="!isAlreadyHaveInWishlist"
          @click="handleAddToCart(rightContentsData.details.id)"
          :disabled="rightContentsData.isOwned"
          :class="{
            'cursor-not-allowed':
              rightContentsData.isOwned || isMutateCheckoutPending || isMutateAddToCartPending,
            'cursor-pointer': !rightContentsData.isOwned && !isMutateCheckoutPending,
          }"
          class="py-[12px] px-[20px] align-middle bg-[#ffffff59]/50 hover:bg-[#ffffff59] text-white rounded-[10px] flex justify-center items-center"
        >
          <LoaderCircle v-if="isMutateAddToCartPending" class="animate-spin" />
          <span v-else>{{ $t('features.buttons.add_to_cart') }}</span>
        </button>

        <button
          v-if="
            isAlreadyHaveInWishlist &&
            useUserProfilesStores().getAccessRight() &&
            !isAlreadyHaveInCart
          "
          class="py-[12px] px-[20px] align-middle bg-[#ffffff59]/30 cursor-not-allowed text-white rounded-[10px] flex justify-center items-center"
        >
          <span> {{ $t('alreadyInWishlist') }}</span>
        </button>
        <button
          v-else-if="!useUserProfilesStores().getAccessRight()"
          class="py-[12px] px-[20px] align-middle bg-[#ffffff59]/30 cursor-not-allowed text-white rounded-[10px] flex justify-center items-center"
        >
          Login to add to Wishlist
        </button>
        <button
          v-else-if="!isAlreadyHaveInCart"
          @click="handleAddToWishlist(rightContentsData.details.id)"
          :disabled="rightContentsData.isOwned"
          :class="{
            '!cursor-not-allowed':
              rightContentsData.isOwned || isMutateCheckoutPending || isMutateAddToWishlistPending,
            'cursor-pointer': !rightContentsData.isOwned,
          }"
          class="text-wrap py-[12px] px-[20px] align-middle bg-[#ffffff59]/50 hover:bg-[#ffffff59] text-white rounded-[10px] flex justify-center items-center"
        >
          <LoaderCircle v-if="isMutateAddToWishlistPending" class="animate-spin" />
          <span v-else> {{ $t('features.buttons.add_to_wishlist') }}</span>
        </button>
      </template>
    </div>

    <div class="flex flex-col text-[15px]">
      <!-- <div class="flex border-b-[0.5px] border-b-[#ffffff37] justify-between py-[10px] px-[0px]">
        <span class="text-[#ffffffa6]">Steak Rewards</span>
        <span class="text-white flex gap-x-[10px]"
          >{{ game.rewards.name }}
          <img
            class="w-5"
            src="https://ccdn.steak.io.vn/assets-5-percent-rewards-blue.svg"
            alt=""
          />
        </span>
      </div> -->
      <div
        class="flex flex-wrap border-b-[0.5px] border-b-[#ffffff37] justify-between py-[10px] px-[0px]"
      >
        <span class="text-[#ffffffa6]">Refund Type</span>
        <span class="text-white">{{ 'ChargeBack 80%' }}</span>
      </div>
      <div
        v-if="rightContentsData?.developer"
        class="flex justify-between py-[10px] px-[0px] border-b-[0.5px] border-b-[#ffffff37]"
      >
        <span class="text-[#ffffffa6]">Developer or Publisher</span>
        <span class="text-white">{{ rightContentsData?.developer }}</span>
      </div>
      <div
        v-if="rightContentsData?.publisherName"
        class="flex justify-between py-[10px] px-[0px] border-b-[0.5px] border-b-[#ffffff37]"
      >
        <span class="text-[#ffffffa6]">{{ $t('title.routers.publisher') }}</span>
        <span class="text-white">{{ rightContentsData?.publisherName }}</span>
      </div>
      <div
        v-if="rightContentsData?.releaseDate"
        class="flex justify-between py-[10px] px-[0px] border-b-[0.5px] border-b-[#ffffff37]"
      >
        <span class="text-[#ffffffa6]">Release Date</span>
        <span class="text-white">{{ rightContentsData?.realeaseDate }}</span>
      </div>
      <div class="flex justify-between py-[10px] px-[0px] border-b-[0.5px] border-b-[#ffffff37]">
        <span class="text-[#ffffffa6]">{{
          $t('title.subPagesCompo.sidebar.publisher.platform')
        }}</span>
        <template v-for="(platform, index) in rightContentsData.platforms" :key="index">
          <img
            v-if="platform.startWith('Window')"
            src="https://ccdn.steak.io.vn/assets-window-ico-white.svg"
            class="w-6"
            alt=""
          />
          <span v-else>{{ platform }}</span>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CurrencyUtils from '@/services/common/CurrencyUtils'
import { useMutateCheckout } from '@/hooks/payment/usePayment'
import {
  toastErrorNotificationPopup,
  toastSuccessNotificationPopup,
} from '@/composables/toast/toastNotificationPopup'
import { useRouter } from 'vue-router'
import { useDebounceFn } from '@vueuse/core'
import { useMutateAddToCart, useUserCartList } from '@/hooks/store/cart/useUserCart'
import { useMutateAddToWishlist, useGetUserWishlist } from '@/hooks/store/wishlist/useWishlist'
import { LoaderCircle } from 'lucide-vue-next'
import { computed } from 'vue'
import { useUserProfilesStores } from '@/stores/user/useUserProfiles'
const { isPending: isMutateAddToCartPending, mutateAsync: mutateAsyncAddToCart } =
  useMutateAddToCart()
const { isPending: isMutateAddToWishlistPending, mutateAsync: mutateAsyncAddToWishlist } =
  useMutateAddToWishlist()
const { data: userWishlistData } = useGetUserWishlist()
const { data: userCartListData } = useUserCartList()

const handleAddToCart = useDebounceFn(async (id: bigint) => {
  try {
    const response = await mutateAsyncAddToCart(id)
    if (response.status === 200) {
      toastSuccessNotificationPopup('Added to cart successfully', '')
    }
  } catch (err: any) {
    console.log(err)
  }
}, 200)

const handleAddToWishlist = useDebounceFn(async (id: bigint) => {
  try {
    const response = await mutateAsyncAddToWishlist(id)
    if (response.status === 200) {
      toastSuccessNotificationPopup('Added to wishlist successfully', '')
    }
  } catch (err: any) {
    toastErrorNotificationPopup('Failed to add to wishlist', err.response.data.detail)
    console.log(err)
  }
}, 200)

const isAlreadyHaveInCart = computed(() => {
  if (!userCartListData.value) return false
  return userCartListData.value.data.items.some(
    (item: any) => item.id === props.rightContentsData?.details?.id,
  )
})
const isAlreadyHaveInWishlist = computed(() => {
  if (!userWishlistData.value) return false
  return userWishlistData.value.data.some(
    (item: any) => item.id === props.rightContentsData?.details?.id,
  )
})

const router = useRouter()
const { isPending: isMutateCheckoutPending, mutateAsync: mutateAsyncCheckout } = useMutateCheckout()

const handleCheckout = useDebounceFn(async () => {
  const accessRights = useUserProfilesStores().getAccessRight()

  let response
  try {
    if (accessRights) {
      response = await mutateAsyncCheckout([props.rightContentsData?.details?.id])
      console.log('RESPONSE: ', response)
      if (!response || response.status !== 200) {
        useUserProfilesStores().removeAccessRight()
        await router.push({ name: 'Login' })
        return
      } else if (response.status === 200) window.location.href = response.data.paymentUrl
    }
  } catch (error: any) {
    if (error.response.status === 401) {
      useUserProfilesStores().removeAccessRight()
      await router.push({ name: 'Login' })
    }
  }
}, 100)

const props = defineProps({
  rightContentsData: {
    type: Object,
  },
})
</script>
