import moment from 'moment'
import CryptoJS from 'crypto-js'
import 'moment/locale/zh-cn'

moment.locale('zh-cn')

export function md5(str: string) {
  return CryptoJS.MD5(str).toString()
}

/**
 * 判断设备类型
 * @returns {'desktop' | 'tablet' | 'mobile' | 'unknown'}
 */
export function detectDeviceType(): 'desktop' | 'tablet' | 'mobile' | 'unknown' {
  const isMobile = /Mobi/i.test(navigator.userAgent)
  const isTablet = /iPad|Tablet/i.test(navigator.userAgent) && !isMobile
  const screenWidth =
    window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth

  return screenWidth >= 1024 ? 'desktop' : isTablet ? 'tablet' : isMobile ? 'mobile' : 'unknown'
}

export default {
  md5,
  detectDeviceType
}
