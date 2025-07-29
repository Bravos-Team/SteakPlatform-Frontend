import { SteakApi } from '@/apis'
import { GameResubmitRequestType, type GameType } from '@/types/game/gameDetails/GameDetailsType'
import { PUBLISHER_PERSONAL_PROJECT_TYPE_FILTERS } from '@/types/publisher/project/PublisherPersonalProjectType'

export const publisherGetPersonalProjectListApi = (
  fitlers: PUBLISHER_PERSONAL_PROJECT_TYPE_FILTERS,
  signal: AbortSignal,
) => SteakApi.get('/dev/project/list', { params: fitlers, signal: signal })

export const publisherCreatePersonalProjectApi = (name: string) =>
  SteakApi.post(`/dev/project/create?name=${name}`)

export const publisherCreateDraftProjectInformationsApi = (payload: GameType) =>
  SteakApi.post('/dev/project/update', payload)

export const publisherUpdateGameNameApi = (payload: { id: bigint; name: string }) =>
  SteakApi.post(`/dev/project/update`, payload)

export const publisherGetPersonalProjectByIdApi = (id: bigint, signal: AbortSignal) =>
  SteakApi.get(`/dev/project/detail/${id}`, { signal: signal })

export const publisherPostVerifyGameRequest = (id: bigint) =>
  SteakApi.post(`/dev/project/submit?projectId=${id}`)

export const publisherDeleteImageUploaded = (url: string) =>
  SteakApi.delete('/dev/upload/delete-image', { data: { url } })

export const publisherDeleteImagesUploaded = (payload: { url: string }[]) =>
  SteakApi.delete('/dev/upload/delete-images', { data: { payload } })

export const publisherResubmitProject = (request: GameResubmitRequestType) =>
  SteakApi.post('/dev/project/resubmit', request)
