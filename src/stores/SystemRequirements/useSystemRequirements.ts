import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import {
  SystemRequirementsType,
  getDefaultValueRequirements,
} from '@/types/game/gameDetails/GameDetailsType'

export const useSystemRequirementsStore = defineStore(
  'systemRequirements',
  () => {
    const minimumRequirement = reactive<SystemRequirementsType>(getDefaultValueRequirements())
    const recommendRequirement = reactive<SystemRequirementsType>(getDefaultValueRequirements())

    return {
      minimumRequirement,
      recommendRequirement,
    }
  },
  { persist: false },
)
