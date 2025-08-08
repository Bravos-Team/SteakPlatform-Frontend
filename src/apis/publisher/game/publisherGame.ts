import { SteakApi } from '@/apis'
import { PartialGameType } from '@/types/game/gameDetails/GameDetailsType'
import {
  DELETE_GAME_DRAFT_VERSION_TYPE,
  GAME_MANAGE_FILTERS_TYPE,
  GAME_NEW_VERSION_PAYLOAD_TYPE,
  GAME_PRICE_REQUEST_TYPE,
  GAME_RESPONSE_TYPE,
  GAME_STATUS_REQUEST_TYPE,
} from '@/types/publisher/game/GameManage'

export const publisherUpdateGameDetails = async (payload: PartialGameType) =>
  await SteakApi.post('/dev/game-management/update-game-details', payload)

export const publisherUpdateGameStatus = async (payload: GAME_STATUS_REQUEST_TYPE) =>
  await SteakApi.post('/dev/game-management/update-game-status', payload)

export const publisherUpdateGamePrice = async (payload: GAME_PRICE_REQUEST_TYPE) =>
  await SteakApi.post('/dev/game-management/update-game-price', payload)

export const getAllGameDetailsVersions = async (gameId: string, signal?: AbortSignal) =>
  await SteakApi.get(`/dev/game-management/get-all-version?gameId=${gameId}`, { signal })

export const createNewGameVersion = async (payload: GAME_NEW_VERSION_PAYLOAD_TYPE) =>
  await SteakApi.post('/dev/game-management/create-new-version', payload)

export const getGamesList = async (
  filters?: GAME_MANAGE_FILTERS_TYPE,
  signal?: AbortSignal,
): Promise<{
  data: {
    content: GAME_RESPONSE_TYPE[]
    page: {
      size: number
      number: number
      totalElements: number
      totalPages: number
    }
  }
}> => await SteakApi.get('/dev/game-management/list', { params: filters, signal })

export const getGameDetails = async (gameId: string, signal: AbortSignal) =>
  await SteakApi.get(`/dev/game-management/details/${gameId}`, { signal })

export const publisherUpdateDraftGameVersion = async (payload: GAME_NEW_VERSION_PAYLOAD_TYPE) =>
  await SteakApi.post('/dev/game-management/update-draft-version', payload)

export const publisherDeleteDraftGameVersion = async (params: DELETE_GAME_DRAFT_VERSION_TYPE) =>
  await SteakApi.delete(
    `/dev/game-management/delete-draft-version?gameId=${params.gameId}&versionId=${params.versionId}`,
  )
