import { SteakApi } from '@/apis'
import { type GameType } from '@/types/game/gameDetails/GameDetailsType'
import { PUBLISHER_PERSONAL_PROJECT_TYPE_FILTERS } from '@/types/publisher/project/PublisherPersonalProjectType'

export const publisherGetPersonalProjectListApi = (
  fitlers: PUBLISHER_PERSONAL_PROJECT_TYPE_FILTERS,
  signal: AbortSignal,
) => {
  return SteakApi.get('/dev/project/list', { params: fitlers, signal: signal })
}

export const publisherCreatePersonalProjectApi = (name: string) => {
  return SteakApi.post(`/dev/project/create?name=${name}`)
}

export const publisherCreateDraftProjectInformationsApi = (payload: GameType) => {
  return SteakApi.post('/dev/project/update', payload)
}

export const publisherUpdateGameNameApi = (payload: { id: bigint; name: string }) => {
  return SteakApi.post(`/dev/project/update`, payload)
}

export const publisherGetPersonalProjectByIdApi = (id: bigint, signal: AbortSignal) => {
  return SteakApi.get(`/dev/project/detail/${id}`, { signal: signal })
}

export const publisherPostVerifyGameRequest = (id: bigint) => {
  return SteakApi.post(`/dev/project/submit?projectId=${id}`)
}

export const publisherDeleteImageUploaded = (url: string) => {
  return SteakApi.delete('/dev/upload/delete-image', { data: { url } })
}

export const publisherDeleteImagesUploaded = (payload: { url: string }[]) => {
  return SteakApi.delete('/dev/upload/delete-images', { data: { payload } })
}
