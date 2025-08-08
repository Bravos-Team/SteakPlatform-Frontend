export type QueryDefaults = {
  key: string[] | readonly unknown[]
  fn: (...payload: any[]) => Promise<any>
  retry?: number
  staleTime?: number
  enabled?: boolean
  refetchOnMount?: boolean
  refetchOnWindowFocus?: boolean
  refetchInterval?: number
  refetchOnReconnect?: boolean
  select?: (...data: any[]) => any
}
