

import FingerprintJS from '@fingerprintjs/fingerprintjs'

export async function genderDeviceId(): Promise<string> {
  try {
    const fp = await FingerprintJS.load()
    const result = await fp.get()
    return result.visitorId
  } catch (error) {
    console.error('Lỗi khi tạo device ID:', error)
    return ''
  }
}
