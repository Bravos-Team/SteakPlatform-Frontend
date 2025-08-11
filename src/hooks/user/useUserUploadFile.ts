import {
  deleteFileUploaded,
  deleteFilesUploaded,
  getPresignedUploadUrl,
  getPresignedUploadUrls,
} from '@/apis/user/userUploadFile'
import { postIntoPresignedUrl } from '@/apis/common/cdn/cdnAssetsManager'

import { useMutation } from '@tanstack/vue-query'

export const mutatePostIntoPresignedUrl = () => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (payload: { url: string; file: File }) =>
      await postIntoPresignedUrl(payload.url, payload.file),
  })
  return { mutateAsync, isPending }
}

export const mutateGetPresignedImageUrl = () => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (payload: { fileName: string; fileSize: number }) =>
      await getPresignedUploadUrl(payload.fileName, payload.fileSize),
  })
  return { mutateAsync, isPending }
}

export const mutateGetPresignedImageUrls = () => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (payload: { fileName: string; fileSize: number }[]) =>
      await getPresignedUploadUrls(payload),
  })
  return { mutateAsync, isPending }
}

export const mutateDeleteFileUploaded = () => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (url: string) => await deleteFileUploaded(url),
  })
  return { mutateAsync, isPending }
}
export const mutateDeleteFilesUploaded = () => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (urls: string[]) => await deleteFilesUploaded(urls),
  })
  return { mutateAsync, isPending }
}
