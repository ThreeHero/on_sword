import moment from 'moment'
import CryptoJS from 'crypto-js'
import 'moment/locale/zh-cn'

moment.locale('zh-cn')

export function md5(str: string) {
  return CryptoJS.MD5(str).toString()
}

export default {
  md5
}
