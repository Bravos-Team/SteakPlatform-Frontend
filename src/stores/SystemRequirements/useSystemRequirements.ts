import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import {
  SystemRequirementsType,
  getDefaultValueRequirements,
} from '@/types/game/gameDetails/GameDetailsType'

export const useSystemRequirementsStore = defineStore(
  'systemRequirements',
  () => {
    const minimumRequirement = ref<SystemRequirementsType>(getDefaultValueRequirements())
    const recommendRequirement = ref<SystemRequirementsType>(getDefaultValueRequirements())
    const resetSystemRequirements = () => {
      minimumRequirement.value = getDefaultValueRequirements()
      recommendRequirement.value = getDefaultValueRequirements()
    }

    return {
      minimumRequirement,
      recommendRequirement,
      resetSystemRequirements,
    }
  },
  { persist: false },
)
