export type PresignedUrlType = {
  fileName: string
  fileSize: number
}

export type PostIntoPresignedURLType = {
  url: string
  file: File
}

export type PresignedUrlResponse = {
  fileName: string
  signedUrl: string
}
