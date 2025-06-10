// import { type COUNTRIES_QUERY_PARAMS_TYPE } from '@/apis/common/countries/countries'
// import QUERY_KEY_TYPE from '@/hooks/constants/query-key-type'
import { Ref } from 'vue'
export const COUNTRIES_QUERY_KEYS = {
  ALL: ['countries'] as const,
  LIST: (filters?: Ref<string[]>) => ['countries', 'list', filters?.value.join(',') ?? ''] as const,
}
