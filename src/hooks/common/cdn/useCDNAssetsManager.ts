import { useMutation, useQuery } from '@tanstack/vue-query'
import {
  deleteImage,
  deleteImages,
  getPresignedImageUrl,
  getPresignedImageUrls,
  postIntoPresignedUrl,
  retryGetCdnUrl,
} from '@/apis/common/cdn/cdnAssetsManager'
import {
  type PresignedUrlType,
  type PostIntoPresignedURLType,
  type PresignedUrlResponse,
  type PostIntoPresignedURLsType,
} from '@/types/cdn/CdnTypes'
import { AxiosResponse } from 'axios'
export const useDeleteImage = () => {
  const { data, isSuccess, isError, mutateAsync, isPending, error } = useMutation({
    mutationFn: async (url: string) => await deleteImage(url),
  })

  return {
    data,
    mutateAsync,
    error,
    isSuccess,
    isError,
    isPending,
  }
}

export const useDeleteImages = () => {
  const { data, isSuccess, isError, mutateAsync, isPending, error } = useMutation({
    mutationFn: async (url: string[]) => {
      return (await deleteImages(url)).data
    },
  })

  return {
    data,
    mutateAsync,
    error,
    isSuccess,
    isError,
    isPending,
  }
}

export const useGetPresignedImageUrl = () => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: PresignedUrlType) => {
      const response: AxiosResponse<PresignedUrlResponse> = await getPresignedImageUrl(
        data.fileName,
        data.fileSize,
      )
      return response.data
    },
  })
  return {
    mutateAsync,
    isPending,
  }
}

export const useGetPresignedImageUrls = () => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: PresignedUrlType[]): Promise<PresignedUrlResponse[]> => {
      const response: AxiosResponse<PresignedUrlResponse[]> = await getPresignedImageUrls(data)
      return response.data
    },
  })
  return {
    isPending,
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
    isPending,
  }
}

export const usePostIntoPresignedUrls = () => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: PostIntoPresignedURLsType[]) =>
      Promise.all(
        data.map(async (file: PostIntoPresignedURLsType) => {
          await postIntoPresignedUrl(file.signedUrl, file.file_instance)
        }),
      ),
  })
  return {
    mutateAsync,
    isPending,
  }
}

export const useRetryQueryCdnURL = (url: string) =>
  useQuery({
    queryKey: ['cdn', 'retry', url],
    queryFn: async () => await retryGetCdnUrl(url),
    retry: 5,
    retryDelay: (attempt: number) => attempt * 1000,
    enabled: false,
  })
