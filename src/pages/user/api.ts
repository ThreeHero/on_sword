import { http } from '@/utils'

export default {
  getArticleList: params => http.get('/articles/list', { params }),
  likeList: params => http.get('/articles/like/list', { params }),
  collectList: params => http.get('/articles/collect/list', { params })
}
