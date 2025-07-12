import FingerprintJS from '@fingerprintjs/fingerprintjs'

export async function generateDeviceId(): Promise<string> {
  try {
    const fp = await FingerprintJS.load()
    const result = await fp.get()
    return result.visitorId
  } catch (error) {
    console.error('Error generating device ID', error)
    return ''
  }
}

export async function generateDeviceInfo(): Promise<string> {
  try {
    const ua = navigator.userAgent

    let browser = 'Unknown'
    let version = 'Unknown'
    let platform = 'Unknown'

    // Detect platform
    if (/Windows NT/.test(ua)) platform = 'Windows'
    else if (/Mac OS X/.test(ua)) platform = 'macOS'
    else if (/Android/.test(ua)) platform = 'Android'
    else if (/Linux/.test(ua)) platform = 'Linux'
    else if (/iPhone|iPad|iPod/.test(ua)) platform = 'iOS'

    // Detect browser and version
    let match
    if ((match = ua.match(/Firefox\/([\d.]+)/))) {
      browser = 'Firefox'
      version = match[1]
    } else if ((match = ua.match(/Edg\/([\d.]+)/))) {
      browser = 'Edge'
      version = match[1]
    } else if ((match = ua.match(/OPR\/([\d.]+)/)) || (match = ua.match(/Opera\/([\d.]+)/))) {
      browser = 'Opera'
      version = match[1]
    } else if (
      (match = ua.match(/Chrome\/([\d.]+)/)) &&
      !ua.includes('Edg/') &&
      !ua.includes('OPR/')
    ) {
      browser = 'Chrome'
      version = match[1]
    } else if ((match = ua.match(/Version\/([\d.]+).*Safari/))) {
      browser = 'Safari'
      version = match[1]
    }

    return `Browser ${browser} ${version} in ${platform}`
  } catch (error) {
    return 'Hacker device'
  }
}
