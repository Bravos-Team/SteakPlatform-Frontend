import SteakApi from '@/apis/index'
import axios from 'axios'

export const deleteImage = async (url: string) => {
  console.log('Deleting image:', url)
  return await SteakApi.delete('/dev/upload/delete-image', {
    data: url,
  })
}

export const deleteImages = async (url: string[]) => {
  return await SteakApi.delete('/dev/upload/delete-images', {
    data: url,
  })
}

export const getPresignedImageUrl = async (fileName: string, fileSize: number) =>
  await SteakApi.post('/dev/upload/presigned-image-url', {
    fileName,
    fileSize,
  }).then((rp) => {
    return rp
  })

export const getPresignedImageUrls = async (
  payload: Array<{ fileName: string; fileSize: number }>,
) =>
  await SteakApi.post('/dev/upload/presigned-image-urls', payload).then((rp) => {
    return rp
  })

export const postIntoPresignedUrl = async (url: string, file: File) => {
  return await axios.put(url, file, {
    headers: {
      'Content-Type': file.type,
    },
  })
}
