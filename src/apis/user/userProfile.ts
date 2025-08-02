import SteakApi from '@/apis/index'
import { USER_PROFILE_REQUEST_TYPE } from '@/types/user/UserProfileType'

export const getUserProfile = async () => await SteakApi.get('/user/profile/me')

export const updateUserProfile = async (payload: USER_PROFILE_REQUEST_TYPE) =>
  SteakApi.post('/user/profile/update', payload)
