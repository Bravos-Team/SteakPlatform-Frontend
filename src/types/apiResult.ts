export interface ApiResult<T>{
  status : number
  data? : T
  error?: {
    title?: string;
    detail: string;
    status?: number;
    instance?: string;
    type?: string;
    errors? : string[];
  };
}
