import { SteakApi } from '@/apis'
import { type GameType } from '@/types/game/gameDetails/GameDetailsType'
import { PUBLISHER_PERSONAL_PROJECT_TYPE_FILTERS } from '@/types/publisher/project/PublisherPersonalProjectType'

export const publisherGetPersonalProjectListApi = (
  fitlers: PUBLISHER_PERSONAL_PROJECT_TYPE_FILTERS,
  signal: AbortSignal,
) => {
  return SteakApi.get('/api/v1/dev/project/list', { params: fitlers, signal: signal })
}

export const publisherCreatePersonalProjectApi = (name: string) => {
  return SteakApi.post(`/api/v1/dev/project/create?name=${name}`)
}

export const publisherCreateDraftProjectInformationsApi = (payload: GameType) => {
  return SteakApi.post('/api/v1/dev/project/update', payload)
}

export const publisherUpdateGameNameApi = (payload: { id: bigint; name: string }) => {
  return SteakApi.post(`/api/v1/dev/project/update`, payload)
}

export const publisherGetPersonalProjectByIdApi = (id: bigint, signal: AbortSignal) => {
  return SteakApi.get(`/api/v1/dev/project/detail/${id}`, { signal: signal })
}
