import SteakApi from '@/apis'
import {
  ACCOUNT_LIST_FILTERS,
  ACCOUNT_SEARCHING_FILTERS,
  CREATE_ACCOUNT_PUBLISHER_PAYLOAD,
  CREATE_CUSTOM_ROLE_PAYLOAD,
  DETACH_ROLE_PARAMS,
  UPDATE_CUSTOM_ROLE_PARAMS,
} from '@/types/publisher/account/AccountManageType'

export const getPublisherAccountsList = async (
  filters?: ACCOUNT_LIST_FILTERS,
  signal?: AbortSignal,
) => await SteakApi.get('/dev/manager/accounts', { params: filters, signal })

export const getPublisherSearchingAccount = async (
  filters?: ACCOUNT_SEARCHING_FILTERS,
  signal?: AbortSignal,
) => await SteakApi.get('/dev/manager/accounts/search', { params: filters, signal })

export const getPublisherPermissionsList = async (signal?: AbortSignal) =>
  await SteakApi.get('/dev/manager/permissions', { signal })

export const getCustomPublisherRolesList = async (signal?: AbortSignal) =>
  await SteakApi.get('/dev/manager/custom-roles', { signal })

export const getPublisherInformations = async (signal?: AbortSignal) =>
  await SteakApi.get('/dev/manager/me', { signal })

export const getPublisherInfomationsById = async (accountId: string, signal?: AbortSignal) =>
  await SteakApi.get(`/dev/manager/account`, { signal, params: { accountId } })

export const getCustomRoleInformationsById = async (roleId: string, signal?: AbortSignal) =>
  await SteakApi.get('/dev/manager/role', { signal, params: { roleId } })

export const createNewPublisherAccount = async (payload?: CREATE_ACCOUNT_PUBLISHER_PAYLOAD) =>
  await SteakApi.post('/dev/manager/create-account', payload)

export const deletePublisherAccount = async (accountId: string) =>
  await SteakApi.delete('/dev/manager/delete-account', { params: { accountId } })

export const createCustomRole = async (payload: CREATE_CUSTOM_ROLE_PAYLOAD) =>
  await SteakApi.post('/dev/manager/role/create-role', payload)

export const updateCustomRole = async (payload: CREATE_CUSTOM_ROLE_PAYLOAD) =>
  await SteakApi.post('/dev/manager/role/update-role', payload)

export const changeCustomRoleStatus = async (params: UPDATE_CUSTOM_ROLE_PARAMS) =>
  await SteakApi.post(
    `/dev/manager/role/change-status?roleId=${params.roleId}&isActive=${params.isActive}`,
  )

export const detachRoleFromAccount = async (params: DETACH_ROLE_PARAMS) =>
  await SteakApi.post(
    `/dev/manager/role/detach-role?accountId=${params.accountId}&roleId=${params.roleId}`,
  )

export const assignCustomRoleToAccount = async (params: { roleId: number; accountId: number }) =>
  await SteakApi.post(
    `/dev/manager/role/assign-role?roleId=${params.roleId}&accountId=${params.accountId}`,
  )
