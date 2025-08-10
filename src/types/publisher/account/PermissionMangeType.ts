export type PERMISSION_DATA_TYPE = {
  id: number
  name: string
  description: string
  permissions: { id: number; name: string; description: string }[]
}

export type CUSTOM_ROLE_DATA_TYPE = {
  id: number
  name: string
  description: string
  isActive: boolean
}

export type CREATE_CUSTOM_ROLE_PAYLOAD = {
  name: string
  description: string
  permissionIds: number[]
}
