import { GAME_MANAGE_FILTERS_TYPE } from '@/types/publisher/game/GameManage'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useGameStoreList = defineStore(
  'gameList',
  () => {
    const pagination = ref<GAME_MANAGE_FILTERS_TYPE>({
      page: 1,
      size: 8,
      status: 'OPENING',
    })

    return {
      pagination,
    }
  },
  {
    persist: true,
  },
)
