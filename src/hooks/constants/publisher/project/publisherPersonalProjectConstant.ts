import { PUBLISHER_PERSONAL_PROJECT_TYPE_FILTERS } from '@/types/publisher/project/PublisherPersonalProjectType'
import { Ref } from 'vue'
import QUERY_KEY_TYPE from '@/hooks/constants/query-key-type'

export const PUBLISHER_PERSONAL_PROJECT_QUERY_KEYS = {
  ALL: ['publisher', 'personal-projects'] as const,
  LIST: ((filters?: Ref<PUBLISHER_PERSONAL_PROJECT_TYPE_FILTERS>) => [
    'publisher',
    'personal-projects',
    'list',
    filters?.value.status ?? '',
    filters?.value.page ?? 1,
    filters?.value.size ?? 10,
    filters?.value.keyword ?? '',
  ]) as QUERY_KEY_TYPE<PUBLISHER_PERSONAL_PROJECT_TYPE_FILTERS>,
}
