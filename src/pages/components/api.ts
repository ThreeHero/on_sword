import { http } from '@/utils'

export default {
  /**
   * 获取打字机文字
   */
  getTypingMachine: () => http.get('/common/poetry')
}
