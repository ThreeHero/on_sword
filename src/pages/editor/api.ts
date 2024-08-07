import { http } from '@/utils'

export default {
  getArticleInfo: id => http.get('/articles/' + id),
  getClassList: params => http.get('/classifications/list', { params }),
  getTagList: params => http.get('/tags/list', { params }),
  uploadFile: data => http.post('/file/upload', data),
  publish: data => http.post('/articles', data),
  edit: data => http.put('/articles', data)
}
