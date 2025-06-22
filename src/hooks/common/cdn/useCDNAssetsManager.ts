import { useMutation } from '@tanstack/vue-query'
import {
  deleteImage,
  getPresignedImageUrl,
  getPresignedImageUrls,
  postIntoPresignedUrl,
} from '@/apis/common/cdn/cdnAssetsManager'
import { type PresignedUrlType, type PostIntoPresignedURLType } from '@/types/cdn/CdnTypes'
export const useDeleteImage = () => {
  const { data, isSuccess, isError, mutate, isPending, error } = useMutation({
    mutationFn: async (url: string) => {
      return (await deleteImage(url)).data
    },
  })

  return {
    data,
    mutate,
    error,
    isSuccess,
    isError,
    isPending,
  }
}

export const useGetPresignedImageUrl = () => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: PresignedUrlType) => {
      const response = await getPresignedImageUrl(data.fileName, data.fileSize)
      return response.data
    },
  })
  return {
    mutateAsync,
  }
}

export const useGetPresignedImageUrls = () => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: PresignedUrlType[]) => {
      const response = await getPresignedImageUrls(data)
      return response.data
    },
  })
  return {
    mutateAsync,
  }
}

export const usePostIntoPresignedUrl = () => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: PostIntoPresignedURLType) =>
      (await postIntoPresignedUrl(data.url, data.file)).data,
  })
  return {
    mutateAsync,
  }
}
