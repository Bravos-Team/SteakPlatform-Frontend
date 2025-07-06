import { getCountriesIndependent } from '@/apis/common/countries/countries'
import { useQuery, keepPreviousData } from '@tanstack/vue-query'
import { Ref } from 'vue'
// import { type COUNTRIES_QUERY_PARAMS_TYPE } from '@/apis/common/countries/countries'
import { COUNTRIES_QUERY_KEYS } from '@/hooks/constants/common/countries/countries-key'

export const queryGetCountriesList = (filters?: Ref<string[]>) => {
  return useQuery({
    queryKey: COUNTRIES_QUERY_KEYS.LIST(filters),
    queryFn: async ({ signal }) => (await getCountriesIndependent(filters?.value, signal)).data,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 15,
  })
}
