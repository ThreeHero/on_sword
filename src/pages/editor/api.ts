import { http } from '@/utils'

export default {
  getClassList: params => http.get('/classifications/list', { params }),
  getTagList: params => http.get('/tags/list', { params }),
  uploadFile: data => http.post('/file/upload', data),
  publish: data => http.post('/articles', data),
  edit: data => http.put('/articles', data)
}
