import { http } from '@/utils'

export default {
  getList: params => http.get('/comments/list', { params }),
  remove: id => http.delete(`/comments/${id}`)
}
