import { http } from '@/utils'

export default {
  getArticleList: params => http.get('/articles/list', { params }),
  likeList: params => http.get('/articles/like/list', { params }),
  collectList: params => http.get('/articles/collect/list', { params }),
  getUserInfo: id => http.get(`/users/${id}`),

  // 关注
  follow: id => http.post(`/users/follow`, null, { params: { id } }),
  // 取消关注
  unFollow: id => http.put(`/users/unfollow`, null, { params: { id } })
}
