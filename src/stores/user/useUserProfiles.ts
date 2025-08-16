import { USER_PROFILE_REQUEST_TYPE } from '@/types/user/UserProfileType'
import { getCookie, removeCookie, setCookie } from '@/utils/cookies/cookie-utils'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserProfilesStores = defineStore(
  'user-profile',
  () => {
    const profile = ref<USER_PROFILE_REQUEST_TYPE>({} as USER_PROFILE_REQUEST_TYPE)
    const accessRights = ref<string | null>(null)

    const setAccessRight = (value: string) => (accessRights.value = value)
    const getAccessRight = () => accessRights.value
    const setProfile = (value: USER_PROFILE_REQUEST_TYPE) => (profile.value = value)
    const getProfile = () => profile.value
    const removeAccessRight = () => {
      removeCookie('userAccessRights')
      setAccessRight('')
    }

    return {
      profile,
      accessRights,
      setAccessRight,
      getAccessRight,
      setProfile,
      getProfile,
      removeAccessRight,
    }
  },
  {
    persist: {
      storage: {
        getItem: (key) => getCookie(key),
        setItem: (_, value) => setCookie('userAccessRights', value),
      },
    },
  },
)
