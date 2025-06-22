import imageCompression from 'browser-image-compression'

export const useImageCompressor = () => {
  const compressImage = async (file: File, maxSizeMB: number = 1, maxWidth: number = 1024) => {
    const options = {
      maxSizeMB,
      maxWidthOrHeight: maxWidth,
      useWebWorker: true,
      fileType: 'image/webp',
    }
    return imageCompression(file, options)
  }

  return {
    compressImage,
  }
}
