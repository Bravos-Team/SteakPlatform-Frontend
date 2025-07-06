export type MutationDefaults = {
  key: string[] | readonly unknown[]
  fn: (...payload: any[]) => Promise<any>
  retry?: number
  onSuccessFn?: (...datas: any[]) => void
  onErrorFn?: (...errors: any[]) => void
  onSettledFn?: (...datas: any[]) => void
  onMutateFn?: (...variables: any[]) => void
}
