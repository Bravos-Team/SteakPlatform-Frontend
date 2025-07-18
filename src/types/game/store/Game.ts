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
  items: GAME_LIST_ITEM[]
  nextCursor: number | null
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
  status?: string
}
