export interface ApiResult<T>{
  status : number
  data? :T
  message? : string
}
