import { bigint } from 'zod'

export type GAME_MANAGE_FILTERS_TYPE = {
  status?: string | null
  page: number
  size: number
}

export type GAME_RESPONSE_TYPE = {
  gameId: bigint
  title: string
  status: string
  thumbnail: string
}

export type GAME_STATUS_REQUEST_TYPE = {
  gameId: bigint
  status: string
}

export type GAME_PRICE_REQUEST_TYPE = {
  gameId: bigint
  price: number
}

export type GAME_NEW_VERSION_PAYLOAD_TYPE = {
  gameId: bigint
  versionName: string
  isReady: boolean
  releaseDate: bigint
  changeLog: string
  execPath: string
  downloadUrl: string
  checksum: string
  fileSize: number
  installSize: number
}

export type GAME_VERSION_DATA_TYPE = {
  versionId: bigint
  name: string
  changeLog: string
  execPath: string
  downloadUrl: string
  status: string
  releaseDate: bigint
  fileSize: bigint
  installSize: bigint
  checksum: string
  createdAt: bigint
  updatedAt: bigint
}
export type GAME_VERSIONS_LIST_TYPE = {
  versions: GAME_VERSION_DATA_TYPE[]
}

export type DELETE_GAME_DRAFT_VERSION_TYPE = {
  gameId: bigint
  versionId: bigint
}
