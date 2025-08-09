export type ACCOUNT_LIST_FILTERS = {
  keyword?: string
  status?: string
  page: number
  size: number
}

export type ACCOUNT_SEARCHING_FILTERS = {
  keyword?: string
  status?: string
  page: number
  size: number
}

export type CREATE_ACCOUNT_PUBLISHER_PAYLOAD = {
  username: string
  email: string
  password: string
  assignedRoles: number[]
}

export type CREATE_CUSTOM_ROLE_PAYLOAD = {
  name: string
  description: string
  permissionIds: number[]
}

export type UPDATE_CUSTOM_ROLE_PARAMS = {
  roleId: string
  isActive: boolean
}
