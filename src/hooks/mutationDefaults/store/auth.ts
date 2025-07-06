import { MutationDefaults } from '@/types/common/mutation/mutationDefault'
import { RegisterRequest } from '@/types/auth/AuthType'
import { register, loginApiEmail, loginApiUserName } from '@/apis/user/authUser'
import LoginRequest from '@/types/auth/AuthType'

export const userRegisterMutationDefault: MutationDefaults = {
  key: ['user', 'auth', 'register'],
  fn: async (payload: RegisterRequest) => await register(payload),
}

export const useLoginByEmailMutationDefault: MutationDefaults = {
  key: ['user', 'auth', 'login', 'email'],
  fn: async (payload: LoginRequest) => await loginApiEmail(payload),
}

export const useLoginByUsernameMutationDefault: MutationDefaults = {
  key: ['user', 'auth', 'login', 'username'],
  fn: async (payload: LoginRequest) => await loginApiUserName(payload),
}
