import { http } from '@/utils'

export default {
  /**
   * 获取打字机文字
   */
  getTypingMachine: () => http.get('/common/poetry'),
  getArticleList: (params?) => http.get('/articles/list', { params: { ...params, status: 1 } })
}
