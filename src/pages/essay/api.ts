import { http } from '@/utils'

export default {
  getTypingMachine: () => http.get('/common/soul'),
  addEssay: data => http.post('/essays', data),
  getEssayList: params => http.get('/essays/list', { params }),
  addComment: data => http.post('/comments', data),
  removeEssay: id => http.delete(`/essays/${id}`),
  getCommentList: params => http.get('/comments/list', { params })
}
