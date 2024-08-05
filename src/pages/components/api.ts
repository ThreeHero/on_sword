import { http } from '@/utils'

export default {
  /**
   * 获取打字机文字
   */
  getTypingMachine: () => http.get('/common/poetry'),
  getArticleList: (params?: any) =>
    http.get('/articles/list', { params: { ...params, status: 1 } }),
  getClassList: (params?: any) => http.get('/classifications/list', { params })
}
