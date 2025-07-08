export type PresignedUrlType = {
  fileName: string
  fileSize: number
}

export type PostIntoPresignedURLType = {
  url: string
  file: File
}

export type PresignedUrlResponse = {
  cdnFileName: string
  fileName: string
  signedUrl: string
}
