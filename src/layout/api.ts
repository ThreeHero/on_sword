import { http } from '@/utils'

export default {
  getDict: () => http.get('/common/enum'),
  getUnreadNotifyCount: () => http.get('/notices/count')
}
