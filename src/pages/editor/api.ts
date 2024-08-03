import { http } from '@/utils'

export default {
  getClassList: params => http.get('/classifications/list', { params }),
  getTagList: params => http.get('/tags/list', { params })
}
