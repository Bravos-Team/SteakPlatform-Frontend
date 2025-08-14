export type GAME_ITEM = {
  id: bigint
  name: string
  thumbnail?: string
  price?: number
  releaseDate?: bigint
}

export type GAME_ITEM_DATA_TYPE = {
  id: string
  title: string
  price: number
  image: string
  isLoading: boolean
}
