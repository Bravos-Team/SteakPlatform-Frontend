import SteakApi from '@/apis/index'

export const getPresignedUploadUrl = async (fileName: string, fileSize: number) =>
  await SteakApi.post('/user/upload/presigned-upload-url', {
    fileName,
    fileSize,
  }).then((response) => {
    return response.data
  })

export const getPresignedUploadUrls = async (
  payload: Array<{ fileName: string; fileSize: number }>,
) =>
  await SteakApi.post('/user/upload/presigned-upload-urls', payload).then((response) => {
    return response.data
  })

export const deleteFileUploaded = async (url: string) =>
  await SteakApi.delete('/user/upload/presigned-upload-urls', { data: url })

export const deleteFilesUploaded = async (urls: string[]) =>
  await SteakApi.delete('/user/upload/presigned-upload-urls', { data: urls })
