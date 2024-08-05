import { http } from '@/utils'

export default {
  getArticleInfo: id => http.get('/articles/' + id)
}
