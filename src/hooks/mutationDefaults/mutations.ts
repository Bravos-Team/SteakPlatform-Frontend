import { MutationDefaults } from '@/types/common/mutation/mutationDefault'
import {
  userRegisterMutationDefault,
  useLoginByEmailMutationDefault,
  useLoginByUsernameMutationDefault,
} from '@/hooks/mutationDefaults/store/auth'

export const mutationDefaults: MutationDefaults[] = [
  userRegisterMutationDefault,
  useLoginByEmailMutationDefault,
  useLoginByUsernameMutationDefault,
]
