export type GAME_LIST_ITEM = {
  id: number
  name: string
  thumbnail: string
  price: number
  createAt: number
  updatedAt: number
  releaseDate: number
}

export type GAME_LIST_RESPONSE = {
  data: {
    items: GAME_LIST_ITEM[]
    nextCursor?: number | null
    hasNextCursor?: boolean
    maxCursor?: bigint
  }
}

export type GAME_STORE_LIST_QUERY_PARAMS = {
  cursor?: string
  size?: number
}

export type GAME_FILTERED_PARAMS = {
  search?: string
  genre?: string[]
  platform?: string[]
  sortBy?: 'name' | 'price' | 'releaseDate'
  sortOrder?: 'asc' | 'desc'
  pageSize?: number
  cursor?: number
  minPrice?: number
  maxPrice?: number
  hasNextCursor?: boolean
  maxCursor?: bigint
  status?: string
}

export type PageAndSize = {
  page: number
  size: number
}
