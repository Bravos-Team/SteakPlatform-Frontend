import {
  ACCOUNT_LIST_FILTERS,
  ACCOUNT_SEARCHING_FILTERS,
} from '@/types/publisher/account/AccountManageType'
import { Ref } from 'vue'
import QUERY_KEY_TYPE from '@/hooks/constants/query-key-type'

export const PUBLISHER_ACCOUNTS_MANAGE_KEYS = {
  ACCOUNT: () => ['publisher', 'accounts', 'me'] as const,
  ACCOUNT_BY_ID: (accountId: Ref<string>) => ['publisher', 'accounts', accountId.value] as const,
  SEARCHING: ((filters?: Ref<ACCOUNT_SEARCHING_FILTERS>) => [
    'publisher',
    'accounts',
    'searching',
    filters,
  ]) as QUERY_KEY_TYPE<ACCOUNT_SEARCHING_FILTERS>,
  LIST: ((filters?: Ref<ACCOUNT_LIST_FILTERS>) => [
    'publisher',
    'accounts',
    'list',
    filters,
  ]) as QUERY_KEY_TYPE<ACCOUNT_LIST_FILTERS>,
}

export const PUBLISHER_PERMISSIONS_LIST_KEYS = {
  ALL: () => ['publisher', 'permissions', 'list'] as const,
}

export const PUBLISHER_CUSTOM_ROLES_LIST_KEYS = {
  ALL: () => ['publisher', 'custom-roles', 'list'] as const,
  ROLE: (roleId: Ref<string>) => ['publisher', 'custom-roles', roleId.value] as const,
}
