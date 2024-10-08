import { http } from '@/utils'

export default {
  getList: params => http.get('/notices/list', { params }),
  showNoticeTime: data => http.post('/userShowNoticeTime', data)
}
