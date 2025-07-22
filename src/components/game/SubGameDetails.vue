<template>
  <div
    class="laptop:h-[884px] h-full w-full laptop:w-[350px] desktop:sticky top-0 bottom-0 right-0 flex flex-col gap-y-[15px]"
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
    <div class="flex justify-start w-full font-bold text-[18px]">
      {{ CurrencyUtils.formatCurrencyVND(rightContentsData?.price) }}
    </div>

    <div class="flex flex-col gap-y-[10px]">
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
        class="py-[12px] px-[20px] align-middle bg-[#ffffff59]/50 hover:bg-[#ffffff59] text-white rounded-[10px] flex justify-center items-center"
      >
        {{ $t('features.buttons.add_to_cart') }}
      </button>
      <button
        class="py-[12px] px-[20px] align-middle bg-[#ffffff59]/50 hover:bg-[#ffffff59] text-white rounded-[10px] flex justify-center items-center"
      >
        {{ $t('features.buttons.add_to_wishlist') }}
      </button>
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
      <div class="flex border-b-[0.5px] border-b-[#ffffff37] justify-between py-[10px] px-[0px]">
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

<script setup>
import CurrencyUtils from '@/services/common/CurrencyUtils'
import { useMutateCheckout } from '@/hooks/payment/usePayment'
import { toastErrorNotificationPopup } from '@/composables/toast/toastNotificationPopup'
import { removeCookie } from '@/utils/cookies/cookie-utils'
import { useRouter } from 'vue-router'
import { useDebounceFn } from '@vueuse/core'
const router = useRouter()
const { isPending: isMutateCheckoutPending, mutateAsync: mutateAsyncCheckout } = useMutateCheckout()

const handleCheckout = useDebounceFn(async () => {
  try {
    const response = await mutateAsyncCheckout([props.rightContentsData?.details?.id])
    if (response.status === 200) {
      window.location.href = response.data?.paymentUrl
    }
  } catch (error) {
    if (error.response.status === 401) {
      toastErrorNotificationPopup('You need to login to checkout', '')
      removeCookie('userAccessRights')
      await router.push({ name: 'Login' })
    }
  }
}, 1000)

const props = defineProps({
  rightContentsData: {
    type: Object,
  },
})
</script>
