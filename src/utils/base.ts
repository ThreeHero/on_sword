import moment from 'moment'
import CryptoJS from 'crypto-js'
import { emoji } from './emoji'
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

export const parseContent = (content: string) => {
  const imgList: any[] = []

  // 1. 解析图片集
  const imgReg = /!\[(.*?)\]\((.*?)\)/g
  const imgMatch = content.match(imgReg)
  if (imgMatch) {
    const roundBracketRegex = /\(([^()]*)\)/g
    const squareBracketRegex = /\[([^[\]]*)\]/g
    imgMatch.map(item => {
      const name = item.match(squareBracketRegex)
      const url = item.match(roundBracketRegex)
      imgList.push({
        name: name[0].replace(/\[|\]/g, ''),
        // @ts-ignore
        url: url[0].replace(/\(|\)/g, '').resource()
      })
    })
    content = content.replace(imgReg, '')
  }
  // 2. 解析emoji
  const emojiReg = /\[([^\]]*)\]/g
  const emojiMatch = content.match(emojiReg)
  if (emojiMatch) {
    emojiMatch.map(item => {
      const currentEmoji = emoji.find(
        e => e.title === item.replace('[', '').replace(']', '')
      )?.emoji
      if (currentEmoji) {
        content = content.replace(item, currentEmoji)
      }
    })
  }
  return [content, imgList]
}

export default {
  md5,
  detectDeviceType,
  parseContent
}
