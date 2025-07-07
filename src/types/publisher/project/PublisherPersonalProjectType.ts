export type PUBLISHER_PERSONAL_PROJECT_TYPE_FILTERS = {
  status?: string | undefined | null
  page?: number
  size?: number
  keyword?: string | null | undefined
}

export type PUBLISHER_PERSONAL_PROJECT = {
  id: number
  publisherId: number
  name?: string
  status?: string
  versionName?: any
  updatedAt?: string
}

export type PUBLISHER_PERSONAL_PROJECT_LIST = {
  content: PUBLISHER_PERSONAL_PROJECT[]
  pageable: PUBLISHER_PERSONAL_PROJECT_PAGEABLE
  totalPages: number
  totalElements: number
  last: number
  numberOfElements: number
  size: number
  number: number
  sort: PUBLISHER_PERSONAL_PROJECT_SORT
  first: boolean
  empty: boolean
}

export type PUBLISHER_PERSONAL_PROJECT_PAGEABLE = {
  pageNumber: number
  pageSize: number
  sort: {
    unsorted: boolean
    sorted: boolean
    empty: boolean
  }
  offset: number
  unpaged: boolean
  paged: boolean
}

export type PUBLISHER_PERSONAL_PROJECT_SORT = {
  unsorted: boolean
  sorted: boolean
  empty: boolean
}
