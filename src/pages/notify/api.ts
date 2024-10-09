import { http } from '@/utils'

export default {
  getList: params => http.get('/notices/list', { params }),
  remove: id => http.delete(`/notices/${id}`),
  showNoticeTime: data => http.post('/userShowNoticeTime', data)
}
