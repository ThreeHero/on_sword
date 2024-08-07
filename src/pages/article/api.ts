import { http } from '@/utils'

export default {
  getArticleInfo: id => http.get('/articles/' + id),
  like: params => http.post('/articles/like', {}, { params }),
  collect: params => http.post('/articles/favorites', {}, { params }),
  addComment: data => http.post('/comments', data),
  getCommentList: params => http.get('/comments/list', { params })
}
