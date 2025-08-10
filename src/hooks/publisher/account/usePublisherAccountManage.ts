import {
  assignCustomRoleToAccount,
  changeCustomRoleStatus,
  createCustomRole,
  createNewPublisherAccount,
  deletePublisherAccount,
  detachRoleFromAccount,
  getCustomPublisherRolesList,
  getCustomRoleInformationsById,
  getPublisherAccountsList,
  getPublisherInfomationsById,
  getPublisherInformations,
  getPublisherPermissionsList,
  getPublisherSearchingAccount,
  updateCustomRole,
} from '@/apis/publisher/account/account'
import {
  PUBLISHER_ACCOUNTS_MANAGE_KEYS,
  PUBLISHER_CUSTOM_ROLES_LIST_KEYS,
  PUBLISHER_PERMISSIONS_LIST_KEYS,
} from '@/hooks/constants/publisher/account/account-key'
import {
  ACCOUNT_LIST_FILTERS,
  ACCOUNT_SEARCHING_FILTERS,
  CREATE_ACCOUNT_PUBLISHER_PAYLOAD,
  CREATE_CUSTOM_ROLE_PAYLOAD,
  DETACH_ROLE_PARAMS,
  UPDATE_CUSTOM_ROLE_PARAMS,
} from '@/types/publisher/account/AccountManageType'
import { useQuery, useMutation, useQueryClient, keepPreviousData } from '@tanstack/vue-query'
import { Ref } from 'vue'

const staleTime = 0

export const useQueryPublisherAccountsList = (filters: Ref<ACCOUNT_LIST_FILTERS>) => {
  return useQuery({
    queryKey: PUBLISHER_ACCOUNTS_MANAGE_KEYS.LIST(filters),
    queryFn: async ({ signal }) => await getPublisherAccountsList(filters.value, signal),
    staleTime,
    retry: 1,
  })
}

export const useQuerySearchingAccount = (filters?: Ref<ACCOUNT_SEARCHING_FILTERS>) => {
  return useQuery({
    queryKey: PUBLISHER_ACCOUNTS_MANAGE_KEYS.SEARCHING(filters),
    queryFn: async ({ signal }) => await getPublisherSearchingAccount(filters?.value, signal),
    staleTime: 1000 * 60 * 5,
    enabled: false,
    retry: 1,
  })
}

export const useQueryPublisherPermissionsList = () => {
  return useQuery({
    queryKey: PUBLISHER_PERMISSIONS_LIST_KEYS.ALL(),
    queryFn: async ({ signal }) => await getPublisherPermissionsList(signal),
    staleTime,
  })
}

export const useQueryCustomRolesList = () => {
  return useQuery({
    queryKey: PUBLISHER_CUSTOM_ROLES_LIST_KEYS.ALL(),
    queryFn: async ({ signal }) => await getCustomPublisherRolesList(signal),
    staleTime,
  })
}

export const useQueryPublisherInformations = () => {
  return useQuery({
    queryKey: PUBLISHER_ACCOUNTS_MANAGE_KEYS.ACCOUNT(),
    queryFn: async ({ signal }) => await getPublisherInformations(signal),
    staleTime,
  })
}

export const useQueryPublisherInformationsById = (accountId?: Ref<string>) => {
  return useQuery({
    queryKey: PUBLISHER_ACCOUNTS_MANAGE_KEYS.ACCOUNT_BY_ID(accountId!),
    queryFn: async ({ signal }) => await getPublisherInfomationsById(accountId?.value!, signal),
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
    retry: 1,
    enabled: false,
  })
}

export const useQueryRoleInformationsById = (roleId: string) => {
  return useQuery({
    queryKey: PUBLISHER_CUSTOM_ROLES_LIST_KEYS.ROLE(roleId),
    queryFn: async ({ signal }) => await getCustomRoleInformationsById(roleId, signal),
    retry: 1,
  })
}

export const useMutateCreatePublisherAccount = () => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (payload: CREATE_ACCOUNT_PUBLISHER_PAYLOAD) =>
      await createNewPublisherAccount(payload),
  })
  return { mutateAsync, isPending }
}

export const useMutateDeletePublisherAccount = () => {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (accountId: string) => await deletePublisherAccount(accountId),
    onSuccess: async () =>
      await queryClient.invalidateQueries({
        queryKey: PUBLISHER_ACCOUNTS_MANAGE_KEYS.LIST(),
      }),
  })
  return { mutateAsync, isPending }
}

export const useMutateCreateCustomRole = () => {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (payload: CREATE_CUSTOM_ROLE_PAYLOAD) => await createCustomRole(payload),
    onSuccess: async () =>
      await queryClient.invalidateQueries({
        queryKey: PUBLISHER_CUSTOM_ROLES_LIST_KEYS.ALL(),
      }),
  })
  return { mutateAsync, isPending }
}

export const useMutateUpdateCustomRole = () => {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (payload: CREATE_CUSTOM_ROLE_PAYLOAD) => await updateCustomRole(payload),
    onSuccess: async (_data, variables) =>
      await queryClient.invalidateQueries({
        queryKey: PUBLISHER_CUSTOM_ROLES_LIST_KEYS.ALL(),
      }),
  })
  return { mutateAsync, isPending }
}

export const useMutateChangeCustomRoleStatus = () => {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (params: UPDATE_CUSTOM_ROLE_PARAMS) => await changeCustomRoleStatus(params),
    onSuccess: async (_data, variables) => {
      await queryClient.invalidateQueries({
        queryKey: PUBLISHER_CUSTOM_ROLES_LIST_KEYS.ALL(),
      })
      await queryClient.invalidateQueries({
        queryKey: PUBLISHER_CUSTOM_ROLES_LIST_KEYS.ROLE(variables.roleId),
      })
    },
  })
  return { mutateAsync, isPending }
}

export const useMutateDetachRoleFromAccount = () => {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (params: DETACH_ROLE_PARAMS) => await detachRoleFromAccount(params),
    onSuccess: async (_data, variables) => {
      await queryClient.invalidateQueries({
        queryKey: PUBLISHER_ACCOUNTS_MANAGE_KEYS.ACCOUNT_BY_ID(variables.accountId.toString()),
      })
      await queryClient.invalidateQueries({
        queryKey: PUBLISHER_CUSTOM_ROLES_LIST_KEYS.ROLE(variables.roleId.toString()),
      })
    },
  })
  return { mutateAsync, isPending }
}

export const useMutateAssignCustomRoleToAccount = () => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (params: { roleId: number; accountId: number }) =>
      await assignCustomRoleToAccount(params),
  })
  return {
    mutateAsync,
    isPending,
  }
}
